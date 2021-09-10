from deta import Deta
import jwt
import datetime
import typing as T

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# create or access JWT db
tokensdb = deta.Base("tokens")


def set_token_expiry_date_to(days: int) -> datetime:
    current_date = datetime.datetime.utcnow()
    add_days = datetime.timedelta(days=days)
    new_date = current_date + add_days

    return new_date


def create_token(name, email) -> str:
    expiry_date = set_token_expiry_date_to(29)
    issue_time = datetime.datetime.utcnow()
    auth_token = jwt.encode(
        {"name": name, "email": email, "exp": expiry_date, "iat": issue_time, "iss": "LinksBook"}, "SECRET")
    return auth_token


def save_token(name: str, email: str) -> T.Dict[str, str]:
    new_token = create_token(name, email)
    try:
        tokensdb.put(new_token, new_token)
        return {"status": "Success", "token": new_token}
    except:
        return {"status": "Failed"}


def verify_token(token: str) -> str:

    try:
        jwt.decode(token, "SECRET")

        # check if token is in database
        token_in_db = tokensdb.get(token)  # will return none if not found
        if token_in_db != None:
            return "Valid"
    except jwt.ExpiredSignatureError:
        return "Invalid"


""" res = create_token("Josias", "josias@josiasw.dev")
print(res)
print(verify_token(res))
 """