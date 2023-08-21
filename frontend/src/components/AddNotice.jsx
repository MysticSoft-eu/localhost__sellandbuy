import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/AddNotice.module.css";
import { UserContext } from '../UserContext';
import { useNavigate } from "react-router-dom";

const AddNotice = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/additem");
    } else {
      navigate("/login");
    }
  }

  return (
    <button onClick={handleClick} className={styles.addNoticeButton}>
      <FaPlus className={styles.addNoticeIcon} />
      <span className={styles.addNoticeText}>Add Notice</span>
    </button>
  );
};

export default AddNotice;
