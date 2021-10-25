
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests

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
