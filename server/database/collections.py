from deta import Base
from index import db
from dbutils import get_date
from pydantic import BaseModel
from datetime import datetime
import dateparser

parsedate = dateparser.parse


class Collection(BaseModel):
    title: str
    image: str
    date: str


def create_collection(title, image):
    return


print(get_date())
