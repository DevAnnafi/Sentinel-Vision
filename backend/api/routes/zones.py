from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.db import Zone, AsyncSessionLocal
from typing import AsyncGenerator
from core.auth import verify_api_key

router = APIRouter()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/api/zones")
async def get_zones(
    db: AsyncSession = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    result = await db.execute(select(Zone))
    zones = result.scalars().all()
    return zones

@router.post("/api/zones")
async def create_zone(
    zone_data: dict,
    db: AsyncSession = Depends(get_db),
    api_key: str = Depends(verify_api_key)
):
    zone_data.pop("id", None)
    zone = Zone(**zone_data)
    db.add(zone)
    await db.commit()
    return zone