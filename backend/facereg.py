from PIL import Image
import face_recognition
import sys
import math
import numpy as np
from operator import itemgetter
import pandas as pd

def face_to_name(image_path: str) -> dict:
    # Load the image for faces to be recognized
    unknown_image = face_recognition.load_image_file(image_path)
    located_people = {}

    # Load the known faces 
    known_people = []
    data = pd.read_csv('data/students.csv').values
    for d in data:
        my_face_loaded = face_recognition.load_image_file('data/' + d[1])
        my_face_encoding = face_recognition.face_encodings(my_face_loaded)[0]
        known_people.append((d[0], my_face_encoding))

    # Find all the faces in the image
    face_locations = face_recognition.face_locations(unknown_image)

    for face in face_locations:
        top, right, bottom, left = face

        # Increase the size of face box (increases successful recognition)
        face_image = unknown_image[int(0.8*top):int(1.2*bottom), int(0.8*left):int(1.2*right)]

        # Get the center of the face
        x = (right+left)/2
        y = (top+bottom)/2
        
        # Get the encoding of the unknown face
        unknown_face_encoding = face_recognition.face_encodings(np.array(face_image), model='large')[0]

        # Compare the unknown face with the known faces
        for (name, face) in known_people:
            if face_recognition.compare_faces([face], unknown_face_encoding, tolerance=0.5)[0]:
                located_people[name] = (x, y)
                break
    return located_people

    
def nearest_hand(facex: int, facey: int, hands):
    # Find the nearest hand to the face using euclidean distance
    min_dist = sys.float_info.max
    nearest_answer = None

    # Loop through and find the nearest distance to the hand returning the number of fingers up
    for hand in hands:
        euclidean = ((facex-hand['x'])**2+(facey-hand['y'])**2)**0.5
        if euclidean < min_dist:
            min_dist = euclidean
            nearest_answer = hand['fingers_up']
    return nearest_answer