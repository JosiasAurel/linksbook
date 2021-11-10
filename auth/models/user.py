from lib.genid import generate_id
from deta import Deta
import typing as T

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

usersdb = deta.Base("users")


def create_user(name: str, email: str) -> T.Dict[str, str]:

    user_id = generate_id()

    does_email_exist = usersdb.fetch({"email": email}).__next__()

    if (len(does_email_exist) > 0):
        return {"status": "Failed", "type": "Email Exists"}
    else:
        try:
            user = {"email": email, "name": name,
                    "themeType": "COLOR", "theme": "#fff", "blur": False}
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
        users = usersdb.fetch({"email": email}).__next__()
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


def set_user_theme(email: str, themeType: str, theme: str, blur: bool):
    user_id = get_user_id_by_email(email)

    try:
        usersdb.update({
            "themeType": themeType,
            "theme": theme,
            "blur": blur
        }, user_id)
        return "Success"
    except:
        return "Failed"
