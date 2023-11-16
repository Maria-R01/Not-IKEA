from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update the current user's information
    """
    data = request.get_json()

    # Ensure that the user making the request is the owner of the account
    # print('-----------------------')
    # print(data.get('id'))
    # print('-----------------------')
    if current_user.id != data.get('id'):
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.get(data['id'])
    user.email = data['email']
    user.username = data['username']
    if 'password' in data:
        # Hash the new password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.password = hashed_password

    db.session.commit()
    return jsonify(user.to_dict())
    # return jsonify({'message': 'User updated successfully'})