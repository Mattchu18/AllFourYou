from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class BookingForm(FlaskForm):
    category=SelectField("Category", choices=["Breeding", "Matchmaking", "Cooking", "Dancing"], validators=[DataRequired()])
    city = SelectField("City", choices=["San Francisco", "Los Angeles", "Florida"], validators=[DataRequired()])
    duration = RadioField("Select an option", choices=[("option1", "Small-Est 1hr" ),("option2", "Medium - Est. 2-3 hrs"), ("option3", "Large - Est. 4+ hrs")], validators=[DataRequired()])
    details=TextAreaField("Please provide details", validators=[DataRequired()])

