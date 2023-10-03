from .db import db, environment, SCHEMA 
from datetime import datetime

class Item(db.Model):
    __tablename__ = "items"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    available_quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships 
    reviews = db.relationship("Review", back_populates="item", cascade="all, delete-orphan")
    shopping_carts = db.relationship("ShoppingCart", back_populates="items", cascade="all, delete-orphan")
    item_shopping_cart =  db.relationship("ShoppingCart", back_populates="items", cascade="all, delete-orphan")
    item_image = db.relationship("Image", back_populates="item", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            "item_name": self.item_name,
            "price": self.price,
            "description": self.description,
            "available_quantity": self.available_quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        } 
    