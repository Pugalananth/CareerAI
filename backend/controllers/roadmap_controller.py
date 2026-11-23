from flask import Blueprint, request, jsonify

roadmap = Blueprint(
    "roadmap",
    __name__
)

career_roadmaps = {

    "Data Scientist":[

        "Learn Python",

        "Learn SQL",

        "Study Pandas + NumPy",

        "Machine Learning",

        "Deep Learning",

        "Projects",

        "Deploy Models"

    ],

    "Web Developer":[

        "HTML",

        "CSS",

        "JavaScript",

        "React",

        "Node.js",

        "MongoDB",

        "Deployment"

    ],

    "AI Engineer":[

        "Python",

        "TensorFlow",

        "Deep Learning",

        "NLP",

        "LLMs",

        "Projects"

    ],

    "Mobile Developer":[

        "Learn Programming Basics",

        "Learn Java / Kotlin or Flutter",

        "Understand Mobile UI Design",

        "Build Android/iOS Apps",

        "Learn Firebase",

        "Learn REST APIs",

        "State Management",

        "Publish Apps to Play Store/App Store",

        "Build Portfolio Projects"

    ],

    "Cloud Engineer":[

        "Learn Linux Basics",

        "Understand Computer Networking",

        "Learn Cloud Computing Fundamentals",

        "Learn AWS / Azure / GCP",

        "Learn Docker",

        "Learn Kubernetes",

        "Understand CI/CD Pipelines",

        "Deploy Cloud Applications",

        "Build Cloud Projects"

    ],

    "Cyber Security Analyst":[

        "Learn Networking Basics",

        "Understand Operating Systems",

        "Learn Linux",

        "Learn Python Scripting",

        "Study Cyber Security Fundamentals",

        "Learn Ethical Hacking",

        "Practice Penetration Testing",

        "Learn Security Tools",

        "Study Cryptography Basics",

        "Prepare for Security Certifications",

        "Build Security Projects"

    ]

}


@roadmap.route(
    "/career-roadmap",
    methods=["POST"]
)

def generate_roadmap():

    data = request.json

    career = data["career"]

    steps = career_roadmaps.get(
        career,
        []
    )

    return jsonify({

        "career": career,

        "roadmap": steps

    })