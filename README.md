<div align="center">

```
███████╗███████╗███╗   ██╗████████╗██╗███╗   ██╗███████╗██╗     
██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║██╔════╝██║     
███████╗█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║█████╗  ██║     
╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝  ██║     
███████║███████╗██║ ╚████║   ██║   ██║██║ ╚████║███████╗███████╗
╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
                    V I S I O N
```

**Real-time AI threat detection for enterprise physical security infrastructure**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-FF6B35?style=flat-square)](https://ultralytics.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

</div>

---

## Overview

Most enterprise camera systems run rule-based motion detection built in the 2000s. SentinelVision replaces that with a real-time AI inference pipeline that understands what it sees — weapons, unauthorized access, loitering, crowd anomalies, and violent behavior — and integrates directly into existing SOC tooling.

```
RTSP Stream ──► Frame Processor ──► YOLOv8 Inference ──► Threat Classifier
                                                                  │
                                                                  ▼
SOC / SIEM ◄── Webhook Export ◄── Alert Engine ◄── WebSocket Broadcast
```

Built for security operations teams at enterprises where a missed detection is not a UI bug — it's a liability.

---

## Features

### Detection Engine
- **Weapon detection** — firearms, bladed weapons via fine-tuned YOLOv8
- **Restricted zone enforcement** — polygon-based perimeter alerts on any camera feed
- **Loitering detection** — dwell-time threshold alerts per zone
- **Crowd anomaly detection** — density and behavioral pattern analysis
- **Violence/aggression detection** — multi-frame temporal classification
- **False positive suppression** — temporal context window prevents single-frame noise

### Infrastructure
- **RTSP stream ingestion** — compatible with all major IP camera manufacturers
- **Multi-camera fusion** — correlate events across feeds, track subjects across zones
- **Sub-100ms inference latency** — optimized for edge GPU deployment
- **Celery + Redis queue** — parallel processing per stream, horizontally scalable
- **WebSocket broadcast** — live annotated frames and structured alert payloads

### Enterprise Integration
- **SIEM export** — Splunk, Palo Alto XSOAR, and generic webhook support
- **Structured alert schema** — JSON events compatible with SOC runbooks
- **API key authentication** — per-tenant access control
- **Audit logging** — immutable event log for compliance

### Operations Dashboard
- **Live multi-feed grid** — annotated streams with bounding box overlays
- **Zone editor** — draw and configure restricted areas directly on camera views
- **Alert history** — searchable log with clip export
- **Analytics** — threat frequency, camera uptime, response time metrics (Recharts)

---

## Tech Stack

| Layer | Technology |
|---|---|
| CV inference | YOLOv8 (Ultralytics) — custom fine-tuned weights |
| Stream ingestion | OpenCV + FFmpeg |
| Backend API | FastAPI + Python 3.11 |
| Async ORM | SQLAlchemy async + Alembic |
| Database | PostgreSQL 16 |
| Task queue | Celery + Redis |
| Real-time transport | WebSockets |
| Frontend dashboard | Next.js 14 + TypeScript + Tailwind CSS |
| Charts | Recharts |
| Deployment | Docker Compose → Railway (backend) + Vercel (frontend) |

---

## Project Structure

```
sentinel-vision/
├── backend/
│   ├── main.py                      # FastAPI application entry
│   ├── core/
│   │   ├── config.py                # Environment configuration
│   │   └── detector.py              # YOLOv8 inference engine
│   ├── streams/
│   │   ├── ingestion.py             # RTSP stream reader
│   │   └── processor.py             # Frame processing pipeline
│   ├── api/
│   │   ├── routes/
│   │   │   ├── streams.py           # Stream CRUD endpoints
│   │   │   ├── alerts.py            # Alert query endpoints
│   │   │   └── zones.py             # Restricted zone management
│   │   └── websocket.py             # Live feed WebSocket handler
│   ├── models/
│   │   ├── schemas.py               # Pydantic request/response models
│   │   └── db.py                    # SQLAlchemy table definitions
│   ├── tasks/
│   │   └── inference.py             # Celery inference workers
│   ├── integrations/
│   │   └── siem.py                  # SIEM / webhook exporters
│   ├── alembic/                     # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   ├── components/
│   │   │   ├── FeedGrid.tsx         # Multi-camera live grid
│   │   │   ├── AlertFeed.tsx        # Real-time alert list
│   │   │   ├── ZoneEditor.tsx       # Canvas-based zone drawing
│   │   │   └── Analytics.tsx        # Recharts dashboard panels
│   │   ├── hooks/
│   │   │   ├── useStream.ts         # WebSocket feed hook
│   │   │   └── useAlerts.ts         # Alert subscription hook
│   │   └── lib/
│   │       ├── api.ts               # REST API client
│   │       └── types.ts             # TypeScript definitions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- Docker + Docker Compose
- Redis (or use the Docker Compose setup)
- PostgreSQL 16 (or use the Docker Compose setup)

### 1. Clone and configure

```bash
git clone https://github.com/DevAnnafi/sentinel-vision.git
cd sentinel-vision
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/sentinelvision
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
MODEL_PATH=yolov8n.pt          # swap with custom weights after fine-tuning
CONFIDENCE_THRESHOLD=0.5
```

### 2. Run with Docker Compose

```bash
docker-compose up --build
```

This starts:
- FastAPI backend at `http://localhost:8000`
- Next.js dashboard at `http://localhost:3000`
- PostgreSQL at `localhost:5432`
- Redis at `localhost:6379`
- Celery worker for stream processing

### 3. Run locally (development)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload --port 8000
```

**Celery worker (separate terminal):**
```bash
cd backend
celery -A tasks.inference worker --loglevel=info
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 4. Connect a camera stream

```bash
# Test with webcam
curl -X POST http://localhost:8000/api/streams \
  -H "Content-Type: application/json" \
  -d '{"name": "Main Entrance", "source": 0}'

# Or use an RTSP stream
curl -X POST http://localhost:8000/api/streams \
  -H "Content-Type: application/json" \
  -d '{"name": "Parking Lot", "source": "rtsp://admin:pass@192.168.1.100:554/stream1"}'
```

---

## API Reference

Full OpenAPI docs available at `http://localhost:8000/docs` after startup.

### Streams

```
POST   /api/streams              Register a new camera stream
GET    /api/streams              List all streams
DELETE /api/streams/{id}         Remove a stream
```

### Alerts

```
GET    /api/alerts               Query alert history (filterable by camera, type, time)
GET    /api/alerts/{id}          Get single alert with clip URL
POST   /api/alerts/{id}/resolve  Mark alert as reviewed
```

### Zones

```
POST   /api/zones                Create restricted zone (polygon coordinates)
GET    /api/zones                List zones by stream
PUT    /api/zones/{id}           Update zone geometry or settings
DELETE /api/zones/{id}           Remove zone
```

### WebSocket

```
WS     /ws/stream/{stream_id}    Live annotated frames + alert events
```

**Frame payload:**
```json
{
  "frame": "<base64 JPEG>",
  "detections": 3,
  "threats": [
    {
      "class": "person",
      "confidence": 0.91,
      "bbox": [142, 88, 310, 420],
      "zone_violation": true,
      "zone_id": "restricted-server-room",
      "frame_id": 14823
    }
  ],
  "timestamp": "2025-01-15T14:32:07.412Z"
}
```

---

## Fine-Tuning the Detection Model

The default `yolov8n.pt` weights detect general COCO classes. For weapon detection, fine-tune on a security-specific dataset.

### 1. Prepare dataset (Roboflow)

1. Create a free account at [roboflow.com](https://roboflow.com)
2. Import a weapons detection dataset (search "weapons detection" in Roboflow Universe)
3. Export in YOLOv8 format

### 2. Train

```bash
pip install ultralytics roboflow

python - <<'EOF'
from roboflow import Roboflow
from ultralytics import YOLO

# Download dataset
rf = Roboflow(api_key="YOUR_API_KEY")
project = rf.workspace().project("weapons-detection")
dataset = project.version(1).download("yolov8")

# Fine-tune
model = YOLO("yolov8n.pt")
model.train(
    data=f"{dataset.location}/data.yaml",
    epochs=50,
    imgsz=640,
    batch=16,
    project="sentinel-vision",
    name="weapons-v1"
)
EOF
```

> Recommend running on Google Colab with a T4 GPU — free tier is sufficient for initial training.

### 3. Deploy custom weights

```bash
cp sentinel-vision/weapons-v1/weights/best.pt backend/weights/sentinel-v1.pt
```

Update `.env`:
```env
MODEL_PATH=weights/sentinel-v1.pt
```

---

## SIEM Integration

SentinelVision exports structured alert events to your SOC stack.

### Splunk

```env
SIEM_PROVIDER=splunk
SPLUNK_HEC_URL=https://your-splunk.com:8088/services/collector
SPLUNK_TOKEN=your-hec-token
```

### Generic Webhook (Palo Alto XSOAR, PagerDuty, Slack, etc.)

```env
SIEM_PROVIDER=webhook
WEBHOOK_URL=https://your-endpoint.com/alerts
WEBHOOK_SECRET=your-signing-secret
```

**Alert event schema:**
```json
{
  "event_id": "evt_01HXYZ...",
  "timestamp": "2025-01-15T14:32:07.412Z",
  "severity": "HIGH",
  "type": "ZONE_VIOLATION",
  "camera": {
    "id": "cam_03",
    "name": "Server Room Entrance",
    "location": "Floor 3 East"
  },
  "detection": {
    "class": "person",
    "confidence": 0.91,
    "bbox": [142, 88, 310, 420]
  },
  "zone": "restricted-server-room",
  "clip_url": "https://your-deployment.com/clips/evt_01HXYZ.mp4",
  "frame_url": "https://your-deployment.com/frames/evt_01HXYZ.jpg"
}
```

---

## Deployment

### Railway (Backend + Database)

```bash
# Install Railway CLI
npm install -g @railway/cli

railway login
railway init
railway add postgresql
railway add redis
railway up
```

### Vercel (Frontend)

```bash
cd frontend
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WS_URL` in Vercel environment variables pointing to your Railway backend URL.

### Edge GPU Deployment

For sub-50ms inference on high-resolution streams, deploy the inference worker on a GPU-enabled instance:

```bash
# NVIDIA Jetson or cloud GPU instance
docker-compose -f docker-compose.prod.yml up --build
```

The production Compose file configures the Celery worker with `--gpus all` and sets `TORCH_DEVICE=cuda`.

---

## Roadmap

- [x] Single-camera RTSP ingestion + YOLOv8 inference
- [x] Restricted zone enforcement
- [x] PostgreSQL alert persistence
- [x] Multi-camera Celery queue
- [x] WebSocket live broadcast
- [ ] Custom weapon detection fine-tuning
- [ ] False positive suppression (temporal window)
- [ ] Next.js operations dashboard
- [ ] Zone editor UI
- [ ] SIEM webhook export
- [ ] API key authentication
- [ ] Edge GPU deployment config
- [ ] Demo video + landing page

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss the approach.

```bash
git checkout -b feature/your-feature
# make changes
git commit -m "feat: your feature description"
git push origin feature/your-feature
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [Annafi](https://github.com/DevAnnafi) &nbsp;·&nbsp; Powered by YOLOv8 + FastAPI + Next.js

*Enterprise physical security shouldn't rely on 20-year-old motion detection.*

</div>