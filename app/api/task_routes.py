from flask import Blueprint, render_template, redirect, request
from flask_login import login_required, current_user
from ..models.db import db
from ..models.task import Task
from ..forms.booking_form import BookingForm
from ..models.booking import Booking
# from ..forms.post_form import PostForm
from datetime import date
from random import randint


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


@task_routes.route("/<int:id>/new", methods=["POST"])
@login_required
def create_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("WHAT IS THIS", form.validate_on_submit())
    if form.validate_on_submit():
        # print("IN FORM VALIDATE BOOKING")

        new_booking = Booking(
            category = form.data["category"],
            city = form.data["city"],
            duration = form.data["duration"],
            details = form.data["details"],
            user_id = current_user.id,
            task_id = id
            )
        # print(new_booking)
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    # return "Able to create!"
