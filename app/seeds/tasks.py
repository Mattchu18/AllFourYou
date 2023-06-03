from app.models.task import db, Task, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tasks():
    breeding1 = Task(
        category = "Breeding",
        description = "Your pokemon not breeding? We will make them breed.",
        tasker_id = 1,
        available = True
        )

    matchmaking1 = Task(
        category = "Matchmaking",
        description = "Try your luck at destiny and see if anyone is available to mingle if they single.",
        tasker_id = 2,
        available = True
        )

    matchmaking2 = Task(
        category = "Matchmaking",
        description = "Matthew will host a matchmaking session after his pole dancing class.",
        tasker_id = 4,
        available = True
        )

    cooking1 = Task(
        category = "Cooking",
        description = "Have a delicious cup of coffee or a nice bowl of spaghetti.",
        tasker_id = 3,
        available = True
        )

    cooking2 = Task(
        category = "Cooking",
        description = "Vanessa will heat up a nice bowl of mac and cheese for you and your date!",
        tasker_id = 2,
        available = True
        )

    dancing1 = Task(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        tasker_id = 4,
        available = True
        )

    dancing2 = Task(
        category = "Dancing",
        description = "Come dance with Kevin and have a great time!",
        tasker_id = 1,
        available = True
        )

    task_list = [breeding1, matchmaking1, matchmaking2, cooking1, cooking2, dancing1, dancing2]

    for task in task_list:
        db.session.add(task)
    db.session.commit()
