from .config import SECRET
from lib.mail import send_mail_to
from lib.genid import generate_id
from lib.pinmanager import create_pin, verify_and_revoke_pin
from lib.tokenmanager import save_token, verify_token
from models.user import get_user_by_email, create_user
from fastapi import FastAPI, Request
from deta import Deta

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

usersdb = deta.Base("users")

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

    # create new user
    new_user = create_user(body["name"], body["email"])

    return new_user  # op status


@app.post("/create-login")
async def _login_user(request: Request):
    body = await request.json()
    # get user's email
    email = body["email"]  # get the user email
    user = usersdb.fetch({"email": email}).items
    if len(user) == 1:
        # ...generate unique pin and email [email]...
        # ...generate unique pin...
        new_pin = create_pin()
        if new_pin["status"] == "Success":
            pin = new_pin["pin"]
            message = f"Hey, here is your linksbook temporal login pin : {pin} "
            send_mail_to(email, "LinksBook Login", message)
            return {"status": "Success"}
        else:
            return {"status": "Failed", "type": "CreatePinError"}

    else:
        return {"status": "Failed", "type": "UserDoesNotExist"}


@app.post("/complete-login")
async def _complete_user_login(request: Request):
    # get the temporal pin
    body = await request.json()
    pin = body["pin"]
    email = body["email"]
    # revoke pin
    verify_and_revoke_pin(pin)

    # fetch current user info
    user = get_user_by_email(email)

    # generate token using user info
    user_token = save_token(user["name"], user["email"])

    if user_token["status"] == "Success":
        return {"status": "Success", "token": user_token["token"]}
    else:
        {"status": "Failed"}


@app.post("/is-authenticated")
async def _check_is_auth(request: Request):
    auth_token = await request.json()["token"]
    return verify_token(auth_token)