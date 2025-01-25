import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styles from "./Layout.module.css"; // Import CSS Module
import { login } from './Api'; // Ensure this points to your API utility

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form reload

    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      // Call the login function
      const response = await login(email, password);

      if (response.error) {
        setMessage(`Error: ${response.error}`);
        setMessageColor('red');
      } else {
        setMessage(`Success: ${response.message}`);
        setMessageColor('green');

        // store user id
        localStorage.setItem('userId', response.user_id);

				// store company id
        localStorage.setItem('companyId', response.company_id);

				// Store the token in localStorage (or sessionStorage if preferred)
				localStorage.setItem('authToken', response.token); // Save the JWT token

				console.log(response.token);
				console.log(response.user_id);
				console.log(response.company_id);

        // Mark as authenticated
        setIsAuthenticated(true);
      }
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`);
      setMessageColor('red');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/main" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}> {/* Change to form for better accessibility */}
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading} // Disable input during loading
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
              disabled={loading} // Disable input during loading
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Show loader text */}
          </button>
        </form>
        {loading && <p className={styles.loader}>Loading...</p>} {/* Loader message */}
        {message && <p style={{ color: messageColor }}>{message}</p>} {/* Feedback message */}
        <div className={styles.link}>
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
