import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import Login from "./page/Login";
import "./index.css";
import Register from "./page/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(



   <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </Router>
    </UserContextProvider>

  

);
