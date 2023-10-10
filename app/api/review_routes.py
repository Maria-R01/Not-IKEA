from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from ..forms import ReviewForm

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
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        review_text = data['review']
        stars = data['stars']
        item_id = data['item_id']
        user_id = data['user_id']

        existing_review = Review.query.filter_by(user_id=current_user.id, item_id=item_id).first()
        if existing_review:
            return jsonify({"message": "You have already reviewed this item"}), 400

        review = Review(
            review=review_text,
            stars=stars,
            user_id=user_id,
            item_id=item_id,
        )
        db.session.add(review)
        db.session.commit()
        newly_created_review = {
            "id": review.id,
            "review": review.review,
            "stars": review.stars,
            "user_id": review.user_id,
            "item_id": review.item_id,
        }
        return jsonify({"message": "Review created successfully", "review": newly_created_review})
    else: 
         return jsonify({"errors": form.errors}), 400

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
    
    # print('---------------------')
    # print('REVIEW USERID: ', review.user_id)
    # print('---------------------')

    if review.user_id != current_user.id:
        return jsonify({"message": "You are not authorized to update this review"}), 403

    review.review = review_text
    review.stars = stars

    # print('---------------------')
    # print('REVIEW UPDATED: ', review.to_dict())
    # print('---------------------')

    db.session.commit()
    
    return jsonify({"message": "Review updated successfully", "review": review.to_dict()})


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

