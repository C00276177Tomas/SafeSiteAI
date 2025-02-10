import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const CameraStream = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [processedFrame, setProcessedFrame] = useState(null);

    useEffect(() => {
        // Start video stream
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(err => console.error("Error accessing camera:", err));

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
        const interval = setInterval(sendFrame, 100); // Send frames every 100ms (~10 FPS)
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Original Video */}
            <div style={{ width: '48%' }}>
                <h3 style={{ textAlign: 'center' }}>Live Video</h3>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
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
    );
};

export default CameraStream;