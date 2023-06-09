from app.models.review import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1=Review(
        review_text="Did not make my pokemon breed",
        star_rating=1,
        user_id=1,
        task_id=1,
        tasker_id=1,
        booking_id=1
    )
    review2=Review(
        review_text="Amazing! married 5 years now.",
        star_rating=5,
        user_id=2,
        task_id=2,
        tasker_id=2,
        booking_id=1
    )
    review3=Review(
        review_text="Ruined my relationship, but maybe for the best, wouldnt recommend but cheap price.",
        star_rating=2,
        user_id=3,
        task_id=3,
        tasker_id=3,
        booking_id=2

    )
    review4=Review(
        review_text="Fantastic delicious food. ",
        star_rating=5,
        user_id=4,
        task_id=4,
        tasker_id=4,
        booking_id=2

    )
    review5=Review(
        review_text="Wow I loved having Kevin L as my music instructor and I am just blown away!",
        star_rating=5,
        user_id=4,
        task_id=7,
        tasker_id=7,
    )
    review6=Review(
        review_text="Wow Kevin was an amazing dancer and he blew my mind, like how did he move like that, like wow, hes just so good, my goodness",
        star_rating=5,
        user_id=2,
        task_id=8,
        tasker_id=1,
    )
    review7=Review(
        review_text="Wow Matthew. I am speechless and so honored to be your prodigy. I can not wait to see what else Matthew decides to teach next, cause he just knows all the dances and teaches them so well",
        star_rating=5,
        user_id=3,
        task_id=9,
        tasker_id=4,
    )
    review8=Review(
        review_text = "Taylor is a teaching genius! He taught it to me and it was like everything just made sense",
        star_rating=5,
        user_id=4,
        task_id=6,
        tasker_id=6
    )
    # review7=Review(
    #     review_text="Man that Kevin guy man. He just knows how to cook such delicious food. Just marry me already and cook for me all day long PLEASE.",
    #     star_rating=5,
    #     user_id=5,
    #     task_id=4,
    #     tasker_id=1,
    # )
    review_list = [review1, review2, review3, review4, review5, review6, review7, review8]

    for review in review_list:
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
