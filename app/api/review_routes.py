from flask import Blueprint, jsonify
from app.models.review import Review
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db

review_routes = Blueprint('reviews', __name__, url_prefix='')

@review_routes.route('/currentUser')
@login_required
def get_current_reviews():
    """
    Gets all reviews of the current user
    """
    all_review = Review.query.filter(Review.user_id == current_user.id).all()
    new_reviews = [review.to_dict() for review in all_review]
    return new_reviews

@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
    """
    Current user is able to get review by review id and edit
    """
    print(id)
    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Current user is able to delete review by review id
    """
    selected_review = Review.query.get(id)
    db.session.delete(selected_review)
    db.session.commit()
    return 'DELETED'
