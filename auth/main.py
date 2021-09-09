from .config import SECRET
from lib.mail import send_mail_to
from fastapi import FastAPI, Request
import jwt
from deta import Deta

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# create the different database tables
usersdb = deta.Base("users")
pinsdb = deta.Base("pins")
tokensdb = deta.Base("tokens")

# custom library


app = FastAPI()


@app.get("/")
def _root(request: Request) -> str:
    return "Hello World from Service Root"


@app.get("/email")
def _send_mail():
    send_mail_to("ndjosiasaurel@gmail.com", "Testing", "Hello World")
    return {"Status": "Done"}


@app.post("/register")
async def _register_user(request: Request):
    body = await request.json()
    user = {"email": body["email"], "name": body["name"]}
