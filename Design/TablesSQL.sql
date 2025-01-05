USE sitesafe;

CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Settings (
    settings_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT UNIQUE NOT NULL,
    confidence_threshold FLOAT, -- Threshold for confidence levels
    onoff_email BOOLEAN, -- Enable or disable email notifications
    onoff_sms BOOLEAN, -- Enable or disable SMS notifications
    notification_email VARCHAR(255), -- Email for notifications
    notification_sms VARCHAR(255), -- SMS for notifications
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'normal') DEFAULT 'normal',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Changed to TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Changed to TIMESTAMP
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

CREATE TABLE Camera (
    camera_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    camera_name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

CREATE TABLE Detection (
    detection_id INT AUTO_INCREMENT PRIMARY KEY,
    camera_id INT NOT NULL,
    user_id INT NOT NULL, -- Linking detection to a user
    detection_type VARCHAR(100), -- Example: 'motion', 'hazard'
    detection_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Changed to TIMESTAMP
    confidence FLOAT, -- Added confidence column
    image_data BLOB, -- Added image_data column
    FOREIGN KEY (camera_id) REFERENCES Camera(camera_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
