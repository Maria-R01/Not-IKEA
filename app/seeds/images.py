from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

item_images =[
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__0625599_pe692385_s5.jpg?f=xs"),
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__1051924_pe845813_s5.jpg?f=m"),
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__0249652_pe387976_s5.jpg?f=xs"),
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__1065928_ph182491_s5.jpg?f=xs"),
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__1065965_ph158750_s5.jpg?f=xs"),
    Image(item_id=1, url="https://www.ikea.com/us/en/images/products/billy-bookcase-white__1065965_ph158750_s5.jpg?f=xs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0818565_pe774487_s5.jpg?f=xxxs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0818564_pe774486_s5.jpg?f=xs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0818534_pe774464_s5.jpg?f=xxxs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0934662_pe792483_s5.jpg?f=xxxs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0252533_pe391799_s5.jpg?f=xxxs"),
    Image(item_id=2, url="https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0937793_pe793848_s5.jpg?f=xxxs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0644757_pe702939_s5.jpg?f=xxs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__1084790_pe859876_s5.jpg?f=xxxs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__1084796_pe859882_s5.jpg?f=xxxs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__1051325_pe845148_s5.jpg?f=xs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__1099106_pe865602_s5.jpg?f=xxxs"),
    Image(item_id=3, url="https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__1106842_pe868819_s5.jpg?f=xxxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0484884_pe621348_s5.jpg?f=xxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__1154415_pe886018_s5.jpg?f=xxxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0823861_pe775996_s5.jpg?f=xxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0823862_pe775997_s5.jpg?f=xxxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__1154235_pe885954_s5.jpg?f=xxxs"),
    Image(item_id=4, url="https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0772164_pe755890_s5.jpg?f=xs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-gunnared-beige__1192140_pe900880_s5.jpg?f=xxs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-gunnared-beige__1192139_pe900879_s5.jpg?f=xxs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-gunnared-beige__1192138_pe900878_s5.jpg?f=xxxs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-gunnared-beige__1192137_pe900877_s5.jpg?f=xxxs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-gunnared-beige__1214369_pe911607_s5.jpg?f=xs"),
    Image(item_id=5, url="https://www.ikea.com/us/en/images/products/poaeng-armchair-birch-veneer-hillared-anthracite__0837219_pe629068_s5.jpg?f=xs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__57540_pe163122_s5.jpg?f=xxs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0835835_pe601383_s5.jpg?f=xxs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0258017_pe401973_s5.jpg?f=xs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0664929_pe712922_s5.jpg?f=xs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__1083778_pe859098_s5.jpg?f=xxxs"),
    Image(item_id=6, url="https://www.ikea.com/us/en/images/products/lack-coffee-table-white__0702217_pe724349_s5.jpg?f=xs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__1180460_pe896336_s5.jpg?f=xxs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__1036901_pe838568_s5.jpg?f=xxxs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__1078996_pe857423_s5.jpg?f=xxs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__0800858_ph159952_s5.jpg?f=xxxs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__1092123_pe863035_s5.jpg?f=xxxs"),
    Image(item_id=7, url="https://www.ikea.com/us/en/images/products/hemnes-daybed-with-3-drawers-2-mattresses-white-asvang-medium-firm__1154526_pe886099_s5.jpg?f=xxxs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__0651108_pe706676_s5.jpg?f=xxs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__0380806_pe555685_s5.jpg?f=xs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__0381485_pe556211_s5.jpg?f=xxxs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__0381459_pe556185_s5.jpg?f=xxxs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__0381332_pe556073_s5.jpg?f=xxxs"),
    Image(item_id=8, url="https://www.ikea.com/us/en/images/products/hemnes-2-drawer-chest-white-stain__1042113_pe841262_s5.jpg?f=xs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0243558_pe382884_s5.jpg?f=xxs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0243577_pe382918_s5.jpg?f=xxxs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0946137_pe797905_s5.jpg?f=xxs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0857279_pe554923_s5.jpg?f=xxxs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0857296_pe555851_s5.jpg?f=xxxs"),
    Image(item_id=9, url="https://www.ikea.com/us/en/images/products/morgedal-foam-mattress-firm-dark-gray__0857283_pe555000_s5.jpg?f=xxxs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-light-brown__1147956_pe883531_s5.jpg?f=xs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-light-brown__1094506_pe863484_s5.jpg?f=xxs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-light-brown__1147957_pe883532_s5.jpg?f=xxxs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-off-white__0647025_ph147168_s5.jpg?f=xxxs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-off-white__0893182_pe560504_s5.jpg?f=xxxs"),
    Image(item_id=10, url="https://www.ikea.com/us/en/images/products/ullerslev-sheepskin-off-white__0738576_ph151407_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0720485_pe732584_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0898365_pe635024_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0898360_pe635023_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0624537_pe691886_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0507779_pe635232_s5.jpg?f=xxxs"),
    Image(item_id=11, url="https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0624538_pe691885_s5.jpg?f=xxxs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0540825_pe653245_s5.jpg?f=xxs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0554995_pe660076_s5.jpg?f=xxs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0768653_pe754531_s5.jpg?f=xxxs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0900656_pe643698_s5.jpg?f=xs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0900663_pe643701_s5.jpg?f=xxxs"),
    Image(item_id=12, url="https://www.ikea.com/us/en/images/products/succulent-potted-plant-assorted-species-plants-succulent__0900652_pe626419_s5.jpg?f=xxxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__0638201_pe698764_s5.jpg?f=xxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__1035840_pe838227_s5.jpg?f=xxxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__1035838_pe838223_s5.jpg?f=xxxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__1059580_pe849678_s5.jpg?f=xxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__0820348_pe775002_s5.jpg?f=xxxs"),
    Image(item_id=13, url="https://www.ikea.com/us/en/images/products/glimma-unscented-tealights__1079463_pe857537_s5.jpg?f=xxxs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-black__0638345_pe698848_s5.jpg?f=xs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-white__0638343_pe698865_s5.jpg?f=xs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-white__0123068_pe259564_s5.jpg?f=xxxs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-black__0904686_pe595193_s5.jpg?f=xxxs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-black__0904690_pe597471_s5.jpg?f=xs"),
    Image(item_id=14, url="https://www.ikea.com/us/en/images/products/ribba-frame-black__0767924_pe754353_s5.jpg?f=xxxs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__0823288_pe775767_s5.jpg?f=xxs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__0781497_pe760809_s5.jpg?f=xxxs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__0781496_pe760806_s5.jpg?f=xxs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__0781498_pe760808_s5.jpg?f=xxxs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__0749207_pe745565_s5.jpg?f=xs"),
    Image(item_id=15, url="https://www.ikea.com/us/en/images/products/kivik-sectional-4-seat-with-chaise-gunnared-light-brown-pink__1134553_pe878803_s5.jpg?f=xxxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-white__0555120_pe660185_s5.jpg?f=xxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-brown__0555114_pe660180_s5.jpg?f=xxxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-white__0818036_ph167731_s5.jpg?f=xxxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-white__0858618_pe660187_s5.jpg?f=xxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-brown__0858559_pe660182_s5.jpg?f=xxxs"),
    Image(item_id=16, url="https://www.ikea.com/us/en/images/products/songesand-wardrobe-white__0789904_pe764192_s5.jpg?f=xs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0390768_pe561460_s5.jpg?f=xxs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0857466_pe561456_s5.jpg?f=xxxs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0857474_pe607529_s5.jpg?f=xxs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0857459_pe561455_s5.jpg?f=xxxs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0857448_pe561454_s5.jpg?f=xxxs"),
    Image(item_id=17, url="https://www.ikea.com/us/en/images/products/haugsvaer-hybrid-mattress-medium-firm-dark-gray__0857811_pe607559_s5.jpg?f=xxxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__0503386_pe632627_s5.jpg?f=xxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__1134462_pe878783_s5.jpg?f=xxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__0806246_ph161134_s5.jpg?f=xxxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__1190408_ph185118_s5.jpg?f=xxxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__1190407_ph185117_s5.jpg?f=xxxs"),
    Image(item_id=18, url="https://www.ikea.com/us/en/images/products/raskog-utility-cart-white__1092188_pe862732_s5.jpg?f=xs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0448991_pe598562_s5.jpg?f=xs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0523423_ph141763_s5.jpg?f=xxxs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0891277_pe562420_s5.jpg?f=xxxs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0956548_ph170901_s5.jpg?f=xxxs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0956561_ph168707_s5.jpg?f=xxxs"),
    Image(item_id=19, url="https://www.ikea.com/us/en/images/products/stockholm-2017-rug-flatwoven-handmade-stripe-gray__0949671_pe799946_s5.jpg?f=xs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1101927_pe866502_s5.jpg?f=xxs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1101924_pe866501_s5.jpg?f=xxxs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1102652_pe867070_s5.jpg?f=xxxs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1101926_pe866503_s5.jpg?f=xxs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1101925_pe866504_s5.jpg?f=xxxs"),
    Image(item_id=20, url="https://www.ikea.com/us/en/images/products/sinnerlig-pendant-lamp-bamboo-handmade__1175860_pe894833_s5.jpg?f=xs"),
]

def seed_images():
    for image in item_images:
        db.session.add(image)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
    db.session.commit()
