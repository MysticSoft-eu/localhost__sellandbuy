import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";

import styles from '../styles/Login.module.css';
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
       const {data}= await axios.post('/login', { email, password });
        setUser(data);
      
        alert('Login successful');
        
        setRedirect(true);
    } catch (e) {   
      alert('Login failed. Please try again later');
    }
      
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLoginSubmit} className={styles.form}>
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
