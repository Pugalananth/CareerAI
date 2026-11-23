from flask import Blueprint, request, jsonify

resume = Blueprint("resume", __name__)

@resume.route("/analyze-resume", methods=["POST"])

def analyze_resume():

    return jsonify({

        "skills":[
            "Python",
            "React",
            "SQL"
        ],

        "missing_skills":[
            "Docker",
            "AWS"
        ],

        "career":"AI Engineer"
    })