from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
login_manager = LoginManager()
cors = CORS() # Initialize CORS

# Configure Flask-Login
def configure_login_manager(app):
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login' # Redirect to login page if not authenticated
    login_manager.login_message_category = 'info' # Optional: flash message category

    @login_manager.user_loader
    def load_user(user_id):
        # This function is used by Flask-Login to reload the user object from the session
        # It needs to return the User object or None
        # Import User model here to avoid circular import issues
        from backend.app.models import User
        return User.query.get(int(user_id))