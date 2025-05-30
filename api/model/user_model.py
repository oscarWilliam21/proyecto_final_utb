def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "nombre": user["nombre"],
        "correo": user["correo"],
        "telefono": user.get("telefono", ""),
        "plan": user.get("plan", "básico"),
        "fecha_registro": user.get("fecha_registro", "")
    }
