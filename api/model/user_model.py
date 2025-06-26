def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "nombre": user["nombre"],
        "correo": user["correo"],
        "mis_peliculas_favoritas": user.get("mis_peliculas_favoritas", []),
        "mis_series_favoritas": user.get("mis_series_favoritas", []),
        "fecha_registro": user.get("fecha_registro", "")
    }
