from flask import Blueprint, request, jsonify

from google import genai

from database.mongodb import (

    analytics_collection,

    interview_collection

)

import os

import time

interview = Blueprint(

    "interview",

    __name__

)

# Gemini Client

client = genai.Client(

    api_key=os.getenv(

        "GEMINI_API_KEY"

    )

)

# ---------------- MOCK INTERVIEW ---------------- #

@interview.route(

    "/mock-interview",

    methods=["POST"]

)

def mock_interview():

    try:

        data = request.json

        career = data.get("career")

        user = data.get("user")

        prompt = f"""

Generate exactly 5 professional interview questions for:

{career}

Rules:

- Return only questions
- Number questions properly
- Keep questions concise
- No explanations

"""

        # Retry Gemini

        for i in range(3):

            try:

                response = client.models.generate_content(

                    model="gemini-2.5-flash",

                    contents=prompt

                )

                text = str(response.text)

                questions = []

                for line in text.split("\n"):

                    line = line.strip()

                    if line:

                        questions.append(line)

                # Save Analytics

                analytics_collection.insert_one({

                    "user": user,

                    "feature": "Mock Interview"

                })

                return jsonify({

                    "questions": questions

                })

            except Exception:

                time.sleep(2)

        # Fallback Questions

        fallback = [

            f"What are the core concepts in {career}?",

            "Explain one project you worked on.",

            "What are your strengths and weaknesses?",

            "How do you solve technical problems?",

            "Where do you see yourself in 5 years?"

        ]

        return jsonify({

            "questions": fallback

        })

    except Exception as e:

        print("Mock Interview Error =", e)

        return jsonify({

            "error": "Failed to generate interview questions"

        }),500


# ---------------- EVALUATE ANSWER ---------------- #

@interview.route(

    "/evaluate-answer",

    methods=["POST"]

)

def evaluate_answer():

    try:

        data = request.json

        user = data.get("user")

        question = data.get("question")

        answer = data.get("answer")

        # Validation

        if not answer:

            return jsonify({

                "feedback":

                "Please write your answer first."

            })

        prompt = f"""

You are an AI interview evaluator.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer professionally.

Return:

1. Score out of 10
2. Strengths
3. Weaknesses
4. Improvement Tips

Keep response concise and professional.

"""

        # Gemini Evaluation

        try:

            response = client.models.generate_content(

                model="gemini-2.5-flash",

                contents=prompt

            )

            feedback = str(response.text)

        except Exception:

            feedback = """

⚠ AI evaluation service temporarily unavailable.

The interview response was saved successfully.
Please try evaluation again later.

"""

        # Save Interview History

        interview_collection.insert_one({

            "user": user,

            "question": question,

            "answer": answer,

            "feedback": feedback

        })

        return jsonify({

            "feedback": feedback

        })

    except Exception as e:

        print("Evaluate Error =", e)

        return jsonify({

            "feedback":

            "Failed to evaluate interview answer"

        }),500


# ---------------- INTERVIEW HISTORY ---------------- #

@interview.route(

    "/interview-history",

    methods=["GET"]

)

def interview_history():

    try:

        data = list(

            interview_collection.find(

                {},

                {

                    "_id":0

                }

            )

        )

        return jsonify(data)

    except Exception as e:

        print("History Error =", e)

        return jsonify({

            "error": "Failed to fetch interview history"

        }),500