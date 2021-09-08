import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

port = 465

# config
sender_mail = "linksbook00@gmail.com"
receiver_mail = "ndjosiasaurel@gmail.com"
password = "bluelinksbook200"


def send_mail_to(receiver: str, subject: str, body: str):

    # message
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = "linksbook00@gmail.com"
    message["To"] = receiver

    text = "This is part 2"
    html = """  
    <html>
    <body>
        <p>Hi,<br>
        How are you?<br>
        <a href="http://www.realpython.com">Real Python</a> 
        has many great tutorials.
        </p>
    </body>
    </html>
    """

    p1 = MIMEText(text, "plain")
    p2 = MIMEText(html, "html")

    message.attach(p1)
    message.attach(p2)

    # create secure SSL connection context
    ctx = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=ctx) as mail_server:
        mail_server.login("linksbook00@gmail.com", password)
        mail_server.sendmail(sender_mail, receiver_mail, message.as_string())

    return
