from flask import Flask
from flask_cors import CORS
from db import db  # Import db from db.py
from routes import routes_bp  # Import routes blueprint
from config import DevelopmentConfig, TestingConfig

def create_app(config_class=DevelopmentConfig):
    # Initialize Flask app
    app = Flask(__name__)
    CORS(app)
    
    # Apply configuration
    app.config.from_object(config_class)
    
    # Initialize SQLAlchemy with the app
    db.init_app(app)
    
    # Register blueprint for routes
    app.register_blueprint(routes_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run()