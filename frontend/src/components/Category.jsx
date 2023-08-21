import React from "react";
import { Link } from 'react-router-dom';
import {
  FaCar,
  FaHome,
  FaBriefcase,
  FaCouch,
  FaMobileAlt,
  FaTh,
} from "react-icons/fa";
import styles from "../styles/Category.module.css";

const Category = () => {
  return (
    <div className={styles.category}>
      <h2 className={styles.title}>Category</h2>
      <div className={styles.buttonsContainer}>
      <Link to="/category/cars">
        <button  className={styles.categoryButton}>
          <FaCar className={styles.categoryIcon} />
          <span className={styles.categoryName}>Cars</span>
        </button>
      </Link>
      <Link to="/category/house">
        <button className={styles.categoryButton}>
          <FaHome className={styles.categoryIcon} />
          <span className={styles.categoryName}>House</span>
        </button>
      </Link>
      <Link to="/category/jobs">
        <button className={styles.categoryButton}>
          <FaBriefcase className={styles.categoryIcon} />
          <span className={styles.categoryName}>Jobs</span>
        </button>
      </Link>
      <Link to="/category/furniture">
        <button className={styles.categoryButton}>
          <FaCouch className={styles.categoryIcon} />
          <span className={styles.categoryName}>Furniture</span>
        </button>
       </Link>
      <Link to="/category/electronics">
        <button className={styles.categoryButton}>
          <FaMobileAlt className={styles.categoryIcon} />
          <span className={styles.categoryName}>Electronics</span>
        </button>
        </Link>
      <Link to="/category/all">
         <button className={styles.categoryButton}>
          <FaTh className={styles.categoryIcon} />
          <span className={styles.categoryName}>All</span>
         </button>
       </Link>
      </div>
 
    </div>
  );
};

export default Category;
