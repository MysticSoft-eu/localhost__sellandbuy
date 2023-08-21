import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CategoryManager.css';

function RecursiveCategorySelector({ onCategoryChange, initialCategories = [] }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [tree, setTree] = useState([]);
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

  const handleChange = (index, event) => {
    const newSelectedCategories = selectedCategories.slice(0, index + 1);
    newSelectedCategories[index] = event.target.value;
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  const renderSelect = (index) =>(
    <div className="category-container">
     <select
        className="custom-select"  // Added className for styling
        style={{ '--depth': index }}   // Use CSS variable for dynamic depth
        value={selectedCategories[index] || ''}
        onChange={(event) => handleChange(index, event)}
    >
      <option value="">Select category</option>
      {getOptions(index).map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
    </div>
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
    <div className="category-container">
      {Array.from({ length: numberOfSelects }, (_, index) =>
        renderSelect(index)
      )}
    </div>
  );
}

export default RecursiveCategorySelector;