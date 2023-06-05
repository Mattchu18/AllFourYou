from flask import Blueprint, render_template, redirect, request
from flask_login import login_required, current_user

from ..models.booking import Booking
from ..models.db import db
# from ..forms.post_form import PostForm
from datetime import date
from random import randint
from ..forms.booking_form import BookingForm

booking_routes = Blueprint("bookings", __name__,url_prefix='')

# print(__name__, "Inside bookings blueprint")

@booking_routes.route("/all")
@login_required
def get_all_bookings():
    """
    route to fetch and display all bookings for logged in user
    """
    print("ThIS IS ALL BOOKINGS======>", Booking.user_id)
    all_bookings = Booking.query.filter(Booking.user_id == current_user.id).all()
    print(all_bookings)
    booking_list = [booking.to_dict() for booking in all_bookings]

    return booking_list

@booking_routes.route("/<int:id>")
@login_required
def get_one_booking(id):
    one_booking = Booking.query.get(id)

    return one_booking.to_dict()


@booking_routes.route("/new", methods=["GET", "POST"])
@login_required
def create_booking():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("WHAT IS THIS", form.validate_on_submit())
    if form.validate_on_submit():
        # print("IN FORM VALIDATE BOOKING")

        new_booking = Booking(
            category = form.data["category"],
            city = form.data["city"],
            duration = form.data["duration"],
            details = form.data["details"]
            )
        # print(new_booking)
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    # return "Able to create!"

@booking_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_booking(id):
    bookingObj = Booking.query.get(id)
    booking=bookingObj.to_dict()
    print("THIS IS IBOOKING OBJ=================>", bookingObj.details)
    form=BookingForm()
    print("THIS IS FORM > DATA ============>", form.data)
    # booking["category"]=form.data["category"]
    bookingObj.category=form.data["category"]
    bookingObj.city=form.data["city"]
    bookingObj.duration=form.data["duration"]
    bookingObj.details=form.data["details"]

    db.session.commit()
    return bookingObj.to_dict()


