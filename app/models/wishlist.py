from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class WishlistItem(db.Model):
    __tablename__ = "wishlist_items"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
    in_wishlist = db.Column(db.Boolean, default=False)
    
    # Relationships 
    user = db.relationship("User", back_populates="wishlist_items")
    item = db.relationship("Item", back_populates="wishlist_items")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'in_wishlist': self.in_wishlist,
        }
