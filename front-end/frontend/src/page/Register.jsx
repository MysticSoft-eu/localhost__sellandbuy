import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Register.module.css";
import { Link } from "react-router-dom";
const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister} className={styles.form}>
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
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Register
          </button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
          <button type="button" className={styles.googleButton}>
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
