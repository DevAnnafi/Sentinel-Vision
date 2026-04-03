from ultralytics import YOLO
import cv2
import numpy as np
from dataclasses import dataclass

@dataclass
class Detection:
    class_name: str
    confidence: float
    bbox: tuple[int, int, int, int]
    is_threat: bool
    frame_id: int

ALERT_CLASSES = {"person"}

class ThreatDetector:
    def __init__(self, model_path="yolov8n.pt", conf_threshold=0.5):
        self.model = YOLO(model_path)
        self.conf_threshold = conf_threshold
        self.frame_id = 0

    def process_frame(self, frame: np.ndarray) -> tuple[np.ndarray, list[Detection]]:
        self.frame_id += 1
        if frame is None:
            return None, []
        results = self.model(frame, conf=self.conf_threshold, verbose=False)[0]
        detections = []
        annotated = frame.copy()
        for box in results.boxes:
            cls_id = int(box.cls[0])
            cls_name = self.model.names[cls_id]
            conf = float(box.conf[0])
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            is_threat = cls_name in ALERT_CLASSES
            det = Detection(
                class_name=cls_name,
                confidence=conf,
                bbox=(x1, y1, x2, y2),
                is_threat=is_threat,
                frame_id=self.frame_id
            )
            detections.append(det)
            color = (0, 0, 255) if is_threat else (0, 255, 0)
            cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
            cv2.putText(annotated, f"{cls_name} {conf:.2f}",
                        (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            
        return annotated, detections



