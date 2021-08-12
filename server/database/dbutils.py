from datetime import datetime
import secrets


def get_date() -> str:
    date = str(datetime.utcnow()).split(" ")[0]
    return date


def gen_id() -> str:
    id_ = secrets.token_hex(10)
    return id_
