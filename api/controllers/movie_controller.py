from http.client import HTTPException

from bson import ObjectId
from database.conexion_mongodb import db

movies_collection = db['movies']
series_collection = db['series']

def get_all_movies():
    try:
        movies = list(movies_collection.find({}, {'_id': 0}))
        return movies
    except Exception as e:
        raise Exception(f"Error al obtener películas: {e}")

def get_all_series():
    try:
        series = list(series_collection.find({}, {'_id': 0}))
        return series
    except Exception as e:
        raise Exception(f"Error al obtener películas: {e}")

