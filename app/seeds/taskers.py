from app.models.tasker import db, Tasker, environment, SCHEMA
from sqlalchemy.sql import text

def seed_taskers():
    kevinb = Tasker(
        username='kevinb_tasker',
        first_name = "Kevin",
        last_name = "B",
        email='kevinb_tasker@aa.io',
        city='Demo City',
        phone_number= "1100000000",
        bio = "Hi I am Kevin and I raise pokemons. I also can make a good cup of keureg coffee. I know how to operate and maintain them machines to sustain coffee consumption. I also am a software engineer that can code a web application in as little as a week!",
        profile_image = "https://cdn.discordapp.com/attachments/683218210069413967/1116845390285787236/kevinmiddle.jpeg",
        hourly_rate="$46.45/hr",
        vehicles = "Mercedes Benz S Class",
        tools = "Pokedex, keureg machine, coffee beans, pokeballs, computer",
        available = True,
        task_id =1
        )
    vanessag = Tasker(
        username='vanessag_tasker',
        first_name = "Vanessa",
        last_name = "G",
        email='vanessag_tasker@aa.io',
        city='Demo City',
        phone_number= "1200000000",
        bio = "Hi I am Vanessa and I am the hippesta and coolioest dating expert. I am also a budding software engineer that plans to create my own dating app and host my own dating tv show. I have successfully matched over 500,000 people. I am here to help.",
        profile_image = "https://t4.ftcdn.net/jpg/04/13/55/45/360_F_413554591_BQzOaigFwRTgpoXU8WLY6hhQZYzijQek.jpg",
        hourly_rate="$36.45/hr",
        vehicles = "Smart Car",
        tools = "Keyboard, phone, therapist certification, influencer",
        available = True,
        task_id =2
        )
    tonyh = Tasker(
        username='tonyh_tasker',
        first_name = "Tony",
        last_name = "H",
        email='tonyh_tasker@aa.io',
        city='Demo City',
        phone_number= "1300000000",
        bio = "Hi I am Tony and I like spaghetti! When I was a young lad I fell on a wrench and that wrench was fused to my hand. Thus, I am able to fix anything that I encounter because I have a wrench handy at all times. My spaghetti always tastes like metal though.",
        profile_image = "https://www.shutterstock.com/image-photo/smile-face-happy-asian-man-260nw-1922514065.jpg",
        hourly_rate="$49.45/hr",
        vehicles = "Moped, Pickup Truck",
        tools = "hammer, wrench, ladder, spatula, drill",
        available = True,
        task_id =3
        )
    matthewa = Tasker(
        username='matthewa_tasker',
        first_name = "Matthew",
        last_name = "A",
        email='matthewa_tasker@aa.io',
        city='Demo City',
        phone_number= "1400000000",
        bio = "Hi I am a dance instructor. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "https://static7.depositphotos.com/1298242/789/i/600/depositphotos_7894119-stock-photo-smiling-hispanic-man-headshot.jpg",
        hourly_rate="$50.45/hr",
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms",
        available = True,
        task_id =4
        )
    demo = Tasker(
        username='demo_tasker',
        first_name = "Demo",
        last_name = "A",
        email='demo_tasker@aa.io',
        city='San Francisco',
        phone_number= "1500000000",
        bio = "Hi I am a dance instructer. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "https://img.freepik.com/premium-photo/business-education-office-concept-portrait-smiling-businessman_380164-65299.jpg",
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
        phone_number= "1600000000",
        bio = "Hi I am a dance instructer. I help people learn how to ballroom dance, hip-hop, salsa, and pole dance. I have over 1 year of experience and currently 2 students, Tony and Kevin. I am also a cheerleader on the side.",
        profile_image = "https://media.gq-magazine.co.uk/photos/5d138d39b6fee96334c9d921/master/pass/adamDriverstarwars.jpg",
        hourly_rate="$56.45/hr",
        vehicles = "Bicycle, walking",
        tools = "pole, boombox, cane, towel, pom poms",
        available = True,
        task_id = 6
        )
    taylorm = Tasker(
        username='taylorm_tasker',
        first_name = 'Taylor',
        last_name = 'M',
        email = 'taylorm_tasker@aa.io',
        city='Toronto',
        phone_number= "1700000000",
        bio = "Hello! My name is Taylor and I teach software engineering. My favorite subject to teach is most likely Math. I am a nerd when it comes to biology. I love the study of life and if you would like to learn more about biology or math please don't hesitate to contact me!",
        profile_image = "https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg",
        hourly_rate="$90.45/hr",
        vehicles = "Porsche Cayenne",
        tools = 'Calculator, Textbooks',
        available= True,
        task_id = 7
    )
    kevinl = Tasker(
        username='kevinl_tasker',
        first_name = 'Kevin',
        last_name = 'L',
        email = 'kevinl_tasker@aa.io',
        city='Los Angeles',
        phone_number= "1800000000",
        bio = "Hey everyone! My name is Kevin and I teach music. Whether you may want to learn the piano, guitar, flute or any kind of instrument, I can teach them all! I am passionate about teaching music, it is my bundle of joy and love getting to know everyone through music",
        profile_image = "https://media.istockphoto.com/id/1355110818/photo/studio-shot-of-a-handsome-and-happy-young-man-posing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=T39jUOOjC8H-Op0cfd-uiNXk1a2XBn1sXkQbKIWwY7E=",
        hourly_rate="$60.45/hr",
        vehicles = "Lamborghini Uru",
        tools = 'Guitar, Piano, Flute, Saxophone, Violin',
        available= True,
        task_id = 8
    )
    jordan = Tasker(
        username= 'username2',
        first_name= 'Jordan',
        last_name= 'B',
        email= 'jordan@b.com',
        city= 'San Francisco',
        phone_number= "1800000001",
        bio= "Hello! My name is Jordan and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://t4.ftcdn.net/jpg/04/32/89/63/360_F_432896398_99o08tTgBYj8YP2eatvF4zaJu3AdF40E.jpg',
        hourly_rate= '$54.00/hr',
        vehicles= 'Toyota Camry',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 9
    )
    michael = Tasker(
        username= 'username3',
        first_name= 'Michael',
        last_name= 'B',
        email= 'michael2@b.com',
        city= 'San Francisco',
        phone_number= "1800000002",
        bio= "Hello! My name is Michael and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3777943.jpg&fm=jpg',
        hourly_rate= '$50.00/hr',
        vehicles= 'Toyota Camry',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 10
    )
    smith = Tasker(
        username= 'username4',
        first_name= 'Smith',
        last_name= 'S',
        email= 'smith@b.com',
        city= 'Toronto',
        phone_number= "1800000003",
        bio= "Hello! My name is Smith and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://t3.ftcdn.net/jpg/04/60/91/88/360_F_460918802_XVCymFr7MoziFpnInbTDvrlblYhvAOi2.jpg',
        hourly_rate= '$50.00/hr',
        vehicles= 'Honda Civic',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 11
    )
    samantha = Tasker(
        username= 'username5',
        first_name= 'Samantha',
        last_name= 'B',
        email= 'Samantha@b.com',
        city= 'Los Angeles',
        phone_number= "1800000004",
        bio= "Hello! My name is Samantha and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://st3.depositphotos.com/1011434/13157/i/600/depositphotos_131572502-stock-photo-happy-woman-smiling.jpg',
        hourly_rate= '$35.00/hr',
        vehicles= 'Bicycle',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 12
    )
    mitch = Tasker(
        username= 'username6',
        first_name= 'Mitch',
        last_name= 'Z',
        email= 'Mitch@b.com',
        city= 'San Francisco',
        phone_number= "1800000005",
        bio= "Hello! My name is Mitch and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://t3.ftcdn.net/jpg/00/79/52/98/360_F_79529800_pPrRqNWqKRN6iRDUWibQSKlqM8pltsUZ.jpg',
        hourly_rate= '$97.00/hr',
        vehicles= 'Kia cube',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 13
    )
    kalista = Tasker(
        username= 'username7',
        first_name= 'Kalista',
        last_name= 'W',
        email= 'Kalista@b.com',
        city= 'Miami',
        phone_number= "1800000006",
        bio= "Hello! My name is Kalista and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://t3.ftcdn.net/jpg/03/62/50/16/360_F_362501638_FimxwTbbGUoRtjaypXDPGAyYCFvfvYy0.jpg',
        hourly_rate= '$78.00/hr',
        vehicles= 'Honda civic',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 14
    )
    sven = Tasker(
        username= 'username8',
        first_name= 'Sven',
        last_name= 'P',
        email= 'Sven@b.com',
        city= 'Joshua Tree',
        phone_number= "1800000007",
        bio= "Hello! My name is Sven and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://previews.123rf.com/images/fizkes/fizkes2001/fizkes200103134/138135927-head-shot-close-up-young-excited-happy-man-portrait-smiling-millennial-guy-looking-at-camera.jpg',
        hourly_rate= '$15.00/hr',
        vehicles= 'Scooter',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 15
    )
    chad = Tasker(
        username= 'username9',
        first_name= 'Chad',
        last_name= 'Q',
        email= 'Chad@b.com',
        city= 'Joshua Tree',
        phone_number= "1800000008",
        bio= "Hello! My name is Chad and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://www.shutterstock.com/image-photo/portrait-senior-man-glasses-studio-260nw-1449971240.jpg',
        hourly_rate= '$88.00/hr',
        vehicles= 'SkateBoard',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 16
    )
    terry = Tasker(
        username= 'username10',
        first_name= 'Terry',
        last_name= 'P',
        email= 'Terry@b.com',
        city= 'Miami',
        phone_number= "1800000009",
        bio= "Hello! My name is Terry and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://as2.ftcdn.net/v2/jpg/02/27/66/49/1000_F_227664975_wJUdlsQ2Vlr6llt67KZFQoEG6Dc5DYm0.jpg',
        hourly_rate= '$32.00/hr',
        vehicles= 'Motorcycle',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 17
    )
    amanda = Tasker(
        username= 'username11',
        first_name= 'Amanda',
        last_name= 'X',
        email= 'Amanda@b.com',
        city= 'Joshua Tree',
        phone_number= "18000000010",
        bio= "Hello! My name is Amanda and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://nyheadshots.com/wp-content/uploads/2018/07/headshots.jpg',
        hourly_rate= '$39.00/hr',
        vehicles= 'Scooter',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 18
    )
    omar = Tasker(
        username= 'username12',
        first_name= 'Omar',
        last_name= 'P',
        email= 'Omar@b.com',
        city= 'Joshua Tree',
        phone_number= "18000000011",
        bio= "Hello! My name is Omar and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://thumbs.dreamstime.com/t/professional-headshot-45311849.jpg',
        hourly_rate= '$43.00/hr',
        vehicles= 'Moped',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 19
    )
    ronald = Tasker(
        username= 'username13',
        first_name= 'Ronald',
        last_name= 'P',
        email= 'Ronald@b.com',
        city= 'Toronto',
        phone_number= "18000000012",
        bio= "Hello! My name is Ronald and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://e9g2x6t2.rocketcdn.me/wp-content/uploads/2022/06/professional-headshot-photography-examples-1.jpg',
        hourly_rate= '$86.00/hr',
        vehicles= 'Jeep',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 20
    )
    cameron = Tasker(
        username= 'username14',
        first_name= 'Cameron',
        last_name= 'E',
        email= 'Cameron@e.com',
        city= 'Joshua Tree',
        phone_number= "18000000013",
        bio= "Hello! My name is Ronald and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://img.freepik.com/free-photo/portrait-smiley-woman_23-2148827181.jpg',
        hourly_rate= '$68.00/hr',
        vehicles= 'Toyota Sienna',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 21
    )
    santa = Tasker(
        username= 'username15',
        first_name= 'Santa',
        last_name= 'C',
        email= 'Santa@b.com',
        city= 'Miami',
        phone_number= "18000000014",
        bio= "Hello! My name is Santa and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://images.pond5.com/happy-senior-man-laughing-staring-photo-219248709_iconl_nowm.jpeg',
        hourly_rate= '$1000.00/hr',
        vehicles= 'Sleigh',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 22
    )
    valentine = Tasker(
        username= 'username16',
        first_name= 'Valentine',
        last_name= 'V',
        email= 'Valentine@b.com',
        city= 'Miami',
        phone_number= "18000000015",
        bio= "Hello! My name is Valentine and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://images.pexels.com/photos/3813342/pexels-photo-3813342.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3813342.jpg&fm=jpg',
        hourly_rate= '$37.00/hr',
        vehicles= 'Toyota Tundra',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 23
    )
    larry = Tasker(
        username= 'username17',
        first_name= 'Larry',
        last_name= 'Q',
        email= 'Larry@b.com',
        city= 'San Francisco',
        phone_number= "18000000016",
        bio= "Hello! My name is Larry and I'm a skilled [profession]. With over [number] years of experience, I've helped numerous clients achieve their [specific task] goals. I take pride in delivering high-quality work and providing exceptional customer service. Whether you need assistance with [list of services], I'm here to lend a helping hand. I believe in clear communication, attention to detail, and exceeding expectations. My passion for [profession] drives me to constantly improve my skills and stay up-to-date with the latest industry trends. When I'm not working, I enjoy [hobbies/interests].",
        profile_image= 'https://t3.ftcdn.net/jpg/01/57/10/24/360_F_157102430_UIrHAGcuD1UJdg3zKyl5wXSKMKBBA57V.jpg',
        hourly_rate= '$72.00/hr',
        vehicles= 'Hyundai Sonata',
        tools= 'Tool 1, Tool 2, Tool 3',
        available= True,
        task_id= 24
    )

    db.session.add(kevinb)
    db.session.add(vanessag)
    db.session.add(tonyh)
    db.session.add(matthewa)
    db.session.add(demo)
    db.session.add(adam)
    db.session.add(taylorm)
    db.session.add(kevinl)
    db.session.add(jordan)
    db.session.add(michael)
    db.session.add(smith)
    db.session.add(samantha)
    db.session.add(mitch)
    db.session.add(kalista)
    db.session.add(sven)
    db.session.add(chad)
    db.session.add(terry)
    db.session.add(amanda)
    db.session.add(omar)
    db.session.add(ronald)
    db.session.add(cameron)
    db.session.add(santa)
    db.session.add(valentine)
    db.session.add(larry)
    db.session.commit()


def undo_taskers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.taskers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM taskers"))

    db.session.commit()
