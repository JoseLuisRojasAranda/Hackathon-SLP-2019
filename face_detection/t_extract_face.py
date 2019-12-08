from matplotlib import pyplot
from PIL import Image
from mtcnn.mtcnn import MTCNN
import cv2
import numpy as np

video_capture = cv2.VideoCapture(0)
detector = MTCNN()

# extract a single face from a given photograph
def extract_face(image, required_size=(224, 224)):
	# create the detector, using default weights
	# detect faces in the image
    results = detector.detect_faces(image)
    faces = []

    for face in results:
        # extract the bounding box from the first face
        x1, y1, width, height = face['box']
        x2, y2 = x1 + width, y1 + height

        cv2.rectangle(image, (x1, y1), (x2, y2), (0,255,0), 1)

        a_face = np.copy(image)[y1:y2, x1:x2]
        try:
            a_face = cv2.resize(a_face, required_size)
        except Exception as e:
            pass

        faces.append(a_face)

    return faces

def main():
    while True:
        ret, frame = video_capture.read()
        frame2 = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        faces = extract_face(frame2)
        frame2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)

        cv2.imshow("Video", frame2)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

main()
