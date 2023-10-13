from flask import Blueprint, jsonify, redirect
from app.models import Item, Review
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

@search_routes.route("/<searchInput>", methods=["GET"])
def search_posts(searchInput):
    # print('---------------------')
    # print('searchinput: ', searchInput)
    # print('---------------------')
    searched_item = Item.query.filter(or_(Item.item_name.ilike(
        f"%{searchInput}%"), Item.price.ilike(f"%{searchInput}%"), Item.description.ilike(f"%{searchInput}%"))).all()
    item_lists = [item.to_dict() for item in searched_item]
    # print('---------------------')
    # print('item_list :', item_lists)
    # print('---------------------')
    if searched_item is None:
        return jsonify(error="Item could not be found"), 404

    response_data = {
        "items": item_lists
    }
    # print('---------------------')
    # print('response being sent back: ', response_data)

    return jsonify(response_data)