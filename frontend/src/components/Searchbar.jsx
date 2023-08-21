
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import styles from "../styles/SearchBar.module.css";
import { Link } from "react-router-dom";

const Search = () => {
const [inputValue, setInputValue] = useState(''); 
  return (
    <div className={styles["search-container"]}>
      <input
         type="text" 
         value={inputValue}   // <-- Bind the input to inputValue
         onChange={e => setInputValue(e.target.value)} 
         placeholder="Search..."
         className="search-input"
      />
        <Link to={`/category/all${inputValue ? `/${inputValue}` : `/all`}`} >
      <button className={styles["search-button"]}>
        <FaSearch />
      </button>
     </Link>
    </div>
  );
};

export default Search;
