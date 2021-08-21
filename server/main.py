from database.user import create_user
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
