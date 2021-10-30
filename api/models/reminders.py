
from deta import Deta
import typing as T

deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF")

# reminders db

rdb = deta.Base("reminders")


def create_remindee(remind_time: str, recipient_email: str, bookmarks: T.List[str]):
    try:
        rdb.put({
            "time": remind_time,
            "recipient": recipient_email,
            "bookmarks": bookmarks
        })
        return "Success"
    except:
        return "Failed"
