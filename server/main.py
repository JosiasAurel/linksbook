
from database.user import create_user
from database.collections import create_collection, delete_collection, fetch_all_collections, delete_collection
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


@app.post("/collection")
async def _get_all_collection(request: Request):
    collections_owner = await request.json()["owner"]

    # collecitions owned by user u
    u_collections = fetch_all_collections(collections_owner)
    return u_collections


@app.post("/collections/create")
async def _create_collection(request: Request):
    collection_data = await request.json()  # extract collection props
    new_collection = create_collection(
        collection_data["owner"], collection_data["title"], collection_data["description"])
    return new_collection


@app.post("/collections/delete")
async def _delete_collection(request: Request):
    collection_id = await request.json()["collectionId"]  # get collection ID

    deleted_collection = delete_collection(collection_id)

    return deleted_collection
