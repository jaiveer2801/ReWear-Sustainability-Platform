export type CategoryId =
  | 'clothing'
  | 'plastic'
  | 'paper'
  | 'wood'
  | 'glass'
  | 'electronics'
  | 'metal'
  | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
  ideasCount: number;
  accent: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface UpcycleIdea {
  id: string;
  title: string;
  from: string;
  to: string;
  category: CategoryId;
  difficulty: Difficulty;
  timeMinutes: number;
  budgetInr: number;
  image: string;
  description: string;
  materials: string[];
  steps: string[];
  benefits: string[];
  co2SavedKg: number;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'clothing',
    name: 'Old Clothes & Textiles',
    shortName: 'Clothing',
    description: 'Turn worn denim, old tees and fabrics into bags, rugs and decor.',
    image:
      'https://images.pexels.com/photos/10133275/pexels-photo-10133275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Shirt',
    ideasCount: 24,
    accent: 'from-forest to-forest-deep',
  },
  {
    id: 'plastic',
    name: 'Plastic Bottles',
    shortName: 'Plastic',
    description: 'Reimagine bottles and containers as planters, organizers and art.',
    image:
      'https://images.pexels.com/photos/5719818/pexels-photo-5719818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Recycle',
    ideasCount: 18,
    accent: 'from-lime to-forest',
  },
  {
    id: 'paper',
    name: 'Cardboard & Paper',
    shortName: 'Cardboard',
    description: 'Fold, cut and stack boxes into storage, art and practical tools.',
    image:
      'https://images.pexels.com/photos/27666126/pexels-photo-27666126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'FileText',
    ideasCount: 16,
    accent: 'from-amber-500 to-forest-deep',
  },
  {
    id: 'glass',
    name: 'Glass Containers',
    shortName: 'Glass',
    description: 'Clean jars and bottles into lighting, storage and elegant decor.',
    image:
      'https://images.pexels.com/photos/11911870/pexels-photo-11911870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Wine',
    ideasCount: 14,
    accent: 'from-teal-600 to-forest',
  },
  {
    id: 'wood',
    name: 'Wood & Furniture',
    shortName: 'Wood',
    description: 'Rebuild crates, pallets and scrap wood into shelves and furniture.',
    image:
      'https://images.pexels.com/photos/6446312/pexels-photo-6446312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'TreePine',
    ideasCount: 21,
    accent: 'from-forest-deep to-amber-800',
  },
  {
    id: 'electronics',
    name: 'Old Electronics',
    shortName: 'Electronics',
    description: 'Repurpose casings and accessories into craft and clever storage.',
    image:
      'https://images.pexels.com/photos/4004228/pexels-photo-4004228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Cable',
    ideasCount: 11,
    accent: 'from-slate-700 to-forest-deep',
  },
  {
    id: 'metal',
    name: 'Metal Containers',
    shortName: 'Metal',
    description: 'Paint and repurpose tins and cans into planters and organizers.',
    image:
      'https://images.pexels.com/photos/1037765/pexels-photo-1037765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Container',
    ideasCount: 9,
    accent: 'from-zinc-600 to-forest-deep',
  },
  {
    id: 'other',
    name: 'Other Materials',
    shortName: 'Other',
    description: 'Broken tiles, cork, rubber and mixed scrap find a second life.',
    image:
      'https://images.pexels.com/photos/38000809/pexels-photo-38000809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Shapes',
    ideasCount: 7,
    accent: 'from-rose-600 to-forest-deep',
  },
];

