from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.billing import Billing

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable = False)
    phone_number = db.Column(db.String(50), nullable = False, unique = True)
    billing_id = db.Column(db.Integer(), unique=True)
    # tasker = db.Column(db.Boolean(), nullable=False, default=False)

    user_bookings=db.relationship("Booking", back_populates="user")
    reviews=db.relationship("Review", back_populates="user")
    message= db.relationship("Message", back_populates="user_msg")

    billings = db.relationship("Billing", back_populates="user")

    # msg_user1 = db.relationship("User_Message", back_populates="user1_msg")
    # msg_user2 = db.relationship("User_Message", back_populates="user2_msg")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'city': self.city,
            'phone_number': self.phone_number,
            'billing_id':self.billing_id,
            # 'tasker': self.tasker
        }
