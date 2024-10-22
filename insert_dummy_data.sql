-- /* DUMMY DATA */
	
INSERT INTO "Category" (name) VALUES 
('Chairs'),
('Tables'),
('Sofas'),
('Beds');


/* INSERT INTO "Review" (rating, comment, customer_id, furniture_id)
VALUES
  (4.5, 'Great recliner chair, very comfortable!', 1, 1),
  (5.0, 'Excellent desk chair, perfect for my home office.', 2, 2),
  (4.0, 'Nice dining chair set, sturdy and stylish.', 3, 3),
  (4.2, 'Comfortable gaming chair, good lumbar support.', 1, 4),
  (4.8, 'Beautiful armchair, fits perfectly in my living room.', 2, 5),
  (4.3, 'Lovely coffee table, modern design.', 3, 6),
  (4.6, 'Solid dining table, easy to assemble.', 1, 7),
  (4.9, 'Excellent desk, spacious and elegant.', 2, 8),
  (4.7, 'Good bedside table, compact and useful.', 3, 9),
  (4.1, 'Sleek console table, looks great in the hallway.', 1, 10),
  (4.4, 'Comfortable sectional sofa, high quality.', 2, 11),
  (4.0, 'Convertible sleeper sofa, great for guests.', 3, 12),
  (4.2, 'Compact loveseat, cozy and stylish.', 1, 13),
  (4.5, 'Elegant chaise lounge, perfect for relaxation.', 2, 14),
  (4.8, 'Classic chesterfield sofa, luxurious feel.', 3, 15),
  (4.6, 'Stylish racing style gaming chair, very ergonomic.', 1, 16),
  (4.7, 'Good ergonomic gaming chair, comfortable for long sessions.', 2, 17),
  (4.3, 'Massage gaming chair, great for relaxation.', 3, 18),
  (4.5, 'Comfortable rocker gaming chair, good for console gaming.', 1, 19),
  (4.4, 'Pedestal gaming chair with wireless audio, awesome sound.', 2, 20);
 */


-- Furniture Items Dummy Data
-- Change the url from localhost:3002 to your CDN public url.
 
