from flask import Blueprint, request, jsonify
import bcrypt

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt
)

from database.mongodb import users_collection

auth = Blueprint(
    "auth",
    __name__
)

# ---------------- SIGNUP ---------------- #

@auth.route(
    "/signup",
    methods=["POST"]
)
def signup():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # ---------------- VALIDATION ---------------- #

        if not name or not email or not password:

            return jsonify({

                "message":
                "Fill all fields"

            }),400

        # ---------------- EXISTING USER ---------------- #

        existing = users_collection.find_one({

            "email": email

        })

        if existing:

            return jsonify({

                "message":
                "User already exists"

            }),400

        # ---------------- PASSWORD HASH ---------------- #

        hashed = bcrypt.hashpw(

            password.encode(),

            bcrypt.gensalt()

        ).decode()

        # ---------------- SAVE USER ---------------- #

        user = {

            "name": name,
            "email": email,
            "password": hashed,
            "role": "user"

        }

        users_collection.insert_one(user)

        return jsonify({

            "message":
            "Signup success"

        })

    except Exception as e:

        return jsonify({

            "message":
            str(e)

        }),500


# ---------------- LOGIN ---------------- #

@auth.route(
    "/login",
    methods=["POST"]
)
def login():

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        # ---------------- ADMIN LOGIN ---------------- #

        if (

            email == "admin@careerai.com"

            and

            password == "admin123"

        ):

            token = create_access_token(

                identity=email,

                additional_claims={

                    "role": "admin"

                }

            )

            return jsonify({

                "message":
                "Admin login success",

                "token":
                token,

                "role":
                "admin",

                "user": {

                    "name":
                    "Administrator",

                    "email":
                    email

                }

            })

        # ---------------- USER LOGIN ---------------- #

        user = users_collection.find_one({

            "email": email

        })

        print("USER =", user)

        if not user:

            return jsonify({

                "message":
                "User not found"

            }),404

        # ---------------- PASSWORD FIX ---------------- #

        stored_password = user["password"]

        if isinstance(stored_password, str):

            stored_password = stored_password.encode()

        valid = bcrypt.checkpw(

            password.encode(),

            stored_password

        )

        print("VERIFY =", valid)

        if not valid:

            return jsonify({

                "message":
                "Invalid password"

            }),401

        # ---------------- JWT TOKEN ---------------- #

        token = create_access_token(

            identity=email,

            additional_claims={

                "role": "user"

            }

        )

        return jsonify({

            "message":
            "Login success",

            "token":
            token,

            "role":
            "user",

            "user": {

                "name":
                user["name"],

                "email":
                user["email"]

            }

        })

    except Exception as e:

        return jsonify({

            "message":
            str(e)

        }),500


# ---------------- GET USERS ---------------- #

@auth.route(
    "/users",
    methods=["GET"]
)
def get_users():

    try:

        users = list(

            users_collection.find(

                {},

                {

                    "_id":0,

                    "name":1,

                    "email":1,

                    "role":1

                }

            )

        )

        return jsonify(users)

    except Exception as e:

        return jsonify({

            "message":
            str(e)

        }),500


# ---------------- ADMIN ONLY API ---------------- #

@auth.route(
    "/admin-data",
    methods=["GET"]
)
@jwt_required()
def admin_data():

    try:

        claims = get_jwt()

        if claims["role"] != "admin":

            return jsonify({

                "message":
                "Admin access only"

            }),403

        return jsonify({

            "message":
            "Welcome Admin"

        })

    except Exception as e:

        return jsonify({

            "message":
            str(e)

        }),500