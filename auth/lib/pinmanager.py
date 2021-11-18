from deta import Deta
import secrets
import typing as T
from .genid import generate_id

import dotenv
import os

dotenv.load_dotenv()
PROJECT_KEY = os.getenv("DETA_BASE_KEY")

deta = Deta(PROJECT_KEY)

pinsdb = deta.Base("pins")


def generate_pin() -> str:
    return secrets.token_hex(3)


def create_pin() -> T.Dict[str, str]:
    new_pin = generate_pin()
    try:
        pinsdb.put({"pin": new_pin}, new_pin)
        return {"status": "Success", "pin": new_pin}
    except:
        return {"status": "Failed", "type": "CreatePin"}


def verify_and_revoke_pin(pin: str) -> T.Dict[str, str]:
    # check id the pin exists
    does_pin_exist = pinsdb.fetch({"pin": pin}).__next__()

    # print(does_pin_exist)

    if len(does_pin_exist) == 1:
        # if pin exist, revoke
        pinsdb.delete(pin)
        return {"status": "Success", "type": "RevokePin"}

    return {"status": "Failed", "type": "RevokePin"}
