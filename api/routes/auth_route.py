from flask import Blueprint, request
from controllers.auth_controller import login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    return login_user(data)

@auth_bp.route("/create-user", methods=["POST"])
def createUser():
    data = request.get_json()
    return "crear usuario"

@auth_bp.route("/delete-user", methods=["DELETE"])
def deleteUser():
    data = request.get_json()
    return "Eliminar usuario"


