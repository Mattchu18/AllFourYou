from ..models.billing import db, Billing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_billings():
    card1= Billing(
        first_name="Demo",
        last_name="User",
        card_number="1234567890123456",
        security_code="123",
        debit_card="yes",
        user_id=1
    )
    user1_card1= Billing(
        first_name="Joe",
        last_name="Smith",
        card_number="8923413401256756",
        security_code="123",
        debit_card="yes",
        user_id=1
    )
    user1_card2= Billing(
        first_name="Jane",
        last_name="Smith",
        card_number="4012567841356923",
        security_code="123",
        debit_card="no",
        user_id=1
    )
    card2=Billing(
        first_name="Matt",
        last_name="Aung",
        card_number="9876543210987654",
        security_code="456",
        debit_card="no",
        user_id=2
    )
    user2_card2=Billing(
        first_name="Matt",
        last_name="Aung",
        card_number="9876543654210987",
        security_code="456",
        debit_card="yes",
        user_id=2
    )
    user2_card3=Billing(
        first_name="Mother",
        last_name="Aung",
        card_number="6543210954988767",
        security_code="456",
        debit_card="no",
        user_id=2
    )
    card3 = Billing(
    first_name="Mom",
        last_name="Mom",
        card_number="8876543210987654",
        security_code="456",
        debit_card="yes",
        user_id=3
    )
    card4 = Billing(
        first_name="Kevin",
        last_name="B",
        card_number="8876543210987655",
        security_code="456",
        debit_card="yes",
        user_id=5
    )
    card_list = [card1, card2, card3, card4,user1_card1,user1_card2,user2_card2,user2_card3]

    for card in card_list:
        db.session.add(card)
    db.session.commit()

def undo_billings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM billings"))

    db.session.commit()
