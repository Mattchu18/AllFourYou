from app.models.user_message import db, User_Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_messages():
    user_message1 = User_Message(
        user1_id=1,
        user2_id=2
    )
    user_message2 = User_Message(
        user1_id=2,
        user2_id=1
    )
    user_message3 = User_Message(
        user1_id=1,
        user2_id=2
    )
    user_message4 = User_Message(
        user1_id=2,
        user2_id=1
    )
    user_message_list = [user_message1, user_message2, user_message3, user_message4]
    for user_message in user_message_list:
        db.session.add(user_message)
    db.session.commit()
def undo_user_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_messages"))

    db.session.commit()
