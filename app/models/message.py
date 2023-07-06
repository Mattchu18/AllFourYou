from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__="messages"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    body=db.Column(db.String(2000), nullable=False)
    user_message_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("user_messages.id")), nullable=False)
    user_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at= db.Column(db.DateTime(),default=datetime.now)

    user_msg = db.relationship("User", back_populates="message")
    user_join_message = db.relationship("User_Message", back_populates="message_join_user")

# followers = db.relationship(
#         "User",
#         secondary=follows,
#         primaryjoin=(follows.c.follower_id == id),
#         secondaryjoin=(follows.c.followed_id == id),
#         backref=db.backref("following", lazy="dynamic"),
#         lazy="dynamic"
#     )

    def to_dict(self):
        return {
            "id": self.id,
            "body":self.body,
            "user_message_id": self.user_message_id,
            "userId": self.user_id,
            "created_at":self.created_at
        }
