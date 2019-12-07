from flask import Flask
import cv2
import base64

app = Flask(__name__)

@app.route('/')
def index():
    img = cv2.imread("img.jpg")
    _, buffer = cv2.imencode(".jpg", img)
    b64_img = base64.b64encode(buffer)
    return b64_img.decode("utf8")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002, debug=True)
