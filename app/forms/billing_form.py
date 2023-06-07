from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField, IntegerField,BooleanField,RadioField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import User

class BillingForm(FlaskForm):

    first_name=StringField("Card holder first name",valdators=[DataRequired()])
    last_name=StringField("Card holder last name", validators=[DataRequired()])
    card_number=IntegerField('Card number', validators=[DataRequired(),Length(min=16,max=16)])
    security_code=IntegerField("3 digit security code on back of card", validators=[DataRequired(),Length(min=3,max=3)])
    debit_card = RadioField("Is this a debit card?", choices=[("yes", "Yes"), ("no", "No")], validators=[DataRequired()])
