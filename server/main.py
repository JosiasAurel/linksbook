from fastapi import FastAPI, Request

app = FastAPI()


@app.get("/")
def _handle_index(request: Request):
    return {"message": "Working..."}
