from deta import Deta
import secrets
from .genid import generate_id
import typing as T

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

pinsdb = deta.Base("pins")


def generate_pin() -> str:
    return secrets.token_hex(5)


def create_pin() -> T.Dict[str, str]:
    new_pin = generate_pin()
    try:
        pinsdb.put({"pin": new_pin}, new_pin)
        return {"status": "Success", "pin": new_pin}
    except:
        return {"status": "Failed", "type": "CreatePin"}


def revoke_pin(pin: str) -> T.Dict[str, str]:
    # revoke the pin straight away
    try:
        pinsdb.delete(pin)
        return {"status": "Success", "type": "RevokePin"}
    except:
        return {"status": "Failed", "type": "RevokePin"}
