from ultralytics import YOLO
import cv2

# Load the YOLOv11 model
model = YOLO("bestV17.pt")

# Define specific colors for each class
class_colors = {
    "person": (255, 0, 0),  # Blue
    "helmet": (0, 255, 0),  # Green
    "noHelmet": (0, 0, 255),  # Red
    "vest": (0, 255, 255)  # Yellow
}

# Open the video source
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Cannot open video source.")
    exit()

# Loop through video frames
while True:
    ret, frame = cap.read()
    if not ret:
        print("End of video or cannot read frame.")
        break

    # Run YOLOv11 detection on the frame
    results = model(frame)
    detections = results[0].boxes.data  # Get bounding box data

    for detection in detections:
        x1, y1, x2, y2, confidence, cls = detection  # Extract bounding box coordinates and other info
        confidence = float(confidence)  # Ensure confidence is a float
        if confidence > 0.7:  # Filter based on confidence
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)  # Convert coordinates to integers
            class_id = int(cls)  # Get class ID
            class_name = model.names[class_id]  # Get class name from model's class names

            # Get the color for the class, default to white if class is not mapped
            color = class_colors.get(class_name, (255, 255, 255))

            # Draw the bounding box with the specified color
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

            # Put the label text
            label = f"{class_name} {confidence:.2f}"
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # Resize the frame to desired dimensions
    resized_frame = cv2.resize(frame, (800, 400))  # Width=800, Height=600

    # Display the resized frame
    cv2.imshow("YOLOv11 Detection", resized_frame)

    # Press 'q' to exit the video display loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close display window
cap.release()
cv2.destroyAllWindows()