INSERT INTO "FurnitureItem" (name, description, price, stock_quantity, model_3d_url, image_urls, total_sales, color, dimension, weight, category_id, "updatedAt")
VALUES
  (
    'Costco Center Table (White)', 
    'Stylish and practical, our Costco Table is a modern-day design that adds a soulful ambiance to your home. With a marble decor on top and metal rods in a crisscross arrangement, the table is immaculately designed to uplift your room giving it a sleek outlook. Its striking features include a wide tabletop and sturdy yet sleek metallic legs including glides to prevent any scratches on the floor.', 
    299.99, 
    30, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/products/costco_white_center_table_580x_crop_center.jpg?v=1687433398', 
      'https://interwood.pk/cdn/shop/products/coffee-table-costco-white-feccef1-interwood-mobel_580x_crop_center.png?v=1687433398'
    ], 
    20, 
    'White', 
    '120x60x45 cm',
    15.0, 
    2, 
    NOW()
  ),
  (
    'Costco Center Table', 
    'Add surface space and style to any interior with our elegant and spacious Costco center table. Featuring a sleek round black marble top supported by four sleek golden metallic with cross supports, Costco instantly adds elegance in any space. Its ample tabletop makes it ideal for using as coffee table, providing a place to display decorations, lamps or serve refreshments. Crafted from durable MFC and metal elements, Costco is a long-term addition to any living or workspace. The addition of carpet glides at the base prevent scratches on the floor, making it easy to reposition when needed.', 
    349.99, 
    25, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/products/costco_black_center_table_580x_crop_center.jpg?v=1687433405', 
      'https://interwood.pk/cdn/shop/products/coffee-table-costco-black-02690e3-interwood-mobel_580x_crop_center.png?v=1687433405', 
      'https://interwood.pk/cdn/shop/products/coffee-table-costco-black-color-c5d51f0-interwood-mobel_580x_crop_center.png?v=1687433405'
    ], 
    15, 
    'Black', 
    '90x90x40 cm', 
    20.0, 
    2, 
    NOW()
  ),
  (
    'Callisto Anchor Center Table', 
    'Add sophistication and functionality to any space with our stunning Callisto anchor center table. Featuring a luxurious black marble printed glass top, supported by a distinctive black powder-coated metal anchor base, Callisto brings a modern touch to any interior. Its sleek and durable tabletop is perfect for use as a coffee table, providing an elegant surface for displaying decorative items, keeping books/magazines, or serving refreshments. Designed for versatility, Callisto enhances both home and office environments with its blend of style and practicality. The robust construction ensures long-lasting durability, while the unique anchor base adds a striking architectural element, making it a standout piece in any room.', 
    399.99, 
    20, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/products/anchor_center_table_1_580x_crop_center.jpg?v=1687432858', 
      'https://interwood.pk/cdn/shop/products/centre_table_callisto_anchor_in_black_colour_3_580x_crop_center.jpg?v=1687432858', 
      'https://interwood.pk/cdn/shop/products/centre_table_callisto_anchor_in_black_colour_1_580x_crop_center.jpg?v=1687432858',
      'https://interwood.pk/cdn/shop/products/centre_table_callisto_anchor_in_black_colour_2_580x_crop_center.jpg?v=1687432859', 
      'https://interwood.pk/cdn/shop/products/centre_table_callisto_anchor_in_black_colour_4_580x_crop_center.jpg?v=1687432859'
    ], 
    10, 
    'Black', 
    '100x50x45 cm', 
    25.0, 
    2, 
    NOW()
  ),
  (
    'Sienna Side Table', 
    'Bring style and practicality into your living space with the chic Sienna side table. Made from mahogany wood and finished with a luxurious smoked walnut veneer, this table exudes sophistication and style. Featuring antique metallic motifs and glides on all four edges, Sienna adds a touch of vintage charm. Its unique fluted legs ensures stability while making it a stunning focal point in any living room. With its spacious surface, the Sienna side table is perfect for holding your drinks, books, and decorative items, elevating your interior décor with timeless design and classic elegance.', 
    199.99, 
    40, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/files/SiennaSideTable_580x_crop_center.jpg?v=1709799526', 
      'https://interwood.pk/cdn/shop/files/SiennaSideTable-01_580x_crop_center.jpg?v=1709799535'
    ], 
    25, 
    'Walnut', 
    '60x60x55 cm', 
    10.0, 
    2, 
    NOW()
  ),
  (
    'Sofa Grace', 
    'Elevate any living space with the chic single-seater Grace sofa - where plush comfort meets timeless style. Enveloped in a luxurious mid-grey velvet upholstery, this sofa is a visual and tactile delight. The tufting at the backrest, inside arms, and seat not only adds a touch of sophistication but also enhances the cozy allure of the sofa. The distinct tuxedo arms lend a refined and tailored look, while the lathe beech wooden legs with a chic black stain provide sturdy support with a modern twist, making it a perfect addition for any interior décor. Pair this piece with 2-seater Grace sofa for a refined and luxurious appeal.', 
    549.99, 
    15, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/files/SofaGrace1Seater_VelvetMidGrey_2_580x_crop_center.jpg?v=1704700122', 
      'https://interwood.pk/cdn/shop/files/SofaGrace1Seater_VelvetMidGrey_3_580x_crop_center.jpg?v=1704700121', 
      'https://interwood.pk/cdn/shop/files/SofaGrace1Seater_VelvetMidGrey_1_580x_crop_center.jpg?v=1704700121', 
      'https://interwood.pk/cdn/shop/files/SofaGrace2Seater_VelvetMidGrey_1_ee8d5048-0344-46ee-8b3f-9c9c57074d16_580x_crop_center.jpg?v=1718437950'
    ], 
    5, 
    'Mid-Grey', 
    '90x80x85 cm', 
    30.0, 
    3, 
    NOW()
  ),
  (
    'Lodge Sofa', 
    'Experience the perfect blend of modern style and plush comfort with our contemporary Lodge sofa (available in 1,2,3-seater). Fully upholstered in striking bottle green velvet atop radiant golden metallic legs, this chic piece exudes a sense of opulence and refinement in any interior décor. Its thick cushioning with super flex and latex foam on seat and supreme foam on back offers a comfortable seating experience while vertical stitched tufting creates a visually captivating pattern that adds depth and texture to the overall design. Durable materials, luxurious upholstery and a striking color makes Lodge a bold and sophisticated statement for any bedroom, living room, lounge, office and more.', 
    699.99, 
    10, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/files/sofa-lodge-single-seater-green-2389302-interwood-mobel_369d0978-73da-4df0-90e4-ebc8fe4c1d6b_580x_crop_center.png?v=1706595886', 
      'https://interwood.pk/cdn/shop/files/sofa-lodge-single-seater-in-green-velvet-side-5629aa2-interwood-mobel_a79f9fbe-a54c-479b-9558-6bf9a4b25ba6_580x_crop_center.png?v=1706595886', 
      'https://interwood.pk/cdn/shop/files/sofa-lodge-2-seater-in-green-velvet-side-9006321-interwood-mobel_348cecae-4933-4a2f-bf6e-d4c53d9b0f4d_580x_crop_center.png?v=1717849154'
    ], 
    8, 
    'Bottle Green', 
    '200x90x100 cm', 
    50.0, 
    3, 
    NOW()
  ),
  (
    'Sero Sero (Jute Beige)', 
    'Enjoy a new level of comfort and relaxation with the captivating charm of Sero sofa (available in 1,2- and 3-seater). Chic and stylish, this plush sofa features a classic design and exquisite features that enhance the overall look of any interior. Its generous cushioning, including a combination of latex foam and super flex foam offers a luxurious, plush feel while the back incorporates ball polyester for enduring sink-in comfort even for extended hours. The rolled arms with metallic studs and rounded wooden legs in smoked walnut finish exude refined elegance to any interior. The high-quality velvet jute upholstery in beige tone not only adds a touch of luxury and sophistication but also allows for easy maintenance, making this sofa look new for years to come.', 
    749.99, 
    12, 
    NULL, 
    ARRAY[
      'https://interwood.pk/cdn/shop/files/SofaSero1Seater_VelvetJuteBeige_1_580x_crop_center.jpg?v=1705583509', 
      'https://interwood.pk/cdn/shop/files/SofaSero1Seater_VelvetJuteBeige_3_580x_crop_center.jpg?v=1705583531', 
      'https://interwood.pk/cdn/shop/files/SofaSero1Seater_VelvetJuteBeige_2_580x_crop_center.jpg?v=1705583531'
    ], 
    3, 
    'Beige', 
    '180x95x95 cm', 
    45.0, 
    3, 
    NOW()
  ),
	(
    'LuxLounge Sofa', 
    'Experience the epitome of comfort and luxury with the LuxLounge Sofa. Crafted with high-density foam cushions and wrapped in premium velvet fabric, this sofa offers both style and relaxation. Its sleek design makes it the perfect addition to any modern living room.', 
    899.99, 
    20, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/1.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/1/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/1/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/1/3.png'
    ], 
    5, 
    'Blue', 
    '220x90x85 cm', 
    45.0, 
    3, 
    NOW()
  ),
  (
    'TimberRest Bed', 
    'The TimberRest Bed combines rustic charm with modern comfort. Made from solid pine wood, this bed features a sturdy frame and a classic design that fits seamlessly into any bedroom decor. The headboard and footboard are beautifully crafted, adding a touch of elegance.', 
    1299.99, 
    10, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/2.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/2/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/2/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/2/3.png'
    ], 
    8, 
    'Natural Wood', 
    '210x160x110 cm', 
    70.0, 
    4, 
    NOW()
  ),
  (
    'Nexus Modern Dining Table', 
    'The Nexus Modern Dining Table is a perfect blend of contemporary design and functionality. With a tempered glass top and sleek metal legs, this table is both durable and stylish. It comfortably seats six, making it ideal for family dinners or entertaining guests.', 
    749.99, 
    15, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/3.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/3/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/3/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/3/3.png'
    ], 
    12, 
    'Clear Glass', 
    '180x90x75 cm', 
    50.0, 
    2, 
    NOW()
  ),
  (
    'Velura Cushion Dining Chair', 
    'Add a touch of elegance to your dining area with the Velura Cushion Dining Chair. Upholstered in plush velvet and featuring a cushioned seat, this chair offers both comfort and style. The solid wood frame ensures durability, while the sleek design complements any dining table.', 
    199.99, 
    30, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/4.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/4/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/4/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/4/3.png'
    ], 
    20, 
    'Velvet Green', 
    '50x55x85 cm', 
    10.0, 
    1, 
    NOW()
  ),
  (
    'PineCraft Wooden Chair', 
    'The PineCraft Wooden Chair is a classic piece that brings warmth and tradition to any space. Made from high-quality pine wood, this chair is both sturdy and comfortable. Its simple design makes it versatile, perfect for use in dining rooms, kitchens, or as an accent chair.', 
    149.99, 
    25, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/5.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/5/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/5/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/5/3.png'
    ], 
    18, 
    'Natural Wood', 
    '45x50x90 cm', 
    15.0, 
    1, 
    NOW()
  ),
  (
    'Wooden Study Table', 
    'The Wooden Study Table is the perfect blend of functionality and style. Crafted from solid wood, it features a spacious work surface and built-in drawers for storage. This table is ideal for both students and professionals, providing a comfortable and efficient workspace.', 
    399.99, 
    20, 
    'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/3D-Models/6.glb', 
    ARRAY[
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/6/1.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/6/2.png', 
      'https://pub-196d36b0dfa74c35a0c00ac9bd0f227a.r2.dev/furniture-images/6/3.png'
    ], 
    10, 
    'Dark Walnut', 
    '120x60x75 cm', 
    40.0, 
    2, 
    NOW()
  );


  