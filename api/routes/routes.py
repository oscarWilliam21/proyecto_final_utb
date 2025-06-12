from flask import Blueprint
from routes.auth_route import auth_bp
from routes.user_route import user_bp
from routes.movie_routes import movie_bp

def register_routes(app):
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(movie_bp, url_prefix="/api/movie")


