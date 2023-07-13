from app.models.booking import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookings():
    software = Booking(
        category = "Software Engineering",
        city="San Francisco",
        duration="long",
        details = "I need help developing a website to pass my coding bootcamp. I need you to code everything for me within a timeframe of 1 week. Make it seem like I struggled with this.",
        user_id=1,
        tasker_id = 1,
        )

    matchmaking1 = Booking(
        category = "Matchmaking",
        city="San Francisco",
        duration="short",
        details = "Im very single and lonely.",
        user_id=2,
        tasker_id = 2,
        )

    matchmaking2 = Booking(
        category = "Matchmaking",
        city="Joshua Tree",
        duration="medium",
        details = "Pole dancing class.",
        user_id=3,
        tasker_id = 3,
        )

    cooking2 = Booking(
        category = "Cooking",
        city="Toronto",
        duration="medium",
        details = "would like to learn to cook!",
        user_id=4,
        tasker_id = 4,
        )



    booking_list = [software, matchmaking1, matchmaking2, cooking2, ]

    for booking in booking_list:
        db.session.add(booking)
    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
