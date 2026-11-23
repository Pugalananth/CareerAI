from flask import Blueprint, request, jsonify

import pdfplumber

import spacy

from database.mongodb import resume_collection

resume = Blueprint(
    "resume",
    __name__
)

# Load NLP Model

nlp = spacy.load(
    "en_core_web_sm"
)

# Skill List

skills = [

    "python",

    "machine learning",

    "sql",

    "tensorflow",

    "deep learning",

    "data science",

    "react",

    "node.js",

    "mongodb",

    "aws",

    "docker",

    "kubernetes",

    "cyber security",

    "flutter",

    "java",

    "django"

]

# Career Mapping

career_mapping = {

    "machine learning":"AI Engineer",

    "tensorflow":"AI Engineer",

    "deep learning":"AI Engineer",

    "data science":"Data Scientist",

    "react":"Frontend Developer",

    "node.js":"Backend Developer",

    "mongodb":"Full Stack Developer",

    "aws":"Cloud Engineer",

    "docker":"DevOps Engineer",

    "cyber security":"Cyber Security Analyst",

    "flutter":"Mobile App Developer",

    "java":"Java Developer"

}

# ---------------- RESUME ANALYSIS ---------------- #

@resume.route(

    "/resume-analysis",

    methods=["POST"]

)

def analyze_resume():

    # Check File

    if "resume" not in request.files:

        return jsonify({

            "error":

            "Resume file not uploaded"

        }),400

    # Get File

    file = request.files["resume"]

    # Extract Text

    text = ""

    with pdfplumber.open(file) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:

                text += page_text

    text = text.lower()

    # Detect Skills

    found = []

    for skill in skills:

        if skill in text:

            found.append(skill)

    # ATS Score

    score = int(

        (len(found)/len(skills))*100

    )

    # Predict Career

    predicted_career = "General IT"

    for skill in found:

        if skill in career_mapping:

            predicted_career = career_mapping[skill]

            break

    # Save to MongoDB

    resume_data = {

        "user": request.form.get("user"),

        "score": score,

        "career": predicted_career,

        "skills": found

    }

    resume_collection.insert_one(

        resume_data

    )

    # Response

    return jsonify({

        "skills": found,

        "ats_score": score,

        "career": predicted_career

    })

# ---------------- GET RESUME SCORES ---------------- #

@resume.route(

    "/resume-scores",

    methods=["GET"]

)

def get_resume_scores():

    data = list(

        resume_collection.find(

            {},

            {

                "_id":0

            }

        )

    )

    return jsonify(data)