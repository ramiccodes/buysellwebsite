-- Users table seeds here (Example)

-- USERS --
INSERT INTO users (username, email, password, is_admin)
VALUES ('alice_wonder', 'aWonder@gmail.com', 'password', false),
('ashKetchup', 'ashKetch@gmail.com', 'password', false),
('bruceWayne', 'amBatman@gmail.com', 'admin', true),
('spydi_senZ', 'peterparker@gmail.com', 'admin', true);

-- PRODUCTS --
INSERT INTO products (user_id, title, price, img, description, category, is_sold)
VALUES (3, 'Batmobile', 300000, 'https://robbreport.com/wp-content/uploads/2022/02/Electric_Batmobile6.jpg', 'In good condition. I bought this off of an auction held at the Gotham police station. Alfred advised against it but I ended up buying it anyway. Now I am being forced into selling it.', 'vehicles', false),
(4, 'Web Shooters', 5234, 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/54/Right_Web-Shooter_%28HoCo%29.png/revision/latest/scale-to-width-down/1000?cb=20171018172549', 'My good friend, Spiderman gave me his broken web shooters hoping that I would fix it. The thing is, I need money so any transactions will need to be urgent as I need to pay my rent', 'tech', false),
(3, 'Batarangs', 2060, 'https://i.stack.imgur.com/MjsCl.jpg', 'I picked this off the street lol, Batman should definitely have one of those magnets things in his wrists, so he could save on making a ton of these', 'novelty', false),
(4, 'Film Camera', 550, 'https://i.ytimg.com/vi/8LSCuksR5YA/maxresdefault.jpg', 'Used and abused, willing to negotiate price', 'tech', true),
(3, 'Jaeger-LeCoultre Reverso', 7000, 'https://fifthwrist.com/wp-content/uploads/2020/01/IMG_3742-scaled.jpg', 'Like new condition, you can flip the watch face in order to hide it', 'wearables', false),
(4, 'Yellow Moped', 3520, 'https://preview.redd.it/pizza-time-i-bought-the-same-model-moped-as-peter-parker-v0-9bn36nmbmdh91.jpg?width=640&crop=smart&auto=webp&s=e83cda003130c4c21668c8bd8e83d8d7361032e1', 'I used this to deliver pizza, should be in good condition still.', 'vehicles', false),
(3, 'Oceanic Repellent 4-pack', 120, 'https://static.wikia.nocookie.net/batman60stv/images/4/47/Batsprays.jpg/revision/latest?cb=20120818172152', 'Mint condition, unused 4-pack of oceanic repellents perfect for riding in a jetski or a yacht', 'novelty', false),
(4, 'Spider Signal', 316, 'https://static1.srcdn.com/wordpress/wp-content/uploads/2016/10/spider-man-spider-signal-captain-america-civil-war.jpg', 'Do not ask me how I have this', 'tech', false),
(3, 'Joker Card', 15, 'https://static.wikia.nocookie.net/batman/images/f/ff/Cardhold.jpg/revision/latest?cb=20210225222919', 'I found it near the company building', 'novelty', true),
(4, 'Spiderman Watch', 45, 'https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw8dad99fc/images/B4A21A4A_9.jpg?sw=767&sh=767&sm=fit', 'Part of Spiderman merch for kids collection, mint condition', 'wearables', false);



