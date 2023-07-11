from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class User_Message(db.Model):
    __tablename__="user_messages"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user1_id=db.Column(db.Integer(), nullable=False)
    user2_id=db.Column(db.Integer(), nullable=False)
    created_at= db.Column(db.DateTime(),default=datetime.now)


    # user1_msg = db.relationship("User", back_populates="msg_user1")
    # user2_msg = db.relationship("User", back_populates="msg_user2")

    message_join_user= db.relationship("Message", back_populates="user_join_message")

def to_dict(self):
    return{
        "id":self.id,
        "user1_id":self.user1_id,
        "user2_id":self.user2_id,
        "created_at":self.created_at
    }
