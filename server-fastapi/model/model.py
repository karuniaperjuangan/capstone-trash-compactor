from datetime import datetime
import uuid
from typing import Optional
from pydantic import BaseModel, Field
"""
class Device(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    password: str = Field(...)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class DeviceWithoutPassword(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class User(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    password: str = Field(...)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

class UserDevicePair(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    user_id: str = Field(...)
    device_id: str = Field(...)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
"""

class Record(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)    
    #device_id: str = Field(...)
    initial_height: float = Field(...)
    final_height: float = Field(...)


