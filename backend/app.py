from dotenv import load_dotenv
load_dotenv()

import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# CONTROLLERS

from controllers.auth_controller import auth
from controllers.chatbot_controller import chatbot
from controllers.resume_controller import resume
from controllers.history_controller import history
from controllers.skill_gap_controller import skill_gap
from controllers.roadmap_controller import roadmap
from controllers.interview_controller import interview
from controllers.analytics_controller import analytics

# ROUTES

from routes.prediction_routes import prediction

# CREATE APP

app = Flask(__name__)

# CORS

CORS(

    app,

    resources={r"/*": {"origins": "*"}}

)

# JWT CONFIG

app.config["JWT_SECRET_KEY"] = "career_ai_secret_key"

# INITIALIZE JWT

jwt = JWTManager(app)

# REGISTER BLUEPRINTS

print("REGISTERING AUTH BLUEPRINT")

app.register_blueprint(auth)
app.register_blueprint(chatbot)
app.register_blueprint(prediction)
app.register_blueprint(resume)
app.register_blueprint(history)
app.register_blueprint(skill_gap)
app.register_blueprint(roadmap)
app.register_blueprint(interview)
app.register_blueprint(analytics)

# HOME ROUTE

@app.route("/")
def home():

    return {

        "message": "Backend Running"

    }

print(

    "API KEY:",

    os.getenv("GEMINI_API_KEY")

)

# RUN APP

if __name__ == "__main__":

    app.run(debug=True)