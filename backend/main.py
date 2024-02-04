import asyncio
import os
import io
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from facereg import face_to_name
from facereg import nearest_hand
from gesreg import get_fingers
from PIL import Image

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

# Ensure the target directory exists
os.makedirs(files_path, exist_ok=True)

def perform_analysis(image_path: str, model_source: str) -> List[dict]:
    guesses = {}
    faces = face_to_name(image_path)
    fingers = get_fingers(image_path, model_source)
    for name, face_coords in faces.items():
        answer = nearest_hand(face_coords[0], face_coords[1], fingers)
        guesses[name] = answer
    print(guesses)
    return guesses

async def get_next_filename() -> str:
    global file_counter
    async with file_counter_lock:
        file_counter += 1
        return f"file_{file_counter}.png"

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/scan")
async def receive_image(file: UploadFile = File(...)):
    try:
        # Generate a unique filename
        print("Received image data")

        filename = await get_next_filename()
        path_to_file = f"{files_path}/{filename}"

        print(f"Saving to {path_to_file}")

        request_object_content = await file.read()
        img = Image.open(io.BytesIO(request_object_content))

        img.save(path_to_file, "PNG")

        # Perform image analysis
        result = perform_analysis(path_to_file, "Models/gesture_recognizer-7.task")

        # Delete the file after analysis
        os.remove(path_to_file)

        # Return the result as JSON
        return JSONResponse(content=result)

    except Exception as e:
        print(e)
        # Handle exceptions and return appropriate response
        raise HTTPException(status_code=500, detail=str(e))
