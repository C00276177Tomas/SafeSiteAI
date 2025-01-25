import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Switch from "react-switch";
import { addUser } from "./Api"; // Adjust the import path as needed
import styles from "./AddUser.module.css";

const AddUser = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyId, setCompanyId] = useState(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    return storedCompanyId ? parseInt(storedCompanyId, 10) : 0; // Default to 0 if not found
  });
  const [loading, setLoading] = useState(false); // Loading state for loader visibility
  const [emailError, setEmailError] = useState(""); // State to manage email validation error
  const [formError, setFormError] = useState(""); // State for general form error
  const navigate = useNavigate();

  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleAddUser = async () => {
    // Reset error state
    setFormError("");

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError("All fields are required!");
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(""); // Clear email error if valid
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true); // Show loader
      const user = {
        company_id: companyId,
        first_name: firstName,
        last_name: lastName,
        email,
        password_hash: password,
        role: isAdmin ? "admin" : "normal",
      };

      console.log(user);

      await addUser(user); // Call API to add user
      setLoading(false); // Hide loader after success
      navigate("/manageUsers"); // Navigate to the table view after success
    } catch (error) {
      setLoading(false); // Hide loader in case of error
      alert("Error adding user: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>{isAdmin ? "Add Admin User" : "Add Regular User"}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {formError && <div className={styles.error}>{formError}</div>} {/* Display general form error */}
          
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter the user's first name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter the user's last name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the user's email"
              required
            />
            {emailError && <div className={styles.error}>{emailError}</div>} {/* Display email validation error */}
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
          <button
            className={styles.button}
            onClick={handleAddUser}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
        <div className={styles.link}>
          <Link to="/manageUsers">Back to manage users</Link>
        </div>
        <div className={styles.link}>
          <Link to="/main">Back to main page</Link>
        </div>

        {/* Show loader while submitting */}
        {loading && (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
