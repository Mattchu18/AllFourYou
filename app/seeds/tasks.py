from app.models.task import db, Task, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tasks():
    software1 = Task(
        category = "Software Engineering",
        description = "Need a website developed? 70k and we gotchu.",
        tasker_id = 1,
        # available = False,
        )
    software2 = Task(
        category = "Software Engineering",
        description = "Need a website developed? 70k and we gotchu.",
        tasker_id = 7,
        # available = False,
        )
    software3 = Task(
        category = "Software Engineering",
        description = "Need a website developed? 70k and we gotchu.",
        tasker_id = 13,
        # available = False,
        )
    software4 = Task(
        category = "Software Engineering",
        description = "Need a website developed? 70k and we gotchu.",
        tasker_id = 19,
        # available = False,
        )

    matchmaking1 = Task(
        category = "Matchmaking",
        description = "Try your luck at destiny and see if anyone is available to mingle if they single.",
        tasker_id = 2,
        # available = True,
        )

    matchmaking2 = Task(
        category = "Matchmaking",
        description = "Matthew will host a matchmaking session after his pole dancing class.",
        tasker_id = 8,
        # available = True,
        )

    matchmaking3 = Task(
        category = "Matchmaking",
        description = "Matthew will host a matchmaking session after his pole dancing class.",
        tasker_id = 14,
        # available = True,
        )

    matchmaking4 = Task(
        category = "Matchmaking",
        description = "Matthew will host a matchmaking session after his pole dancing class.",
        tasker_id = 20,
        # available = True,
        )

    cooking1 = Task(
        category = "Cooking",
        description = "Have a delicious cup of coffee or a nice bowl of spaghetti.",
        tasker_id = 3,
        # available = True,
        )
    cooking2 = Task(
        category = "Cooking",
        description = "Have a delicious cup of coffee or a nice bowl of spaghetti.",
        tasker_id = 9,
        # available = True,
        )
    cooking3 = Task(
        category = "Cooking",
        description = "Have a delicious cup of coffee or a nice bowl of spaghetti.",
        tasker_id = 15,
        # available = True,
        )
    cooking4 = Task(
        category = "Cooking",
        description = "Have a delicious cup of coffee or a nice bowl of spaghetti.",
        tasker_id = 21,
        # available = True,
        )

    dancing1 = Task(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        tasker_id = 4,
        # available = True,
        )
    dancing2 = Task(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        tasker_id = 10,
        # available = True,
        )
    dancing3 = Task(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        tasker_id = 16,
        # available = True,
        )
    dancing4 = Task(
        category = "Dancing",
        description = "Matt is taking new students for his dance studio!",
        tasker_id = 22,
        # available = True,
        )


    tutoring1 = Task(
        category = "Tutor",
        description = "Come study with Taylor!",
        tasker_id = 5,
        # available = True,
        )
    tutoring2 = Task(
        category = "Tutor",
        description = "Come study with Taylor!",
        tasker_id = 11,
        # available = True,
        )
    tutoring3 = Task(
        category = "Tutor",
        description = "Come study with Taylor!",
        tasker_id = 17,
        # available = True,
        )
    tutoring4 = Task(
        category = "Tutor",
        description = "Come study with Taylor!",
        tasker_id = 23,
        # available = True,
        )
    music1 = Task(
        category = "Music",
        description = "Come learn music with Kevin!",
        tasker_id = 6,
        # available = True,
        )
    music2 = Task(
        category = "Music",
        description = "Come learn music with Kevin!",
        tasker_id = 12,
        # available = True,
        )
    music3 = Task(
        category = "Music",
        description = "Come learn music with Kevin!",
        tasker_id = 18,
        # available = True,
        )
    music4 = Task(
        category = "Music",
        description = "Come learn music with Kevin!",
        tasker_id = 24,
        # available = True,
        )




    task_list = [
        software1,
        software2,
        software3,
        software4,
        matchmaking1,
        matchmaking2,
        matchmaking3,
        matchmaking4,
        cooking1,
        cooking2,
        cooking3,
        cooking4,
        dancing1,
        dancing2,
        dancing3,
        dancing4,
        tutoring1,
        tutoring2,
        tutoring3,
        tutoring4,
        music1,
        music2,
        music3,
        music4,
        dancing3,
        dancing4
    ]

    for task in task_list:
        db.session.add(task)
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
