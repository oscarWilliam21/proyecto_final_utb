from bson import ObjectId
from flask import jsonify
from flask_mail import Message
import jwt
from werkzeug.security import check_password_hash, generate_password_hash
from database.conexion_mongodb import db
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from config.mail_config import mail

load_dotenv()

def register_user(data):
    nombre = data.get("nombre")
    correo = data.get("correo")
    password = data.get("password")

    if not nombre or not correo or not password:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if db.usuarios.find_one({"correo": correo}):
        return jsonify({"error": "El usuario ya existe"}), 409

    nuevo_usuario = {
        "nombre": nombre,
        "correo": correo,
        "password": generate_password_hash(password),
        "mis_peliculas_favoritas" : [],
        "mis_series_favoritas" : [],
        "fecha_registro": datetime.utcnow().strftime("%Y-%m-%d")
    }

    db.usuarios.insert_one(nuevo_usuario)

    return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201
  
 
def update_user(usuario_id, data):
    nombre = data.get("nombre")

    update_fields = {}

    if nombre:
        update_fields["nombre"] = nombre
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

#controller de olvide la contraseña
# instala pip install Flask-Mail
SECRET_KEY = os.getenv("SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

def send_reset_email(data):
    correo = data.get("correo")
    if not correo:
        return jsonify({"error": "Correo requerido"}), 400

    usuario = db.usuarios.find_one({"correo": correo})
    if not usuario:
        return jsonify({"mensaje": "Si el correo existe, se enviará un enlace"}), 200  

    token = jwt.encode({
        "user_id": str(usuario["_id"]),
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }, str(SECRET_KEY), algorithm="HS256")

    reset_url = f"{FRONTEND_URL}/client/recuperar_password/recuperar.html?token={token}"

    msg = Message(
        subject="Recuperación de contraseña",
        sender=os.getenv("MAIL_USERNAME"),
        recipients=[correo],     
        html=f"""
        <div style="background-color:#000000; padding:40px 20px; color:#ffffff; font-family:Arial, sans-serif;">
            <div style="max-width:600px; margin:0 auto; background-color:#121212; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(255,255,255,0.1);">
                <div style="background-color:#f1c40f; padding:20px; text-align:center;">
                    <h1 style="margin:0; color:#000000;">StreamZone</h1>
                </div>
                <div style="padding:30px;">
                    <p style="font-size:18px;">Hola <strong>{usuario['nombre']}</strong>,</p>
                    <p style="font-size:16px;">Hemos recibido una solicitud para restablecer tu contraseña.</p>
                    <p style="font-size:16px;">Puedes hacerlo haciendo clic en el siguiente botón:</p>

                    <div style="text-align:center; margin:30px 0;">
                        <a href="{reset_url}" style="background-color:#f1c40f; color:#000000; padding:12px 24px; text-decoration:none; font-weight:bold; border-radius:5px;">
                            Restablecer contraseña
                        </a>
                    </div>

                    <p style="font-size:14px; color:#cccccc;">
                        Si no solicitaste este cambio, puedes ignorar este correo. El enlace expirará en 15 minutos.
                    </p>
                    <p style="font-size:14px; color:#cccccc;">— El equipo de soporte de StreamZone</p>
                </div>
            </div>
        </div>
        """
        )

    try:
        mail.send(msg)
        return jsonify({"mensaje": "Se ha enviado el correo de recuperación"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"error": "Error al enviar el correo"}), 500
  
#controller para restablecer la contraseña olvidada
def reset_password(data):
    token = data.get("token")
    nueva = data.get("new_password")
    confirmar = data.get("confirm_password")

    if not token or not nueva or not confirmar:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    if nueva != confirmar:
        return jsonify({"error": "Las contraseñas no coinciden"}), 400

    if len(nueva) < 6:
        return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

    try:
        payload = jwt.decode(token, str(SECRET_KEY), algorithms=["HS256"])
        user_id = payload.get("user_id")
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "El enlace ha expirado"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 400

    usuario = db.usuarios.find_one({"_id": ObjectId(user_id)})
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    nueva_hash = generate_password_hash(nueva)

    db.usuarios.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password": nueva_hash}}
    )

    return jsonify({"mensaje": "Contraseña restablecida correctamente"}), 200


