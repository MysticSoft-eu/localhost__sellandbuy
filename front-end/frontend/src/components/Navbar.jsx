import React from "react";
import styles from "../styles/Navbar.module.css";
import { FaEnvelope, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Navbar = () => {
  const {user} = useContext(UserContext);
  return (
    <div className={styles.navbar}>
      <Link to="/" >
        <h1 className={styles.title}>SellAndBuy</h1>
    
  </Link>
      
      <div className={styles.icons}>
        <Link to="/messages" className={styles.iconLink}>
          <FaEnvelope className={styles.icon} />
        </Link>
        <Link to="/cart" className={styles.iconLink}>
          <FaShoppingCart className={styles.icon} />
        </Link>
        <Link to={user?'account': "/login"} className={styles.iconLink}>
          <FaUserCircle className={styles.icon} />
          {!!user && (user.name)}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
