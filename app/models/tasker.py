from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tasker(db.Model):
    __tablename__ = "taskers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(255), nullable = False)
    phone_number = db.Column(db.String(50), nullable = False, unique = True)
    bio = db.Column(db.String(5000), nullable = False)
    profile_image = db.Column(db.String(500))
    hourly_rate=db.Column(db.String(50))
    vehicles = db.Column(db.String(500), nullable = False)
    tools = db.Column(db.String(500), nullable = False)

    available = db.Column(db.Boolean(), nullable = False, default = False)
    task_id = db.Column(db.Integer())
    #relationship
    tasker_task = db.relationship("Task", back_populates = "task_tasker")
    reviews = db.relationship("Review", back_populates = "taskers")
    tasker_booking = db.relationship("Booking",back_populates = "booking_tasker")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'city': self.city,
            'phone_number': self.phone_number,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'hourly_rate':self.hourly_rate,
            'vehicles': self.vehicles,
            'tools': self.tools,
            'available': self.available,
            'task_id': self.task_id
        }
