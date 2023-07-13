from app.models.message import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    message1=Message(
        body="hi",
        user_message_id = 1,
        user_id = 1
    )
    message2=Message(
        body="hello back",
        user_message_id=1,
        user_id=2
    )
    message3 = Message(
        body="how are you",
        user_message_id=1,
        user_id=1
    )
    message4=Message(
        body="im ok",
        user_message_id=1,
        user_id=2
    )
    message_list = [message1, message2, message3, message4]
    for message in message_list:
        db.session.add(message)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
