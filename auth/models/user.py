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
