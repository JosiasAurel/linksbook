from .config import SECRET
from lib.mail import send_mail_to
from lib.genid import generate_id
from fastapi import FastAPI, Request
import jwt
from deta import Deta

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# create the different database tables
usersdb = deta.Base("users")
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
    user_id = generate_id()

    does_email_exist = usersdb.fetch({"email": body["email"]})

    if (len(does_email_exist) > 0):
        return {"status": "Failed", "type": "Email Exists"}
    else:
        try:
            usersdb.put(user, user_id)
            # ...generate unique pin for auth...
        except:
            return {"Status": "Failed", "type": "Create Account"}


@app.post("/login")
async def _login_user(request: Request):
    body = await request.json()
    # ...generate unique pin...
    # ...send auth token...
