import React from "react";
import styles from "../styles/Navbar.module.css";
import { FaEnvelope, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>SellAndBuy</h1>
      <div className={styles.icons}>
        <FaEnvelope className={styles.icon} />
        <FaShoppingCart className={styles.icon} />
        <FaUserCircle className={styles.icon} />
      </div>
    </div>
  );
};

export default Navbar;
