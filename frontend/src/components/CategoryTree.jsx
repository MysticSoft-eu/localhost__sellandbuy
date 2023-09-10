import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/CategoryTree.css";

export default function CategoryDropdown({ setSelectedCategories, selectedCategories }) {
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown container

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('/categories');
                const hierarchicalData = convertToHierarchy(response.data);
                setCategories(hierarchicalData);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCategorySelect = (categoryId, categoryName) => {
        setSelectedCategories([{ id: categoryId, name: categoryName }]);
    };

    return (
        <div className="main">
            <div
                ref={dropdownRef}
                className={`dropdown-container ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="dropdown-header">Select Category</div>
                <CategoryTree categories={categories} onSelect={handleCategorySelect} selected={selectedCategories} className="dropdown-list" />
            </div>
            
        </div>
    );
}

const CategoryTree = ({ categories, onSelect, selected, className }) => {
    return (
        <ul className={className} onClick={(e) => e.stopPropagation()}>
            {categories.map(category => (
                <CategoryItem 
                    key={category._id} 
                    category={category} 
                    onSelect={onSelect} 
                    selected={selected}
                />
            ))}
        </ul>
    );
};

const CategoryItem = ({ category, onSelect, selected }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isSelected = selected.some(cat => cat.id === category._id);

    const handleExpansion = (e) => {
        e.stopPropagation();
        setIsExpanded(prev => !prev);
    };

    const handleSelection = (e) => {
        e.stopPropagation();
        onSelect(category._id, category.name);
    };

    return (
        <li>
            <div onClick={handleExpansion} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Checkbox for selection */}
                <input 
                    type="checkbox" 
                    checked={isSelected} 
                    onChange={handleSelection}
                    style={{ marginRight: '10px' }}
                />
                {/* This div handles the expansion and collapse */}
                {category.name}
            </div>
            {isExpanded && category.children && category.children.length > 0 && (
                <CategoryTree categories={category.children} onSelect={onSelect} selected={selected} />
            )}
        </li>
    );
};

const convertToHierarchy = (data) => {
    let lookup = {};
    data.forEach(category => {
        lookup[category.name] = category;
        category.children = [];
    });

    let hierarchicalData = [];
    data.forEach(category => {
        if (category.parent) {
            lookup[category.parent].children.push(category);
        } else {
            hierarchicalData.push(category);
        }
    });

    return hierarchicalData;
}
