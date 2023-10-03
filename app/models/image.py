from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = "images"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2000), nullable=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships 
    item = db.relationship("Item", back_populates="item_image")

    def to_dict(self):
        return {
            'id': self.id,
            "url": self.url,
            "item_id": self.item_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 
    