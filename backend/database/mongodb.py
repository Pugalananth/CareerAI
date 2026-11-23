from pymongo import MongoClient

# MongoDB Connection

client = MongoClient(

    "mongodb://localhost:27017/"

)

# Database

db = client[

    "smart_career_ai"

]

print(

    "DATABASE =",

    db.name

)

# Collections

users_collection = db[

    "users"

]

chat_collection = db[

    "chat_history"

]

analytics_collection = db[

    "analytics"

]

resume_collection = db[

    "resume_scores"

]

prediction_collection = db[

    "career_predictions"

]

interview_collection = db[

    "interview_history"

]