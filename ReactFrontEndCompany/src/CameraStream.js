import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {fetchCamerasByCompany, fetchSettingsById } from './Api';
import Modal from 'react-modal';
import styles from './ManageUsers.module.css';


const socket = io("http://localhost:5000");

// Set the app element globally to the root div of your app
Modal.setAppElement('#root');

const CameraStream = () => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [processedFrame, setProcessedFrame] = useState(null);
    const [stream, setStream] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
		const [companyId] = useState(() => {
			const storedCompanyId = localStorage.getItem('companyId');
			return storedCompanyId ? storedCompanyId : 0;
		});
		const [userId] = useState(() => {
			const storedUserId = localStorage.getItem('userId');
			return storedUserId ? storedUserId : 0;
		});
		const [cameras, setCameras] = useState([]);
		const [showModal, setShowModal] = useState(false);
		const [isModalOpen, setIsModalOpen] = useState(false);

		const [cameraId, setCameraId] = useState(null);
		const [cameraLocation, setCameraLocation] = useState(null);

		const [email, setEmail] = useState("");
		const [autoEmail, setAutoEmail] = useState(false);
		const [sensitivity, setSensitivity] = useState(50);

		const [isAdmin, setIsAdmin] = useState(false);

		useEffect(() => {
				const fetchSettings = async () => {
					try {
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

		useEffect(() => {
				// Retrieve the value from localStorage and parse it to a boolean
				const role = localStorage.getItem('role');
				
				// If the value exists and is 'true', set isAdmin to true, otherwise false
				if (role === 'admin') {
					setIsAdmin(true);
				} else {
					setIsAdmin(false);
				}
			}, []);


		const openModal = () => {
			setIsModalOpen(true);
		};
	
		const closeModal = () => {
			setIsModalOpen(false);
		};

		const navigate = useNavigate();

    useEffect(() => {
			// Listen for processed frames from server
			socket.on("frame_processed", (data) => {
					if (data.image && data.cameraId === cameraId) {
							// Only process the frame if the cameraId matches
							setProcessedFrame(`data:image/jpeg;base64,${data.image}`);
					} else if (data.error) {
							console.error("Error:", data.error);
					}
			});
	
			return () => {
					socket.off("frame_processed");
			};
	}, [cameraId]); // Make sure to re-run the effect if cameraId changes

    const sendFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        socket.emit("send_frame", { image: imageData, userId: userId, cameraId: cameraId, email: email, autoEmail: autoEmail, sensitivity: sensitivity  }); // Send frame to backend
    };

    useEffect(() => {
        if (cameraOn) {
            const interval = setInterval(sendFrame, 500); // Send frames every 100ms (~10 FPS)
            return () => clearInterval(interval);
        }
    }, [cameraOn]);

		const fetchCameras = async () => {
			try {
				const camerasData = await fetchCamerasByCompany(companyId);
				setCameras(camerasData);
	
				if (camerasData.length === 0) {
					alert("A camera needs to be added first.");
					return;
				}
	
				// Show the modal if there are cameras available
				setIsModalOpen(true);
				setShowModal(true);
			} catch (err) {
				console.error("Error fetching cameras:", err);
			}
		};

		const toggleCamera = async (camera) => {
			if (cameraOn) {
					// Stop the video stream
					if (stream) {
							stream.getTracks().forEach(track => track.stop());
					}
					setStream(null);
					setCameraOn(false);
					setProcessedFrame(null);
			} else {
				try {
					setIsModalOpen(false);
					setCameraId(camera.camera_id);
					setCameraLocation(camera.location);
				
					// Ask for camera permission early to ensure labels are available
					await navigator.mediaDevices.getUserMedia({ video: true });
					const devices = await navigator.mediaDevices.enumerateDevices();
					const videoDevices = devices.filter(device => device.kind === "videoinput");
				
					if (videoDevices.length === 0) {
						console.error("No video devices found.");
						return;
					}
				
					let selectedDeviceId;
				
					if (videoDevices.length === 1) {
						// Only one camera, use it directly
						selectedDeviceId = videoDevices[0].deviceId;
					} else {
						// Ask user to pick one
						const selectedIndex = prompt(
							`Select a camera (0 - ${videoDevices.length - 1}):\n` +
							videoDevices.map((d, i) => `${i}: ${d.label}`).join("\n")
						);
				
						if (selectedIndex === null || isNaN(selectedIndex)) return;
				
						selectedDeviceId = videoDevices[Number(selectedIndex)].deviceId;
					}
				
					// Start the selected camera stream
					const newStream = await navigator.mediaDevices.getUserMedia({
						video: { deviceId: { exact: selectedDeviceId } }
					});
				
					if (videoRef.current) videoRef.current.srcObject = newStream;
					setStream(newStream);
					setCameraOn(true);
				} catch (err) {
					console.error("Error accessing camera:", err);
				}
			}
	};
	

		const openSettings = () => {
			navigate("/changeSettings");
		};

		useEffect(() => {
			// Cleanup when navigating away
			return () => {
					if (cameraOn && stream) {
							stream.getTracks().forEach(track => track.stop());
					}
			};
	}, [stream]);

    return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									{/* Control Buttons */}
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
											{cameraOn ? (
											<button onClick={toggleCamera} className="control-button" style={{ marginRight: '10px' }}>
													Turn Off Camera
											</button>
											) : (
											<button onClick={fetchCameras} className="control-button" style={{ marginRight: '10px' }}>
													{cameraOn ? "Turn Off Camera" : "Choose Camera"}
											</button>
											)}
											{isAdmin && (
												<button onClick={openSettings} className="control-button" style={{ marginRight: '10px' }}>
													Settings
												</button>
											)}
											<button 
													onClick={() => window.open("https://rpubs.com/GloreasBoreas/SiteSafe", "_blank")} 
													className="control-button"
											>
													Dashboard
											</button>
									</div>

									{/* Modal displaying camera data in a table */}
									{(

										
										<Modal
										isOpen={isModalOpen}
										onRequestClose={closeModal}
										contentLabel="Select Camera"
										className={styles.modalContent}
										overlayClassName={styles.modalOverlay}
										>
										<h2>Select Camera</h2>

										{/* Check if there are cameras available */}
										{cameras.length === 0 ? (
											<p>No cameras available. Please add a camera first.</p>
										) : (
											<table
												style={{
													width: '100%',
													borderCollapse: 'collapse',
													marginTop: '10px',
													boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
												}}
											>
												<thead
													style={{
														backgroundColor: '#f4f4f4',
														color: '#333',
														fontWeight: 'bold',
													}}
												>
													<tr>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Camera ID
														</th>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Camera Name
														</th>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Location
														</th>
													</tr>
												</thead>
												<tbody>
													{cameras.map((camera) => (
														<tr
															key={camera.camera_id}
															onClick={() => toggleCamera(camera)}
															style={{
																cursor: 'pointer',
																transition: 'background-color 0.3s ease',
															}}
															onMouseOver={(e) => {
																// Change the background color of the entire row
																e.currentTarget.style.backgroundColor = '#e0f7fa'; // Light blue
															}}
															onMouseOut={(e) => {
																// Reset the background color when mouse leaves
																e.currentTarget.style.backgroundColor = ''; // Reset to default
															}}
														>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.camera_id}
															</td>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.camera_name}
															</td>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.location}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										)}




										{/* Close modal button */}
										<button onClick={closeModal}  
										style={{
												backgroundColor: '#d32f2f',
												color: 'white',
												border: 'none',
												borderRadius: '5px',
												padding: '10px 20px',
												cursor: 'pointer',
												fontSize: '16px',
												transition: 'background-color 0.3s',
												marginTop: '10px',
										}}>Close </button>
										</Modal>
									)}


									{/* Modal displaying camera data in a table */}
									{(

										
										<Modal
										isOpen={isModalOpen}
										onRequestClose={closeModal}
										contentLabel="Select Camera"
										className={styles.modalContent}
										overlayClassName={styles.modalOverlay}
										>
										<h2>Select Camera</h2>

										{/* Check if there are cameras available */}
										{cameras.length === 0 ? (
											<p>No cameras available. Please add a camera first.</p>
										) : (
											<table
												style={{
													width: '100%',
													borderCollapse: 'collapse',
													marginTop: '10px',
													boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
												}}
											>
												<thead
													style={{
														backgroundColor: '#f4f4f4',
														color: '#333',
														fontWeight: 'bold',
													}}
												>
													<tr>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Camera ID
														</th>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Camera Name
														</th>
														<th
															style={{
																padding: '10px',
																borderBottom: '2px solid #ddd',
																textAlign: 'left',
															}}
														>
															Location
														</th>
													</tr>
												</thead>
												<tbody>
													{cameras.map((camera) => (
														<tr
															key={camera.camera_id}
															onClick={() => toggleCamera(camera)}
															style={{
																cursor: 'pointer',
																transition: 'background-color 0.3s ease',
															}}
															onMouseOver={(e) => {
																// Change the background color of the entire row
																e.currentTarget.style.backgroundColor = '#e0f7fa'; // Light blue
															}}
															onMouseOut={(e) => {
																// Reset the background color when mouse leaves
																e.currentTarget.style.backgroundColor = ''; // Reset to default
															}}
														>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.camera_id}
															</td>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.camera_name}
															</td>
															<td
																style={{
																	padding: '8px',
																	borderBottom: '1px solid #ddd',
																	fontSize: '14px',
																}}
															>
																{camera.location}
															</td>
														</tr>
													))}
												</tbody>
											</table>
										)}




										{/* Close modal button */}
										<button onClick={closeModal}  
										style={{
												backgroundColor: '#d32f2f',
												color: 'white',
												border: 'none',
												borderRadius: '5px',
												padding: '10px 20px',
												cursor: 'pointer',
												fontSize: '16px',
												transition: 'background-color 0.3s',
												marginTop: '10px',
										}}>Close </button>
										</Modal>
									)}





					
									{/* Hidden Video Element (Required for Capturing Frames) */}
									<video 
										ref={videoRef} 
										autoPlay 
										playsInline 
										style={{ display: 'none' }} // Keep it hidden but active 
									/>

									<canvas ref={canvasRef} width={1280} height={720} hidden />

									{/* Processed Video Display */}
									<div style={{ width: '80%' }}>
										<div style={{ textAlign: 'center' }}>
											<h3 style={{ display: 'inline-block', marginRight: '100px' }}>
												{cameraOn ? `Camera: ID ${cameraId}` : 'Camera: OFF'}
											</h3>
											<h3 style={{ display: 'inline-block' }}>
												{cameraOn ? `Location: ${cameraLocation}` : 'Location: N/A'}
											</h3>
										</div>

										{processedFrame ? (
											<img 
												src={processedFrame} 
												alt="Processed" 
												style={{ width: '100%', height: 'auto', borderRadius: '10px' }} 
											/>
										) : (
											<h1 className="welcome-message" style={{ 
													border: '2px solid #000', 
													padding: '10px',         
													borderRadius: '5px',     
													textAlign: 'center'    
											}}>
												Connect your camera to start detecting
											</h1>
										)}
									</div>
							</div>
					);
	
};

export default CameraStream;
