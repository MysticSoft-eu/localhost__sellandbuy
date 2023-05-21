import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/SearchBar.module.css";

const Search = () => {
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        placeholder="Search..."
        className={styles["search-input"]}
      />
      <button className={styles["search-button"]}>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
