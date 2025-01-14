import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Register.module.css"; // Import CSS Module
import { getUsers, addUser, updateUser, deleteUser } from './Api';

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

	const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleRegister = () => {
    if (password === confirmPassword) {
			console.log("isRegistered:", isRegistered);
			console.log("First Name:", firstName);
			console.log("Last Name:", lastName);
			console.log("Company Name:", companyName);
			console.log("Admin Email:", adminEmail);
			console.log("Password:", password);
			console.log("Confirm Password:", confirmPassword);

			console.log("Fetched Users:", users);

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

						{/* First Name Section */}
						<div className={styles.formGroup}>
							<label>First Name</label>
							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="Enter your first name"
								required
							/>
						</div>

						{/* Last Name Section */}
						<div className={styles.formGroup}>
							<label>Last Name</label>
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Enter your last name"
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
