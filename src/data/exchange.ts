import type { CategoryId } from './content';
import { pexelsImage } from './marketplace';

export type PickupPreference = 'pickup' | 'dropoff' | 'either';

export interface MaterialPost {
  id: string;
  name: string;
  category: CategoryId;
  quantity: string;
  description: string;
  image: string;
  location: string;
  pickup: PickupPreference;
  /** 'you' marks posts created by the current user */
  owner: string;
  createdAt: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'declined';

export interface MaterialRequest {
  id: string;
  postId: string;
  requester: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

export const pickupLabels: Record<PickupPreference, string> = {
  pickup: 'Pickup only',
  dropoff: 'Can drop off',
  either: 'Pickup or drop-off',
};

export const demoPosts: MaterialPost[] = [
  {
    id: 'ex-tshirt-scraps',
    name: 'Cotton T-shirt Scraps',
    category: 'clothing',
    quantity: '1 large bag (~2 kg)',
    description:
      'Clean off-cuts from a tailoring unit, mixed colours. Great for rag rugs, stuffing or cleaning cloths.',
    image: pexelsImage(5719818),
    location: 'Indiranagar, Bengaluru',
    pickup: 'pickup',
    owner: 'Anita D.',
    createdAt: '2026-11-15',
  },
  {
    id: 'ex-my-jars',
    name: 'Empty Glass Pickle Jars',
    category: 'glass',
    quantity: '12 jars (500 g each)',
    description:
      'Washed with labels removed, lids included. Ideal for spice storage, terrariums or lantern crafts.',
    image: pexelsImage(39712893),
    location: 'Andheri West, Mumbai',
    pickup: 'either',
    owner: 'you',
    createdAt: '2026-11-14',
  },
  {
    id: 'ex-my-boxes',
    name: 'Sturdy Cardboard Moving Boxes',
    category: 'paper',
    quantity: '10 boxes (45x35x30 cm)',
    description:
      'Flattened but in great shape, moved house last week. Only slight tape residue on the flaps.',
    image: pexelsImage(18785062),
    location: 'Hauz Khas, Delhi',
    pickup: 'dropoff',
    owner: 'you',
    createdAt: '2026-11-13',
  },
  {
    id: 'ex-crate-slats',
    name: 'Wooden Crate Slats',
    category: 'wood',
    quantity: '18 slats (~60 cm each)',
    description:
      'Sanded slats from dismantled fruit crates. Ready for shelving, wall art or garden planters.',
    image: pexelsImage(39333410),
    location: 'Kothrud, Pune',
    pickup: 'pickup',
    owner: 'Rahul B.',
    createdAt: '2026-11-12',
  },
  {
    id: 'ex-bottle-caps',
    name: 'Plastic Bottle Caps (Assorted)',
    category: 'plastic',
    quantity: '~500 caps (600 g)',
    description:
      'Sorted by nothing, colourful everything. Perfect for mosaic artwork or cap-trivet projects.',
    image: pexelsImage(10554836),
    location: 'Adyar, Chennai',
    pickup: 'either',
    owner: 'Kavya N.',
    createdAt: '2026-11-11',
  },
  {
    id: 'ex-old-jeans',
    name: 'Worn-out Jeans',
    category: 'clothing',
    quantity: '6 pairs (mixed sizes)',
    description:
      'Torn at the knees but strong denim everywhere else. Great for tote bags, aprons or patches.',
    image: pexelsImage(17514500),
    location: 'Gachibowli, Hyderabad',
    pickup: 'pickup',
    owner: 'Farhan A.',
    createdAt: '2026-11-10',
  },
  {
    id: 'ex-biscuit-tins',
    name: 'Metal Biscuit & Tea Tins',
    category: 'metal',
    quantity: '8 tins (various sizes)',
    description:
      'Clean and rust-free tins with snug lids. Useful for storage, lantern making or kitchen organisation.',
    image: pexelsImage(7443025),
    location: 'Fort Kochi, Kochi',
    pickup: 'dropoff',
    owner: 'Leela R.',
    createdAt: '2026-11-09',
  },
];

export const demoRequests: MaterialRequest[] = [
  {
    id: 'req-seed-1',
    postId: 'ex-my-jars',
    requester: 'Sana I.',
    message: 'Hi! I run a terrace garden and would love these jars for seed storage. I can pick up this weekend.',
    status: 'pending',
    createdAt: '2026-11-15',
  },
  {
    id: 'req-seed-2',
    postId: 'ex-my-jars',
    requester: 'Dev P.',
    message: 'Looking for jars for a lantern workshop with kids. Any number you can spare helps!',
    status: 'pending',
    createdAt: '2026-11-16',
  },
  {
    id: 'req-seed-3',
    postId: 'ex-my-boxes',
    requester: 'Kavya N.',
    message: 'These would be perfect for shipping my planters. Can you drop them near Hauz Khas metro?',
    status: 'pending',
    createdAt: '2026-11-16',
  },
];
