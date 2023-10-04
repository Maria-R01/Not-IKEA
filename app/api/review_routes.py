from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def home():
    """
    """
    return "<h1>Hello from backend review route '/' </h1>"