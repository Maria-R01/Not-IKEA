from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    stars = IntegerField("Rating", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5")])
    review = StringField("Review", validators=[DataRequired()])
    item_id = IntegerField("Item ID", validators=[DataRequired()])
    user_id = IntegerField("User ID", validators=[DataRequired()])