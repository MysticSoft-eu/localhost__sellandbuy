import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";  

export default function ItemsPage() {
const [items, setItems] = useState([]);
useEffect(() => {
    axios.get('/items').then(({data}) => {
        setItems(data);
    });
},[]);
return (   
    <div>
        <h1 className="text-3xl">{Items.title}</h1>





    </div>





)


}