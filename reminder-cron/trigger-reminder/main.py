
from deta import app
import requests


@app.lib.cron()
def trigger_reminder_service(event):
    requests.get("https://linksbook-reminder.glitch.me/")
    return "Done"
