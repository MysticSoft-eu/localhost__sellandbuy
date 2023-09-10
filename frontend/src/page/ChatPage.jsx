import React, { useState, useEffect, useRef } from 'react';
import  "../styles/ChatPage.css"; 
import { useParams } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../UserContext";


  

export default function ChatPage() {
    const { login, itemId } = useParams();
    const [newMessage, setnewMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const divUnderMessages = useRef();
    const {user} = useContext(UserContext);
    const userId1 = { _id: user._id };
   

    useEffect(() => {
        async function fetchChat(ev) {
            try {
                ev.preventDefault();
                
                const response = await axios.post('/chat', itemId );
                setChat(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchChat();
    }, [itemId]);


    useEffect(() => {
        axios.get('/people')
       
    }, [onlinePeople]);

    function connectTows() {
        const ws = new WebSocket("ws://127.0.0.1:3000");
        setWs(ws);
        ws.addEventListener('message', handleMessage);
        ws.addEventListener('close', () => {

            setTimeout(() => {
                console.log('reconnecting...');
                connectTows();
            }, 1000);
            
        });
    }



    function showOnlinePeople(peopleArray) {
        const people = {};
        peopleArray.forEach(({ id, name }) => {
            people[id] = name;
        });
        setOnlinePeople(people);
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        console.log({ev,messageData});
        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        }else if ('text' in messageData) {
            if (messageData.sender === selectedUser){
            setMessages(prev => ([...prev ,{...messageData}]) )
             }
        }
    }

   

    
    
    const sendMessage = (ev) => {
        ev.preventDefault();
       
        ws.send(JSON.stringify({

           
                text: newMessage,
                recipient: selectedUser,
          
        }));
     setnewMessage('');
     setMessages(prev => ([...prev ,{
        
         text: newMessage,
         sender: user.id,
         recipient: selectedUser,
         _id: Date.now(),    

        }]) )
       
    };

    useEffect(() => {  
        if (selectedUser){
            axios.get(`/messages/${selectedUser}`).then(response => {
            const {data} = response;
            setMessages(data);
            })
        }

     }, [selectedUser]);


    // useEffect(() => {
    //      divUnderMessages.current.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    const messagesWithoutDupes = uniqBy(messages, '_id');
    return (
        <div className="container">
            <div className="usersPane">
                <div className='userwindow'>
                    {Object.keys(onlinePeople).map(name => (
                        <div
                            className={`user ${selectedUser === name ? 'active' : ''}`}
                            onClick={() => {setSelectedUser(name);console.log(name)}}
                            key={name}
                        >
                            {onlinePeople[name]}
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatPane">
                {!!selectedUser && (
                    
            
                <><div  className="chatWindow">
                        {messagesWithoutDupes.map((message, index) => (
                            <div key={index}>
                                {message.sender === user.id? 'Me:' : ''}{message.text}
                            </div>
                        ))}
                        <div ref={divUnderMessages}>   

                        </div>



                    </div><div className="chatInput">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setnewMessage(e.target.value)}
                                placeholder="Type a message..." />
                            <button onClick={sendMessage}>Send</button>
                        </div></>
                 )}
            </div>
           
        </div>
    );
}
