from flask_wtf import FlaskForm
from wtforms import  TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length


class ReviewForm(FlaskForm):
    review_text= TextAreaField("Review", validators=[DataRequired(), Length(min=2, max=500)])
    star_rating= IntegerField("Star rating", validators=[DataRequired(), NumberRange(min=1, max=5)])
