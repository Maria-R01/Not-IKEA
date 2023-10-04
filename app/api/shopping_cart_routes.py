from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import ShoppingCart

shopping_cart_routes = Blueprint('shopping_carts', __name__)

@shopping_cart_routes.route('/')
def home():
    """
    """
    return "<h1>Hello from backend shopping_cart route '/' </h1>"