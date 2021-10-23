
from fastapi import FastAPI, Request
from bs4 import BeautifulSoup
import requests

app = FastAPI()


@app.get("/")
def _root(req: Request) -> any:
    return {"msg": "Hello World"}


@app.get("/url/")
def _get_page_title(req: Request, url: str) -> any:
    page = requests.get(url).content
    soup = BeautifulSoup(page, "html.parser")
    title = soup.title.string
    return {"pageTitle": title}
