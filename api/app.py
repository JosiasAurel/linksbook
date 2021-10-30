
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
from deta import Deta
from secrets import token_urlsafe
from util import get_user_id_by_email, add_user_uploads
import jwt

app = FastAPI()

# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# create assets storage
drive = deta.Drive("Background Images")

# cocnnect to users
db = deta.Base("users")

# create or access JWT db
tokensdb = deta.Base("tokens")


@app.get("/")
def _root(req: Request) -> any:
    return {"msg": "Hello World"}


@app.get("/url/")
def _get_page_title(req: Request, url: str) -> any:
    page = requests.get(url).content
    soup = BeautifulSoup(page, "html.parser")
    title = soup.title.string

    if title.strip() == "":
        return url
    return {"pageTitle": title}


@app.post("/upload-image")
async def _handle_upload_image(req: Request, file: UploadFile = File(...)):
    req_headers = req.headers
    auth_token = req_headers["Authorization"].split(" ")[1]

    user_email = jwt.decode(auth_token, "SECRET", algorithms=[
                            "HS256"]).get("email")

    user = get_user_id_by_email(user_email)

    filename = token_urlsafe(10)  # file.filename - generate unique file name
    image_file = file.file
    try:
        drive.put(filename, image_file)
        result = add_user_uploads(user, filename)
        return result
    except:
        return "Failed"
