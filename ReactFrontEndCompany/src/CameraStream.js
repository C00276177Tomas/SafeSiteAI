import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const CameraStream = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [processedFrame, setProcessedFrame] = useState(null);
    const [stream, setStream] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);

		const navigate = useNavigate();

    useEffect(() => {
        // Listen for processed frames from server
        socket.on("frame_processed", (data) => {
            if (data.image) {
                setProcessedFrame(`data:image/jpeg;base64,${data.image}`);
            } else if (data.error) {
                console.error("Error:", data.error);
            }
        });

        return () => {
            socket.off("frame_processed");
        };
    }, []);

    const sendFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        socket.emit("send_frame", { image: imageData }); // Send frame to backend
    };

    useEffect(() => {
        if (cameraOn) {
            const interval = setInterval(sendFrame, 500); // Send frames every 100ms (~10 FPS)
            return () => clearInterval(interval);
        }
    }, [cameraOn]);

    const toggleCamera = async () => {
        if (cameraOn) {
            // Stop the video stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            setStream(null);
            setCameraOn(false);
        } else {
            // Start the video stream
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<button onClick={toggleCamera} className="control-button" style={{ marginRight: '10px' }}>
										{cameraOn ? "Turn Off Camera" : "Turn On Camera"}
								</button>
								<button onClick={openSettings} className="control-button">
										{"Settings"}
								</button>
						</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '80%' }}>
                {/* Original Video */}
                <div style={{ width: '48%' }}>
                    <h3 style={{ textAlign: 'center' }}>Live Video</h3>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', display: cameraOn ? 'block' : 'none' }} />
                    <canvas ref={canvasRef} width={400} height={300} hidden />
                </div>

                {/* Processed Video */}
                <div style={{ width: '48%' }}>
                    <h3 style={{ textAlign: 'center' }}>Processed Frame</h3>
                    {processedFrame && (
                        <img src={processedFrame} alt="Processed" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraStream;
