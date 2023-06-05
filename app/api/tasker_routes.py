from flask import Blueprint, jsonify, request
from app.models.review import Review
from app.models.tasker import Tasker
from app.models.task import Task
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from ..forms import ReviewForm

tasker_routes = Blueprint('taskers', __name__, url_prefix='')

# @tasker_routes.route('/<int:id>')
# def get_tasker(id):
#     """
#     Gets tasker by id
#     """
#     tasker = Tasker.query.get(id)
#     print("THIS IS TASKER.ID ", tasker.id)
#     tasker_obj = tasker.to_dict()
#     print("This is Tasker_id ", tasker_obj)
#     task_id = Task.query.get(Task.tasker_id == tasker.id)
#     task_dict = task_id.to_dict()
#     print("This is Task_id ", task_dict)
#     tasker_reviews = Review.query.get(id)
#     # print("THIS IS WHAT WE NEED ", tasker_reviews)
#     res = [task.to_dict() for task in tasker_reviews]
#     return res

@tasker_routes.route('/<int:id>')
def get_tasker_reviews(id):
    """
    Gets tasker by id
    """

    tasks = Task.query.filter(Task.tasker_id == id).all()
    task_obj = [task.to_dict() for task in tasks]

    task_id_list = [task["id"] for task in task_obj]
    print("THIS IS TASK_ID_LIST====>",task_id_list)

    review_list = []
    for task_id in task_id_list:
        res = Review.query.filter(Review.task_id == task_id).all()

        if len(res):
            res_dict = res[0].to_dict()
            review_list.append(res_dict)
            continue
        else:
            return {"response": "tasker has no reviews"}
    return review_list

@tasker_routes.route('/<int:id>/reviews', methods=["POST"])
# @login_required
def create_review(id):
    """
    Post a review on tasker's page.
    """
    print(" HELLLLLOOOOO COME ON TELL ME IM HERE")
    tasks = Task.query.filter(Task.id == id).all()
    new_task = [task.to_dict() for task in tasks]
    print ("HELLO ITS ME =========================", new_task[0])
    form = ReviewForm()
    print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", form.data['review_text'])
    form["csrf_token"].data=request.cookies["csrf_token"]
    # if form.validate_on_submit():
    # print(" AM I GETTING IN HEREEE COME ONN")
        # user_review_text= form.data["review_text"]
        # user_star_rating = form.data["star_rating"]
        # print("THIS IS WHAT I WANNA LOOK AT ", task_id)
        # print("REQUEST PARAMS>ID==============>", id)
    user_new_review=Review(
        review_text=form.data["review_text"],
        star_rating=form.data["star_rating"],
        user_id=current_user.id,
        task_id= new_task[0]['id'],
        tasker_id = new_task[0]["tasker_id"]
        )
    db.session.add(user_new_review)
    db.session.commit()
    return user_new_review.to_dict()
    # return "hi"
