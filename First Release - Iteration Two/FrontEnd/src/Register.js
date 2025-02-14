import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Register.module.css"; // Import CSS Module
import { getUsers, createCompany } from './Api';

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
    // Ensure all fields are filled
    if (!companyName || !firstName || !lastName || !adminEmail || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Define company data
    const companyData = {
        company_name: companyName,
        first_name: firstName,
        last_name: lastName,
        email: adminEmail,
        password_hash: password, // Ensure hashing if needed before sending
    };

    console.log("Registering with data:", companyData);

    // Call API to create company
    createCompany(companyData)
				.then((response) => {
						console.log("Company created successfully:", response);
						
						// Show success alert with company name
						alert(`Company "${companyName}" has been created successfully!`);

						// Redirect after successful creation
						setIsRegistered(true);
				})
        .catch((error) => {
            console.error("Company creation failed:", error);
            alert("Failed to create company. Please try again.");
        });
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
