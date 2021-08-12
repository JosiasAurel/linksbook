from index import deta
from dbutils import get_date, gen_id
from pydantic import BaseModel
from datetime import datetime
import dateparser

parsedate = dateparser.parse

db = deta.Base("collections")


class Collection(BaseModel):
    title: str
    image: str
    date: str
    description: str
    owner: str


def create_collection(owner: str, title: str, description: str, image: str = None) -> dict:

    state = {"status": False}  # default is false

    if image != None:
        new_collection = {
            "title": title,
            "image": image,
            "date": get_date(),
            "key": gen_id(),
            "owner": owner,
            "description": description
        }

        # save new collection to the database
        db.put(new_collection)
        state["status"] = True
    else:
        new_collection = {
            "title": title,
            "image": image,  # replace with an image link,
            "date": get_date(),
            "key": gen_id(),
            "owner": owner,
            "description": description
        }

        # save new collection to the database
        db.put(new_collection)
        state["status"] = True

    return state


def delete_collection(collectionid: str) -> dict:
    try:
        db.delete(collectionid)
        return {"status": True}
    except:
        return {"status": False}


def update_collection(owner: str, title: str = None, image: str = None, description: str = None) -> dict:
    updated_collection = {
        "title": title,
        "image": image,
        "description": description
    }
    return {"status": False}


def fetch_all(owner: str) -> list:
    collections__ = db.fetch({"owner": owner})
    return collections__
