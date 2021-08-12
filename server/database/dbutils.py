from datetime import datetime


def get_date() -> str:
    date = str(datetime.utcnow()).split(" ")[0]
    return date
