import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CategoryManager.css';
import { useContext } from "react";
import { UserContext } from "../UserContext";
import PhotosUploader from '../PhotosUploader';

export default function UpdateItem() {
  const {user} = useContext(UserContext);
  const { id } = useParams();
  const [item, setItem] = useState({
    title: "",
    address: "",
    description: "",
    price: 0,
    category: [],
    photos: [],
   login: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!id) { return; }
    axios.get('/items/' + id)
      .then(response => {
        console.log('Item data:', response.data);
        setItem(response.data);
        setSelectedCategories(response.data.category); // assuming category is an array of names
      });

    axios.get('/categories')
      .then(response => {
        console.log('Categories:', response.data);
        setCategories(response.data);
      });
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

  const handlePhotosChange = (photos) => {
    setItem({ ...item, photos });
  };

  const handleChange = (index, event) => {
    const newSelectedCategories = selectedCategories.slice(0, index + 1);
    newSelectedCategories[index] = event.target.value;
    setSelectedCategories(newSelectedCategories);
    setItem({ ...item, category: newSelectedCategories });
  };

  const renderSelect = (index) => (
    <div className="category-container">
    <select
      className="custom-select"
      name="category"
      value={selectedCategories[index] || ''}
      onChange={(event) => handleChange(index, event)}
    >
      <option value="">Select category</option>
      {getOptions(index).map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select></div>
  );

  const getOptions = (index) => {
    const parent = index > 0 ? selectedCategories[index - 1] : null;
    return categories.filter((category) => category.parent === parent);
  };

  const getNumberOfSelects = () => {
    for (let i = 0; i < selectedCategories.length; i++) {
      const options = getOptions(i + 1);
      if (options.length === 0) {
        return i + 1;
      }
    }
    return selectedCategories.length + 1;
  };

  const numberOfSelects = getNumberOfSelects();

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
                onChange={event => setItem({ ...item, [event.target.name]: event.target.value, login: user.name })} 
              />
            </label>
            <label>
              Address:
              <input 
                type="text" 
                name="address" 
                value={item.address} 
                onChange={event => setItem({ ...item, [event.target.name]: event.target.value })} 
              />
            </label>
            <label>
              Description:
              <input 
                type="text" 
                name="description" 
                value={item.description} 
                onChange={event => setItem({ ...item, [event.target.name]: event.target.value })} 
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
                onChange={event => setItem({ ...item, [event.target.name]: event.target.value })} 
              />
            </label>
            <label><div className="category-container">
          {Array.from({ length: numberOfSelects }, (_, index) =>
            renderSelect(index)
          )}</div>
        </label>

            <button type="submit">Update Item</button>
          </form>
        </div>
    );
}
