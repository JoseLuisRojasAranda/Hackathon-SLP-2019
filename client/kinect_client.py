#import the necessary modules
import freenect
import cv2
import numpy as np
import base64
import requests
import json

#function to get RGB image from kinect
def get_video():
    array,_ = freenect.sync_get_video()
    #array = cv2.cvtColor(array,cv2.COLOR_RGB2BGR)
    return array

#function to get depth image from kinect
def get_depth():
    array,_ = freenect.sync_get_depth()
    array = array.astype(np.uint8)
    return array

def render_boxes(image, predictions):
    for pred in predictions:
        if pred["score"] >= 0.5:
            bbox = pred["bbox"]
            x = int(bbox[0])
            y = int(bbox[1])
            w = int(bbox[2])
            h = int(bbox[3])

            cv2.rectangle(image, (x, y), (x+w, y+h), (0,0,255), 1)

if __name__ == "__main__":
    while 1:
        #get a frame from RGB camera
        frame = get_video()
        frame = cv2.resize(frame, (400, 300))

        _, buffer = cv2.imencode(".jpg", frame)
        b64_img = base64.b64encode(buffer)

        data = {
            "cam_id": "k_01",
            "img": b64_img.decode("utf8")
        }

        r = requests.post("https://ef7e0e28.ngrok.io/vigia/api/cam_send", json=data)

        pred = r.json()["results"]

        render_boxes(frame, pred)

        _, buffer = cv2.imencode(".jpg", frame)
        b64_img = base64.b64encode(buffer)

        data = {
            "cam_id": "k_01",
            "img": b64_img.decode("utf8")
        }

        r = requests.post("https://ef7e0e28.ngrok.io/vigia/api/cam_post", json=data)


        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        #cv2.imshow('RGB image',frame)

        # quit program when 'esc' key is pressed
        k = cv2.waitKey(5) & 0xFF
        if k == 27:
            break
    cv2.destroyAllWindows()
