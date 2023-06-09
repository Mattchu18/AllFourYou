from app.models.tasker import db, Tasker, environment, SCHEMA
from sqlalchemy.sql import text

def seed_taskers():
    kevinb = Tasker(
        username='kevinb_tasker',
        first_name = "Kevin",
        last_name = "B",
        email='kevinb_tasker@aa.io',
        city='Demo City',
        phone_number= 1100000000,
        bio = "Hi I am Kevin and I raise pokemons. I also can make a good cup of keureg coffee. I know how to operate and maintain them machines to sustain coffee consumption.",
        profile_image = "imageforkevin.com",
        hourly_rate="$46.45/hr",
        vehicles = "Mercedes Benz S Class",
        tools = "Pokedex, keureg machine, coffee beans, pokeballs",
        available = False,
        task_id =1
        )
    vanessag = Tasker(
        username='vanessag_tasker',
        first_name = "Vanessa",
        last_name = "G",
        email='vanessag_tasker@aa.io',
        city='Demo City',
        phone_number= 1200000000,
        bio = "Hi I am Vanessa and I am the hippesta and coolioest dating expert. I am also a budding software engineer that plans to create my own dating app and host my own dating tv show. I have successfully matched over 500,000 people. I am here to help.",
        profile_image = "imageforvanessa.com",
        hourly_rate="$36.45/hr",
        vehicles = "Smart Car",
        tools = "Keyboard, phone, therapist certification, influencer",
        available = False,
        task_id =2
        )
    tonyh = Tasker(
        username='tonyh_tasker',
        first_name = "Tony",
        last_name = "H",
        email='tonyh_tasker@aa.io',
        city='Demo City',
        phone_number= 1300000000,
        bio = "Hi I am Tony and I like spaghetti! When I was a young lad I fell on a wrench and that wrench was fused to my hand. Thus, I am able to fix anything that I encounter because I have a wrench handy at all times. My spaghetti always tastes like metal though.",
        profile_image = "imagefortony.com",
        hourly_rate="$49.45/hr",
        vehicles = "Moped, Pickup Truck",
        tools = "hammer, wrench, ladder, spatula, drill",
        available = False,
        task_id =3
        )
    matthewa = Tasker(
        username='matthewa_tasker',
        first_name = "Matthew",
        last_name = "A",
        email='matthewa_tasker@aa.io',
        city='Demo City',
        phone_number= 1400000000,
        bio = "Hi I am a dance instructer. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "imageformatthew.com",
        hourly_rate="$50.45/hr",
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms",
        available = False,
        task_id =4
        )
    demo = Tasker(
        username='demo_tasker',
        first_name = "Demo",
        last_name = "A",
        email='demo_tasker@aa.io',
        city='San Francisco',
        phone_number= 1500000000,
        bio = "Hi I am a dance instructer. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "imagefordemo.com",
        hourly_rate="$40.45/hr",
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms",
        available = True,
        task_id = 5
        )
    adam = Tasker(
        username='adam_tasker',
        first_name = "Adam",
        last_name = "Driver",
        email='adam_diver@aa.io',
        city='San Francisco',
        phone_number= 1600000000,
        bio = "Hi I am a dance instructer. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "https://media.gq-magazine.co.uk/photos/5d138d39b6fee96334c9d921/master/pass/adamDriverstarwars.jpg",
        hourly_rate="$56.45/hr",
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms",
        available = True,
        task_id = 6
        )

    db.session.add(kevinb)
    db.session.add(vanessag)
    db.session.add(tonyh)
    db.session.add(matthewa)
    db.session.add(demo)
    db.session.add(adam)
    db.session.commit()


def undo_taskers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.taskers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM taskers"))

    db.session.commit()
