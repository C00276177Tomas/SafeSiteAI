from flask import Flask
from flask_cors import CORS
from db import db  # Import db from db.py
from routes import routes_bp  # Import routes blueprint

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure database (replace with your MySQL credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:!Tereiscool1802@localhost/sitesafe'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db.init_app(app)

# Register blueprint for routes
app.register_blueprint(routes_bp)

if __name__ == '__main__':
    app.run(debug=True)
