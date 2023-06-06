from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Booking(db.Model):
    __tablename__="bookings"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable = False)
    city = db.Column(db.String(100), nullable=False)
    duration=db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(500), nullable = False)
    user_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    # task_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("tasks.id")))
    tasker_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("taskers.id")))
    # appointment_date = db.Column(db.Date, nullable=False)
    created_at= db.Column(db.DateTime(),default=datetime.now)
    updated_at=db.Column(db.DateTime(), default=datetime.now)

    user = db.relationship("User", back_populates ="user_bookings")
    # booking_task= db.relationship("Task", back_populates="task_bookings")
    booking_tasker= db.relationship("Tasker", back_populates="tasker_booking")

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            "city":self.city,
            "duration": self.duration,
            'details': self.details,
            'user_id': self.user_id,
            'tasker_id': self.tasker_id,
            # 'task_id': self.task_id,
            # 'appointment_date':self.appointment_date,
            'created_at':self.created_at,
            'updated_at':self.created_at,
        }
