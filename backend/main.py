import asyncio
import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from typing import List
import base64
from io import BytesIO

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global counter for generating unique filenames
file_counter = 0
file_counter_lock = asyncio.Lock()
files_path = "../uploads"

def perform_analysis(image_path: str) -> List[dict]:
    # TODO
    return [{"name": "Alex", "guess": 1}, {"name": "Ben", "guess": 3}]

async def get_next_filename() -> str:
    global file_counter
    async with file_counter_lock:
        file_counter += 1
        return f"file_{file_counter}.jpg"

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/scan")
async def receive_image(data: dict):
    try:
        # Generate a unique filename
        print("Received image data")

        filename = await get_next_filename()
        path_to_file = f"{files_path}/{filename}"

        print(f"Saving to {path_to_file}")

        image_data = data.get("image", "")
        image_bytes = base64.b64decode(image_data)

        image_stream = BytesIO(image_bytes)

        # Save the received image locally
        with open(path_to_file, "wb") as buffer:
            buffer.write(image_stream.read())

        # Perform image analysis
        result = perform_analysis(path_to_file)

        # Delete the file after analysis
        # os.remove(path_to_file)

        # Return the result as JSON
        return JSONResponse(content=result)

    except Exception as e:
        print(e)
        # Handle exceptions and return appropriate response
        raise HTTPException(status_code=500, detail=str(e))
