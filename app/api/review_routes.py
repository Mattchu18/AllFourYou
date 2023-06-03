from flask import Blueprint, jsonify
from app.models.review import Review
from flask_login import login_required, current_user
from app.models import User

review_routes = Blueprint('review', __name__, url_prefix='')

@review_routes.route('/currentUser')
@login_required
def get_current_reviews():
    all_review = Review.query.filter(Review.user_id == current_user.id).all()
    new_reviews = [review.to_dict() for review in all_review]
    return new_reviews

@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
    print(id)
    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review():
    pass