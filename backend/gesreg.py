import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

def get_fingers (image_source, model_source):

    base_options = python.BaseOptions(model_asset_path=model_source)
    options = vision.GestureRecognizerOptions(base_options=base_options, num_hands=5)
    recognizer = vision.GestureRecognizer.create_from_options(options)

    image = mp.Image.create_from_file(image_source)
    
    recognition_result = recognizer.recognize(image)

    top_gesture = recognition_result.gestures
    hand_landmarks = recognition_result.hand_landmarks

    fingers = []

    for i, hands in enumerate(hand_landmarks):

        fingers.append({
            'fingers_up': top_gesture[i][0].category_name,
            'confidence': top_gesture[i][0].score,
            'x': hands[0].x * image.width,
            'y': hands[0].y * image.height
        })
    
    return fingers