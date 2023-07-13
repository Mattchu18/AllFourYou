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
    user2_review3 = Review(
    review_text="Absolutely outstanding! Best service I've ever received.",
    star_rating=5,
    user_id=2,
    task_id=3,
    tasker_id=3,
    booking_id=2
)

    user2_review4 = Review(
        review_text="Disappointing experience. The tasker didn't meet my expectations.",
        star_rating=2,
        user_id=2,
        task_id=4,
        tasker_id=4,
        booking_id=3
    )

    user2_review5 = Review(
        review_text="Exceptional work! I was amazed by the quality and attention to detail.",
        star_rating=5,
        user_id=2,
        task_id=5,
        tasker_id=5,
        booking_id=4
    )

    review3=Review(
        review_text="Ruined my relationship, but maybe for the best, wouldnt recommend but cheap price.",
        star_rating=2,
        user_id=3,
        task_id=3,
        tasker_id=3,
        booking_id=2

    )
    user3_review4 = Review(
    review_text="Great experience overall! The tasker was professional and efficient.",
    star_rating=4,
    user_id=3,
    task_id=4,
    tasker_id=4,
    booking_id=3
    )
    user3_review5 = Review(
        review_text="Outstanding service! The tasker went above and beyond my expectations.",
        star_rating=5,
        user_id=3,
        task_id=5,
        tasker_id=5,
        booking_id=4
    )


    review4=Review(
        review_text="Fantastic delicious food. ",
        star_rating=5,
        user_id=4,
        task_id=4,
        tasker_id=4,
        booking_id=2

    )
 
    review9 = Review(
    review_text="Terrible experience. The tasker never showed up.",
    star_rating=1,
    user_id=5,
    task_id=5,
    tasker_id=5,
    booking_id=3
    )
    user5_review8 = Review(
    review_text="Terrible experience. The tasker never showed up.",
    star_rating=1,
    user_id=5,
    task_id=5,
    tasker_id=5,
    booking_id=3
    )

    user5_review9 = Review(
        review_text="Excellent service! The tasker was prompt and completed the job efficiently.",
        star_rating=5,
        user_id=5,
        task_id=6,
        tasker_id=6,
        booking_id=4
    )


    review10 = Review(
    review_text="Outstanding service! The tasker was professional and completed the job quickly.",
    star_rating=5,
    user_id=3,
    task_id=6,
    tasker_id=6,
    booking_id=4
    )

    review11 = Review(
    review_text="I was disappointed with the quality of the work. It didn't meet my expectations.",
    star_rating=2,
    user_id=2,
    task_id=6,
    tasker_id=5,
    booking_id=4
)


    review_list = [review1, review2, review3, review4,
                   review9,review10,review11,
                   user2_review3,user2_review4,user2_review5,user3_review4,user3_review5,
                   user5_review8,user5_review9,
                   ]

    for review in review_list:
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
