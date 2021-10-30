
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
from deta import Deta

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
async def _handle_upload_image(file: UploadFile = File(...)):
    filename = file.filename
    image_file = file.file
    result = drive.put(filename, image_file)
    return result
