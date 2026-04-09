from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import String, Float, Boolean, DateTime, JSON, Integer
from datetime import datetime, timezone
import uuid
import os
from dotenv import load_dotenv

load_dotenv() 
DATABASE_URL = os.getenv("DATABASE_URL")

class Base(DeclarativeBase):
    pass

class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    class_name: Mapped[str] = mapped_column(String)
    confidence: Mapped[float] = mapped_column(Float)
    bbox: Mapped[dict] = mapped_column(JSON)
    is_threat: Mapped[bool] = mapped_column(Boolean)
    zone_violation: Mapped[bool] = mapped_column(Boolean)
    camera_id: Mapped[str] = mapped_column(String)
    frame_id: Mapped[int] = mapped_column(Integer)

engine = create_async_engine(DATABASE_URL, echo=False)

AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    