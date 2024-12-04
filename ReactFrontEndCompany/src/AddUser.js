import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Switch from "react-switch";
import styles from "./AddUser.module.css"; // Import the updated CSS Module

const AddUser = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAddUser = () => {
    if (password === confirmPassword) {
      setIsAdded(true);
    } else {
      alert("Passwords do not match!");
    }
  };

  if (isAdded) {
    return <Navigate to="/main" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>{isAdmin ? "Add Admin User" : "Add Regular User"}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the user's email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the user's password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm the password"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Admin</label>
            <Switch
              onChange={() => setIsAdmin(!isAdmin)}
              checked={isAdmin}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              handleDiameter={24}
              offColor="#B0BEC5" // Gray when off
              onColor="#0288d1"  // Blue when on
              offHandleColor="#FFFFFF" // White handle when off
              onHandleColor="#FFFFFF"  // White handle when on
            />
          </div>
          <button className={styles.button} onClick={handleAddUser}>
            Add User
          </button>
        </form>
        <div className={styles.link}>
          <Link to="/main">Back to main page</Link>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
