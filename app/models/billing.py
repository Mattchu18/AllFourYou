from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Billing(db.Model):
    __tablename__="billing"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(50),nullable=False)
    last_name=db.Column(db.String(50),nullable=False)
    card_number=db.Column(db.Integer(16),nullable=False) #maybe change this to a string and manage in frontend
    security_code=db.Column(db.Integer(3),nullable=False)
    debit_card=db.Column(db.String(10),nullable=False)
    user_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at= db.Column(db.DateTime(),default=datetime.now)

    user = db.relationship("User", back_populates ="billing")

    def to_dict(self):
        return {
            'id': self.id,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'card_number':self.card_number,
            'security_code':self.security_code,
            'debit_card':self.debit_card,
            'user_id':self.user_id,
            'created_at':self.created_at,
        }