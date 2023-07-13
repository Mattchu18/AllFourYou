from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__="reviews"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_text=db.Column(db.String(500), nullable=False)
    star_rating=db.Column(db.Integer(), nullable=False)
    user_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    task_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("tasks.id")))
    tasker_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("taskers.id")))
    booking_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("bookings.id")))
    created_at= db.Column(db.DateTime(),default=datetime.now)


    user = db.relationship("User", back_populates="reviews")
    task= db.relationship("Task", back_populates="reviews")
    taskers = db.relationship("Tasker", back_populates = "reviews")

    review_booking = db.relationship("Booking", back_populates="booking_reviews")
    def to_dict(self):
        return {
            'id': self.id,
            'review_text': self.review_text,
            'star_rating': self.star_rating,
            'user_id': self.user_id,
            'task_id': self.task_id,
            'tasker_id': self.tasker_id,
            'booking_id': self.booking_id,
            'created_at':self.created_at
        }
