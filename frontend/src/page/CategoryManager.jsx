import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryManager() {  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post('http://localhost:3000/categories', {
        name: newCategoryName,
        parent: parentCategory || null,
      });
      setNewCategoryName('');
      setParentCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  return (
    <div>
      <h1>Create a new category</h1>
      <input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Category name"
      />
      <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
        <option value="">No parent</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={addCategory}>Add Category</button>

      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name} {category.parent && `(Parent: ${category.parent})`}
            {category.children && category.children.length > 0 && (
              <div>
                <h3>Children:</h3>
                <ul>
                  {category.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;