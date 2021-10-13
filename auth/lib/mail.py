import smtplib
import ssl
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content, Email, To
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

    body_ = MIMEText(body, "html")

    message.attach(body_)

    # create secure SSL connection context
    ctx = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=ctx) as mail_server:
        mail_server.login("linksbook00@gmail.com", password)
        mail_server.sendmail(sender_mail, receiver_mail, message.as_string())


def send_mail(receiver: str, subject: str, body: str) -> any:
  message = Mail(Email("linksbook00@gmail.com"), To(receiver),
                 subject, Content("text/plain", body))
  try:
      sg = SendGridAPIClient(
          api_key='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')
      response = sg.send(message)
      print(response.status_code)
      print(response.body)
      print(response.headers)
  except Exception as e:
      raise e
