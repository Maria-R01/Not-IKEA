from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

shopping_carts = [
    ShoppingCart(
        user_id=1, 
        item_id=5, 
        quantity=3,
    ),
    ShoppingCart(
        user_id=1, 
        item_id=12, 
        quantity=2,
    ),
    ShoppingCart(
        user_id=1, 
        item_id=3, 
        quantity=1,
    ),
    ShoppingCart(
        user_id=1, 
        item_id=7, 
        quantity=4,
    ),
    ShoppingCart(
        user_id=2, 
        item_id=2, 
        quantity=4,
    ),
    ShoppingCart(
        user_id=2, 
        item_id=8, 
        quantity=3,
    ),
    ShoppingCart(
        user_id=3, 
        item_id=18, 
        quantity=1,
    )
]


def seed_shopping_carts():
    for cart in shopping_carts:
        db.session.add(cart)
    db.session.commit()

def undo_shopping_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))
    db.session.commit()
