import collections
from database.user import create_user
from database.collections import create_collection
from fastapi import FastAPI, Request
from deta import Deta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def _handle_index(request: Request):
    return {"message": "Working..."}


@app.post("/save-user")
async def _save_user(request: Request):
    user_data = await request.json()
    status = create_user(
        user_data["name"], user_data["email"], user_data["uid"])
    return status


@app.post("/create-collection")
async def _create_collection(request: Request):
    collection_data = await request.json()  # extract collection props
    new_collection = create_collection(
        collection_data["owner"], collection_data["title"], collection_data["description"])
    return new_collection
