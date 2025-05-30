from flask import jsonify
from werkzeug.security import check_password_hash
from api.config.generate_token import create_token
from database.conexion_mongodb import db
from model.user_model import user_schema 

def login_user(data):
    correo = data.get("correo")
    password = data.get("password")

    if not correo or not password:
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    usuario = db.usuarios.find_one({"correo": correo})

    if not usuario:
        return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404

    if not check_password_hash(usuario["password"], password):
        return jsonify({"status": "error", "message": "Contraseña incorrecta"}), 401
    
    token = create_token(usuario["_id"])
    
    return jsonify({
        "status": "success",
        "token": token,
        "usuario": user_schema(usuario)
    }), 200

