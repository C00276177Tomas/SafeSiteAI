import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Register.module.css"; // Import CSS Module

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password === confirmPassword) {
      setIsRegistered(true);
    } else {
      alert("Passwords do not match!");
    }
  };

  if (isRegistered) {
    return <Navigate to="/main" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Company Registration</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label>Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter the admin email"
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
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button className={styles.button} onClick={handleRegister}>
            Register
          </button>
        </form>
        <div className={styles.link}>
          <Link to="/">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
