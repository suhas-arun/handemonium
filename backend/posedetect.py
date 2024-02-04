import cv2
import mediapipe as mp
import numpy as np

from mediapipe.tasks import python as mp_tasks
from mediapipe.tasks.python import vision
from mediapipe.python.solutions.pose import PoseLandmark



class PoseDetection():

    def __init__(self, image_path) -> None:
        self.image_path = image_path

        self.model_path = "Models/pose_landmarker_heavy.task"  # Ensure this path is correct
        self.num_poses = 4
        self.min_pose_detection_confidence = 0.01
        self.min_pose_presence_confidence = 0.01
        self.min_tracking_confidence = 0.5

        image = cv2.imread(self.image_path)
        self.ih, self.iw, _ = image.shape
        self.rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        self.mp_pose = mp.solutions.pose

        self.UPPER_POSE_CONNECTIONS = frozenset([
            (PoseLandmark.NOSE, PoseLandmark.RIGHT_EYE_INNER),
            (PoseLandmark.RIGHT_EYE_INNER, PoseLandmark.RIGHT_EYE),
            (PoseLandmark.RIGHT_EYE, PoseLandmark.RIGHT_EYE_OUTER),
            (PoseLandmark.RIGHT_EYE_OUTER, PoseLandmark.RIGHT_EAR),
            (PoseLandmark.NOSE, PoseLandmark.LEFT_EYE_INNER),
            (PoseLandmark.LEFT_EYE_INNER, PoseLandmark.LEFT_EYE),
            (PoseLandmark.LEFT_EYE, PoseLandmark.LEFT_EYE_OUTER),
            (PoseLandmark.LEFT_EYE_OUTER, PoseLandmark.LEFT_EAR),
            (PoseLandmark.MOUTH_RIGHT, PoseLandmark.MOUTH_LEFT),
            (PoseLandmark.RIGHT_SHOULDER, PoseLandmark.LEFT_SHOULDER),
            (PoseLandmark.RIGHT_SHOULDER, PoseLandmark.RIGHT_ELBOW),
            (PoseLandmark.RIGHT_ELBOW, PoseLandmark.RIGHT_WRIST),
            (PoseLandmark.RIGHT_WRIST, PoseLandmark.RIGHT_PINKY),
            (PoseLandmark.RIGHT_WRIST, PoseLandmark.RIGHT_INDEX),
            (PoseLandmark.RIGHT_WRIST, PoseLandmark.RIGHT_THUMB),
            (PoseLandmark.RIGHT_PINKY, PoseLandmark.RIGHT_INDEX),
            (PoseLandmark.LEFT_SHOULDER, PoseLandmark.LEFT_ELBOW),
            (PoseLandmark.LEFT_ELBOW, PoseLandmark.LEFT_WRIST),
            (PoseLandmark.LEFT_WRIST, PoseLandmark.LEFT_PINKY),
            (PoseLandmark.LEFT_WRIST, PoseLandmark.LEFT_INDEX),
            (PoseLandmark.LEFT_WRIST, PoseLandmark.LEFT_THUMB),
            (PoseLandmark.LEFT_PINKY, PoseLandmark.LEFT_INDEX),
            (PoseLandmark.RIGHT_SHOULDER, PoseLandmark.RIGHT_HIP),
            (PoseLandmark.LEFT_SHOULDER, PoseLandmark.LEFT_HIP),
            (PoseLandmark.RIGHT_HIP, PoseLandmark.LEFT_HIP),
            (PoseLandmark.RIGHT_HIP, PoseLandmark.LEFT_HIP)
        ])


    # Helper functions
    def find_center(self, x1, y1, x2, y2):
        return (x1 + x2) / 2, (y1 + y2) / 2

    def calculate_distance(self, p1, p2):
        return np.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)


    # Pose Detection
    def detect_poses(self):

        # Initialize MediaPipe Pose Landmarker for static images
        base_options = mp_tasks.BaseOptions(model_asset_path=self.model_path)
        options = vision.PoseLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.IMAGE,
            num_poses=self.num_poses,
            min_pose_detection_confidence=self.min_pose_detection_confidence,
            min_pose_presence_confidence=self.min_pose_presence_confidence,
            min_tracking_confidence=self.min_tracking_confidence
        )


        # Perform Pose Detection
        with vision.PoseLandmarker.create_from_options(options) as landmarker:
            mp_image = mp.Image(
                image_format=mp.ImageFormat.SRGB,
                data=self.rgb_image)

            return landmarker.detect(mp_image)



    def crop_hand_from_image(self, image, closest_hand):
        box_size = 300
        vertical_offset = 40

        x1 = int(max(0, closest_hand[0] - box_size))
        y1 = int(max(0, closest_hand[1] - box_size - vertical_offset))
        x2 = int(min(image.shape[1], closest_hand[0] + box_size))
        y2 = int(min(image.shape[0], closest_hand[1] + box_size - vertical_offset))

        cropped_image = image[y1:y2, x1:x2]

        return cropped_image

    def get_closest_hand(self, pose_landmarks):
        # Define a function to get a specific landmark with a fallback mechanism
        def get_landmark(landmark_indices):
            for idx in landmark_indices:
                if idx < len(pose_landmarks) and pose_landmarks[idx].visibility > 0.2:
                    return pose_landmarks[idx]
            return None

        # Try to find the nose or mouth landmark
        face_landmark = get_landmark([self.mp_pose.PoseLandmark.NOSE.value,
                                    self.mp_pose.PoseLandmark.MOUTH_LEFT.value,
                                    self.mp_pose.PoseLandmark.MOUTH_RIGHT.value])
        
        face_position = (face_landmark.x * self.iw, face_landmark.y * self.ih)

        if not face_landmark:
            return  # No visible face landmark found in this pose

        # Find the closest wrist within the same pose
        closest_hand = None
        min_distance = float('inf')

        for wrist_landmark in [self.mp_pose.PoseLandmark.LEFT_WRIST.value, self.mp_pose.PoseLandmark.RIGHT_WRIST.value]:
            if wrist_landmark < len(pose_landmarks):
                wrist = pose_landmarks[wrist_landmark]
                wrist_position = (wrist.x * self.iw, wrist.y * self.ih)
                distance = self.calculate_distance(face_position, wrist_position)

                if distance < min_distance:
                    min_distance = distance
                    closest_hand = wrist_position

        
        if closest_hand:
            # crop the hand with the bounding box coord below and return the cropped bounding box
            return self.crop_hand_from_image(self.rgb_image, closest_hand)

    def find_closest_pose_to_face(self, face_position, pose_landmarks):
        closest_pose = None
        min_distance = float('inf')

        for pose_landmarks in pose_landmarks:
            nose_landmark = pose_landmarks[self.mp_pose.PoseLandmark.NOSE]
            nose_position = (nose_landmark.x * self.iw, nose_landmark.y * self.ih)

            distance = self.calculate_distance(face_position, nose_position)
            if distance < min_distance:
                min_distance = distance
                closest_pose = pose_landmarks

        return closest_pose

    def find_closest_hand(self, face_position):
        # Detect poses in rgb image
        detection_result = self.detect_poses()

        # Loop through each detected pose and draw hand boxes
        closest_pose = self.find_closest_pose_to_face(face_position, detection_result.pose_landmarks)
            
        if closest_pose:
            return self.get_closest_hand(closest_pose)

