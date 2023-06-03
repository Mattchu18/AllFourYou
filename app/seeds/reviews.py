from app.models.review import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1=Review(
        review_text="Did not make my pokemon breed",
        star_rating=1,
        user_id=1,
        task_id=1
    )
    review2=Review(
        review_text="Amazing! married 5 years now.",
        star_rating=5,
        user_id=2,
        task_id=2
    )
    review3=Review(
        review_text="Ruined my relationship, but maybe for the best, wouldnt recommend but cheap price.",
        star_rating=2,
        user_id=3,
        task_id=3
    )
    review4=Review(
        review_text="Fantastic delicious food. ",
        star_rating=5,
        user_id=1,
        task_id=5
    )
    review_list = [review1, review2, review3, review4]

    for review in review_list:
        db.session.add(review)
    db.session.commit()
