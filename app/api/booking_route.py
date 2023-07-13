from flask import Blueprint
from flask_login import login_required, current_user
from ..models.booking import Booking
from ..models.tasker import Tasker
from ..models.db import db
from datetime import datetime
from random import randint
from ..forms.booking_form import BookingForm

booking_routes = Blueprint("bookings", __name__,url_prefix='')


@booking_routes.route("/all")
@login_required
def get_all_bookings():
    """
    route to fetch and display all bookings for logged in user
    """
    all_bookings = Booking.query.filter(Booking.user_id == current_user.id).all()
    booking_list = [booking.to_dict() for booking in all_bookings]
    return booking_list


@booking_routes.route("/single/<int:id>")
@login_required
def get_one_booking(id):
    """
    This route gets one booking by id
    """
    one_booking = Booking.query.get(id)

    return one_booking.to_dict()


@booking_routes.route("/edit/<int:id>", methods=["PUT"])
@login_required
def edit_booking(id):
    bookingObj = Booking.query.get(id)
    booking=bookingObj.to_dict()
    form=BookingForm()
    if bookingObj.user_id==current_user.id:

        bookingObj.category=booking["category"]
        bookingObj.city=booking["city"]
        bookingObj.duration=form.data["duration"]
        bookingObj.details=form.data["details"]
        bookingObj.created_at=booking['created_at']
        bookingObj.updated_at=datetime.now()

        db.session.commit()
        return bookingObj.to_dict()
    return {"message": "We apologize, but this booking does not belong to you!"}


@booking_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):

    bookingObj = Booking.query.get(id)

    if not bookingObj:
        return {"message": "We apologize, but this booking does not exist..."}

    taskerObj = Tasker.query.get(bookingObj.tasker_id)

    if bookingObj.user_id==current_user.id:
        db.session.delete(bookingObj)
        taskerObj.available = True
        db.session.commit()
        return {"message": "Booking successfully deleted!"}
    return {"message": "We apologize, but you are not the owner of this booking."}
