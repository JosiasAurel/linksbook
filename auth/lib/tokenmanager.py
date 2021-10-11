from deta import Deta
import jwt
import datetime
import typing as T
import os

deta = Deta(os.getenv("DETA_BASE_KEY"))

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


def save_token(name: str, email: str, owner: str) -> T.Dict[str, str]:
    new_token = create_token(name, email)
    try:
        tokensdb.put(f" {new_token} ", key=owner)
        return {"status": "Success", "token": new_token}
    except:
        return {"status": "Failed"}


def verify_token(token: str, owner: str) -> str:
    try:
        data = jwt.decode(token, "SECRET")
    
        
        # check if token is in database
        token_in_db = tokensdb.get(owner)  # will return none if not found
        if token_in_db != None:
            return "Valid"

        return "Invalid"
    except jwt.ExpiredSignatureError:
        return "Invalid"

def name_from_token(token: str, owner: str) -> any:
    verification = verify_token(token, owner)
    if verification == "Valid":
        data = jwt.decode(token, "SECRET")
        # print(f" NAME FROM TOKEN {data}")
        return {"status": "Success", "userName": data.get("name")}
    
    return {"status": "Failed"}

def revoke_token(owner: str) -> bool:
    tokensdb.delete(owner)  # remove token with ID of owner
    return True


""" res = create_token("Josias", "josias@josiasw.dev")
print(res)
print(verify_token(res))
 """
