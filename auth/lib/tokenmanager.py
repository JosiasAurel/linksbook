from deta import Deta
import jwt

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# create or access JWT db
tokensdb = deta.Base("tokens")


def create_token(name, email) -> str:
    auth_token = jwt.encode({"name": name, "email": email}, "SECRET")
    return ""


def days(num_days: int) -> int:
    min = 60*60
    hour = 60*min
    day = hour * 24
    return num_days * day


print(days(30))
