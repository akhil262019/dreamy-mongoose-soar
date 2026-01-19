from flask import Flask
from backend.app.extensions import db, login_manager, cors, configure_login_manager
from backend.app.models import create_tables_and_admin
from flask_migrate import Migrate
import os

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    env = os.environ.get('FLASK_ENV', 'development')
    if env == 'production':
        app.config.from_object('backend.app.config.ProductionConfig')
    else:
        app.config.from_object('backend.app.config.DevelopmentConfig') # Use DevelopmentConfig

    # Initialize extensions
    db.init_app(app)
    configure_login_manager(app) # Configure Flask-Login
    # Initialize CORS with app, allow all origins for development
    # In production, restrict CORS_ORIGINS to your frontend domain
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}}) 

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Call the function to create tables and admin user
    # This function is defined in models.py and handles DB creation and default admin
    create_tables_and_admin(app)

    # Register blueprints for routes
    # Authentication routes
    from backend.app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # Register other blueprints here for admin, doctor, patient routes once they are created
    # Example:
    # from backend.app.routes.admin import admin_bp
    # app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app