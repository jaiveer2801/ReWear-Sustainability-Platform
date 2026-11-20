import {
  Shirt,
  Recycle,
  FileText,
  TreePine,
  Wine,
  Cable,
  Container,
  Shapes,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Shirt,
  Recycle,
  FileText,
  TreePine,
  Wine,
  Cable,
  Container,
  Shapes,
};

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  index?: number;
}

export function CategoryCard({ category, onClick, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[category.icon] ?? Recycle;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent" />
        <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/90 text-forest shadow-soft backdrop-blur">
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-lg font-semibold text-white drop-shadow-sm">
            {category.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">{category.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-sage/50 pt-3.5">
          <span className="text-xs font-semibold text-forest">
            {category.ideasCount} ideas
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest group-hover:gap-2.5 transition-all">
            Explore <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}
