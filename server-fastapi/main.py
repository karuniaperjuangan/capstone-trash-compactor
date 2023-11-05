from dotenv import load_dotenv
load_dotenv()

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as record_router
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(record_router, tags=["Record"])

@app.on_event("startup")
async def startup():
    app.mongodb_client : MongoClient = MongoClient(os.getenv("MONGO_URL"))
    app.database = app.mongodb_client[os.getenv("MONGO_DB_NAME")]

@app.on_event("shutdown")
async def shutdown():
    app.mongodb_client.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, port=int(os.getenv("PORT", 8000)))

