-- Insert two rows into the Company table
INSERT INTO Company (company_name) 
VALUES ('Company A'), 
       ('Company B');

-- Insert two rows into the Settings table
INSERT INTO Settings (company_id, confidence_threshold, onoff_email, onoff_sms, notification_email, notification_sms)
VALUES (1, 0.8, TRUE, FALSE, 'admin@companya.com', '1234567890'),
       (2, 0.7, FALSE, TRUE, 'admin@companyb.com', '0987654321');

-- Insert two rows into the Users table
INSERT INTO Users (company_id, first_name, last_name, email, role, password_hash)
VALUES (1, 'Alice', 'Smith', 'alice@companya.com', 'admin', 'hashed_password_1'),
       (2, 'Bob', 'Johnson', 'bob@companyb.com', 'normal', 'hashed_password_2');

-- Insert two rows into the Camera table
INSERT INTO Camera (company_id, camera_name, location)
VALUES (1, 'Camera 1', 'Building A - Front Entrance'),
       (2, 'Camera 2', 'Building B - Back Entrance');

-- Insert two rows into the Detection table
INSERT INTO Detection (camera_id, user_id, detection_type, detection_datetime, confidence, image_data)
VALUES (1, 1, 'motion', NOW(), 0.9, NULL), 
       (2, 2, 'hazard', NOW(), 0.85, NULL);
