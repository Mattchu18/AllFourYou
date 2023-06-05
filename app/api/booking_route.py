from flask import Blueprint, render_template, redirect
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
    booking_list = [booking.to_dict() for booking in all_bookings]

    return booking_list

@booking_routes.route("/new", methods=["GET", "POST"])
@login_required
def create_booking():
    form = BookingForm()

    if form.validate_on_submit():
        print("IN FORM VALIDATE BOOKING")
        new_booking = Booking(
            category = form.data["category"],
            city = form.data["city"],
            duration = form.data["duration"],
            details = form.data["details"]
        )
        print(new_booking)
        db.session.add(new_booking)
        db.session.commit()

        return new_booking
    return "did not create"
