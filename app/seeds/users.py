from app.models.user import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo1', email='demo@aa.io', password='password', city='Toronto',phone_number= 1000000000, tasker=True)
    matt = User(
        username='matt1', email='matt@aa.io', password='password', city='San Francisco', phone_number= 1111111111, tasker=False)
    vanessa = User(
        username='vanessa1', email='vanessa@aa.io', password='password', city='Miami',phone_number= 2222222222, tasker=False)
    tony = User(
        username='tony1', email='tony@aa.io', password='password',city='Millbrae', phone_number= 3333333333, tasker=False)
    kevinb = User(
        username='kevinb1', email='kevinb@aa.io', password='password', city='San Francisco', phone_number=4444444444, tasker=False)

    db.session.add(demo)
    db.session.add(matt)
    db.session.add(vanessa)
    db.session.add(tony)
    db.session.add(kevinb)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
