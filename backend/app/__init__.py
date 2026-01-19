from flask import Flask
from backend.app.extensions import db # Import db from extensions.py
from backend.app.models import create_tables_and_admin # Import the creation function
from flask_migrate import Migrate # For database migrations

def create_app():
    app = Flask(__name__)
    # Load configuration from config.py or environment variables
    app.config.from_object('backend.app.config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db) # Initialize Flask-Migrate

    # Register blueprints for routes here if using blueprints
    # from backend.app.routes.auth import auth_bp
    # app.register_blueprint(auth_bp)

    # Call the function to create tables and admin user
    create_tables_and_admin(app)

    # Return the configured app instance
    return app