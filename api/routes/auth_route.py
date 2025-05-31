import os
from flask import Blueprint, jsonify, request
import jwt
from config.generate_token import create_access_token
from controllers.auth_controller import login_user
from dotenv import load_dotenv

load_dotenv()
REFRESH_SECRET = os.getenv("REFRESH_SECRET")

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    return login_user(data)

@auth_bp.route("/routes/refresh", methods=["POST"])
def refresh_token():
    data = request.get_json()
    refresh_token = data.get("refresh_token")

    if not refresh_token:
        return jsonify({"error": "Refresh token requerido"}), 400

    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET, algorithms=["HS256"])
        new_access_token = create_access_token(payload["user_id"])
        return jsonify({"access_token": new_access_token}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Refresh token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Refresh token inválido"}), 401
 
# @auth_bp.route("/create-user", methods=["POST"])
# def createUser():
#     data = request.get_json()
#     return "crear usuario"

# @auth_bp.route("/delete-user", methods=["DELETE"])
# def deleteUser():
#     data = request.get_json()
#     return "Eliminar usuario"


