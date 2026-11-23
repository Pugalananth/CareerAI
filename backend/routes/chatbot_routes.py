from flask import Blueprint, request, jsonify

chatbot_bp = Blueprint(

    "chatbot_bp",

    __name__
)

@chatbot_bp.route(

    "/chat",

    methods=["POST"]
)

def chat():

    data = request.json

    message = data.get("message")

    reply = ""

    if "ai" in message.lower():

        reply = """
        AI Engineer Roadmap:
        Learn Python,
        Machine Learning,
        Deep Learning,
        TensorFlow
        """

    elif "web" in message.lower():

        reply = """
        Full Stack Developer Roadmap:
        HTML,
        CSS,
        JavaScript,
        React,
        Node.js
        """

    else:

        reply = """
        Ask career-related questions
        """

    return jsonify({

        "reply": reply
    })