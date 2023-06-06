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
        vehicles = "Mercedes Benz S Class",
        tools = "Pokedex, keureg machine, coffee beans, pokeballs"
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
        vehicles = "Smart Car",
        tools = "Keyboard, phone, therapist certification, influencer"
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
        vehicles = "Moped, Pickup Truck",
        tools = "hammer, wrench, ladder, spatula, drill"
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
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms"
        )

    db.session.add(kevinb)
    db.session.add(vanessag)
    db.session.add(tonyh)
    db.session.add(matthewa)
    db.session.commit()


def undo_taskers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.taskers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM taskers"))

    db.session.commit()
