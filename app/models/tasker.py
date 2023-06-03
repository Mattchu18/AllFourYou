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
    phone_number = db.Column(db.Integer(), nullable = False, unique = True)
    bio = db.Column(db.String(500), nullable = False)
    profile_image = db.Column(db.String(500))
    vehicles = db.Column(db.String(500), nullable = False)
    tools = db.Column(db.String(500), nullable = False)

    #relationship
    tasks = db.relationship("Task", back_populates = "taskers")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'city': self.city,
            'phone_number': self.phone_number,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'vehicles': self.vehicles,
            'tools': self.tools
        }
