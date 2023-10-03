from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

reviews = [
    Review(
    review="The Billy Bookcase is fantastic! It's affordable, easy to assemble, and looks great in my living room. I love the adjustable shelves; they make organizing a breeze.",
    stars=5,
    user_id=1,
    item_id=1
    ),
    Review(
        review="I purchased the Billy Bookcase in white, and it's a perfect addition to my home office. It's sturdy and holds all my books and decor. I highly recommend it!",
        stars=4,
        user_id=2,
        item_id=1
    ),
    Review(
        review="The Billy Bookcase is a classic choice. It's a good value for the price, and the various color options allowed me to match it with my existing furniture. Assembly was straightforward.",
        stars=4,
        user_id=3,
        item_id=1
    ),
    Review(
        review="I'm in love with my Ektorp Sofa! It's incredibly comfortable, and the neutral color fits perfectly in my living room. Great for lounging or hosting guests.",
        stars=5,
        user_id=1,
        item_id=2
    ),
    Review(
        review="The Ektorp Sofa is a fantastic buy. It's plush and cozy, and the price is unbeatable. I got the gray one, and it looks sleek and modern.",
        stars=5,
        user_id=2,
        item_id=2
    ),
    Review(
        review="I couldn't be happier with my Ektorp Sofa. The quality for the price is impressive. It's my new favorite spot in the house!",
        stars=5,
        user_id=3,
        item_id=2
    ),
    Review(
        review="The Kallax Shelf Unit is a versatile storage solution. I'm using it vertically as a room divider, and it's perfect for displaying my vinyl collection. Easy to assemble, too!",
        stars=5,
        user_id=1,
        item_id=3
    ),
    Review(
        review="I love the Kallax Shelf Unit! It's perfect for organizing my books, and it looks sleek in my home office. I can't believe the price for such a stylish piece.",
        stars=5,
        user_id=2,
        item_id=3
    ),
    Review(
        review="The Kallax Shelf Unit exceeded my expectations. It's practical, modern, and easy to assemble. I'm considering getting another one for my bedroom.",
        stars=5,
        user_id=3,
        item_id=3
    ),
    Review(
        review="The Malm Dresser is a beautiful addition to my bedroom. It has ample storage space, and the smooth-gliding drawers are a plus. The oak finish looks elegant.",
        stars=4,
        user_id=1,
        item_id=4
    ),
    Review(
        review="I've had the Malm Dresser for a while now, and it's still in great condition. It's functional and stylish. I would recommend it to anyone looking for a quality dresser.",
        stars=4,
        user_id=2,
        item_id=4
    ),
    Review(
        review="The Malm Dresser is worth every penny. The drawers are spacious, and it's well-built. It's a timeless piece that complements my bedroom decor.",
        stars=5,
        user_id=3,
        item_id=4
    ),
    Review(
        review="The Poang Chair is my go-to relaxation spot. It's incredibly comfortable, and I love the cushioned seat. I have it in my reading nook, and it's perfect!",
        stars=5,
        user_id=1,
        item_id=5
    ),
    Review(
        review="I've had the Poang Chair for years, and it's still as comfortable as ever. The design is classic, and it fits well in any room. I'm a huge fan!",
        stars=5,
        user_id=2,
        item_id=5
    ),
    Review(
        review="The Poang Chair is a must-have for anyone who loves comfort. I have it in my living room, and it's my favorite spot to unwind after a long day. Highly recommended.",
        stars=5,
        user_id=3,
        item_id=5
    ),
    Review(
        review="The Lack Coffee Table is a simple yet functional piece. I like that it's lightweight and easy to move around. The lower shelf is handy for storing magazines.",
        stars=4,
        user_id=1,
        item_id=6
    ),
    Review(
        review="I needed an affordable coffee table for my apartment, and the Lack Coffee Table was a great find. It looks minimalistic and clean, which I love. It's a great value.",
        stars=4,
        user_id=2,
        item_id=6
    ),
    Review(
        review="The Lack Coffee Table is exactly what I needed in my living room. It's sturdy, and the design is versatile. I would recommend it to anyone looking for a budget-friendly option.",
        stars=4,
        user_id=3,
        item_id=6
    ),
    Review(
        review="I'm very happy with my Hemnes Bed. It's a solid, well-built bed frame with a classic design. The quality is excellent, and it's been a great addition to my bedroom.",
        stars=5,
        user_id=1,
        item_id=7
    ),
    Review(
        review="The Hemnes Bed is a beautiful piece of furniture. The wood is sturdy, and the slatted bed base ensures a comfortable night's sleep. I couldn't be more pleased.",
        stars=5,
        user_id=2,
        item_id=7
    ),
    Review(
        review="I've had the Hemnes Bed for a while now, and it still looks brand new. It's timeless and well-crafted. If you're looking for a reliable bed frame, this is it.",
        stars=5,
        user_id=3,
        item_id=7
    ),
    Review(
        review="The Hemnes Nightstand is a functional and stylish addition to my bedroom. The drawers provide ample storage, and it complements my Hemnes bed frame perfectly.",
        stars=4,
        user_id=1,
        item_id=8
    ),
    Review(
        review="I bought two Hemnes Nightstands, and they look great on either side of my bed. The drawers are handy for keeping my bedtime essentials organized. Great value for the price.",
        stars=4,
        user_id=2,
        item_id=8
    ),
    Review(
        review="The Hemnes Nightstand is a reliable choice. It's well-made and matches my Hemnes bed frame beautifully. The drawers are spacious, and it's a practical addition to my bedroom.",
        stars=4,
        user_id=3,
        item_id=8
    ),
    Review(
        review="I've been sleeping on the Morgedal Mattress for a while, and it's been a game-changer for my sleep quality. It's comfortable and offers excellent support. Highly recommended!",
        stars=5,
        user_id=1,
        item_id=9
    ),
    Review(
        review="The Morgedal Mattress is a great investment. It's medium-firm and conforms to my body for a restful sleep. I wake up feeling refreshed and pain-free. Worth every penny.",
        stars=5,
        user_id=2,
        item_id=9
    ),
    Review(
        review="I upgraded to the Morgedal Mattress, and it's been a fantastic decision. The foam construction is comfortable, and it suits various sleep positions. It's like sleeping on a cloud!",
        stars=5,
        user_id=3,
        item_id=9
    ),
    Review(
        review="The Rens Sheepskin Rug is so soft and luxurious. I use it as a bedside rug, and it adds a cozy touch to my bedroom decor. I love the feel of genuine sheepskin!",
        stars=5,
        user_id=1,
        item_id=10
    ),
    Review(
        review="I can't get enough of the Rens Sheepskin Rug. It's incredibly soft and looks elegant in my living room. It's a great addition to my home.",
        stars=5,
        user_id=2,
        item_id=10
    ),
    Review(
        review="The Rens Sheepskin Rug is a must-have. It's versatile and adds warmth to any room. I have it draped over a chair, and it's the perfect spot to relax.",
        stars=5,
        user_id=3,
        item_id=10
    ),
    Review(
        review="I'm delighted with the Fargrik Dinnerware Set. The colorful plates and bowls brighten up my dining table. The stoneware is durable, and I use it every day without any issues.",
        stars=5,
        user_id=1,
        item_id=11
    ),
    Review(
        review="The Fargrik Dinnerware Set is perfect for everyday use. The quality is impressive, and I love the variety of colors. It's made mealtime more enjoyable!",
        stars=5,
        user_id=2,
        item_id=11
    ),
    Review(
        review="I upgraded my old dinnerware to the Fargrik Dinnerware Set, and it's made a noticeable difference. The stoneware is sturdy, and the set includes everything I need. Highly recommended.",
        stars=5,
        user_id=3,
        item_id=11
    ),
    Review(
        review="The Succulent Plant is a lovely addition to my home. It adds a touch of nature without requiring much maintenance. Perfect for adding some greenery to my living room.",
        stars=4,
        user_id=1,
        item_id=12
    ),
    Review(
        review="I'm not known for my green thumb, but the Succulent Plant is thriving in my care. It's a low-maintenance way to bring some green into my space. Highly recommended for plant beginners!",
        stars=4,
        user_id=2,
        item_id=12
    ),
    Review(
        review="The Succulent Plant is my favorite decor piece. It's cute and adds a refreshing element to my room. I can't believe how easy it is to care for.",
        stars=5,
        user_id=3,
        item_id=12
    ),
    Review(
        review="I love the cozy atmosphere created by Glimma Unscented Candles. They burn evenly and provide a warm glow during dinners. Perfect for setting the mood.",
        stars=5,
        user_id=1,
        item_id=13
    ),
    Review(
        review="I keep a pack of Glimma Unscented Candles at all times. They're great for creating a relaxing ambiance. They burn cleanly, and the price is fantastic.",
        stars=5,
        user_id=2,
        item_id=13
    ),
    Review(
        review="Glimma Unscented Candles are a staple in my home. They're reliable for adding a touch of candlelight to any occasion. I appreciate that they're unscented, allowing other scents to shine.",
        stars=5,
        user_id=3,
        item_id=13
    ),
    Review(
        review="The Ribba Picture Frame is a sleek and affordable option for displaying my favorite photos. It looks great on my gallery wall. I'm very pleased with this purchase.",
        stars=5,
        user_id=1,
        item_id=14
    ),
    Review(
        review="I have several Ribba Picture Frames in different sizes, and they all look fantastic. They're versatile and complement various decor styles. A great choice for framing memories.",
        stars=5,
        user_id=2,
        item_id=14
    ),
    Review(
        review="I've been using Ribba Picture Frames for years, and they never disappoint. The design is minimalistic, allowing my photos to take center stage. Highly recommended!",
        stars=5,
        user_id=3,
        item_id=14
    ),
    Review(
        review="The Kivik Sectional Sofa is the perfect addition to my living room. It's spacious, comfortable, and the modular design lets me customize it to fit my space. Great for movie nights!",
        stars=5,
        user_id=1,
        item_id=15
    ),
    Review(
        review="I was looking for a roomy and comfortable sofa, and the Kivik Sectional Sofa delivered. It's plush and deep, perfect for lounging. I'm very happy with my purchase.",
        stars=5,
        user_id=2,
        item_id=15
    ),
    Review(
        review="The Kivik Sectional Sofa has transformed my living room into a cozy haven. It's incredibly comfortable, and the quality is evident. I highly recommend it!",
        stars=5,
        user_id=3,
        item_id=15
    ),
    Review(
        review="The Brusali Wardrobe is spacious and well-organized. It holds all my clothes and accessories with ease. The adjustable shelves are a bonus. A practical addition to any bedroom.",
        stars=4,
        user_id=1,
        item_id=16
    ),
    Review(
        review="I've been using the Brusali Wardrobe for a while, and it keeps my clothes neatly organized. The design is simple and matches my bedroom decor. A good buy for the price.",
        stars=4,
        user_id=2,
        item_id=16
    ),
    Review(
        review="The Brusali Wardrobe is a great investment for keeping my wardrobe tidy. It's functional and blends well with different bedroom styles. I'm satisfied with my purchase.",
        stars=4,
        user_id=3,
        item_id=16
    ),
    Review(
        review="The Sultan Hultsvik Mattress is a game-changer for my sleep quality. It's incredibly comfortable, and the memory foam adapts to my body's contours. I wake up refreshed!",
        stars=5,
        user_id=1,
        item_id=17
    ),
    Review(
        review="I invested in the Sultan Hultsvik Mattress, and it's been worth every penny. The pocket springs provide excellent support, and it's like sleeping on a cloud. Highly recommended.",
        stars=5,
        user_id=2,
        item_id=17
    ),
    Review(
        review="I've had the Sultan Hultsvik Mattress for a while now, and it's still as comfortable as day one. It's a fantastic choice for anyone seeking a restful night's sleep.",
        stars=5,
        user_id=3,
        item_id=17
    ),
    Review(
        review="The Raskog Utility Cart is a versatile storage solution. I use it in my kitchen, and it keeps my cooking essentials organized. The wheels make it easy to move around. A handy addition to any room.",
        stars=5,
        user_id=1,
        item_id=18
    ),
    Review(
        review="I can't imagine my kitchen without the Raskog Utility Cart. It's sturdy and provides extra storage space. It's also great for keeping toiletries organized in the bathroom. Very practical!",
        stars=5,
        user_id=2,
        item_id=18
    ),
    Review(
        review="The Raskog Utility Cart is a game-changer for organization. I use it in my craft room, and it holds all my supplies. The mobility is a big plus. Highly recommended for tidying up any space.",
        stars=5,
        user_id=3,
        item_id=18
    ),
    Review(
        review="The Stockholm Rug is a work of art for my floors. The handwoven design adds warmth and sophistication to my living room. It's a luxurious addition to my home decor.",
        stars=5,
        user_id=1,
        item_id=19
    ),
    Review(
        review="I splurged on the Stockholm Rug, and it's been worth every cent. The quality and craftsmanship are exceptional. It's a statement piece that ties my room together.",
        stars=5,
        user_id=2,
        item_id=19
    ),
    Review(
        review="The Stockholm Rug is a true masterpiece. It's made from pure new wool, and the pattern is timeless. I couldn't be happier with this luxurious addition to my home.",
        stars=5,
        user_id=3,
        item_id=19
    ),
    Review(
        review="The Sinnerlig Pendant Lamp is a showstopper in my home. The bamboo and frosted glass create a warm and inviting ambiance. I hung it above my dining table, and it's a style statement.",
        stars=5,
        user_id=1,
        item_id=20
    ),
    Review(
        review="I love the natural feel of the Sinnerlig Pendant Lamp. It's a unique piece that adds character to my space. The bamboo and glass combination is stunning.",
        stars=5,
        user_id=2,
        item_id=20
    ),
    Review(
        review="The Sinnerlig Pendant Lamp is a design marvel. It's eco-friendly and creates a cozy atmosphere. I've received so many compliments on it. A must-have for those who appreciate artful lighting.",
        stars=5,
        user_id=3,
        item_id=20
    )
]

def seed_reviews():
    for review in reviews:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()

