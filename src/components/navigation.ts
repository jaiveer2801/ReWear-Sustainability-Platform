import {
  LayoutDashboard,
  Compass,
  Wrench,
  Bookmark,
  Images,
  Store,
  HandHeart,
  BarChart3,
  ScanSearch,
  Target,
  User,
  Info,
  Sparkles,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'discover'
  | 'explore'
  | 'studio'
  | 'collection'
  | 'gallery'
  | 'marketplace'
  | 'exchange'
  | 'scanner'
  | 'challenges'
  | 'impact'
  | 'profile'
  | 'about';

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
  hint: string;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, hint: 'Home' },
  { id: 'discover', label: 'Discover', icon: Sparkles, hint: 'Reuse Engine' },
  { id: 'explore', label: 'Explore', icon: Compass, hint: 'Categories' },
  { id: 'studio', label: 'DIY Studio', icon: Wrench, hint: 'Build' },
  { id: 'collection', label: 'My Collection', icon: Bookmark, hint: 'Saved' },
  { id: 'gallery', label: 'Gallery', icon: Images, hint: 'Transformations' },
  { id: 'marketplace', label: 'Marketplace', icon: Store, hint: 'Buy & sell' },
  { id: 'exchange', label: 'Exchange', icon: HandHeart, hint: 'Give & get' },
  { id: 'scanner', label: 'Scanner', icon: ScanSearch, hint: 'Identify' },
  { id: 'challenges', label: 'Challenges', icon: Target, hint: 'Eco goals' },
  { id: 'impact', label: 'Impact', icon: BarChart3, hint: 'Metrics' },
  { id: 'profile', label: 'My Profile', icon: User, hint: 'You' },
  { id: 'about', label: 'About', icon: Info, hint: 'Mission' },
];

export const LeafIcon = Leaf;
