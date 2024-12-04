import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styles from "./Layout.module.css"; // Import CSS Module

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Navigate to="/main" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login Page</h2>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
        <div className={styles.link}>
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;