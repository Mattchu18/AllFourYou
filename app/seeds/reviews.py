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
    review5=Review(
        review_text="Wow Kevin was an amazing dancer and he blew my mind, like how did he move like that, like wow, hes just so good, my goodness",
        star_rating=5,
        user_id=5,
        task_id=7
    )
    review6=Review(
        review_text="Wow Matthew. I am speechless and so honored to be your prodigy. I can not wait to see what else Matthew decides to teach next, cause he just knows all the dances and teaches them so well",
        star_rating=5,
        user_id=2,
        task_id=6
    )
    review7=Review(
        review_text="Man that Kevin guy man. He just knows how to cook such delicious food. Just marry me already and cook for me all day long PLEASE.",
        star_rating=5,
        user_id=5,
        task_id=4
    )
    review_list = [review1, review2, review3, review4, review5, review6, review7]

    for review in review_list:
        db.session.add(review)
    db.session.commit()
