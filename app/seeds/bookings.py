from app.models.booking import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookings():
    breeding1 = Booking(
        category = "Breeding",
        description = "Your pokemon not breeding? We will make them breed.",
        user_id=1,
        task_id = 1,
        )

    matchmaking1 = Booking(
        category = "Matchmaking",
        description = "Try your luck at destiny and see if anyone is available to mingle if they single.",
        user_id=2,
        task_id = 2,
        )

    matchmaking2 = Booking(
        category = "Matchmaking",
        description = "Matthew will host a matchmaking session after his pole dancing class.",
        user_id=3,
        task_id = 3,
        )


    cooking2 = Booking(
        category = "Cooking",
        description = "Vanessa will heat up a nice bowl of mac and cheese for you and your date!",
        user_id=1,
        task_id = 5,
        )

    dancing1 = Booking(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        user_id=2,
        task_id = 7,
        )

    booking_list = [breeding1, matchmaking1, matchmaking2, cooking2, dancing1]

    for booking in booking_list:
        db.session.add(booking)
    db.session.commit()
