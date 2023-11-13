from dotenv import load_dotenv
load_dotenv()

import os
from fastapi import FastAPI
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

@app.get("/")
async def root():
    return {"message": "Hello World"}

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))

