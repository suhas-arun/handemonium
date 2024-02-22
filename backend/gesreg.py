import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.components.processors import ClassifierOptions

def get_fingers(image_source: str, model_source: str) -> list:
    # Create a gesture recognizer
    base_options = python.BaseOptions(model_asset_path=model_source)
    custom_gesture_classifier_options = ClassifierOptions(
        score_threshold=0.2, 
        category_allowlist=["1", "2", "3", "4"],  
        category_denylist=[''],
    )
    options = vision.GestureRecognizerOptions(base_options=base_options, num_hands=5, custom_gesture_classifier_options=custom_gesture_classifier_options)
    recognizer = vision.GestureRecognizer.create_from_options(options)
    
    # Create an image object
    image = mp.Image.create_from_file(image_source)
    
    # Recognize the gestures
    recognition_result = recognizer.recognize(image)

    # Extract the results
    top_gesture = recognition_result.gestures
    hand_landmarks = recognition_result.hand_landmarks

    # Extract the fingers and locations
    fingers = []
    for i, hands in enumerate(hand_landmarks):
        fingers.append({
            'fingers_up': top_gesture[i][0].category_name,
            'confidence': top_gesture[i][0].score,
            'x': hands[0].x * image.width,
            'y': hands[0].y * image.height
        })
    
    return fingers