from flask.cli import AppGroup
from .users import seed_users, undo_users
from .taskers import seed_taskers, undo_taskers
from .tasks import seed_tasks, undo_tasks
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews
from .billings import seed_billings, undo_billings
from .messages import seed_messages, undo_messages
from .user_messages import seed_user_messages, undo_user_messages
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
        undo_reviews()
        undo_bookings()
        undo_tasks()
        undo_taskers()
        undo_billings()
        undo_messages()
        undo_user_messages()
        undo_users()
    seed_users()
    seed_user_messages()
    seed_messages()
    seed_billings()
    seed_taskers()
    seed_tasks()
    seed_bookings()
    seed_reviews()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_bookings()
    undo_tasks()
    undo_taskers()
    undo_billings()
    undo_messages()
    undo_user_messages()
    undo_users()
    # Add other undo functions here
