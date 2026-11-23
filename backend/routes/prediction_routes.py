from flask import Blueprint, request, jsonify

import pickle

from database.mongodb import prediction_collection

prediction = Blueprint(

    "prediction",

    __name__

)

# LOAD MODEL

model = pickle.load(

    open("rfweights.pkl","rb")

)

# ---------------- CAREER PREDICTION ---------------- #

@prediction.route(

    "/predict-career",

    methods=["POST"]

)

def predict_career():

    data = request.json

    # User

    user = data.get("user")

    # Skills

    python_skill = data["python"]

    ml_skill = data["ml"]

    web_skill = data["web"]

    # Sample Data

    sample = [[

        python_skill,

        ml_skill,

        web_skill

    ]]

    # Predict

    result = model.predict(sample)

    career = result[0]

    # Simple Match Percentage

    percentage = 90

    # Save Prediction History

    prediction_data = {

        "user": user,

        "career": career,

        "percentage": percentage

    }

    prediction_collection.insert_one(

        prediction_data

    )

    # Response

    return jsonify({

        "career": career,

        "percentage": percentage

    })

# ---------------- GET PREDICTION HISTORY ---------------- #

@prediction.route(

    "/prediction-history",

    methods=["GET"]

)

def prediction_history():

    data = list(

        prediction_collection.find(

            {},

            {

                "_id":0

            }

        )

    )

    return jsonify(data)