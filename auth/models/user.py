from deta import Deta
import typing as T

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

usersdb = deta.Base("users")


def create_user(name: str, email: str) -> T.Dict[str, str]:
    try:
        usersdb.put({"name": name, "email": email}, key=email)
        return {"status": "Success"}
    except:
        return {"status": "Failed", "type": "CreateUser"}


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
        return user["userId"]
    else:
        return None
