from flask import Blueprint, jsonify, request
from app.models.review import Review
from flask_login import login_required, current_user
from app.models import User
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

@review_routes.route('/currentUser/<int:id>')
@login_required
def get_one_review(id):
    """
    Gets one reviews of the current user
    """

    one_review = Review.query.get(id)
    print("THISI IS ID IN GET ONE REVIEW", one_review.to_dict())
    return one_review.to_dict()

@review_routes.route('/<int:id>', methods=["GET", "PUT"])
@login_required
def edit_review(id):
    """
    Current user is able to get review by review id and edit
    """
    print(id)
    reviewObj = Review.query.get(id)
    review=reviewObj.to_dict()
    form = ReviewForm()
    print("THIS IS REVIEW IN EDIT_REVIEW=======>", review)
    edit_review= Review(
        id=id,
        review_text= review["review_text"],
        star_rating= review["star_rating"],
        user_id= current_user.id,
        task_id= review["task_id"],
        tasker_id= review["tasker_id"],
    )
    print("THIS IS EDIT REVIEW IN ROUTE", edit_review.to_dict())
    db.session.commit()
    return edit_review.to_dict()
    # print(id)
    # reviewObj = Review.query.get(id)
    # review=reviewObj.to_dict()
    # form = ReviewForm()
    # print("HI FROM OUTSIDE =========", request)

    # if request.method == "PUT" or form.validate_on_submit():
    #     print("HIII**************")
    #     reviewObj.review_text = form.data["review_text"]
    #     reviewObj.star_rating = form.data["star_rating"]
    #     db.session.commit()

    #     return reviewObj.to_dict()

    # return review
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
