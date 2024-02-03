from PIL import Image
import face_recognition

# Load the jpg file into a numpy array




def face_reg(image):
    face_locations = face_recognition.face_locations(image)
    names = ['Alex Timms','Sid','Viyan Raj']
    faces = {}
    i = 0
    for face_location in face_locations:

        # Print the location of each face in this image
        top, right, bottom, left = face_location
        avg = (top+right+bottom+left)/4
        faces[names[i]] = avg
    return faces