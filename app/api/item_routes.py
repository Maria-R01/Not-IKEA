from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Item

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def home():
    """
    """
    return "<h1>Hello from backend item route '/' </h1>"