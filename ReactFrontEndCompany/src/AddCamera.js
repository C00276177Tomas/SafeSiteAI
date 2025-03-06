import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addCamera } from "./Api"; // Adjust the import path as needed
import styles from "./AddUser.module.css";

const AddCamera = () => {
  const [cameraName, setCameraName] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    return storedCompanyId ? parseInt(storedCompanyId, 10) : 0; // Default to 0 if not found
  });
  const [loading, setLoading] = useState(false); // Loading state for loader visibility
  const [formError, setFormError] = useState(""); // State for general form error
  const navigate = useNavigate();

  const handleAddCamera = async () => {
    // Reset error state
    setFormError("");

    // Check if all fields are filled
    if (!cameraName || !location) {
      setFormError("All fields are required!");
      return;
    }

    try {
      setLoading(true); // Show loader
      const camera = {
        company_id: companyId,
        camera_name: cameraName,
        location,
      };

      console.log(camera);

      await addCamera(camera); // Call API to add camera
      setLoading(false); // Hide loader after success
      navigate("/manageCameras"); // Navigate to the camera management page after success
    } catch (error) {
      setLoading(false); // Hide loader in case of error
      alert("Error adding camera: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Add Camera</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {formError && <div className={styles.error}>{formError}</div>} {/* Display general form error */}
          
          <div className={styles.formGroup}>
            <label>Camera Name</label>
            <input
              type="text"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
              placeholder="Enter the camera name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the camera location"
              required
            />
          </div>
          <button
            className={styles.button}
            onClick={handleAddCamera}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding..." : "Add Camera"}
          </button>
        </form>
        <div className={styles.link}>
          <Link to="/manageCameras">Back to manage cameras</Link>
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

export default AddCamera;
