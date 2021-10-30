import jwt
from deta import Deta

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")


# create or access JWT db
tokensdb = deta.Base("tokens")

usersdb = deta.Base("users")


def verify_token(token: str, owner: str) -> str:
    try:
        data = jwt.decode(token, "SECRET", algorithms=["HS256"])

        # check if token is in database
        token_in_db = tokensdb.get(owner)  # will return none if not found
        if token_in_db != None:
            return "Valid"

        return "Invalid"
    except jwt.ExpiredSignatureError:
        return "Invalid"


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


def add_user_uploads(user: str, filename: str):

    try:
        usersdb.update({
            "uploads": usersdb.util.append(filename),
            "upload_count": usersdb.util.increment(1)
        }, user)

        return "Success"
    except:
        return "Failed"
