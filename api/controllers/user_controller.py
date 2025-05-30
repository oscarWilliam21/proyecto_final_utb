from flask import jsonify
from werkzeug.security import generate_password_hash
from database.conexion_mongodb import db
from datetime import datetime

# Planes permitidos
PLANES_VALIDOS = ["básico", "estándar", "premium"]

def register_user(data):
    #lo que trae el parametro data
    nombre = data.get("nombre")
    correo = data.get("correo")
    password = data.get("password")
    telefono = data.get("telefono", "")
    plan = data.get("plan", "básico")

    # Validar los campos
    if not nombre or not correo or not password:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if plan not in PLANES_VALIDOS:
        return jsonify({"error": "Plan inválido"}), 400

    if db.usuarios.find_one({"correo": correo}):
        return jsonify({"error": "El usuario ya existe"}), 409

    # Crear nuevo usuario con contraseña hasheada
    nuevo_usuario = {
        "nombre": nombre,
        "correo": correo,
        "password": generate_password_hash(password),
        "telefono": telefono,
        "plan": plan,
        "fecha_registro": datetime.utcnow().strftime("%Y-%m-%d")
    }

    # Guardar en la db
    db.usuarios.insert_one(nuevo_usuario)

    return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201