export const ideas: UpcycleIdea[] = [
  // ── CLOTHING (4+) ──
  {
    id: 'jeans-tote',
    title: 'Old Jeans → Reusable Tote Bag',
    from: 'Old Jeans',
    to: 'Reusable Tote Bag',
    category: 'clothing',
    difficulty: 'Easy',
    timeMinutes: 45,
    budgetInr: 150,
    image:
      'https://images.pexels.com/photos/17514500/pexels-photo-17514500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut the legs off an old pair of jeans and stitch the hem into a sturdy, stylish tote — pockets included.',
    materials: ['Old jeans', 'Scissors', 'Needle & thread', 'Cotton strap'],
    steps: [
      'Lay jeans flat and cut the legs off just below the crotch.',
      'Turn the top section inside-out and sew the cut opening closed.',
      'Sew a cotton strap to the waistband to form handles.',
      'Turn right-side out and reinforce the bottom seam.',
    ],
    benefits: [
      'Saves ~7,000 L of water used to produce a new pair of jeans',
      'Durable denim lasts years longer than a disposable bag',
      'Eliminates single-use plastic bags on shopping trips',
    ],
    co2SavedKg: 6.2,
    featured: true,
  },
  {
    id: 'tshirt-rug',
    title: 'Old T-Shirts → Braided Rug',
    from: 'Old T-Shirts',
    to: 'Braided Rug',
    category: 'clothing',
    difficulty: 'Medium',
    timeMinutes: 120,
    budgetInr: 100,
    image:
      'https://images.pexels.com/photos/11573517/pexels-photo-11573517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut old tees into strips, braid them together, and coil into a colourful, washable floor rug.',
    materials: ['5-8 old t-shirts', 'Scissors', 'Needle & strong thread'],
    steps: [
      'Cut t-shirts into continuous 3 cm wide strips.',
      'Sew three strips end-to-end and braid tightly.',
      'Coil the braid into a spiral, sewing each row to the next.',
      'Tuck and sew the final end flat to finish.',
    ],
    benefits: [
      'Diverts multiple garments from landfill in one project',
      'Replaces a synthetic rug that sheds microplastics',
      'Machine-washable and fully biodegradable at end of life',
    ],
    co2SavedKg: 5.8,
  },
  {
    id: 'fabric-cushions',
    title: 'Fabric Scraps → Decorative Cushion Covers',
    from: 'Fabric Scraps',
    to: 'Decorative Cushion Covers',
    category: 'clothing',
    difficulty: 'Medium',
    timeMinutes: 75,
    budgetInr: 200,
    image:
      'https://images.pexels.com/photos/39333410/pexels-photo-39333410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Patchwork leftover fabric into unique cushion covers that add colour and texture to any room.',
    materials: ['Fabric scraps', 'Sewing machine', 'Pillow insert', 'Thread'],
    steps: [
      'Cut scraps into equal squares or a patchwork layout.',
      'Sew squares right-sides together in rows, then join rows.',
      'Cut a backing piece and sew an envelope closure.',
      'Turn right-side out and insert the pillow.',
    ],
    benefits: [
      'Uses offcuts that would otherwise be discarded',
      'Avoids buying new cushion covers wrapped in plastic',
      'Each cover is one-of-a-kind — no mass production needed',
    ],
    co2SavedKg: 3.1,
  },
  {
    id: 'shirt-organizer',
    title: 'Old Shirts → Storage Organizers',
    from: 'Old Shirts',
    to: 'Storage Organizers',
    category: 'clothing',
    difficulty: 'Easy',
    timeMinutes: 40,
    budgetInr: 80,
    image:
      'https://images.pexels.com/photos/10554836/pexels-photo-10554836.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Stiffen old shirts with fabric starch and stitch them into soft hanging pockets for desk or closet storage.',
    materials: ['Old shirts', 'Fabric starch', 'Needle & thread', 'Wooden dowel'],
    steps: [
      'Cut the shirt into a flat panel and apply fabric starch to stiffen.',
      'Fold and stitch pockets of varying sizes onto the panel.',
      'Hem the top edge and create a channel for the dowel.',
      'Hang with twine on a wall or inside a closet door.',
    ],
    benefits: [
      'Replaces plastic hanging organizers',
      'Lightweight and washable for everyday use',
      'Gives stained or torn shirts a functional second life',
    ],
    co2SavedKg: 2.4,
  },
  {
    id: 'tshirt-bag',
    title: 'Old T-Shirts → Reusable Shopping Bags',
    from: 'Old T-Shirts',
    to: 'Reusable Shopping Bags',
    category: 'clothing',
    difficulty: 'Easy',
    timeMinutes: 35,
    budgetInr: 50,
    image:
      'https://images.pexels.com/photos/18785062/pexels-photo-18785062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Transform a worn tee into a no-sew or low-sew bag using the bottom hem as the closure.',
    materials: ['Old t-shirt', 'Scissors', 'Bowl (to trace)', 'Fabric glue (optional)'],
    steps: [
      'Cut the sleeves and neckline off the t-shirt.',
      'Turn inside-out and glue or sew the bottom shut.',
      'Cut a fringe along the bottom and tie pairs together.',
      'Turn right-side out and use the armholes as handles.',
    ],
    benefits: [
      'No-sew option needs zero new materials',
      'Replaces hundreds of plastic bags over its lifetime',
      'Stretchy cotton holds groceries securely',
    ],
    co2SavedKg: 4.7,
  },

  // ── PLASTIC (4+) ──
  {
    id: 'bottle-garden',
    title: 'Plastic Bottles → Vertical Garden',
    from: 'Plastic Bottles',
    to: 'Vertical Garden',
    category: 'plastic',
    difficulty: 'Easy',
    timeMinutes: 30,
    budgetInr: 120,
    image:
      'https://images.pexels.com/photos/7443025/pexels-photo-7443025.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Mount halved plastic bottles on a wall or trellis to grow herbs and small plants vertically.',
    materials: ['Plastic bottles', 'Twine or wire', 'Soil', 'Seeds or seedlings'],
    steps: [
      'Cut a rectangular opening in the side of each bottle.',
      'Poke two small drainage holes in the bottom.',
      'Thread twine through the cap neck and hang in a row.',
      'Fill with soil and plant herbs or small greens.',
    ],
    benefits: [
      'Grows food without buying new planters',
      'Keeps plastic out of oceans and landfill',
      'Insulates walls and improves air quality',
    ],
    co2SavedKg: 2.1,
    featured: true,
  },
  {
    id: 'plastic-storage',
    title: 'Plastic Containers → Storage Organizers',
    from: 'Plastic Containers',
    to: 'Storage Organizers',
    category: 'plastic',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 60,
    image:
      'https://images.pexels.com/photos/5719818/pexels-photo-5719818.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Clean and decorate plastic takeaway containers into labelled drawer organizers for stationery and supplies.',
    materials: ['Plastic containers', 'Paint', 'Labels', 'Craft knife'],
    steps: [
      'Wash and dry containers thoroughly.',
      'Paint the outside with a primer, then a colour of choice.',
      'Cut lids into divider panels if needed.',
      'Apply labels and stack in a drawer.',
    ],
    benefits: [
      'Diverts single-use containers from landfill',
      'Replaces bought plastic organizer trays',
      'Customisable to any drawer size',
    ],
    co2SavedKg: 1.6,
  },
  {
    id: 'self-watering-planter',
    title: 'Plastic Bottles → Self-Watering Planters',
    from: 'Plastic Bottles',
    to: 'Self-Watering Planters',
    category: 'plastic',
    difficulty: 'Easy',
    timeMinutes: 25,
    budgetInr: 40,
    image:
      'https://images.pexels.com/photos/39712893/pexels-photo-39712893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut a bottle in half and use the neck as a wick to keep soil moist for days — perfect for herbs.',
    materials: ['Plastic bottle', 'Cotton string', 'Soil', 'Seedling'],
    steps: [
      'Cut the bottle in half horizontally.',
      'Thread cotton string through the neck as a wick.',
      'Place the top section upside-down into the bottom half.',
      'Fill top with soil and plant; keep water in the bottom half.',
    ],
    benefits: [
      'Cuts water use with a built-in reservoir',
      'Ideal for low-maintenance indoor gardening',
      'No new plastic pots needed',
    ],
    co2SavedKg: 1.2,
  },
  {
    id: 'cap-artwork',
    title: 'Plastic Caps → Decorative Artwork',
    from: 'Plastic Caps',
    to: 'Decorative Artwork',
    category: 'plastic',
    difficulty: 'Medium',
    timeMinutes: 60,
    budgetInr: 90,
    image:
      'https://images.pexels.com/photos/3735204/pexels-photo-3735204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Arrange colourful bottle caps into a mosaic pattern on a board for a playful piece of wall art.',
    materials: ['Plastic bottle caps', 'Hot glue', 'Wooden board', 'Paint (optional)'],
    steps: [
      'Sort caps by colour and plan a pattern.',
      'Sketch the design lightly on the board.',
      'Glue caps flat-side-down following the pattern.',
      'Fill gaps with paint or leave as a textured mosaic.',
    ],
    benefits: [
      'Diverts hundreds of caps from landfill',
      'Replaces bought wall art with a personal piece',
      'Great group or classroom activity',
    ],
    co2SavedKg: 0.9,
  },

  // ── PAPER / CARDBOARD (4+) ──
  {
    id: 'box-organizer',
    title: 'Cardboard Boxes → Desk Organizer',
    from: 'Cardboard Boxes',
    to: 'Desk Organizer',
    category: 'paper',
    difficulty: 'Easy',
    timeMinutes: 25,
    budgetInr: 50,
    image:
      'https://images.pexels.com/photos/4403172/pexels-photo-4403172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut cardboard boxes into sections and glue them into a custom multi-slot desk organizer.',
    materials: ['Cardboard boxes', 'Craft knife', 'Hot glue', 'Wrapping paper'],
    steps: [
      'Cut boxes into panels of equal height.',
      'Arrange panels into compartments and glue corners.',
      'Wrap the outside in wrapping paper or fabric.',
      'Add dividers for pens, notes and supplies.',
    ],
    benefits: [
      'Free material that would otherwise be recycled or trashed',
      'Replaces plastic desk organizers',
      'Fully recyclable when it wears out',
    ],
    co2SavedKg: 1.4,
    featured: true,
  },
  {
    id: 'roll-cable-organizer',
    title: 'Cardboard Rolls → Cable Organizer',
    from: 'Cardboard Rolls',
    to: 'Cable Organizer',
    category: 'paper',
    difficulty: 'Easy',
    timeMinutes: 15,
    budgetInr: 30,
    image:
      'https://images.pexels.com/photos/5716062/pexels-photo-5716062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Decorate toilet-paper rolls and stand them in a box to keep charging cables tangle-free.',
    materials: ['Cardboard rolls', 'Decorative paper', 'Glue', 'Shoe box'],
    steps: [
      'Cut rolls to equal length if needed.',
      'Wrap each roll in decorative paper and glue.',
      'Arrange rolls upright inside a shoe box.',
      'Roll cables and drop one into each slot.',
    ],
    benefits: [
      'Extends cable life by preventing tangles and fraying',
      'Uses two waste items in one project',
      'Zero-cost alternative to cable organizers',
    ],
    co2SavedKg: 0.6,
  },
  {
    id: 'sheet-wall-art',
    title: 'Cardboard Sheets → Decorative Wall Art',
    from: 'Cardboard Sheets',
    to: 'Decorative Wall Art',
    category: 'paper',
    difficulty: 'Medium',
    timeMinutes: 55,
    budgetInr: 80,
    image:
      'https://images.pexels.com/photos/7218103/pexels-photo-7218103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Layer and cut cardboard sheets into geometric shapes for a modern, textured wall panel.',
    materials: ['Cardboard sheets', 'Craft knife', 'Paint', 'Mounting tape'],
    steps: [
      'Sketch a geometric pattern on paper first.',
      'Cut shapes from cardboard at varying depths.',
      'Paint shapes in complementary tones.',
      'Arrange and mount on the wall with double-sided tape.',
    ],
    benefits: [
      'Replaces framed mass-produced prints',
      'Lightweight — no wall damage',
      'Biodegradable at end of life',
    ],
    co2SavedKg: 0.7,
  },
  {
    id: 'box-dividers',
    title: 'Cardboard Boxes → Drawer Dividers',
    from: 'Cardboard Boxes',
    to: 'Drawer Dividers',
    category: 'paper',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 20,
    image:
      'https://images.pexels.com/photos/38310813/pexels-photo-38310813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut slotted cardboard panels to create a grid that keeps drawers tidy — socks, cutlery or tools.',
    materials: ['Cardboard box', 'Craft knife', 'Ruler', 'Pencil'],
    steps: [
      'Measure the drawer interior height and depth.',
      'Cut cardboard into strips that span the drawer.',
      'Cut slots halfway up each strip at even spacing.',
      'Interlock strips to form a grid and place in the drawer.',
    ],
    benefits: [
      'Keeps drawers organized without buying dividers',
      'Customisable to any drawer size',
      'Compostable when no longer needed',
    ],
    co2SavedKg: 0.5,
  },

  // ── GLASS (4+) ──
  {
    id: 'jar-storage',
    title: 'Glass Jars → Decorative Storage Containers',
    from: 'Glass Jars',
    to: 'Decorative Storage Containers',
    category: 'glass',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 100,
    image:
      'https://images.pexels.com/photos/10568352/pexels-photo-10568352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Clean and paint lids, wrap jars in twine, and label them for a coordinated pantry or desk set.',
    materials: ['Clean glass jars', 'Twine', 'Chalkboard labels', 'Paint (optional)'],
    steps: [
      'Soak jars to remove labels and dry completely.',
      'Paint lids with a matte color of your choice.',
      'Wrap twine around the rim and tie a small bow.',
      'Add chalkboard labels for a tidy, reusable look.',
    ],
    benefits: [
      'Glass is infinitely recyclable and food-safe',
      'Replaces plastic storage containers',
      'Airtight lids keep dry goods fresh longer',
    ],
    co2SavedKg: 0.8,
    featured: true,
  },
  {
    id: 'bottle-vase',
    title: 'Glass Bottles → Flower Vases',
    from: 'Glass Bottles',
    to: 'Flower Vases',
    category: 'glass',
    difficulty: 'Easy',
    timeMinutes: 15,
    budgetInr: 60,
    image:
      'https://images.pexels.com/photos/12709509/pexels-photo-12709509.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Paint or etch old glass bottles and repurpose them as elegant single-stem vases.',
    materials: ['Glass bottle', 'Acrylic paint', 'Paintbrush', 'Flowers'],
    steps: [
      'Clean the bottle and remove any labels.',
      'Paint the outside in a solid colour or ombré.',
      'Let dry fully, then optionally seal with varnish.',
      'Fill with water and add a few stems.',
    ],
    benefits: [
      'Glass lasts indefinitely — no plastic vase waste',
      'A single bottle makes a charming single-stem display',
      'Painting hides scratches and adds personality',
    ],
    co2SavedKg: 0.6,
  },
  {
    id: 'jar-terrarium',
    title: 'Glass Jars → Mini Terrariums',
    from: 'Glass Jars',
    to: 'Mini Terrariums',
    category: 'glass',
    difficulty: 'Medium',
    timeMinutes: 40,
    budgetInr: 150,
    image:
      'https://images.pexels.com/photos/5911691/pexels-photo-5911691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Layer pebbles, charcoal and soil in a large jar to create a self-contained miniature garden.',
    materials: ['Large glass jar', 'Pebbles', 'Activated charcoal', 'Potting soil', 'Small plants'],
    steps: [
      'Add a 3 cm pebble layer for drainage.',
      'Sprinkle a thin layer of activated charcoal.',
      'Add potting soil and plant small moisture-loving plants.',
      'Lightly water and seal the jar for a humid ecosystem.',
    ],
    benefits: [
      'Closed terrariums water themselves for months',
      'Brings greenery indoors without plastic pots',
      'Reuses a jar that would be recycled or trashed',
    ],
    co2SavedKg: 0.4,
  },
  {
    id: 'glass-candle',
    title: 'Glass Containers → Candle Holders',
    from: 'Glass Containers',
    to: 'Candle Holders',
    category: 'glass',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 120,
    image:
      'https://images.pexels.com/photos/2590154/pexels-photo-2590154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Decorate glass jars with lace, paint or twine to create warm, flickering candle lanterns.',
    materials: ['Glass jar', 'Lace or twine', 'Tea light candle', 'Wire (optional)'],
    steps: [
      'Clean and dry the jar.',
      'Wrap lace around the jar and secure with glue or twine.',
      'Optionally add a wire handle for hanging.',
      'Place a tea light inside and light it.',
    ],
    benefits: [
      'Creates ambient lighting without buying new decor',
      'Glass is heat-safe and reusable indefinitely',
      'Tea lights can be swapped for LED candles',
    ],
    co2SavedKg: 0.3,
  },

  // ── WOOD (4+) ──
  {
    id: 'crate-bookshelf',
    title: 'Wooden Crates → Bookshelf',
    from: 'Wooden Crates',
    to: 'Bookshelf',
    category: 'wood',
    difficulty: 'Hard',
    timeMinutes: 90,
    budgetInr: 350,
    image:
      'https://images.pexels.com/photos/6446312/pexels-photo-6446312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Stack and screw wooden crates into a modular bookshelf you can rearrange as your library grows.',
    materials: ['3-4 wooden crates', 'Wood screws', 'Sandpaper', 'Wood stain'],
    steps: [
      'Sand all crates smooth and apply wood stain.',
      'Arrange crates in a stable staggered pattern.',
      'Screw crates together at the contact points.',
      'Optional: attach an L-bracket to the wall for safety.',
    ],
    benefits: [
      'Stores the carbon sequestered in the wood',
      'Modular — extend or rearrange anytime',
      'Avoids particleboard shelves with formaldehyde',
    ],
    co2SavedKg: 11.5,
    featured: true,
  },
  {
    id: 'pallet-furniture',
    title: 'Wooden Pallets → Garden Furniture',
    from: 'Wooden Pallets',
    to: 'Garden Furniture',
    category: 'wood',
    difficulty: 'Hard',
    timeMinutes: 150,
    budgetInr: 500,
    image:
      'https://images.pexels.com/photos/16977663/pexels-photo-16977663.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Sand, stain and stack pallets into an outdoor sofa with weatherproof cushions.',
    materials: ['2-3 wooden pallets', 'Sandpaper', 'Outdoor stain', 'Cushions'],
    steps: [
      'Sand pallets thoroughly to remove splinters.',
      'Apply two coats of outdoor wood stain.',
      'Stack pallets — two for the base, one for the back.',
      'Secure with L-brackets and add cushions.',
    ],
    benefits: [
      'Reclaims shipping pallets that are often discarded',
      'Durable outdoor seating for a fraction of store prices',
      'Wood is biodegradable and repairable',
    ],
    co2SavedKg: 9.8,
  },
  {
    id: 'wood-frames',
    title: 'Wood Scraps → Decorative Frames',
    from: 'Wood Scraps',
    to: 'Decorative Frames',
    category: 'wood',
    difficulty: 'Medium',
    timeMinutes: 50,
    budgetInr: 120,
    image:
      'https://images.pexels.com/photos/7967318/pexels-photo-7967318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Mitre and glue wood offcuts into rustic picture frames for photos or artwork.',
    materials: ['Wood scraps', 'Wood glue', 'Mitre saw', 'Backing board'],
    steps: [
      'Cut four wood pieces at 45° angles to size.',
      'Dry-fit the frame and adjust angles.',
      'Glue corners and clamp until set.',
      'Attach a backing board and add a picture hook.',
    ],
    benefits: [
      'Uses offcuts too small for other projects',
      'Replaces mass-produced plastic frames',
      'Natural wood grain needs no finish',
    ],
    co2SavedKg: 2.1,
  },
  {
    id: 'wooden-storage',
    title: 'Old Wooden Boxes → Storage Units',
    from: 'Old Wooden Boxes',
    to: 'Storage Units',
    category: 'wood',
    difficulty: 'Medium',
    timeMinutes: 70,
    budgetInr: 200,
    image:
      'https://images.pexels.com/photos/221004/pexels-photo-221004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Line old wooden boxes with fabric and stack them as modular, open-front storage cubes.',
    materials: ['Old wooden boxes', 'Fabric liner', 'Wood glue', 'Brackets'],
    steps: [
      'Sand and clean the boxes inside and out.',
      'Cut fabric liners and glue them to the interior.',
      'Stack boxes and secure with corner brackets.',
      'Label the front of each cube.',
    ],
    benefits: [
      'Gives damaged wooden boxes a functional new role',
      'Replaces plastic storage cubes',
      'Stackable and expandable to any space',
    ],
    co2SavedKg: 4.3,
  },

  // ── ELECTRONICS (4+) — safe reuse only ──
  {
    id: 'keys-artwork',
    title: 'Old Keyboard Keys → Creative Artwork',
    from: 'Old Keyboard Keys',
    to: 'Creative Artwork',
    category: 'electronics',
    difficulty: 'Medium',
    timeMinutes: 45,
    budgetInr: 90,
    image:
      'https://images.pexels.com/photos/3029916/pexels-photo-3029916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Pop off individual keys from a non-working keyboard and arrange them into a word-art panel. Do not open or disassemble the keyboard housing.',
    materials: ['Old keyboard (non-working)', 'Picture frame', 'Hot glue', 'Backing board'],
    steps: [
      'Gently pry off individual keycaps with a flat tool — do not open the keyboard housing.',
      'Clean the keycaps with a damp cloth.',
      'Arrange keys to spell a word or form a pattern.',
      'Glue each keycap onto the backing board and frame it.',
    ],
    benefits: [
      'Keeps non-repairable e-waste out of landfill',
      'Creates a unique tech-themed art piece',
      'No tools or hazardous disassembly required',
    ],
    co2SavedKg: 1.1,
    featured: true,
  },
  {
    id: 'component-display',
    title: 'Old Computer Components → Educational Display Models',
    from: 'Old Computer Components',
    to: 'Educational Display Models',
    category: 'electronics',
    difficulty: 'Easy',
    timeMinutes: 30,
    budgetInr: 70,
    image:
      'https://images.pexels.com/photos/1432794/pexels-photo-1432794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Mount intact, non-functioning circuit boards in a shadow box as a labelled educational display. Do not desolder, cut or heat components.',
    materials: ['Intact old circuit board', 'Shadow box frame', 'Double-sided tape', 'Card labels'],
    steps: [
      'Wear gloves; gently wipe the board with a dry cloth — do not wash or heat.',
      'Place the board face-up in a shadow box frame.',
      'Tape the board in place — do not solder or alter it.',
      'Add small card labels for parts you can identify.',
    ],
    benefits: [
      'Preserves e-waste as a learning tool instead of landfill',
      'No hazardous disassembly — board stays intact',
      'Inspires curiosity about electronics and recycling',
    ],
    co2SavedKg: 1.5,
  },
  {
    id: 'cable-crafts',
    title: 'Unused Cables → Cable Management Crafts',
    from: 'Unused Cables',
    to: 'Cable Management Crafts',
    category: 'electronics',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 40,
    image:
      'https://images.pexels.com/photos/4004228/pexels-photo-4004228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Coil and bind stray USB and charging cables with decorative ties to keep desks tidy. Do not cut or strip cable insulation.',
    materials: ['Unused cables', 'Velcro ties', 'Cable clip (adhesive)', 'Label maker'],
    steps: [
      'Group cables by type and coil each loosely.',
      'Bind each coil with a soft velcro tie.',
      'Stick adhesive cable clips along the desk edge.',
      'Label each cable at both ends for easy ID.',
    ],
    benefits: [
      'Keeps cables usable and tangle-free for reuse',
      'Prevents the need to buy replacement cables',
      'No cutting or stripping — safe and simple',
    ],
    co2SavedKg: 0.8,
  },
  {
    id: 'casing-organizer',
    title: 'Old Electronic Casings → Desk Organizers',
    from: 'Old Electronic Casings',
    to: 'Desk Organizers',
    category: 'electronics',
    difficulty: 'Easy',
    timeMinutes: 25,
    budgetInr: 50,
    image:
      'https://images.pexels.com/photos/3921632/pexels-photo-3921632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Clean empty plastic casings from old devices — remove any batteries first — and use them as desk trays. Do not break open sealed units.',
    materials: ['Empty electronic casing', 'Soap & water', 'Paint', 'Labels'],
    steps: [
      'Ensure the device is unplugged and any batteries are removed and recycled separately.',
      'Wash the empty casing with soap and water; dry fully.',
      'Paint the outside if desired.',
      'Use as a tray for pens, SD cards or small tools.',
    ],
    benefits: [
      'Gives intact casings a clean second use',
      'Safe — no need to open or break sealed components',
      'Replaces plastic desk trays',
    ],
    co2SavedKg: 0.7,
  },

  // ── METAL (4+) ──
  {
    id: 'tin-planters',
    title: 'Metal Tins → Painted Planters',
    from: 'Metal Tins',
    to: 'Painted Planters',
    category: 'metal',
    difficulty: 'Easy',
    timeMinutes: 30,
    budgetInr: 80,
    image:
      'https://images.pexels.com/photos/37097054/pexels-photo-37097054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Clean food tins, paint them in bright colours, and use them as durable indoor planters.',
    materials: ['Clean metal tins', 'Acrylic paint', 'Paintbrush', 'Small stones', 'Soil'],
    steps: [
      'Remove labels, wash tins and file any sharp edges.',
      'Poke 2-3 drainage holes in the bottom with a nail.',
      'Paint the outside and let it dry fully.',
      'Add stones for drainage, fill with soil and plant.',
    ],
    benefits: [
      'Metal tins last for years without degrading',
      'Replaces plastic nursery pots',
      'Food-safe metal is non-toxic for edibles',
    ],
    co2SavedKg: 1.8,
    featured: true,
  },
  {
    id: 'metal-organizer',
    title: 'Metal Containers → Storage Organizers',
    from: 'Metal Containers',
    to: 'Storage Organizers',
    category: 'metal',
    difficulty: 'Easy',
    timeMinutes: 20,
    budgetInr: 60,
    image:
      'https://images.pexels.com/photos/1037765/pexels-photo-1037765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Repurpose clean metal tins as pen holders and small-part organizers for your desk or workshop.',
    materials: ['Metal tins', 'Paint', 'Labels', 'Magnetic strip (optional)'],
    steps: [
      'Clean and dry the tins; file any sharp rims.',
      'Paint or leave the metal bare for an industrial look.',
      'Label each tin by contents.',
      'Optionally mount on a magnetic strip on the wall.',
    ],
    benefits: [
      'Sturdier than plastic organizers',
      'Magnetic mounting saves desk space',
      'Metal is infinitely recyclable at end of life',
    ],
    co2SavedKg: 1.2,
  },
  {
    id: 'tin-candles',
    title: 'Metal Tins → Candle Holders',
    from: 'Metal Tins',
    to: 'Candle Holders',
    category: 'metal',
    difficulty: 'Medium',
    timeMinutes: 40,
    budgetInr: 130,
    image:
      'https://images.pexels.com/photos/29471805/pexels-photo-29471805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Pierce decorative patterns in metal tins to create lanterns that cast warm light when a candle is placed inside.',
    materials: ['Metal tin', 'Hammer & nail', 'Spray paint', 'Tea light'],
    steps: [
      'Fill the tin with water and freeze it solid for safe punching.',
      'Hammer a nail through to create a pattern of holes.',
      'Thaw, dry and spray-paint the outside.',
      'Place a tea light inside and light it.',
    ],
    benefits: [
      'Creates ambient lighting from a free material',
      'Metal is heat-resistant and safe for candles',
      'Replaces bought metal lanterns',
    ],
    co2SavedKg: 0.9,
  },
  {
    id: 'can-herb-garden',
    title: 'Metal Cans → Hanging Herb Garden',
    from: 'Metal Cans',
    to: 'Hanging Herb Garden',
    category: 'metal',
    difficulty: 'Medium',
    timeMinutes: 50,
    budgetInr: 150,
    image:
      'https://images.pexels.com/photos/1495169/pexels-photo-1495169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Paint and hang metal cans in a row to grow fresh herbs on a balcony or kitchen wall.',
    materials: ['4-6 metal cans', 'Paint', 'Twine', 'Hooks', 'Herb seedlings'],
    steps: [
      'Clean cans and punch drainage holes.',
      'Paint and label each can with the herb name.',
      'Punch two holes near the rim and thread twine.',
      'Hang in a sunny spot and plant herbs.',
    ],
    benefits: [
      'Grows fresh food in minimal space',
      'Metal cans resist weather better than plastic',
      'Reduces store-bought herbs in plastic packaging',
    ],
    co2SavedKg: 1.4,
  },

  // ── OTHER (4+) ──
  {
    id: 'tile-mosaic',
    title: 'Broken Tiles → Mosaic Coasters',
    from: 'Broken Tiles',
    to: 'Mosaic Coasters',
    category: 'other',
    difficulty: 'Medium',
    timeMinutes: 55,
    budgetInr: 110,
    image:
      'https://images.pexels.com/photos/38000809/pexels-photo-38000809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Break leftover tiles into pieces and grout them onto cork pads for one-of-a-kind coasters.',
    materials: ['Broken ceramic tiles', 'Cork pads', 'Tile adhesive', 'Grout', 'Sponge'],
    steps: [
      'Gently break tiles into small pieces with a cloth and hammer.',
      'Arrange pieces on a cork pad and glue with adhesive.',
      'Press grout between pieces and wipe excess with a damp sponge.',
      'Seal and let cure for 24 hours.',
    ],
    benefits: [
      'Keeps construction waste out of landfill',
      'Replaces bought coasters with a personal craft',
      'Durable ceramic lasts a lifetime',
    ],
    co2SavedKg: 0.8,
    featured: true,
  },
  {
    id: 'cork-board',
    title: 'Wine Corks → Notice Board',
    from: 'Wine Corks',
    to: 'Notice Board',
    category: 'other',
    difficulty: 'Easy',
    timeMinutes: 40,
    budgetInr: 90,
    image:
      'https://images.pexels.com/photos/27397568/pexels-photo-27397568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Slice and glue wine corks onto a frame to make a natural, tactile pin board for notes and photos.',
    materials: ['20+ wine corks', 'Picture frame', 'Hot glue', 'Craft knife'],
    steps: [
      'Slice corks in half lengthwise with a craft knife.',
      'Arrange halves flat-side-down inside the frame.',
      'Glue each cork row by row, packing tightly.',
      'Let dry and hang — use push pins to display notes.',
    ],
    benefits: [
      'Cork is biodegradable and renewable',
      'Replaces foam-backed notice boards',
      'Naturally sound-dampening on a wall',
    ],
    co2SavedKg: 0.3,
  },
  {
    id: 'rubber-mat',
    title: 'Old Rubber → Doormat',
    from: 'Old Rubber',
    to: 'Doormat',
    category: 'other',
    difficulty: 'Medium',
    timeMinutes: 35,
    budgetInr: 70,
    image:
      'https://images.pexels.com/photos/8454550/pexels-photo-8454550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Cut old rubber mats or inner tubes into a sturdy, weather-proof doormat that scrapes shoes clean.',
    materials: ['Old rubber mat or tube', 'Craft knife', 'Ruler', 'Stencil & paint'],
    steps: [
      'Cut rubber into a rectangle of your desired size.',
      'Cut shallow grooves in a pattern for grip.',
      'Stencil a welcome word or pattern with outdoor paint.',
      'Let dry and place at the door.',
    ],
    benefits: [
      'Rubber is durable and weather-proof',
      'Diverts non-biodegradable rubber from landfill',
      'Replaces synthetic doormats',
    ],
    co2SavedKg: 1.0,
  },
  {
    id: 'mixed-scrap-art',
    title: 'Mixed Scrap → Assemblage Art',
    from: 'Mixed Scrap',
    to: 'Assemblage Art',
    category: 'other',
    difficulty: 'Medium',
    timeMinutes: 60,
    budgetInr: 100,
    image:
      'https://images.pexels.com/photos/8454550/pexels-photo-8454550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Combine leftover buttons, beads, wire and fabric scraps into a textured mixed-media art panel.',
    materials: ['Mixed scrap pieces', 'Canvas or board', 'Hot glue', 'Acrylic paint'],
    steps: [
      'Gather small scrap items of varied textures.',
      'Arrange them into a composition on the board.',
      'Glue each piece securely in place.',
      'Add paint accents to tie the palette together.',
    ],
    benefits: [
      'Uses leftovers from multiple other projects',
      'Zero-waste — nothing new is purchased',
      'Unique artwork that cannot be mass-produced',
    ],
    co2SavedKg: 0.5,
  },
];

