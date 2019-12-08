from matplotlib import pyplot
from mtcnn.mtcnn import MTCNN
import cv2
import numpy as np
import os

video_capture = cv2.VideoCapture(0)
detector = MTCNN()

def draw_frect(image, face):
    i_face, bbox = face

    x1, y1, width, height = bbox
    x2, y2 = x1 + width, y1 + height

    cv2.rectangle(image, (x1, y1), (x2, y2), (0,255,0), 1)

# extract a single face from a given photograph
def extract_faces(image, required_size=(224, 224)):
	# create the detector, using default weights
	# detect faces in the image
    results = detector.detect_faces(image)
    faces = []

    for face in results:
        # extract the bounding box from the first face
        x1, y1, width, height = face['box']
        x2, y2 = x1 + width, y1 + height

        a_face = np.copy(image)[y1:y2, x1:x2]

        try:
            a_face = cv2.resize(a_face, required_size)
        except Exception as e:
            pass

        faces.append((a_face, face["box"]))

    return faces

def main():
    if not os.path.exists("../embeddings/"):
        os.mkdir("../embeddings/")

    while True:
        ret, frame = video_capture.read()
        frame2 = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        faces = extract_faces(frame2)

        draw_frect(frame2, faces[0])

        frame2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2RGB)

        cv2.imshow("Video", frame2)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            name = input("Person name: ")
            if not os.path.exists("../embeddings/"+name+"/"):
                os.mkdir("../embeddings/" + name + "/")

            face_img, _ = faces[0]
            face_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2RGB)
            cv2.imwrite("../embeddings/" + name + "/face.jpg", face_img)
            break

if __name__ == "__main__":
    main()
