from database.conexion_mongodb import db

movies_collection = db['movies']

def get_all_movies():
    try:
        movies = list(movies_collection.find({}, {'_id': 0}))
        return movies
    except Exception as e:
        raise Exception(f"Error al obtener películas: {e}")