from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.db import Alert, AsyncSessionLocal
from typing import AsyncGenerator
from core.auth import verify_api_key
from core.limiter import limiter

router = APIRouter()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/api/alerts")
@limiter.limit("30/minute")
async def get_alerts(
    request: Request,
    db: AsyncSession = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    result = await db.execute(select(Alert))
    alerts = result.scalars().all()
    return alerts

@router.post("/api/alerts")
@limiter.limit("10/minute")
async def create_alert(
    request: Request,
    alert_data: dict,
    db: AsyncSession = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    alert = Alert(**alert_data)
    db.add(alert)
    await db.commit()
    return alert