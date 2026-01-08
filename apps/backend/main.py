from fastapi import FastAPI

app = FastAPI()

@app.get("/check")
async def check():
    return {"message":"the backend is running"}