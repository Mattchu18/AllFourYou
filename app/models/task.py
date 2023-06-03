from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(500), nullable = False)
    tasker_id = db.Column(db.Integer(), nullable = False)
    available = db.Column(db.Boolean(), nullable = False)

    taskers = db.relationship("Tasker", backpopulates = "tasks")


    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'tasker_id': self.tasker_id,
            'available': self.available,
        }
