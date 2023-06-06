from flask import Blueprint, render_template, redirect, request
from flask_login import login_required, current_user
from ..models.db import db
from ..models.task import Task
from ..forms.booking_form import BookingForm
from ..models.booking import Booking
# from ..forms.post_form import PostForm
from datetime import date
from random import randint
from ..forms.review_form import ReviewForm
from ..models.review import Review

task_routes = Blueprint("task", __name__,url_prefix='')

@task_routes.route("/all")
def get_all_tasks():
    """
    This route will get all tasks regardless of being logged in
    """
    all_tasks_obj = Task.query.all()
    all_tasks = [tasks.to_dict() for tasks in all_tasks_obj]
    print(all_tasks)
    return all_tasks


@task_routes.route("/<int:id>")
@login_required
def get_task(id):
    """
    This route will get the task by id regardless of being logged in
    """
    one_task_obj = Task.query.get(id)
    task = one_task_obj.to_dict()
    if current_user.tasker == True and current_user.id == task["tasker_id"]:
    # you cannot dot notate into dictionary.
    # if current_user.tasker == True and current_user.id == one_task_obj.tasker_id:
        return task
    return "NO WAY BUD"


# @task_routes.route("/<int:id>/new", methods=["POST"])
# @login_required
# def create_booking(id):
#     """
#     The Current User will create a booking for a certain task
#     """
#     form = BookingForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     print("WHAT IS THIS", form.validate_on_submit())

#     task = Task.query.get(id)
#     if not task.available:
#         return {"message": "We apologize, but the task is not available."}

#     if form.validate_on_submit():
#         # print("IN FORM VALIDATE BOOKING")

#         new_booking = Booking(
#             category = form.data["category"],
#             city = form.data["city"],
#             duration = form.data["duration"],
#             details = form.data["details"],
#             user_id = current_user.id,
#             task_id = id
#             )
#         # print(new_booking)
#         db.session.add(new_booking)
#         db.session.commit()
#         return new_booking.to_dict()


    # return "Able to create!"


# @task_routes.route("/<int:id>/delete", methods=["DELETE"])
# @login_required
# def delete_task(id):
#     taskObj = Task.query.get(id)
#     if current_user.tasker == True and current_user.id == taskObj.tasker_id:
#         db.session.delete(taskObj)
#         db.session.commit()
#         return "BYE BYE"
#     return "You aint the owner of this task"


# @task_routes.route('/<int:id>/reviews', methods=["POST"])
# @login_required
# def create_review(id):
#     """
#     Post a review on tasker's page.
#     """
#     print(" HELLLLLOOOOO COME ON TELL ME IM HERE")
#     # tasks = Task.query.filter(Task.id == id).all()

#     task_obj = Task.query.get(id)
#     booking_obj = Booking.query.filter(id == Booking.task_id).one()
#     review_arr = Review.query.filter(Review.task_id == id).all()
#     review_obj = [review.to_dict() for review in review_arr]
#     print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", review_obj)

#     if len(review_obj)>0:
#         review_obj = review_obj[0]
#     # new_task = [task.to_dict() for task in tasks]
#     # print ("HELLO ITS ME =========================", new_task[0])
#     form = ReviewForm()
#     # print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING===>", review_obj)
#     print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", review_obj)

#     form["csrf_token"].data=request.cookies["csrf_token"]



#     if booking_obj.user_id == current_user.id:

#         if review_obj and review_obj["user_id"] == current_user.id:
#             return {"message": "We apologize, but we see that you already left a review."}

#         if form.validate_on_submit():
#     # print(" AM I GETTING IN HEREEE COME ONN")
#         # user_review_text= form.data["review_text"]
#         # user_star_rating = form.data["star_rating"]
#         # print("THIS IS WHAT I WANNA LOOK AT ", task_id)
#         # print("REQUEST PARAMS>ID==============>", id)
#             user_new_review=Review(
#                 review_text=form.data["review_text"],
#                 star_rating=form.data["star_rating"],
#                 user_id=current_user.id,
#                 task_id= task_obj.id,
#                 tasker_id = task_obj.tasker_id
#             )
#             db.session.add(user_new_review)
#             db.session.commit()
#             return user_new_review.to_dict()


#     return {"message": "This booking does not belong to you"}


@task_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def create_review(id):
    """
    Post a review on tasker's page.
    """
    print(" HELLLLLOOOOO COME ON TELL ME IM HERE")
    # tasks = Task.query.filter(Task.id == id).all()

    task_obj = Task.query.get(id)
    booking_obj = Booking.query.filter(id == Booking.task_id).one()
    review_arr = Review.query.filter(Review.task_id == id).all()
    review_obj = [review.to_dict() for review in review_arr]
    print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", review_obj)

    if len(review_obj)>0:
        review_obj = review_obj[0]
    # new_task = [task.to_dict() for task in tasks]
    # print ("HELLO ITS ME =========================", new_task[0])
    form = ReviewForm()
    # print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING===>", review_obj)
    print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", review_obj)

    form["csrf_token"].data=request.cookies["csrf_token"]



    if booking_obj.user_id == current_user.id:

        if review_obj and review_obj["user_id"] == current_user.id:
            return {"message": "We apologize, but we see that you already left a review."}

        if form.validate_on_submit():
    # print(" AM I GETTING IN HEREEE COME ONN")
        # user_review_text= form.data["review_text"]
        # user_star_rating = form.data["star_rating"]
        # print("THIS IS WHAT I WANNA LOOK AT ", task_id)
        # print("REQUEST PARAMS>ID==============>", id)
            user_new_review=Review(
                review_text=form.data["review_text"],
                star_rating=form.data["star_rating"],
                user_id=current_user.id,
                task_id= task_obj.id,
                tasker_id = task_obj.tasker_id
            )
            db.session.add(user_new_review)
            db.session.commit()
            return user_new_review.to_dict()


    return {"message": "This booking does not belong to you"}
