from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image

image_routes = Blueprint('images', __name__)

@image_routes.route('/')
def home():
    """
    """
    return "<h1>Hello from backend image route '/' </h1>"