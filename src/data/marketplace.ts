import type { CategoryId } from './content';

export interface MarketSeller {
  name: string;
  city: string;
  rating: number;
}

export interface MarketListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  seller: MarketSeller;
  createdAt: string;
}

/** All photo IDs below already appear in the app's verified image pool. */
export const pexelsImage = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;

export const demoListings: MarketListing[] = [
  {
    id: 'mk-rag-rug',
    title: 'Handwoven Rag Rug from Textile Scraps',
    description:
      'A sturdy 60x90 cm rug woven entirely from discarded cotton scraps. Each piece is one of a kind, colour-fast, and machine washable. A warm, soft addition to any room.',
    price: 650,
    category: 'clothing',
    image: pexelsImage(17514500),
    seller: { name: 'Meera K.', city: 'Bengaluru', rating: 4.8 },
    createdAt: '2026-11-14',
  },
  {
    id: 'mk-denim-sleeve',
    title: 'Upcycled Denim Laptop Sleeve (14 inch)',
    description:
      'Made from layered old jeans with a padded inner lining. Fits most 14-inch laptops, with a secure flap closure and a front pocket for chargers.',
    price: 550,
    category: 'clothing',
    image: pexelsImage(11573517),
    seller: { name: 'Priya M.', city: 'Mumbai', rating: 4.7 },
    createdAt: '2026-11-12',
  },
  {
    id: 'mk-pallet-shelf',
    title: 'Reclaimed Pallet Wood Bookshelf',
    description:
      'A five-tier bookshelf sanded and sealed from reclaimed shipping pallets. The wood keeps its character marks, so no two shelves look the same.',
    price: 2100,
    category: 'wood',
    image: pexelsImage(39333410),
    seller: { name: 'Ravi S.', city: 'Pune', rating: 4.9 },
    createdAt: '2026-11-10',
  },
  {
    id: 'mk-jar-rack',
    title: 'Glass Jar Spice Rack (Set of 6)',
    description:
      'Six cleaned, de-labelled pickle jars mounted on a reclaimed wood base with chalkboard labels. Perfect for a tidy, plastic-free spice shelf.',
    price: 499,
    category: 'glass',
    image: pexelsImage(39712893),
    seller: { name: 'Meera K.', city: 'Bengaluru', rating: 4.8 },
    createdAt: '2026-11-09',
  },
  {
    id: 'mk-bottle-planters',
    title: 'Bottle Herb Planter Kit (Set of 3)',
    description:
      'Three food-grade bottles cut, smoothed and painted for windowsill herbs. Comes with coco-peat discs and basil, mint and coriander seeds.',
    price: 299,
    category: 'plastic',
    image: pexelsImage(10554836),
    seller: { name: 'Sana I.', city: 'Hyderabad', rating: 4.5 },
    createdAt: '2026-11-08',
  },
  {
    id: 'mk-desk-organizer',
    title: 'Cardboard Desk Organizer',
    description:
      'Layered and laminated cardboard makes this organizer surprisingly rigid. Four compartments plus a pen holder, finished with a kraft-paper wrap.',
    price: 350,
    category: 'paper',
    image: pexelsImage(18785062),
    seller: { name: 'Dev P.', city: 'Delhi', rating: 4.4 },
    createdAt: '2026-11-06',
  },
  {
    id: 'mk-tin-lanterns',
    title: 'Tin Can Lantern Set (3 pieces)',
    description:
      'Punched tin cans turned into candle lanterns with rust-proof paint and jute hangers. They throw the loveliest patterned light on a balcony wall.',
    price: 420,
    category: 'metal',
    image: pexelsImage(7443025),
    seller: { name: 'Leela R.', city: 'Kochi', rating: 4.8 },
    createdAt: '2026-11-05',
  },
  {
    id: 'mk-circuit-notebook',
    title: 'Circuit Board Notebook & Pen Set',
    description:
      'A handmade journal bound with dead-stock circuit board covers. Lined recycled pages, elastic closure, and a pen made from rolled magazine paper.',
    price: 380,
    category: 'electronics',
    image: pexelsImage(39712893),
    seller: { name: 'Kabir J.', city: 'Jaipur', rating: 4.6 },
    createdAt: '2026-11-04',
  },
  {
    id: 'mk-cork-keychains',
    title: 'Wood & Cork Keychains (Pack of 4)',
    description:
      'Cut from off-cuts of a furniture workshop and paired with cork backing. Light, durable, and hand-finished with natural oil.',
    price: 199,
    category: 'wood',
    image: pexelsImage(3735204),
    seller: { name: 'Ravi S.', city: 'Pune', rating: 4.9 },
    createdAt: '2026-11-03',
  },
  {
    id: 'mk-vase-set',
    title: 'Painted Bottle Vase Trio',
    description:
      'Three glass bottles hand-painted in a sage-and-cream palette and sealed for durability. Sold as a trio, flowers not included.',
    price: 450,
    category: 'glass',
    image: pexelsImage(4403172),
    seller: { name: 'Leela R.', city: 'Kochi', rating: 4.8 },
    createdAt: '2026-11-02',
  },
];
