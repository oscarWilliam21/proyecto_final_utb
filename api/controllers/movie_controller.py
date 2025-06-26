from http.client import HTTPException

from bson import ObjectId
from database.conexion_mongodb import db

movies_collection = db['movies']
series_collection = db['series']
user_collection = db['usuarios']

from bson import ObjectId

def get_all_movies():
    try:
        movies = list(movies_collection.find())
        result = []

        for movie in movies:
            movie['id'] = str(movie['_id']) 
            del movie['_id'] 
            result.append(movie)

        return result
    except Exception as e:
        raise Exception(f"Error al obtener películas: {e}")


def get_all_series():
    try:
        series = list(series_collection.find())
        result = []

        for serie in series:
            serie['id'] = str(serie['_id']) 
            del serie['_id'] 
            result.append(serie)
        return result
    except Exception as e:
        raise Exception(f"Error al obtener películas: {e}")

def agregar_pelicula_favorita(user_id: str, pelicula_id: str):
    try:
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"mis_peliculas_favoritas": pelicula_id}}
        )
        if result.matched_count == 0:
            raise Exception("Usuario no encontrado")
        return {"mensaje": "Película agregada a favoritos"}
    except Exception as e:
        raise Exception(f"Error al agregar película a favoritos: {e}")


def agregar_serie_favorita(user_id: str, serie_id: str):
    try:
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"mis_series_favoritas": serie_id}}
        )
        if result.matched_count == 0:
            raise Exception("Usuario no encontrado")
        return {"mensaje": "Serie agregada a favoritos"}
    except Exception as e:
        raise Exception(f"Error al agregar serie a favoritos: {e}")

def eliminar_pelicula_favorita(user_id: str, pelicula_id: str):
    try:
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"mis_peliculas_favoritas": pelicula_id}}
        )
        if result.matched_count == 0:
            raise Exception("Usuario no encontrado")
        return {"mensaje": "Película eliminada de favoritos"}
    except Exception as e:
        raise Exception(f"Error al eliminar película de favoritos: {e}")

def eliminar_serie_favorita(user_id: str, serie_id: str):
    try:
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"mis_series_favoritas": serie_id}}
        )
        if result.matched_count == 0:
            raise Exception("Usuario no encontrado")
        return {"mensaje": "Serie eliminada de favoritos"}
    except Exception as e:
        raise Exception(f"Error al eliminar serie de favoritos: {e}")
