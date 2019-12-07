from flask import Flask, jsonify
from flask import request
from flask import abort
import requests
import json
import cv2
import base64
import numpy as np

from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)

# SETUP OF COCO SERVER
coco_ip = "http://localhost:"
coco_port = "3000"

# HARDCORE DATABASE
cache = {
    "active": True}

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route("/")
def index():
    return "index"

@app.route("/vigia/api/client_livefeed", methods=["GET"])
def get_livefeed():
    return jsonify({
        "img": cache["last_frame"],
        "people": cache["people"],
        "datetime": cache["datetime"]})

def render_boxes(image, predictions):
    for pred in predictions:
        if pred["score"] >= 0.5:
            bbox = pred["bbox"]
            x = int(bbox[0])
            y = int(bbox[1])
            w = int(bbox[2])
            h = int(bbox[3])

            cv2.rectangle(image, (x, y), (x+w, y+h), (0,0,255), 1)

def draw_predictions(image, predictions):
    image = cv2.imdecode(np.fromstring(base64.b64decode(image), dtype=np.uint8),
            cv2.IMREAD_COLOR)

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    render_boxes(image, predictions)

    _, buffer = cv2.imencode(".jpg", image)
    b64_img = base64.b64encode(buffer)

    return b64_img.decode("utf8")


@app.route("/vigia/api/cam_send", methods=["POST"])
def recieve_image():
    if not request.json or not "cam_id" in request.json:
        abort(400)

    if not "img" in request.json:
        abort(400)

    cam_data = request.json

    if cache["active"] == True:
        # Procesamiento de la imagen
        r_coco = requests.post(coco_ip+coco_port, data={"img": cam_data["img"]})
        coco_predictions = json.loads(r_coco.text)

        cache["people"] = len(coco_predictions)
        cache["last_frame"] = draw_predictions(cam_data["img"], coco_predictions.copy())
    else:
        cache["people"] = 0
        cache["last_frame"] = cam_data["img"]


    # date time
    c_time = datetime.now()
    d_time = {
        "year": c_time.year,
        "month": c_time.month,
        "day": c_time.day,
        "hour": c_time.hour,
        "minute": c_time.minute,
        "second": c_time.second
    }

    cache["datetime"] = d_time

    return jsonify(results=coco_predictions), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3005, debug=True)
