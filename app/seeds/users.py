from app.models.user import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo1', email='demo@aa.io', first_name = "Demo", last_name = "Demo", password='password', city='Toronto',phone_number= 1000000000)
    matt = User(
        username='matt1', email='matt@aa.io', first_name = "MattUser", last_name = "A", password='password', city='San Francisco', phone_number= 1111111111 )
    vanessa = User(
        username='vanessa1', email='vanessa@aa.io', first_name = "VanessaUser", last_name = "G", password='password', city='Miami',phone_number= 2222222222 )
    tony = User(
        username='tony1', email='tony@aa.io', first_name = "TonyUser", last_name = "H", password='password',city='Millbrae', phone_number= 3333333333 )
    kevinb = User(
        username='kevinb1', email='kevinb@aa.io', first_name = "KevinbUser", last_name = "B", password='password', city='San Francisco', phone_number=4444444444 )

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
