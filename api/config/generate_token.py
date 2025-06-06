import os
import jwt
import datetime
from dotenv import load_dotenv
 
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
REFRESH_SECRET = os.getenv("REFRESH_SECRET")

print(SECRET_KEY, REFRESH_SECRET)
 
def create_access_token(usuario_id):
    payload = {
        "user_id": str(usuario_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, str(SECRET_KEY), algorithm="HS256")
    return token
 
def create_refresh_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, str(REFRESH_SECRET), algorithm="HS256")
