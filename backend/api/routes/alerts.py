from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.db import Alert, AsyncSessionLocal
from typing import AsyncGenerator

router = APIRouter()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/api/alerts")
async def get_alerts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Alert))
    alerts = result.scalars().all()
    return alerts

@router.post("/api/alerts")
async def create_alert(alert_data: dict, db: AsyncSession = Depends(get_db)):
    alert = Alert(**alert_data)
    db.add(alert)
    await db.commit()
    return alert