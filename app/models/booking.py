from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
    __tablename__="bookings"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable = False)
    city = db.Column(db.String(100), nullable=False)
    duration=db.Column(db.String(100), nullable=False)
    details = db.Column(db.String(500), nullable = False)
    user_id=db.Column(db.Integer(), db.ForeignKey("users.id"))
    task_id = db.Column(db.Integer(), db.ForeignKey("tasks.id"))

    user = db.relationship("User", cascade="all, delete", back_populates ="user_bookings")
    booking_task= db.relationship("Task", cascade="all, delete", back_populates="task_bookings")

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            "city":self.city,
            "duration": self.duration,
            'details': self.details,
            'user_id': self.user_id,
            'task_id': self.task_id,
        }
