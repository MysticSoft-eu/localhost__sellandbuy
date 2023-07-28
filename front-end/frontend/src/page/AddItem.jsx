import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PhotosUploader from '../PhotosUploader';

export default function AddItem() {
    
    const [item, setItem] = useState({
        title: "",
        address: "",
        description: "",
        price: 0,
        category: "",
        subcategory: "",
        photos: [],
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
        setItem({ ...item, [event.target.name]: event.target.value });
    };

    const handlePhotosChange = (photos) => {
        setItem({ ...item, photos });
    };

    return (
        <div>
          <h1>{ "Add Item"}</h1>
          <form onSubmit={handleSubmit}>
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
            <label>
             Photos:
             <PhotosUploader onChange={handlePhotosChange} initialPhotos={item.photos} />
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
            
            <button type="submit">{ "Add Item"}</button>
          </form>
        </div>
      );
      
}