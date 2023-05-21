import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input type="email" id="email" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input type="password" id="password" className={styles.input} />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <Link to="/register" className={styles.registerButton}>
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
