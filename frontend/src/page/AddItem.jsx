import React, { useState } from 'react';
import axios from 'axios';
import RecursiveCategorySelector from '../components/CategorySelector.jsx';
import PhotosUploader from '../PhotosUploader';
import "./style/Additem.css"
import { useContext } from "react";
import { UserContext } from "../UserContext";
export default function AddItem() {
    

  const {user} = useContext(UserContext);
    const [item, setItem] = useState({
        title: "",
        address: "",
        description: "",
        price: 0,
        category: "",
        subcategory: "",
        photos: [],
        login: "",
    });

    const handleSubmit = async (event) => {
       
        event.preventDefault();
        try {
            const response = await axios.post('/additem', item);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value, login: user.name});
    };

    const handleCategoryChange = (categories) => {
      setItem({ ...item, category: categories });
  };

    const handleSubCategoryChange = (subcategory) => {
        setItem({ ...item, category: subcategory });
    };

    const handlePhotosChange = (photos) => {
        setItem({ ...item, photos });
    };

    return (
        <div>
          
            <form onSubmit={handleSubmit}> 
             <h1>Add Item</h1>
                <label>
                    Title:
                    <input 
                        type="text" 
                        name="title" 
                        value={item.title} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Address:
                    <input 
                        type="text" 
                        name="address" 
                        value={item.address} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Description:
                    <input 
                        type="text" 
                        name="description" 
                        value={item.description} 
                        onChange={handleChange} 
                    />
                </label>
                <div>
                    Photos:
                    <PhotosUploader onChange={handlePhotosChange} initialPhotos={item.photos} />
                </div>
                <label>
                    Category:
                    <RecursiveCategorySelector onCategoryChange={handleCategoryChange} />
                </label>
                <label>
                    Price:
                    <input 
                        type="number" 
                        name="price" 
                        value={item.price} 
                        onChange={handleChange} 
                    />
                </label>
                
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}      
