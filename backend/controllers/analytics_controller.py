from flask import Blueprint, request, jsonify

from database.mongodb import (

    analytics_collection,

    users_collection,

    interview_collection,

    resume_collection

)

import re

analytics = Blueprint(

    "analytics",

    __name__

)

# ================= TRACK USER ACTIVITY ================= #

@analytics.route(

    "/track-activity",

    methods=["POST"]

)

def track_activity():

    try:

        data = request.json

        user = data.get("user")

        feature = data.get("feature")

        activity = {

            "user": user,

            "feature": feature

        }

        analytics_collection.insert_one(

            activity

        )

        return jsonify({

            "message": "Tracked"

        })

    except Exception as e:

        print("TRACK ERROR =", e)

        return jsonify({

            "message": "Failed"

        }),500


# ================= GET ANALYTICS DATA ================= #

@analytics.route(

    "/analytics-data",

    methods=["GET"]

)

def analytics_data():

    try:

        data = list(

            analytics_collection.find(

                {},

                {

                    "_id":0

                }

            )

        )

        return jsonify(data)

    except Exception as e:

        print("ANALYTICS ERROR =", e)

        return jsonify([])


# ================= ADMIN STATS ================= #

@analytics.route(

    "/admin-stats",

    methods=["GET"]

)

def admin_stats():

    try:

        # TOTAL USERS

        total_users = users_collection.count_documents({})

        # TOTAL ACTIVITIES

        total_predictions = analytics_collection.count_documents({})

        # RESUME DATA

        resumes = list(

            resume_collection.find({})

        )

        # INTERVIEW DATA

        interviews = list(

            interview_collection.find({})

        )

        # ================= AI ACCURACY ================= #

        total_score = 0

        score_count = 0

        for item in interviews:

            feedback = item.get(

                "feedback",

                ""

            )

            match = re.search(

                r'(\d+)/10',

                feedback

            )

            if match:

                score = int(

                    match.group(1)

                )

                total_score += score

                score_count += 1

        ai_accuracy = 0

        if score_count > 0:

            ai_accuracy = round(

                (total_score / (score_count * 10)) * 100

            )

        # ================= ATS SCORE ================= #

        ats_total = 0

        ats_count = 0

        for item in resumes:

            score = item.get(

                "score",

                0

            )

            ats_total += int(score)

            ats_count += 1

        avg_ats = 0

        if ats_count > 0:

            avg_ats = round(

                ats_total / ats_count

            )

        return jsonify({

            "users": total_users,

            "predictions": total_predictions,

            "ai_accuracy": ai_accuracy,

            "resume_score": avg_ats

        })

    except Exception as e:

        print("ADMIN STATS ERROR =", e)

        return jsonify({

            "users": 0,

            "predictions": 0,

            "ai_accuracy": 0,

            "resume_score": 0

        })