from flask import Blueprint, jsonify, request
from controllers.movie_controller import  agregar_pelicula_favorita, agregar_serie_favorita, eliminar_pelicula_favorita, eliminar_serie_favorita, get_all_movies, get_all_series

movie_bp = Blueprint('movie_bp', __name__)

@movie_bp.route('/movies', methods=['GET'])
def fetch_movies():
    try:
        movies = get_all_movies()
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@movie_bp.route('/series', methods=['GET'])
def fetch_series():
    try:
        series = get_all_series()
        return jsonify(series), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@movie_bp.route('/favoritos/peliculas/<string:user_id>/<string:pelicula_id>', methods=['POST'])
def add_pelicula_favorita(user_id, pelicula_id):
    try:
        result = agregar_pelicula_favorita(user_id, pelicula_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@movie_bp.route('/favoritos/series/<string:user_id>/<string:serie_id>', methods=['POST'])
def add_serie_favorita(user_id, serie_id):
    try:
        result = agregar_serie_favorita(user_id, serie_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@movie_bp.route('/favoritos/peliculas/<string:user_id>/<string:pelicula_id>', methods=['DELETE'])
def delete_pelicula_favorita(user_id, pelicula_id):
    try:
        result = eliminar_pelicula_favorita(user_id, pelicula_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@movie_bp.route('/favoritos/series/<string:user_id>/<string:serie_id>', methods=['DELETE'])
def delete_serie_favorita(user_id, serie_id):
    try:
        result = eliminar_serie_favorita(user_id, serie_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


