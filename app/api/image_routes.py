from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image, Item

image_routes = Blueprint('images', __name__)

@image_routes.route('/item/<int:id>')
def get_all_images_of_item(id):
    """
    Retrieve All Images of an Item by Item ID:
    This route retrieves all images associated with a specific product item by its ID
    and returns them as a JSON list.
    """
    images_of_item_list = []
    images_of_item = Image.query.filter_by(item_id=id).all()
    if not len(images_of_item):
        return image_not_found_error(404)
    for image in images_of_item:
        images_of_item_list.append(image.to_dict())
    return jsonify(images_of_item_list)

@image_routes.route('/<int:id>')
def get_image_by_id(id):
    """
    Retrieve Image Details by ID:
    This route retrieves the details of an image by its ID and returns them as a JSON dictionary.
    """
    image = Image.query.get(id)
    if image is None:
        return image_not_found_error(404)
    image_dict = image.to_dict()
    return image_dict


@image_routes.errorhandler(404)
def image_not_found_error(error_dict):
    """
    This error handler is used when a requested resource is not found (404 error).
    It returns a JSON response with a 404 status code and a message indicating that 
    the requested resource could not be found.
    """
    return jsonify({"message": "Image not found"}, 404)
