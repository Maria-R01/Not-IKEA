from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .items import seed_items, undo_items
from .reviews import seed_reviews, undo_reviews
from .shopping_carts import seed_shopping_carts, undo_shopping_carts
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_shopping_carts()
        undo_reviews()
        undo_images()
        undo_items()
        undo_users()
    seed_users()
    seed_items()
    seed_images()
    seed_reviews()
    seed_shopping_carts()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_shopping_carts()
    undo_reviews()
    undo_images()
    undo_items()
    undo_users()

