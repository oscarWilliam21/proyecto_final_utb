from flask import Blueprint, jsonify
from controllers.movie_controller import get_all_movies

movie_bp = Blueprint('movie_bp', __name__)

@movie_bp.route('/movies', methods=['GET'])
def fetch_movies():
    try:
        movies = get_all_movies()
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500