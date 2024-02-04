from PIL import Image
import face_recognition
import sys
import math
from operator import itemgetter

# Load the jpg file into a numpy array
def face_reg(image_path):
    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)
    sorted_face_locations = sorted(face_locations, key=lambda x: x[1] - x[3])
    names = ['Suhas','Ben','Viyan Raj']
    faces = {}
    for i, face_location in enumerate(sorted_face_locations):
        top, right, bottom, left = face_location
        y = (top+bottom)/2
        x = (right+left)/2
        faces[names[i]] = (x, y)
    print(faces)
    return faces

    
def nearest_hand(facex, facey, hands):
    min_dist = sys.float_info.max
    nearest_answer = None
    for hand in hands:
        euclidean = ((facex-hand['x'])**2+(facey-hand['y'])**2)**0.5
        if euclidean < min_dist:
            min_dist = euclidean
            nearest_answer = hand['fingers_up']
    return nearest_answer