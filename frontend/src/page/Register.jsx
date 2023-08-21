import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import styles from "../styles/Register.module.css"; 
import Navbar from "../components/Navbar";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Add this state for the confirm password field

  async function handleRegister(ev) { // Rename your function to handleRegister
    ev.preventDefault();
    if(password !== confirmPassword) {
      alert("Password and Confirm Password don't match.");
      return;
    }
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div>
      
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="name"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
}