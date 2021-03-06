from lib.genid import generate_id
from deta import Deta
import typing as T
import dotenv
import os

dotenv.load_dotenv()
PROJECT_KEY = os.getenv("DETA_BASE_KEY")
SECRET = os.getenv("SECRET")
deta = Deta(PROJECT_KEY)

usersdb = deta.Base("users")


def create_user(name: str, email: str) -> T.Dict[str, str]:

    user_id = generate_id()

    does_email_exist = usersdb.fetch({"email": email}).__next__()

    if (len(does_email_exist) > 0):
        return {"status": "Failed", "type": "Email Exists"}
    else:
        try:
            user = {"email": email, "name": name}
            usersdb.put(user, user_id)
            return {"status": "Success"}
        except:
            return {"Status": "Failed", "type": "Create Account"}


def update_user(name: str, email: str) -> T.Dict[str, str]:
    try:
        usersdb.update({"name": name}, email)
    except:
        return {"status": "Failed", "type": "UpdateUser"}


def get_user_by_email(email: str) -> any:
    try:
        users = usersdb.fetch({"email": email}).items
        users[0]["status"] = "Success"
        return users[0]
    except:
        return {"status": "Failed"}


def get_user_id_by_email(email: str) -> str:
    user = get_user_by_email(email)
    if user["status"] != "Failed":
        return user["key"]
    else:
        return None
