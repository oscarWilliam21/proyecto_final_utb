from flask import Blueprint, request
from controllers.user_controller import register_user

user_bp = Blueprint('user', __name__)

@user_bp.route("/register", methods=["POST"])
def register_user_route():
    data = request.get_json()
    return register_user(data)