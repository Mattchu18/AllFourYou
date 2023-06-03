from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class ReviewForm(FlaskForm):
    review_text= TextAreaField("review", validators=[DataRequired()])
    star_rating= IntegerField("star rating", validators=[DataRequired(), NumberRange(min=1, max=5)])
