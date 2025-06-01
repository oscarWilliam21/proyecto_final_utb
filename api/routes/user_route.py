from bson import ObjectId
from flask import Blueprint, jsonify, request
from controllers.user_controller import register_user, update_password, update_user

user_bp = Blueprint('user', __name__)

#ruta registrar usuario
@user_bp.route("/register", methods=["POST"])
def register_user_route():
    data = request.get_json()
    return register_user(data)

#ruta actualizar usuario
@user_bp.route("/update/<id>", methods=["PUT"])
def update_user_route(id):
    try:
        usuario_id = ObjectId(id)
    except:
        return jsonify({"error": "ID de usuario inválido"}), 400

    data = request.get_json()
    return update_user(usuario_id, data)

#ruta para actualizar la contraseña
@user_bp.route("/update/password/<id>", methods=["PUT"])
def update_user_password(id):
    try:
        usuario_id = ObjectId(id)
    except:
        return jsonify({"error": "ID inválido"}), 400

    data = request.get_json()
    return update_password(usuario_id, data)