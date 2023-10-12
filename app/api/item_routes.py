from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Item, Image, Review

item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_all_items():
    """
    Retrieve All Product Items:
    This route retrieves all product items and their details from the database, 
    including images and reviews, and returns them as a JSON list.
    """
    items = Item.query.all()
    items_list = []
    for item in items:
        item_dict = item.to_dict()
        items_list.append(item_dict)
    # print('ITEMS: ', items_list)
    return {"Items": items_list}

@item_routes.route('/<int:id>')
def item_by_item_id(id):
    """
    Retrieve Item Details by ID:
    This route retrieves the details of a product item by its ID, including images and reviews,
    and returns them as a JSON dictionary.
    """
    item_by_id = Item.query.get(id)
    if item_by_id is None:
        return item_not_found_error(404)
    item_dict = item_by_id.to_dict()
    # print(item_dict)
    return item_dict
 


@item_routes.errorhandler(404)
def item_not_found_error(error_dict):
    """
    This error handler is used when a requested resource is not found (404 error).
    It returns a JSON response with a 404 status code and a message indicating that 
    the requested resource could not be found.
    """
    return jsonify({"message": "Item not found"}, 404)

