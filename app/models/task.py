from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(500), nullable = False)
    tasker_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("taskers.id")), nullable = False)
    available = db.Column(db.Boolean(), nullable = False)
    created_at= db.Column(db.DateTime(),default=datetime.now)


    taskers = db.relationship("Tasker", back_populates = "tasks")
    task_bookings=db.relationship("Booking", back_populates="booking_task")

    reviews=db.relationship("Review", back_populates="task")

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'tasker_id': self.tasker_id,
            'available': self.available,
            'created_at':self.created_at
        }
