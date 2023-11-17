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
    # shopping_carts = db.relationship("ShoppingCart", back_populates="items", cascade="all, delete-orphan")
    item_shopping_cart =  db.relationship("ShoppingCart", back_populates="items", cascade="all, delete-orphan")
    item_image = db.relationship("Image", back_populates="item", cascade="all, delete-orphan")
    wishlist_items = db.relationship("WishlistItem", back_populates="item", cascade="all, delete-orphan")


    def average_rating(self):
        total_stars = sum(review.stars for review in self.reviews)
        review_count = len(self.reviews)
        if review_count == 0:
            return 0.0
        return round(total_stars / review_count, 2)

    def review_count(self):
        # Get the total review count for the item
        return len(self.reviews)

    def to_dict(self, images=True, reviews=True, wishlist_items=True):
        item_dict = {
        'id': self.id,
        "item_name": self.item_name,
        "price": self.price,
        "description": self.description,
        "available_quantity": self.available_quantity,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
    }

        if images:
            item_images_list = []
            for image in self.item_image:
                item_images_list.append({
                    'id': image.id,
                    "url": image.url,
                    "item_id": image.item_id,
                    'created_at': image.created_at,
                    'updated_at': image.updated_at,
                })
            item_dict["images"] = item_images_list

        if reviews:
            item_reviews_list = []
            for review in self.reviews:
                item_reviews_list.append({
                    'id': review.id,
                    "review": review.review,
                    "stars": review.stars,
                    "user_id": review.user_id,
                    "item_id": review.item_id,
                    'created_at': review.created_at,
                    'updated_at': review.updated_at,
                })
            item_dict["reviews"] = item_reviews_list
            item_dict["average_rating"] = self.average_rating()
            item_dict["review_count"] = self.review_count()

        if wishlist_items:
            item_wishlist_items_list = []
            for wishlist_item in self.wishlist_items:
                item_wishlist_items_list.append({
                'id': wishlist_item.id,
                'user_id': wishlist_item.user_id,
                'item_id': wishlist_item.item_id,
                'in_wishlist': wishlist_item.in_wishlist,
                })
            item_dict["wishlist_items"] = item_wishlist_items_list

        return item_dict



    