from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from core.detector import ThreatDetector
from streams.ingestion import RTSPStreamReader
from api.routes.alerts import router as alerts_router
from models.db import Alert, AsyncSessionLocal
import cv2
import base64
import json
import asyncio

app = FastAPI(title="SentinelVision")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

detector = ThreatDetector()

app.include_router(alerts_router)

@app.get("/health")
async def health():
    return {"status": "online", "model": "yolov8n"}

@app.websocket("/ws/stream")
async def stream_ws(websocket: WebSocket):
    await websocket.accept()

    reader = RTSPStreamReader(source=0, target_fps=10)
    if not reader.connect():
        await websocket.send_text(json.dumps({"error": "Stream unavailable"}))
        await websocket.close()
        return

    try:
        async with AsyncSessionLocal() as db:
            while True:
                ret, frame = reader.read_frame()
                if not ret:
                    break

                annotated, detections = detector.process_frame(frame)

                _, buffer = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 70])
                frame_b64 = base64.b64encode(buffer).decode("utf-8")

                threats = [d for d in detections if d.is_threat]

                for threat in threats:
                    alert = Alert(
                        class_name=threat.class_name,
                        confidence=threat.confidence,
                        bbox=list(threat.bbox),
                        is_threat=True,
                        zone_violation=False,
                        camera_id="cam_01",
                        frame_id=threat.frame_id
                    )
                    db.add(alert)
                await db.commit()

                payload = {
                    "frame": frame_b64,
                    "detections": len(detections),
                    "threats": [
                        {
                            "class": t.class_name,
                            "confidence": round(t.confidence, 3),
                            "bbox": t.bbox,
                            "frame_id": t.frame_id
                        } for t in threats
                    ]
                }

                await websocket.send_text(json.dumps(payload))
                await asyncio.sleep(1 / 10)

    except WebSocketDisconnect:
        pass
    finally:
        reader.release()