export const heroImage =
  'https://images.pexels.com/photos/4399499/pexels-photo-4399499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const motivationImage =
  'https://images.pexels.com/photos/5426310/pexels-photo-5426310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export interface QuickStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  caption: string;
}

export const quickStats: QuickStat[] = [
  {
    id: 'explored',
    label: 'Total Ideas Explored',
    value: 248,
    suffix: '',
    icon: 'Sparkles',
    caption: 'Across 6 material categories',
  },
  {
    id: 'completed',
    label: 'Projects Completed',
    value: 37,
    suffix: '',
    icon: 'CheckCircle2',
    caption: 'This year so far',
  },
  {
    id: 'reused',
    label: 'Items Reused',
    value: 412,
    suffix: '',
    icon: 'Recycle',
    caption: 'Kept out of landfill',
  },
];

export interface ImpactPoint {
  id: string;
  label: string;
  value: string;
  icon: string;
  detail: string;
}

export const impactPoints: ImpactPoint[] = [
  {
    id: 'co2',
    label: 'CO₂ Saved',
    value: '86 kg',
    icon: 'Wind',
    detail: 'Avoided emissions by reusing instead of buying new.',
  },
  {
    id: 'water',
    label: 'Water Conserved',
    value: '2,400 L',
    icon: 'Droplets',
    detail: 'Less water used by avoiding new textile production.',
  },
  {
    id: 'waste',
    label: 'Waste Diverted',
    value: '412 items',
    icon: 'Trash2',
    detail: 'Products given a second life instead of the bin.',
  },
  {
    id: 'community',
    label: 'Ideas Shared',
    value: '248',
    icon: 'Users',
    detail: 'Creative transformations explored by the community.',
  },
];
