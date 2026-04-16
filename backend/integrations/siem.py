import httpx
import os
import json
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

class SIEMExporter:
    def __init__(self):
        self.webhook_url = os.getenv("SIEM_WEBHOOK_URL")
        self.secret = os.getenv("SIEM_WEBHOOK_SECRET")
        self.enabled = bool(self.webhook_url)

    async def export(self, alert) -> bool:
        if not self.enabled:
            return False

        payload = {
            "event_id": alert.id,
            "timestamp": str(alert.timestamp),
            "severity": "HIGH" if alert.is_threat else "LOW",
            "type": "ZONE_VIOLATION" if alert.zone_violation else "THREAT_DETECTED",
            "detection": {
                "class": alert.class_name,
                "confidence": round(alert.confidence, 3),
                "bbox": alert.bbox
            },
            "camera_id": alert.camera_id,
            "frame_id": alert.frame_id
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.webhook_url,
                json=payload,
                headers={
                    "Content-Type": "application/json",
                    "X-Sentinel-Secret": self.secret
                },
                timeout=5.0
            )
            return response.status_code == 200