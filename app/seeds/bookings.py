from app.models.booking import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookings():
    breeding1 = Booking(
        category = "Breeding",
        city="Los Angeles",
        duration="short",
        details = "My pokemon plase halp..",
        user_id=1,
        task_id = 1,
        )

    matchmaking1 = Booking(
        category = "Matchmaking",
        city="San Francisco",
        duration="short",
        details = "Im very single and lonely.",
        user_id=2,
        task_id = 2,
        )

    matchmaking2 = Booking(
        category = "Matchmaking",
        city="Joshua Tree",
        duration="medium",
        details = "Pole dancing class.",
        user_id=3,
        task_id = 3,
        )


    cooking2 = Booking(
        category = "Cooking",
        city="Toronto",
        duration="medium",
        details = "would like to learn to cook!",
        user_id=1,
        task_id = 5,
        )

    dancing1 = Booking(
        category = "Dancing",
        city="San Francisco",
        duration="long",
        details = "Matt is taking new students for his dance studio!",
        user_id=2,
        task_id = 7,
        )

    booking_list = [breeding1, matchmaking1, matchmaking2, cooking2, dancing1]

    for booking in booking_list:
        db.session.add(booking)
    db.session.commit()
