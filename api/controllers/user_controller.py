from flask import jsonify
from werkzeug.security import check_password_hash, generate_password_hash
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


def update_user(usuario_id, data):
    nombre = data.get("nombre")
    telefono = data.get("telefono")

    update_fields = {}

    if nombre:
        update_fields["nombre"] = nombre
    if telefono is not None:
        update_fields["telefono"] = telefono
    if not update_fields:
        return jsonify({"error": "No se enviaron datos para actualizar"}), 400

    result = db.usuarios.update_one(
        {"_id": usuario_id},
        {"$set": update_fields}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({"mensaje": "Usuario actualizado correctamente"}), 200

#Actualizar o cambiar la contraseña
def update_password(usuario_id, data):
    actual = data.get("password_actual")
    nueva = data.get("nueva_password")
    confirmar = data.get("confirmar_password")

    if not actual or not nueva or not confirmar:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    if nueva != confirmar:
        return jsonify({"error": "La nueva contraseña y la confirmación no coinciden"}), 400

    if len(nueva) < 6:
        return jsonify({"error": "La nueva contraseña debe tener al menos 6 caracteres"}), 400

    usuario = db.usuarios.find_one({"_id": usuario_id})

    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not check_password_hash(usuario["password"], actual):
        return jsonify({"error": "La contraseña actual es incorrecta"}), 401

    hashed = generate_password_hash(nueva)

    db.usuarios.update_one(
        {"_id": usuario_id},
        {"$set": {"password": hashed}}
    )

    return jsonify({"mensaje": "Contraseña actualizada exitosamente"}), 200

