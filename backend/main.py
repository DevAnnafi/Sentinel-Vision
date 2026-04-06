from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from core.detector import ThreatDetector
from streams.ingestion import RTSPStreamReader
import base64
import json
import asyncio

app = FastAPI(title="SentinelVision")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    )   

detector = ThreatDetector()
