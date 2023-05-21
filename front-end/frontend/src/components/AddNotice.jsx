import React from "react";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/AddNotice.module.css";

const AddNotice = () => {
  return (
    <button className={styles.addNoticeButton}>
      <FaPlus className={styles.addNoticeIcon} />
      <span className={styles.addNoticeText}>Add Notice</span>
    </button>
  );
};

export default AddNotice;
