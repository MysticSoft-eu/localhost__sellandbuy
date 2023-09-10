import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

import Layout from "./Layout";
import Login from "./page/Login";
import "./index.css";
import Register from "./page/Register";
import AccountPage from "./page/Account";
import IndexPage from "./page/indexPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AddItem from "./page/AddItem";
import UpdateItem from "./page/UpdateItem";
import ItemPage from "./page/ItemPage";
import CategoryManager from "./page/CategoryManager";
import ItemsByCategory from "./page/ItemsByCategory";
import Chat from "./page/Chat";
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;


function App() {
  return (  
  <UserContextProvider>
    
      <Routes>
      
       <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        <Route path="/uploader/:id" element={<UpdateItem />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/itempage/:id" element={<ItemPage />} />
        <Route path="/categorymanager" element={<CategoryManager />} />
        <Route path="/category/:category/:searchQuery?/:cityQuery?" element={<ItemsByCategory />} />
        <Route path="/chatpage/:itemId?" element={<Chat />} />

       

       </Route>
      </Routes>
   
  </UserContextProvider>
  );
}

export default App;
