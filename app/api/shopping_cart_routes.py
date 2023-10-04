from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import ShoppingCart, Item, db
from ..forms import AddToCartForm

shopping_cart_routes = Blueprint('shopping_carts', __name__)

@shopping_cart_routes.route('/', methods=['GET'])
@login_required
def view_cart():
    """
    View Shopping Cart Contents:
    Retrieves the contents of the user's shopping cart, including item details, quantities, prices, and subtotals.
    The total cart subtotal is also calculated and returned with two decimal places.
    """
    cart = ShoppingCart.query.filter_by(user_id=current_user.id).all()
    cart_items = []
    total_cart_subtotal = 0
    for cart_item in cart:
        item = Item.query.get(cart_item.item_id)
        subtotal = item.price * cart_item.quantity
        subtotal = round(subtotal, 2)
        cart_items.append({
            "item_id": item.id,
            "item_name": item.item_name,
            "quantity": cart_item.quantity,
            "price": item.price,
            "subtotal": subtotal
        })
        total_cart_subtotal += subtotal
    total_cart_subtotal = round(total_cart_subtotal, 2)

    return jsonify({"shoppingCart": cart_items, "cartSubtotal": total_cart_subtotal})


@shopping_cart_routes.route('/add/<int:item_id>', methods=['POST'])
@login_required
def add_item_to_cart(item_id):
    """
    Add Item to Shopping Cart:
    Adds an item to the user's shopping cart. If the item is already in the cart, the quantity is updated.
    """
    form = AddToCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        quantity = data['quantity']
        item = Item.query.get(item_id)

        if not item:
            return jsonify({"message": "Item not found"}), 404

        if quantity > item.available_quantity:
            return jsonify({"message": "Exceeds available quantity"}), 400

        cart_item = ShoppingCart.query.filter_by(user_id=current_user.id, item_id=item_id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = ShoppingCart(user_id=current_user.id, item_id=item_id, quantity=quantity)
            db.session.add(cart_item)

        db.session.commit()
        return jsonify({"message": "Item added to cart successfully"})
    else:
        return jsonify({"errors": form.errors}), 400

@shopping_cart_routes.route('/update/<int:item_id>', methods=['PUT'])
@login_required
def update_item_quantity(item_id):
    """
    Update Item Quantity in Shopping Cart:
    Updates the quantity of an item in the user's shopping cart.
    """
    cart_item = ShoppingCart.query.filter_by(user_id=current_user.id, item_id=item_id).first()
    if not cart_item:
        return jsonify({"message": "Item not found in cart"}), 404

    new_quantity = request.json.get('quantity')
    if new_quantity is None or new_quantity <= 0:
        return jsonify({"message": "Invalid quantity"}), 400
    
    if new_quantity > item.available_quantity:
        return jsonify({"message": "Exceeds available quantity"}), 400

    cart_item.quantity = new_quantity
    db.session.commit()
    return jsonify({"message": "Quantity updated successfully"})

@shopping_cart_routes.route('/remove/<int:item_id>', methods=['DELETE'])
@login_required
def remove_item_from_cart(item_id):
    """
    Remove Item from Shopping Cart:
    Removes an item from the user's shopping cart.
    """
    cart_item = ShoppingCart.query.filter_by(user_id=current_user.id, item_id=item_id).first()
    if not cart_item:
        return jsonify({"message": "Item not found in cart"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Item removed from cart successfully"})

@shopping_cart_routes.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    """
    Clear Shopping Cart:
    Removes all items from the user's shopping cart.
    """
    cart_items = ShoppingCart.query.filter_by(user_id=current_user.id).all()
    
    for cart_item in cart_items:
        db.session.delete(cart_item)
    
    db.session.commit()
    return jsonify({"message": "Cart has been cleared"})

