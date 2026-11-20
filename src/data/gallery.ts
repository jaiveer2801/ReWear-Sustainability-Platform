import { categories, ideas, type UpcycleIdea } from '@/data/content';

export interface GalleryItem {
  idea: UpcycleIdea;
  /** Photo of the raw waste material, used as the "before" visual */
  beforeImage: string;
  baseLikes: number;
}

export const galleryItems: GalleryItem[] = ideas.map((idea, i) => ({
  idea,
  beforeImage:
    categories.find((c) => c.id === idea.category)?.image ??
    'https://images.pexels.com/photos/38000809/pexels-photo-38000809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  baseLikes: ((i * 13) % 47) + 5,
}));
