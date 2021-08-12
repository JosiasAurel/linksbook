from os import stat
from deta import Base
from index import db
from dbutils import get_date, gen_id
from pydantic import BaseModel
from datetime import datetime
import dateparser

parsedate = dateparser.parse


class Collection(BaseModel):
    title: str
    image: str
    date: str
    owner: str


def create_collection(owner: str, title: str, image: str = None) -> dict:

    state = {"status": False}  # default is false

    if image != None:
        new_collection = {
            "title": title,
            "image": image,
            "date": get_date(),
            "key": gen_id(),
            "owner": owner
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
            "owner": owner
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


def update_collection(owner: str, title: str = None, image: str = None) -> dict:
    if title and image != None:
        updated_collection = {
            "title": title,
            "image": image
        }
    elif title != None and image == None:
        updated_collection = {
            "title": title
        }
    elif title == None and image != None:
        updated_collection = {
            "image": image
        }
    else:
        return {"status": False}
