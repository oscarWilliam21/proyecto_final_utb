# auth.py
import os
import jwt
import datetime
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def create_token(usuario_id):
    payload = {
        "user_id": str(usuario_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token válido por 1 hora
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token
