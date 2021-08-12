from fastapi import FastAPI, Request
from deta import Deta

app = FastAPI()


@app.get("/")
def _handle_index(request: Request):
    return {"message": "Working..."}
