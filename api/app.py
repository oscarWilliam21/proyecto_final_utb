import os
from flask import Flask, jsonify
from flask_cors import CORS
from config.mail_config import mail
from routes.routes import register_routes
from database.conexion_mongodb import db
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Permite conexión desde el cliente

app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT"))
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS") == "True"
app.config['MAIL_USE_SSL'] = os.getenv("MAIL_USE_SSL") == "True"

mail.init_app(app)

@app.route("/")
def index():
    colecciones = db.list_collection_names()
    return jsonify({"mensaje": "Bienvenido a StreamZone API", "colecciones": colecciones})


register_routes(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
