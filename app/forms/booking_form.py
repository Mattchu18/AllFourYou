from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class BookingForm(FlaskForm):
    category=SelectField("Category", choices=["Breeding", "Matchmaking", "Cooking", "Dancing"])
    city = SelectField("City", choices=["San Francisco", "Los Angeles", "Miami", "Toronto", "Joshua Tree"])
    duration = RadioField("Select an option", choices=[("short", "Small-Est 1hr" ),("medium", "Medium - Est. 2-3 hrs"), ("long", "Large - Est. 4+ hrs")])
    details=TextAreaField("Please provide details")
