from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,RadioField
from wtforms.validators import DataRequired, ValidationError
from app.models import Billing

def number_exists(form, field):
    # Checking if card_number is already in use
    number = field.data
    exists = Billing.query.filter(Billing.card_number == number).first()
    if exists:
        raise ValidationError('Card number is already in use.')


class BillingForm(FlaskForm):

    first_name=StringField("Card holder first name",validators=[DataRequired()])
    last_name=StringField("Card holder last name", validators=[DataRequired()])
    card_number=StringField('Card number', validators=[DataRequired(), number_exists()])
    security_code=StringField("3 digit security code on back of card", validators=[DataRequired()])
    debit_card = RadioField("Is this a debit card?", choices=[("yes", "Yes"), ("no", "No")], validators=[DataRequired()])
