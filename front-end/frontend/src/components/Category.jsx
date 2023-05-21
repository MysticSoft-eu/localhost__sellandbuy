import React from "react";
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
        <button className={styles.categoryButton}>
          <FaCar className={styles.categoryIcon} />
          <span className={styles.categoryName}>Cars</span>
        </button>
        <button className={styles.categoryButton}>
          <FaHome className={styles.categoryIcon} />
          <span className={styles.categoryName}>House</span>
        </button>
        <button className={styles.categoryButton}>
          <FaBriefcase className={styles.categoryIcon} />
          <span className={styles.categoryName}>Jobs</span>
        </button>
        <button className={styles.categoryButton}>
          <FaCouch className={styles.categoryIcon} />
          <span className={styles.categoryName}>Furniture</span>
        </button>
        <button className={styles.categoryButton}>
          <FaMobileAlt className={styles.categoryIcon} />
          <span className={styles.categoryName}>Electronics</span>
        </button>
        <button className={styles.categoryButton}>
          <FaTh className={styles.categoryIcon} />
          <span className={styles.categoryName}>All</span>
        </button>
      </div>
    </div>
  );
};

export default Category;
