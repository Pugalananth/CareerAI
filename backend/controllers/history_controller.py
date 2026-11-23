from flask import Blueprint, request, jsonify
from config.db import db
from bson import ObjectId

history = Blueprint(
    "history",
    __name__
)

collection = db.history


@history.route(
    "/save-history",
    methods=["POST"]
)
def save_history():

    data = request.json

    item = {

        "username":
        data.get("username"),

        "career":
        data.get("career"),

        "score":
        data.get("score")

    }

    result = collection.insert_one(item)

    return jsonify({

        "message":
        "Saved",

        "id":
        str(result.inserted_id)

    })


@history.route(
    "/history/<username>",
    methods=["GET"]
)
def get_history(username):

    data = list(

        collection.find(

            {
                "username":
                username
            },

            {
                "_id":0
            }

        )

    )

    return jsonify(data)