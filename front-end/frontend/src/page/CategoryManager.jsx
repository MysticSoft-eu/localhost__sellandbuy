import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");


  const fetchCategories = async () => {
    try{
      const response = await axios.get('/categories');
    setCategories(response.data);
  }catch (err) {
    console.error(err);
    // handle your error here
}
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async event => {
    event.preventDefault();
    await axios.post('/category', { name: newCategoryName });
    setNewCategoryName('');
    fetchCategories();
  };

  const handleSubcategorySubmit = async event => {
    event.preventDefault();
    if (selectedCategory) {
      await axios.post(`/category/${selectedCategory}/subcategory`, { name: newSubcategoryName });
      setNewSubcategoryName('');
      fetchCategories();
    } else {
      alert('Wybierz kategorię');
    }
  };
  const handleCategoryDelete = async categoryId => {
    await axios.delete(`/category/${categoryId}`);
    fetchCategories();
  };
  
  const handleSubcategoryDelete = async (categoryId, subcategoryId) => {
    await axios.delete(`/category/${categoryId}/subcategory/${subcategoryId}`);
    fetchCategories();
  };

  return (
    <div>
      <h1>Zarządzanie kategoriami</h1>

      <h2>Utwórz nową kategorię</h2>
      <form onSubmit={handleCategorySubmit}>
        <label>
          Nazwa kategorii:
          <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required />
        </label>
        <button type="submit">Utwórz kategorię</button>
      </form>

      <h2>Utwórz nową podkategorię</h2>
      <form onSubmit={handleSubcategorySubmit}>
        <label>
          Wybierz kategorię:
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
          </select>
        </label>
        <label>
          Nazwa podkategorii:
          <input type="text" value={newSubcategoryName} onChange={e => setNewSubcategoryName(e.target.value)} required />
        </label>
        <button type="submit">Utwórz podkategorię</button>
      </form>

      <h2>Lista kategorii</h2>
      {categories.map(category => (
      <div key={category._id}>
        <h3>{category.name} <button onClick={() => handleCategoryDelete(category._id)}>Usuń kategorię</button></h3>
        {category.subcategories.map(subcategory => (
          <p key={subcategory._id}>
            - {subcategory.name} 
            <button onClick={() => handleSubcategoryDelete(category._id, subcategory._id)}>Usuń podkategorię</button>
          </p>
        ))}
      </div>
    ))}
    </div>
  );
}

export default CategoryManager;