import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PhotosUploader from '../PhotosUploader';

export default function UpdateItem() {
    const { id } = useParams();
    const [item, setItem] = useState({
        title: "",
        address: "",
        description: "",
        price: 0,
        category: "",
        photos: [],
    });

    useEffect(() => {
        if (!id) { return; }
        axios.get('/items/' + id)
            .then(response => {
                console.log('Item data:', response.data);
                setItem(response.data);
            })
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('/items/' + id, item);
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
          <h1>Update Item</h1>
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
            <label>
              Category:
              <input 
                type="text" 
                name="category" 
                value={item.category} 
                onChange={handleChange} 
              />
            </label>
            <button type="submit">Update Item</button>
          </form>
        </div>
    );
}
