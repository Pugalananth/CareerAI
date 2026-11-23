import bcrypt
import jwt
import datetime

SECRET_KEY = "career_secret"

def hash_password(password):

    return bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    )


def verify_password(
    password,
    hashed
):

    # convert Mongo Binary → bytes

    hashed_bytes = bytes(
        hashed
    )

    return bcrypt.checkpw(

        password.encode(),

        hashed_bytes

    )


def create_token(email):

    payload = {

        "email": email,

        "exp":
        datetime.datetime.utcnow()
        + datetime.timedelta(
            days=1
        )

    }

    token = jwt.encode(

        payload,

        SECRET_KEY,

        algorithm="HS256"

    )

    return token