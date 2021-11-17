
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests
from deta import Deta
import dotenv
import os
from pprint import pprint

dotenv.load_dotenv()

app = FastAPI()

# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


PROJECT_KEY = os.getenv("PROJECT_KEY")
GUMROAD_ACCESS_TOKEN = os.getenv("GUMROAD_APP_ACCESS_TOKEN")
PRODUCT_ID = "Kds2wyoDsnw-Om0FZqyvEg=="
deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# connect to users
users = deta.Base("users")


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


@app.get("/purchase")
def _save_new_purchase():
    prods = requests.get(
        f"https://api.gumroad.com/v2/products?access_token={GUMROAD_ACCESS_TOKEN}")
    req = requests.get(
        f"https://api.gumroad.com/v2/sales?access_token={GUMROAD_ACCESS_TOKEN}&product_id={PRODUCT_ID}")
    data = req.json()
    # pprint(data)
    if len(data["sales"]) > 0:
        user_email = data["sales"][0]["email"]
        user = users.fetch({"email": user_email}).__next__()
        user_id = user[0]["key"]

        # set user plan to pro
        try:
            users.update({
                "plan": "PRO",
                "purchase date": data["sales"][0]["daystamp"]
            }, user_id)

            return {"status": "Passed"}
        except:
            return {"status": "Failed"}
    else:
        return {"status": "NoSales"}
