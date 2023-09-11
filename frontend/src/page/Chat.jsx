import React, { useState, useEffect, useContext,useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../UserContext";
import "../styles/Chat.css";
import uniqBy from 'lodash/uniqBy';

export default function Chat() {
    const messagesEndRef = useRef(null);
   
    const { user } = useContext(UserContext);
    const {itemId} = useParams();
    const [chats, setChats] = useState([]);
    const [selectChat, setselectChat] = useState();
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setnewMessage] = useState('');
    const [recipient, setrecipient] = useState(''); 
    const [sender, setsender] = useState('');
    const navigate = useNavigate();
    const uniqueMessages = uniqBy(messages, '_id');
    let reconnectAttempts = 0;


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      useEffect(() => {
        scrollToBottom();
      });

    useEffect(() => {
        if (!selectChat) return;
        fetchmessage();
    }, [selectChat]);

    async function fetchmessage(){
        try {
            const res = await axios.get(`/message/${selectChat}`);
            setMessages(res.data);
          
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchChats();
    }, [user]);
    
    let isRequestPending = false;
    async function fetchChats() {
        if (isRequestPending) return;
        isRequestPending = true;
        try {
            const response = await axios.post('/chat', { itemId });
            setChats(response.data);
        } catch (e) {
            console.log(e);
        }
        isRequestPending = false;
    }
    
    useEffect(() => {
        
        const chatWithItemId = chats.find(chat => chat.itemId === itemId);
        if (chatWithItemId) {
            setselectChat(chatWithItemId._id);
            setrecipient(chatWithItemId.recipient);
            setsender(chatWithItemId.sender);

        }
        
    }, [chats]);

    useEffect(() => {
        connectTows();
        return () => {
            if (ws) {
                ws.close();
            }
        }
    }, [selectChat]);

    function connectTows() {
        if (reconnectAttempts > 5) return;
        const wsConnection = new WebSocket("ws://127.0.0.1:3000");
        wsConnection.onopen = () => {
            console.log('WebSocket connection opened');
            wsConnection.send(JSON.stringify({ chatId: selectChat }));
            reconnectAttempts = 0;
        };
        setWs(wsConnection);
        wsConnection.addEventListener('message', handleMessage);
        wsConnection.addEventListener('close', () => {
            console.log('WebSocket closed. Attempting to reconnect...');
            reconnectAttempts++;
            setTimeout(() => {
                connectTows();
            }, 1000);
        });
    }
    

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
         if ('text' in messageData) {
            setMessages(prev => ([...prev, messageData]));
        }
    }

    const sendMessage = (ev) => {
        ev.preventDefault();
        if (!selectChat || !ws) return;
       
        let recipientId = recipient;
        
        if (recipientId === user._id) {
            recipientId = sender;
        }

        const messageData = {
            text: newMessage,
            recipient: recipientId,
            sender: user._id,
            chatId: selectChat,
        };
        
        ws.send(JSON.stringify(messageData));

        setnewMessage('');
        
    };

    return (
        <div className="chatPage">
            <div className="chatList">
                {chats.map(chat => (
                    <Link 
                        key={chat._id} 
                        to={`/chatpage/${chat.itemId}`} 
                        className="chatListItem"
                        onClick={() => setselectChat(chat._id)}
                    >
                        {chat.title}
                    </Link>
                ))}
            </div>
            <div className="chatWindow">
                <div className="chatMessages">
                    {uniqueMessages.map(message => (
                        <div key={message._id} className={`chatMessage ${message.sender === user._id ? 'sent' : 'received'}`}>
                            <span className="messageSender">
                           {message.sender === user._id ? 'Me:' : "User:"}
                         </span>
                            {message.text}
                        </div>
                    ))}
                     <div ref={messagesEndRef} />
                </div>
                <div className="chatInputContainer">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setnewMessage(e.target.value)}
                        placeholder="Type a message..." />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
    
    
    
}
