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

@booking_routes.route("/single/<int:id>")
@login_required
def get_one_booking(id):
    one_booking = Booking.query.get(id)

    return one_booking.to_dict()

@booking_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def edit_booking(id):
    bookingObj = Booking.query.get(id)
    booking=bookingObj.to_dict()
    print("THIS IS IBOOKING OBJ=================>", bookingObj.details)
    form=BookingForm()
    print("THIS IS FORM > DATA ============>", form.data)
    # booking["category"]=form.data["category"]
    if bookingObj.user_id==current_user.id:

        bookingObj.category=booking["category"]
        bookingObj.city=booking["city"]
        bookingObj.duration=form.data["duration"]
        bookingObj.details=form.data["details"]
        bookingObj.created_at=booking['created_at']
        bookingObj.updated_at=form.data['updated_at']

        db.session.commit()
        return bookingObj.to_dict()
    return "Booking dont belong to you buster"

@booking_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):

    bookingObj = Booking.query.get(id)
    if bookingObj.user_id==current_user.id:
        db.session.delete(bookingObj)
        db.session.commit()
        return "It's been done"
    return "Ooops you're not the owner buster"