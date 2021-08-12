from index import deta
from dbutils import get_date, gen_id
from pydantic import BaseModel
import dateparser

parsedate = dateparser.parse

db = deta.Base("links")


class Link(BaseModel):
    title: str
    link: str
    date: str
    owner: str


def create_link(collection: str, title: str, link: str) -> dict:

    try:
        new_link = {
            "title": title,
            "link": link,
            "collection": collection,
            "key": gen_id(),
            "date": get_date()
        }

        # save new collection to the database
        db.put(new_link)
        return {"status": True}
    except:
        return {"status": False}


def delete_link(linkId: str) -> dict:
    try:
        db.delete(linkId)
        return {"status": True}
    except:
        return {"status": False}


def update_link(linkId: str, title: str, link: str) -> dict:
    try:
        updated_link = {
            "title": title,
            "link": link
        }
        db.update(updated_link, linkId)
        return {"status": True}
    except:
        return {"status": False}


def fetch_all_links(collection: str) -> list:
    linsk__ = db.fetch({"collection": collection})
    return linsk__
