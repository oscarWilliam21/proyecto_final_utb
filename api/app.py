from flask import Flask, jsonify
from flask_cors import CORS
from routes.routes import register_routes
from database.conexion_mongodb import db

app = Flask(__name__)
CORS(app)  # Permite conexión desde el cliente

@app.route("/")
def index():
    colecciones = db.list_collection_names()
    return jsonify({"mensaje": "Bienvenido a StreamZone API", "colecciones": colecciones})


register_routes(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
