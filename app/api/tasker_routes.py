from flask import Blueprint, jsonify, request
from app.models.review import Review
from app.models.tasker import Tasker
from app.models.task import Task
from app.models.booking import Booking
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db
from ..forms import ReviewForm
from ..forms import BookingForm

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

# @tasker_routes.route('/<int:id>/reviews')
# def get_tasker_reviews(id):
#     """
#     Gets taskers reviews by id
#     """

#     tasks = Task.query.filter(Task.tasker_id == id).all()
#     task_obj = [task.to_dict() for task in tasks]

#     task_id_list = [task["id"] for task in task_obj]
#     print("THIS IS TASK_ID_LIST====>",task_id_list)

#     review_list = []
#     for task_id in task_id_list:
#         res = Review.query.filter(Review.task_id == task_id).all()

#         if len(res):
#             res_dict = res[0].to_dict()
#             review_list.append(res_dict)
#             continue
#         else:
#             return {"response": "tasker has no reviews"}
#     return review_list


@tasker_routes.route('/all')
def get_all_taskers():
    """
    Gets all Taskers
    """
    all_taskers_obj = Tasker.query.all()
    all_taskers = [tasker.to_dict() for tasker in all_taskers_obj]
    return all_taskers

@tasker_routes.route('/<int:id>')
def get_single_tasker(id):
    """
    Gets single tasker by id
    """

    single_tasker = Tasker.query.get(id)

    return single_tasker.to_dict()

@tasker_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def create_review(id):
    """
    Post a review on tasker's page.
    """
    print(" HELLLLLOOOOO COME ON TELL ME IM HERE")
    # tasks = Task.query.filter(Task.id == id).all()
    tasker_obj = Tasker.query.get(id)
    # task_obj=Task.query.filter(Task.id == tasker_obj.task_id)
    task_obj = Task.query.get(tasker_obj.task_id)
    booking_obj = Booking.query.filter(Booking.user_id == current_user.id).all()
    review_obj = Review.query.filter(Review.tasker_id == id).all()
    for review in review_obj:
        if review.user_id == current_user.id:
            return {"message": "We apologize, but you have made a review for this tasker already!"}

    for booking in booking_obj:
        print("THIS IS BOOKING OBJ~~~~~~~~~~~~~~~~", booking)

        print("THIS IS THE BOOKING ========>", booking.id)
        if booking.tasker_id == id:
            form = ReviewForm()
            print("HELLO THIS IS MY FORM DO I EVEN GET ANYTHING", form.data['review_text'])
            form["csrf_token"].data=request.cookies["csrf_token"]
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
                    booking_id = booking.id,
                    tasker_id = id
                )
                db.session.add(user_new_review)
                db.session.commit()
                return user_new_review.to_dict()
    return {"message": "We apologize, but you need to book this tasker first!"}



@tasker_routes.route("/<int:id>/book", methods=["POST"])
@login_required
def create_booking(id):
    """
    The Current User will create a booking
    """
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("WHAT IS THIS", form.validate_on_submit())

    tasker = Tasker.query.get(id)

    booking_arr_obj = Booking.query.filter(Booking.user_id == current_user.id).all()
    booking_arr = [booking.to_dict() for booking in booking_arr_obj]

    print("This is the booking array!!! ====> ", booking_arr)

    for booking in booking_arr:
        if booking["tasker_id"] == id:
            return {"message": "We apologize, but you already have a booking with this tasker!"}


    if not tasker.available:
        return {"message": "We apologize, but the tasker is not available."}


    if form.validate_on_submit():
        # print("IN FORM VALIDATE BOOKING")

        new_booking = Booking(
            category = form.data["category"],
            city = form.data["city"],
            duration = form.data["duration"],
            details = form.data["details"],
            user_id = current_user.id,
            tasker_id = id
            )

        tasker.available = False
        # print(new_booking)
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
