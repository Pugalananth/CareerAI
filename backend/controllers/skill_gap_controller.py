from flask import Blueprint, request, jsonify

skill_gap = Blueprint(
    "skill_gap",
    __name__
)

career_skills = {

    "Data Scientist":[

        "python",
        "machine learning",
        "sql",
        "pandas",
        "numpy"

    ],

    "Web Developer":[

        "html",
        "css",
        "javascript",
        "react",
        "mongodb"

    ],

    "AI Engineer":[

        "python",
        "tensorflow",
        "deep learning",
        "nlp"

    ],

    "Mobile Developer":[

        "flutter",
        "firebase",
        "dart",
        "android",
        "api integration"

    ],

    "Cloud Engineer":[

        "linux",
        "aws",
        "docker",
        "kubernetes",
        "networking"

    ],

    "Cyber Security Analyst":[

        "networking",
        "linux",
        "python",
        "ethical hacking",
        "cryptography"

    ]

}


@skill_gap.route(
    "/skill-gap",
    methods=["POST"]
)

def analyze_gap():

    data = request.json

    target = data["career"]

    user_skills = data["skills"]

    needed = career_skills.get(
        target,
        []
    )

    missing = []

    for skill in needed:

        if skill.lower() not in [

            x.lower()

            for x in user_skills

        ]:

            missing.append(skill)

    return jsonify({

        "career": target,

        "missing_skills": missing

    })