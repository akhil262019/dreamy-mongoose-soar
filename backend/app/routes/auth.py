from flask import Blueprint, request, jsonify
from backend.app.models import User, Patient, Doctor # Import models
from backend.app.extensions import db, login_manager
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']
    role = data.get('role', 'patient') # Default to patient

    # Ensure only 'patient' role can register through this endpoint for now
    # Admin and Doctor creation should be handled differently (e.g., by admin)
    if role not in ['patient']: # Add 'doctor' if doctor self-registration is allowed
         return jsonify({'message': 'Invalid role for registration'}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    # Create new user
    new_user = User(username=username, role=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    # If role is patient, create a patient profile
    if role == 'patient':
        patient_name = data.get('name', username) # Use username as name if not provided
        patient = Patient(user_id=new_user.id, name=patient_name)
        db.session.add(patient)
        db.session.commit()
    # Add logic for doctor registration if needed, though admin usually creates doctors
    # elif role == 'doctor':
    #     doctor_name = data.get('name', username)
    #     specialization = data.get('specialization', 'General')
    #     doctor = Doctor(user_id=new_user.id, name=doctor_name, specialization=specialization)
    #     db.session.add(doctor)
    #     db.session.commit()

    return jsonify({'message': 'User registered successfully', 'user': {'id': new_user.id, 'username': new_user.username, 'role': new_user.role}}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user) # Flask-Login handles session management
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role
            }
        })
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required # Requires user to be logged in
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})

@auth_bp.route('/user', methods=['GET'])
@login_required # Requires user to be logged in
def get_current_user():
    # current_user is provided by Flask-Login
    user_data = {
        'id': current_user.id,
        'username': current_user.username,
        'role': current_user.role
    }
    # Add profile info if available
    if current_user.role == 'doctor' and current_user.doctor_profile:
        user_data['profile'] = {
            'name': current_user.doctor_profile.name,
            'specialization': current_user.doctor_profile.specialization
        }
    elif current_user.role == 'patient' and current_user.patient_profile:
        user_data['profile'] = {
            'name': current_user.patient_profile.name,
            'contact': current_user.patient_profile.contact
        }
    # Admin uses User model directly, no separate profile model defined here

    return jsonify(user_data)

@auth_bp.route('/check_auth', methods=['GET'])
def check_auth():
    # This endpoint can be used by the frontend to check if a user is logged in
    if current_user.is_authenticated:
        user_info = {
            'id': current_user.id,
            'username': current_user.username,
            'role': current_user.role
        }
        # Optionally include profile details if needed
        if current_user.role == 'doctor' and current_user.doctor_profile:
            user_info['profile_name'] = current_user.doctor_profile.name
        elif current_user.role == 'patient' and current_user.patient_profile:
            user_info['profile_name'] = current_user.patient_profile.name

        return jsonify({'authenticated': True, 'user': user_info})
    else:
        return jsonify({'authenticated': False})