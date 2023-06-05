from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__="reviews"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_text=db.Column(db.String(500), nullable=False)
    star_rating=db.Column(db.Integer(), nullable=False)
    user_id=db.Column(db.Integer(), db.ForeignKey("users.id"))
    task_id = db.Column(db.Integer(), db.ForeignKey("tasks.id"))
    tasker_id = db.Column(db.Integer(), db.ForeignKey("taskers.id"))

    user = db.relationship("User", back_populates="reviews")
    task= db.relationship("Task", back_populates="reviews")
    taskers = db.relationship("Tasker", back_populates = "reviews")


    def to_dict(self):
        return {
            'id': self.id,
            'review_text': self.review_text,
            'star_rating': self.star_rating,
            'user_id': self.user_id,
            'task_id': self.task_id,
            'tasker_id': self.tasker_id
        }
