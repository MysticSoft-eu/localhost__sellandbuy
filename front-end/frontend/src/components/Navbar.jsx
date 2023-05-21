import React from "react";
import styles from "../styles/Navbar.module.css";
import { FaEnvelope, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>SellAndBuy</h1>
      <div className={styles.icons}>
        <Link to="/messages" className={styles.iconLink}>
          <FaEnvelope className={styles.icon} />
        </Link>
        <Link to="/cart" className={styles.iconLink}>
          <FaShoppingCart className={styles.icon} />
        </Link>
        <Link to="/login" className={styles.iconLink}>
          <FaUserCircle className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
