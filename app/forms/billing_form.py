from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,RadioField
from wtforms.validators import DataRequired


class BillingForm(FlaskForm):

    first_name=StringField("Card holder first name",validators=[DataRequired()])
    last_name=StringField("Card holder last name", validators=[DataRequired()])
    card_number=StringField('Card number', validators=[DataRequired()])
    security_code=StringField("3 digit security code on back of card", validators=[DataRequired()])
    debit_card = RadioField("Is this a debit card?", choices=[("yes", "Yes"), ("no", "No")], validators=[DataRequired()])
