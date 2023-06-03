from flask import Blueprint, render_template, redirect
from flask_login import login_required, current_user

from ..models.booking import Booking
from ..models.db import db
# from ..forms.post_form import PostForm
from datetime import date
from random import randint

booking_routes = Blueprint("bookings", __name__,url_prefix='')

# print(__name__, "Inside bookings blueprint")

@booking_routes.route("/all")
@login_required
def get_all_bookings():
    """
    route to fetch and display all bookings for logged in user
    """
    all_bookings = Booking.query.all()
    print(all_bookings)
    return "ALL bookings page"

# @booking_routes.route("")
# def
# pass
