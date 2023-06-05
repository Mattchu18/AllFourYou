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

    user = db.relationship("User", back_populates ="user_bookings")
    task= db.relationship("Task", back_populates="task_bookings")

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'user_id': self.user_id,
            'task_id': self.task_id,
        }
