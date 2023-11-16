from dotenv import load_dotenv
load_dotenv()
from fastapi import APIRouter, Body, Request, Response, HTTPException, status, FastAPI
from fastapi.encoders import jsonable_encoder
from typing import List
from model.model import *
import os
from fastapi.middleware.cors import CORSMiddleware
from routes import router as record_router
from pymongo import MongoClient
from model.model import DefaultInitialHeight
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mongodb_client : MongoClient = MongoClient(os.getenv("MONGO_URL"))
app.database = app.mongodb_client[os.getenv("MONGO_DB_NAME")]
if app.database["default_initial_height"].count_documents({}) == 0:
        app.database["default_initial_height"].insert_one({"default_initial_height": 40.0})
else:
    app.default_initial_height = app.database["default_initial_height"].find_one({})["default_initial_height"]
    
#app.include_router(record_router, tags=["Record"])

@app.on_event("startup")
async def startup():
    app.mongodb_client : MongoClient = MongoClient(os.getenv("MONGO_URL"))
    app.database = app.mongodb_client[os.getenv("MONGO_DB_NAME")]
    #check if there is a record in app.database["default_initial_height"]
    #if not, create one with default value 40.0
    if app.database["default_initial_height"].count_documents({}) == 0:
        app.database["default_initial_height"].insert_one({"default_initial_height": 40.0})
    else:
        app.default_initial_height = app.database["default_initial_height"].find_one({})["default_initial_height"]

@app.on_event("shutdown")
async def shutdown():
    app.mongodb_client.close()


@app.post("/record", response_description="Create a new record", status_code=status.HTTP_201_CREATED, response_model=Record)
def create_record(request: Request, record: Record = Body(...)):
    record = jsonable_encoder(record)
    if record["initial_height"] is None:
        if request.app.default_initial_height is None:
            with open("DEFAULT_INTIAL_HEIGHT.txt", "r") as f:
                request.app.default_initial_height = float(f.read())
        record["initial_height"] = request.app.default_initial_height
    record["final_height"] = 54-record["final_height"]
    print(record)
    new_record = request.app.database["records"].insert_one(record)
    created_record = request.app.database["records"].find_one(
        {"_id": new_record.inserted_id}
    )

    return created_record

@app.post("/record_raw", response_description="Create a new record", status_code=status.HTTP_201_CREATED, response_model=Record)
def create_record_raw(request: Request, record: Record = Body(...)):
    record = jsonable_encoder(record)
    if type(record["initial_height"]) is None:
        if request.app.default_initial_height is None:
            request.app.database["default_initial_height"].insert_one({"default_initial_height": 40.0})
        record["initial_height"] = request.app.database["default_initial_height"].find_one({})["default_initial_height"]
    print(record)
    new_record = request.app.database["records"].insert_one(record)
    created_record = request.app.database["records"].find_one(
        {"_id": new_record.inserted_id}
    )

    return created_record

@app.get("/record/{id}", response_description="Get a single record", response_model=Record)
def show_record(id: str, request: Request):
    if (record := request.app.database["records"].find_one({"_id": id})) is not None:
        return record

    raise HTTPException(status_code=404, detail=f"Record {id} not found")

#List all records
@app.get("/record", response_description="List all records", response_model=List[Record])
def list_record(request: Request):
    return list(request.app.database["records"].find())

#Delete a record
@app.delete("/record/{id}", response_description="Delete a single record")
def delete_record(id: str, request: Request):
    delete_result = request.app.database["records"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Record {id} not found")


#Set default initial height
@app.post("/initial_height", response_description="Set default initial height", status_code=status.HTTP_201_CREATED)
def set_initial_height(request:Request,initial_height:float):
    # Delete all previous default initial height documents
    request.app.database["default_initial_height"].delete_many({})
    # Insert new default initial height document
    request.app.database["default_initial_height"].insert_one({"default_initial_height": initial_height})
    request.app.default_initial_height = initial_height
    return {
        "message": "Default initial height set as " + str(initial_height)
    }

@app.get("/initial_height", response_description="Get default initial height", status_code=status.HTTP_200_OK)
def get_initial_height(request:Request):
    return {
        "default_initial_height": request.app.default_initial_height
    }

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))

