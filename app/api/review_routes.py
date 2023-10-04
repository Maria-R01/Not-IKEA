from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/all_reviews')
def get_all_reviews():
    """
    Get All Reviews:
    Retrieves all reviews and returns them as a JSON list.
    """
    reviews = Review.query.all()
    reviews_list = []
    for review in reviews:
        review_dict = review.to_dict()
        reviews_list.append(review_dict)
    return {"allReviews": reviews_list}

@review_routes.route('/<int:id>')
def reviews_by_review_id(id):
    """
    Get Review by Review ID:
    Retrieves a review by its ID and returns it as a JSON dictionary.
    """
    review = Review.query.get(id)
    if not review:
        return jsonify({"message": "Review not found"}), 404
    review_dict = review.to_dict()
    return review_dict

@review_routes.route('/item/<int:item_id>')
def reviews_by_item_id(item_id):
    """
    Get Reviews by Item ID:
    Retrieves reviews associated with a specific item by its ID and returns them as a JSON list.
    """
    reviews = Review.query.filter_by(item_id=item_id).all()
    item_reviews_list = []
    for review in reviews:
        review_dict = review.to_dict()
        item_reviews_list.append(review_dict)
    return {"itemReviews": item_reviews_list}

@review_routes.route('/user/<int:user_id>')
def reviews_by_user_id(user_id):
    """
    Get Reviews by User ID:
    Retrieves reviews associated with a specific user by their ID and returns them as a JSON list.
    """
    reviews = Review.query.filter_by(user_id=user_id).all()
    user_reviews_list = []
    for review in reviews:
        review_dict = review.to_dict()
        user_reviews_list.append(review_dict)
    return {"userReviews": user_reviews_list}

@review_routes.route('/new_review', methods=['POST'])
@login_required
def create_new_review():
    """
    Create a New Review:
    Creates a new review with the provided review text, star rating, and associated item.
    """
    data = request.json
    review_text = data.get('review')
    stars = data.get('stars')
    item_id = data.get('item_id')

    if not review_text or not stars or not item_id:
        return jsonify({"message": "All fields (review, stars, item_id) are required"}), 400
    
    if stars is None or not (1 <= stars <= 5):
        return jsonify({"message": "Stars must be between 1 and 5"}), 400

    existing_review = Review.query.filter_by(user_id=current_user.id, item_id=item_id).first()
    if existing_review:
        return jsonify({"message": "You have already reviewed this item"}), 400

    review = Review(
        review=review_text,
        stars=stars,
        user_id=current_user.id,
        item_id=item_id,
    )

    db.session.add(review)
    db.session.commit()
    return jsonify({"message": "Review created successfully", "id": review.id})

@review_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_existing_review(id):
    """
    Update Existing Review:
    Updates an existing review with the provided review text and star rating.
    """
    data = request.json
    review_text = data.get('review')
    stars = data.get('stars')

    if not review_text or not stars:
        return jsonify({"message": "Review and stars are required"}), 400

    review = Review.query.get(id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    if review.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to update this review"}), 403

    review.review = review_text
    review.stars = stars

    db.session.commit()
    return jsonify({"message": "Review updated successfully"})


@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete Review:
    Deletes an existing review by its ID.
    """
    review = Review.query.get(id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    if review.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to delete this review"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"})

