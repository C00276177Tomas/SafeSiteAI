import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Switch from "react-switch";
import styles from "./AddUser.module.css";
import { fetchSettingsById } from "./Api"; // Adjust import as needed

const ChangeSettings = () => {
  const [autoEmail, setAutoEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [sensitivity, setSensitivity] = useState(50);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
				const companyId = localStorage.getItem('companyId');
        const settings = await fetchSettingsById(companyId);
        setAutoEmail(settings.onoff_email || false);
        setEmail(settings.notification_email || "");
        setSensitivity(settings.confidence_threshold || 50);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // const handleSaveSettings = async () => {
  //   setFormError("");
  //   if (!email && autoEmail) {
  //     setFormError("Email is required if automatic email notifications are enabled!");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     await updateSettings({
  //       autoEmail,
  //       notificationEmail: email,
  //       sensitivity,
  //     });
  //     setLoading(false);
  //     alert("Settings updated successfully!");
  //     navigate("/main");
  //   } catch (error) {
  //     setLoading(false);
  //     alert("Error updating settings: " + error.message);
  //   }
  // };

  const handleSaveSettings = async () => {
    console.log("Saving settings...");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Change Settings</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {formError && <div className={styles.error}>{formError}</div>}
          
          <div className={styles.formGroup}>
            <label>Automatic Email Notification</label>
            <Switch
              onChange={() => setAutoEmail(!autoEmail)}
              checked={autoEmail}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              handleDiameter={24}
              offColor="#B0BEC5"
              onColor="#0288d1"
              offHandleColor="#FFFFFF"
              onHandleColor="#FFFFFF"
            />
          </div>
          
          {autoEmail && (
            <div className={styles.formGroup}>
              <label>Notification Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter notification email"
                required
              />
            </div>
          )}
          
          <div className={styles.formGroup}>
						<label>Sensitivity</label>
						<input
							type="range"
							min="60"
							max="100"
							value={sensitivity * 100} // Convert float to percentage for display
							onChange={(e) => setSensitivity(parseFloat(e.target.value) / 100)} // Convert back to float
						/>
						<span>{(sensitivity * 100).toFixed(0)}%</span>
					</div>

          
          <button
            className={styles.button}
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </form>
        
        <div className={styles.link}>
          <Link to="/main">Back to main page</Link>
        </div>
      </div>
    </div>
  );
};

export default ChangeSettings;
