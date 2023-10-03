from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

items = [
    Item( 
        item_name="Billy Bookcase",
        price=79.99,
        description="The Billy Bookcase is a versatile and stylish storage solution for your home. With adjustable shelves, it can accommodate books of all sizes, as well as decorative items and storage boxes. Its simple and timeless design fits seamlessly into any room's decor. Available in various colors and sizes, the Billy Bookcase is a must-have for organizing your living space.",
        available_quantity=25
    ),
    Item(
        item_name="Ektorp Sofa",
        price=399.99,
        description="The Ektorp Sofa offers both comfort and affordability. It features a plush cushioned design that provides a cozy seating experience for you and your guests. The sofa's classic style and neutral color options make it a versatile addition to any living room. Whether you're lounging or entertaining, the Ektorp Sofa is an inviting centerpiece for your home.",
        available_quantity=15
    ),
    Item(
        item_name="Kallax Shelf Unit",
        price=69.99,
        description="The Kallax Shelf Unit is a practical and modern storage solution designed to fit your needs. Its cube-shaped compartments are perfect for organizing books, vinyl records, or decorative items. You can use it horizontally as a room divider or vertically as a tall storage unit. The Kallax Shelf Unit's sleek design and versatility make it a functional addition to any room in your home.",
        available_quantity=20
    ),
    Item(
        item_name="Malm Dresser",
        price=149.99,
        description="The Malm Dresser combines spacious storage with an elegant design. Its smooth-gliding drawers provide ample space for your clothing and accessories. The clean lines and simple aesthetics of the dresser make it a timeless addition to your bedroom decor. Keep your belongings organized and your room clutter-free with the Malm Dresser.",
        available_quantity=30
    ),
    Item(
        item_name="Poang Chair",
        price=99.99,
        description="The Poang Chair is a classic and comfortable seating option for your home. Its ergonomic design and cushioned seat provide excellent support and relaxation. Whether you're reading a book or watching TV, the Poang Chair offers an enjoyable and stress-relieving experience. With various upholstery options, you can customize it to match your interior style.",
        available_quantity=40
    ),
    Item(
        item_name="Lack Coffee Table",
        price=29.99,
        description="The Lack Coffee Table is a simple and functional addition to your living room. Its lightweight design makes it easy to move around, and its lower shelf provides extra storage space for magazines or remote controls. The table's clean and minimalist look complements various decor styles, making it a versatile choice for any home.",
        available_quantity=50
    ),
    Item(
        item_name="Hemnes Bed",
        price=199.99,
        description="The Hemnes Bed is a sturdy and attractive bed frame that elevates the look of your bedroom. Crafted from solid wood, it offers durability and timeless charm. The slatted bed base ensures comfortable sleep and proper mattress support. With its classic design and quality construction, the Hemnes Bed is a perfect choice for a good night's rest.",
        available_quantity=10
    ),
    Item(
        item_name="Hemnes Nightstand",
        price=49.99,
        description="The Hemnes Nightstand is a functional and stylish addition to your bedroom decor. Its two drawers offer convenient storage for bedtime essentials, while the top surface provides space for a lamp or alarm clock. Crafted from solid wood, this nightstand is built to last and complements the Hemnes bed frame beautifully.",
        available_quantity=30
    ),
    Item(
        item_name="Morgedal Mattress",
        price=299.99,
        description="The Morgedal Mattress is designed for a restful night's sleep. It features a comfortable foam construction that conforms to your body's contours, providing support and comfort. With its medium-firm feel, this mattress is suitable for various sleep positions. Upgrade your sleep quality with the Morgedal Mattress and wake up feeling refreshed.",
        available_quantity=20
    ),
    Item(
        item_name="Rens Sheepskin Rug",
        price=24.99,
        description="Add a touch of luxury and warmth to your living space with the Rens Sheepskin Rug. This cozy rug is made from genuine sheepskin, making it soft and inviting. Whether you drape it over a chair or use it as a bedside rug, the Rens Sheepskin Rug adds a touch of comfort and style to your home decor.",
        available_quantity=40
    ),
    Item(
        item_name="Fargrik Dinnerware Set",
        price=39.99,
        description="The Fargrik Dinnerware Set offers a delightful way to enjoy meals with family and friends. This set includes a variety of plates, bowls, and mugs in vibrant and neutral colors. Crafted from durable stoneware, the dinnerware is suitable for everyday use and special occasions. Elevate your dining experience with the Fargrik Dinnerware Set.",
        available_quantity=60
    ),
    Item(
        item_name="Succulent Plant",
        price=9.99,
        description="Bring a touch of nature indoors with the Succulent Plant. These low-maintenance plants are perfect for adding greenery to your home decor. They thrive in various environments and require minimal care. Whether placed on a windowsill or in a decorative pot, succulents add a refreshing and calming element to your living space.",
        available_quantity=75
    ),
    Item(
        item_name="Glimma Unscented Candles",
        price=4.99,
        description="Create a cozy and inviting atmosphere with Glimma Unscented Candles. This pack includes a set of candles perfect for setting the mood during dinners or relaxing evenings. These candles burn cleanly and evenly, providing a warm and flickering glow. Enjoy the charm of candlelight without any added scents.",
        available_quantity=100
    ),
    Item(
        item_name="Ribba Picture Frame",
        price=12.99,
        description="Display your cherished memories with the Ribba Picture Frame. This stylish and affordable frame is available in various sizes to accommodate your favorite photos and artwork. Its sleek design complements modern and traditional decor styles. Showcase your pictures with pride using the Ribba Picture Frame.",
        available_quantity=45
    ),
    Item(
        item_name="Kivik Sectional Sofa",
        price=899.99,
        description="The Kivik Sectional Sofa is a spacious and comfortable seating solution for your living room. With its modular design, you can configure it to fit your space perfectly. The sofa features deep seats and plush cushions for ultimate relaxation. Elevate your lounging experience with the Kivik Sectional Sofa.",
        available_quantity=8
    ),
    Item(
        item_name="Brusali Wardrobe",
        price=169.99,
        description="The Brusali Wardrobe offers ample storage space for your clothes and accessories. It features adjustable shelves and a clothing rail to keep your garments organized. The simple and clean design of this wardrobe complements various bedroom styles. Keep your wardrobe clutter-free with the Brusali Wardrobe.",
        available_quantity=12
    ),
    Item(
        item_name="Sultan Hultsvik Mattress",
        price=499.99,
        description="The Sultan Hultsvik Mattress is designed for exceptional comfort and support. It features memory foam and pocket springs that adapt to your body's contours, providing a restful sleep experience. Say goodbye to restless nights and wake up feeling rejuvenated with the Sultan Hultsvik Mattress.",
        available_quantity=15
    ),
    Item(
        item_name="Raskog Utility Cart",
        price=34.99,
        description="The Raskog Utility Cart is a versatile and mobile storage solution for your home. Use it in the kitchen to store cooking essentials or in the bathroom for toiletries. With its durable construction and wheels for easy movement, this cart adds convenience and organization to any room.",
        available_quantity=25
    ),
    Item(
        item_name="Stockholm Rug",
        price=199.99,
        description="The Stockholm Rug is a work of art for your floors. Made from pure new wool, it features a stunning, handwoven design that adds warmth and sophistication to any room. With its timeless pattern and high-quality craftsmanship, the Stockholm Rug is a luxurious addition to your home.",
        available_quantity=7
    ),
    Item(
        item_name="Sinnerlig Pendant Lamp",
        price=79.99,
        description="The Sinnerlig Pendant Lamp combines natural materials with modern design. Crafted from bamboo and frosted glass, it creates a warm and inviting ambiance in your living space. Hang it above your dining table or in the entryway to make a style statement.",
        available_quantity=18
    ),
]



def seed_items():
    for item in items:
        db.session.add(item)
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
    db.session.commit()
