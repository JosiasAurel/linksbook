from .config import SECRET
from lib.mail import send_mail_to
from lib.genid import generate_id
from lib.pinmanager import create_pin, revoke_pin
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
