from deta import Deta
import jwt
import datetime

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


print(days(30))
