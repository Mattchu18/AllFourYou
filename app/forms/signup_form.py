from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_phone_number(form, field):
    # Checking if phone number is exactly 10 characters long and consists only of digits
    phone_number = field.data
    user = User.query.filter(User.phone_number == phone_number).first()
    if len(phone_number) != 10 or not phone_number.isdigit():
        raise ValidationError('Please enter a valid phone number.')
    if user:
        raise ValidationError('Phone numbers is already associated with an existing account.')
class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    first_name = StringField("first_name", validators=[DataRequired()])
    last_name = StringField("last_name", validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists,Email()])
    password = StringField('password', validators=[DataRequired()])

    city = StringField('city', validators=[DataRequired()])
    phone_number = StringField('phone_number',validators=[DataRequired(),validate_phone_number])
