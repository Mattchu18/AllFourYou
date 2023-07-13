from flask import Blueprint
from app.models.review import Review
from flask_login import login_required, current_user

from app.models.db import db
from app.forms.review_form import ReviewForm
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

@review_routes.route('/all')
def get_all_reviews():
    """
    Gets all Reviews
    """
    all_reviews_obj = Review.query.all()
    all_reviews = [review.to_dict() for review in all_reviews_obj]
    return all_reviews

@review_routes.route('/currentUser/<int:id>')
@login_required
def get_one_review(id):
    """
    Gets one reviews of the current user
    """

    one_review = Review.query.get(id)
    return one_review.to_dict()

@review_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
    """
    Current user is able to get review by review id and edit
    """
    reviewObj = Review.query.get(id)

    if not reviewObj:
        return {"message":"This review does not exist"}

    elif current_user.id == reviewObj.user_id:

        form = ReviewForm()
        reviewObj.review_text = form.data["review_text"]
        reviewObj.star_rating = form.data["star_rating"]
        db.session.commit()

        return reviewObj.to_dict()
    return {"message": "This review does not belong to you"}

    # return review
@review_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Current user is able to delete review by review id
    """
    selected_review = Review.query.get(id)
    if not selected_review:
        return {"message":"This review does not exist"}

    elif current_user.id == selected_review.user_id:

        db.session.delete(selected_review)
        db.session.commit()
        return {"message": 'This has been deleted', "reviewId": id}
    return {"message": "This review does not belong to you"}
