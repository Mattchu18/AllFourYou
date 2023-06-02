from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', city='Demo City',phone_number= 100_000_0000)
    matt = User(
        username='matt', email='matt@aa.io', password='password', city='San Francisco', phone_number= 111_111_1111)
    vanessa = User(
        username='vanessa', email='vanessa@aa.io', password='password', city='Miami',phone_number= 222_222_2222)
    tony = User(
        username='tony', email='tony@aa.io', password='password',city='Millbrae', phone_number= 333_333_3333)
    kevinb = User(
        username='kevinb', email='kevinb@aa.io', password='password', city='Northwood', phone_number=444_444_4444)

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
