
from lib.mail import send_mail_to, send_mail
from lib.genid import generate_id
from lib.pinmanager import create_pin, verify_and_revoke_pin
from lib.tokenmanager import save_token, verify_token, revoke_token, data_from_token
from models.user import get_user_by_email, create_user
import jwt
from fastapi import FastAPI, Request
from deta import Deta
from fastapi.middleware.cors import CORSMiddleware
from config import SECRET, PROJECT_KEY

deta = Deta(PROJECT_KEY)

usersdb = deta.Base("users")

app = FastAPI()

# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    # indirectly works as a check of user existence in db
    # if it finds no user with that email then he does not exist
    # and login pin is not sent
    user = usersdb.fetch({"email": email}).__next__()
    # print(user)
    if len(user) == 1:
        # ...generate unique pin and email [email]...
        # ...generate unique pin...
        new_pin = create_pin()
        if new_pin["status"] == "Success":
            pin = new_pin["pin"]
            message = f"Hey, here is your linksbook temporal login pin : {pin} "
            send_mail(email, "LinksBook Login", message)
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
    # has pin verification and revoke pass or fail ?
    pin_ = verify_and_revoke_pin(pin)

    if (pin_["status"] == "Success"):

        # fetch current user info
        user = get_user_by_email(email)
        #print(f"user : {user} ")

        # generate token using user info
        user_token = save_token(user["name"], user["email"])
        print(user_token)
        if user_token["status"] == "Success":
            return {"status": "Success", "token": user_token["token"]}
        else:
            {"status": "Failed", "type": "AuthenticationFail"}

    return {"status": "Failed", "type": "PinDoesNotExist"}


@app.post("/is-authenticated")
async def _check_is_auth(request: Request):
    req_body = await request.json()
    auth_token = req_body["token"]

    data = jwt.decode(auth_token, SECRET, algorithms=["HS256"])

    user = get_user_by_email(data.get("email"))

    print("is auth user")
    print(user)

    result = data_from_token(auth_token, user.get("plan"))

    return result


@app.post("/sign-out")
async def _sign_out_user(request: Request):
    auth_token = request.headers.get("Authorization").split(" ")[1]
    data = jwt.decode(auth_token, SECRET, algorithms=["HS256"])
    # get owner
    user = get_user_by_email(data.get("email"))
    revoke_token(user.get("key"))

    return {"status": "Done"}
