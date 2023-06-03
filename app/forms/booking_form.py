from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

# class BookingForm(FlaskForm):
#     category=SelectField("Category", choices=["Breeding", "Matchmaking", "Cooking", "Dancing"])
#     details=TextAreaField("Please provide details", )
