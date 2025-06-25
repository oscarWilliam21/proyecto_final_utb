from flask import Blueprint, jsonify, request
from controllers.movie_controller import  get_all_movies, get_all_series

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
    

