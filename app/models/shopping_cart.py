from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ShoppingCart(db.Model):
    __tablename__ = "shopping_carts"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships 
    users = db.relationship("User", back_populates="shopping_cart")
    items = db.relationship("Item", back_populates="item_shopping_cart")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "quantity": self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 
    