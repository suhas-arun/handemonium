from PIL import Image
import face_recognition
import sys
import math

# Load the jpg file into a numpy array
def face_reg(image_path):
    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)
    names = ['Alex Timms','Sid','Viyan Raj']
    faces = {}
    i = 0
    for face_location in face_locations:
        # Print the location of each face in this image
        top, right, bottom, left = face_location
        avg = (top+right+bottom+left)/4
        faces[avg] = names[i]
        i=+1
    return faces
def nearest_face(handx,faces):
    min = sys.float_info.max
    face = None
    for key in faces:
        if abs(handx-key) < min:
            min = abs(handx-key)
            face = key
    return face
    
