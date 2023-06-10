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
    user1_review2 = Review(
    review_text="Not satisfied with the service provided",
    star_rating=2,
    user_id=1,
    task_id=2,
    tasker_id=2,
    booking_id=2
    )

    user1_review3 = Review(
        review_text="Excellent job! Highly recommended",
        star_rating=5,
        user_id=1,
        task_id=3,
        tasker_id=3,
        booking_id=3
    )

    user1_review4 = Review(
        review_text="Average service, nothing special",
        star_rating=3,
        user_id=1,
        task_id=4,
        tasker_id=4,
        booking_id=4
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

    user3_review6 = Review(
        review_text="Disappointed with the quality of work. The tasker was unprofessional and didn't deliver as promised.",
        star_rating=2,
        user_id=3,
        task_id=6,
        tasker_id=6,
        booking_id=5
    )

    user3_review7 = Review(
        review_text="Exceptional experience! The tasker was friendly, skilled, and completed the job in no time.",
        star_rating=5,
        user_id=3,
        task_id=7,
        tasker_id=7,
        booking_id=6
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
        task_id=8,
        tasker_id=8,
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
        task_id=7,
        tasker_id=7
    )
    # review7=Review(
    #     review_text="Man that Kevin guy man. He just knows how to cook such delicious food. Just marry me already and cook for me all day long PLEASE.",
    #     star_rating=5,
    #     user_id=5,
    #     task_id=4,
    #     tasker_id=1,
    # )
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

    user5_review10 = Review(
        review_text="Average experience. The tasker was decent, but there were some issues.",
        star_rating=3,
        user_id=5,
        task_id=7,
        tasker_id=7,
        booking_id=5
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

    review12 = Review(
    review_text="The tasker was friendly and helpful throughout the entire process. Highly recommend!",
    star_rating=4,
    user_id=5,
    task_id=7,
    tasker_id=8,
    booking_id=5
    )
    
    review13 = Review(
    review_text="I had a great experience with the tasker. They were prompt and professional.",
    star_rating=5,
    user_id=1,
    task_id=9,
    tasker_id=9,
    booking_id=6
    )

    review14 = Review(
    review_text="Average service. Nothing exceptional, but nothing terrible either.",
    star_rating=3,
    user_id=1,
    task_id=10,
    tasker_id=10,
    booking_id=7
    )
    review_list = [review1, review2, review3, review4, review5, review6, review7, review8,review9,review10,review11,review12,review13,review14,user1_review2,user1_review2,user1_review3,user1_review4,user2_review3,user2_review4,user2_review5,user3_review4,user3_review5,user3_review6,user3_review7,user5_review8,user5_review9,user5_review10]

    for review in review_list:
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
