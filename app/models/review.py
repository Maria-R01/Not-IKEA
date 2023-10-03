from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships 
    user = db.relationship("User", back_populates="reviews")
    item = db.relationship("Item", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            "review": self.review,
            "stars": self.stars,
            "user_id": self.user_id,
            "item_id": self.item_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 
    