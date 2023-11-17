from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import WishlistItem, db

wishlist_routes = Blueprint('wishlist', __name__)

@wishlist_routes.route('/')
@login_required
def get_wishlist():
    wishlist_items = WishlistItem.query.filter_by(user_id=current_user.id).all()
    wishlist = [item.item_id for item in wishlist_items]
    return {'wishlist': wishlist}

@wishlist_routes.route('/add/<int:item_id>', methods=['POST'])
@login_required
def add_to_wishlist(item_id):
    wishlist_item = WishlistItem(
        user_id=current_user.id,
        item_id=item_id
    )
    
    db.session.add(wishlist_item)
    db.session.commit()

    return jsonify({'message': 'Item added to wishlist'})

@wishlist_routes.route('/remove/<int:item_id>', methods=['DELETE'])
@login_required
def remove_from_wishlist(item_id):
    wishlist_item = WishlistItem.query.filter_by(user_id=current_user.id, item_id=item_id).first()

    if wishlist_item:
        db.session.delete(wishlist_item)
        db.session.commit()
        return jsonify({'message': 'Item removed from wishlist'})
    else:
        return jsonify({'error': 'Item not found in wishlist'}), 404
