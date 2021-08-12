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


def create_collection(title, image: str = None) -> dict:

    state = {"status": False}  # default is false

    if image is not None:
        new_collection = {
            "title": title,
            "image": image,
            "date": get_date(),
            "key": gen_id()
        }

        # save new collection to the database
        db.put(new_collection)
        state["status"] = True
    else:
        new_collection = {
            "title": title,
            "image": image,  # replace with an image link,
            "date": get_date(),
            "key": gen_id()
        }

        # save new collection to the database
        db.put(new_collection)
        state["status"] = True

    return state


def delete_collection(collectionid: str) -> dict:
    state = {"status": False}  # default is false
    try:
        db.delete(collectionid)
        state["status"] = True
    except:
        state["status"] = False  # even though already false it is better

    return state
