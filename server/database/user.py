from index import deta
from dbutils import get_date, gen_id
from pydantic import BaseModel


class User(BaseModel):
    name: str
    email: str
    uid: str
    date: str


db = deta.Base("users")


def create_user(name, email, uid) -> dict:

    # structure the new user data
    new_user = {
        "name": name,
        "email": email,
        "key": uid
    }

    try:
        db.put(new_user)  # save new user to the database
        return {"status": False}
    except:
        return {"status": True}
