from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from model.model import *

router = APIRouter()
"""
@router.post("/device", response_description="Create a new device", status_code=status.HTTP_201_CREATED, response_model=Device)
def create_device(request: Request, device: Device = Body(...)):
    device = jsonable_encoder(device)
    new_device = request.app.database["devices"].insert_one(device)
    created_device = request.app.database["devices"].find_one(
        {"_id": new_device.inserted_id}
    )

    return created_device

@router.get("/device/{id}", response_description="Get a single device", response_model=DeviceWithoutPassword)
def show_device(id: str, request: Request):
    if (device := request.app.database["devices"].find_one({"_id": id})) is not None:
        return device

    raise HTTPException(status_code=404, detail=f"Device {id} not found")

#List all devices
@router.get("/device", response_description="List all devices", response_model=List[DeviceWithoutPassword])
def list_device(request: Request):
    return list(request.app.database["devices"].find())

#Create user
@router.post("/user", response_description="Create a new user", status_code=status.HTTP_201_CREATED, response_model=User)
def create_user(request: Request, user: User = Body(...)):
    user = jsonable_encoder(user)
    new_user = request.app.database["users"].insert_one(user)
    created_user = request.app.database["users"].find_one(
        {"_id": new_user.inserted_id}
    )

    return created_user

#Login user
@router.post("/user/login", response_description="Login user", status_code=status.HTTP_201_CREATED, response_model=User)
def login_user(request: Request, user: User = Body(...)):
    user = jsonable_encoder(user)
    if (user := request.app.database["users"].find_one({"name": user["name"], "password": user["password"]})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"User not found")

#Pair Device
@router.post("/user/device", response_description="Pair user and device", status_code=status.HTTP_201_CREATED, response_model=UserDevicePair)
def pair_user_device(request: Request, user_device_pair: UserDevicePair = Body(...)):
    #check if user and device exist
    user_device_pair = jsonable_encoder(user_device_pair)
    if (user := request.app.database["users"].find_one({"_id": user_device_pair["user_id"]})) is None:
        raise HTTPException(status_code=404, detail=f"User not found")
    if (device := request.app.database["devices"].find_one({"_id": user_device_pair["device_id"]})) is None:
        raise HTTPException(status_code=404, detail=f"Device not found")

    #check if user and device are already paired
    if (user_device_pair := request.app.database["user_device_pairs"].find_one({"user_id": user_device_pair["user_id"], "device_id": user_device_pair["device_id"]})) is not None:
        raise HTTPException(status_code=404, detail=f"User and device already paired")

    #pair user and device
    new_user_device_pair = request.app.database["user_device_pairs"].insert_one(user_device_pair)
    created_user_device_pair = request.app.database["user_device_pairs"].find_one(
        {"_id": new_user_device_pair.inserted_id}
    )

    return created_user_device_pair
"""

@router.post("/record", response_description="Create a new record", status_code=status.HTTP_201_CREATED, response_model=Record)
def create_record(request: Request, record: Record = Body(...)):
    record = jsonable_encoder(record)
    new_record = request.app.database["records"].insert_one(record)
    created_record = request.app.database["records"].find_one(
        {"_id": new_record.inserted_id}
    )

    return created_record

@router.get("/record/{id}", response_description="Get a single record", response_model=Record)
def show_record(id: str, request: Request):
    if (record := request.app.database["records"].find_one({"_id": id})) is not None:
        return record

    raise HTTPException(status_code=404, detail=f"Record {id} not found")

#List all records
@router.get("/record", response_description="List all records", response_model=List[Record])
def list_record(request: Request):
    return list(request.app.database["records"].find())

#Delete a record
@router.delete("/record/{id}", response_description="Delete a single record")
def delete_record(id: str, request: Request):
    delete_result = request.app.database["records"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Record {id} not found")