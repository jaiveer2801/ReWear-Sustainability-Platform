import { ArrowRight, Bookmark, Clock, Sparkles } from 'lucide-react';
import type { UpcycleIdea } from '@/data/content';
import { categories } from '@/data/content';

interface IdeaCardProps {
  idea: UpcycleIdea;
  onClick?: () => void;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
  index?: number;
}

const difficultyStyles: Record<UpcycleIdea['difficulty'], string> = {
  Easy: 'bg-lime/30 text-forest',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

export function IdeaCard({ idea, onClick, saved, onToggleSave, index = 0 }: IdeaCardProps) {
  const cat = categories.find((c) => c.id === idea.category);

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={idea.image}
          alt={idea.to}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {idea.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-lime/90 px-2.5 py-1 text-[11px] font-semibold text-forest-deep backdrop-blur">
              <Sparkles size={12} /> Featured
            </span>
          )}
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${difficultyStyles[idea.difficulty]}`}
          >
            {idea.difficulty}
          </span>
        </div>

        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(idea.id);
            }}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all ${
              saved ? 'bg-forest text-lime' : 'bg-white/80 text-forest hover:bg-white'
            }`}
            aria-label={saved ? 'Remove from collection' : 'Save to collection'}
          >
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} strokeWidth={2.2} />
          </button>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
            {cat?.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-muted">{idea.from}</p>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug text-ink">
          {idea.to}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{idea.description}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-sage/50 pt-3.5 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> {idea.timeMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-forest">
            ₹{idea.budgetInr}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-forest-deep">
            View Details <ArrowRight size={14} />
          </span>
          {onToggleSave ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(idea.id);
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors ${
                saved
                  ? 'border-forest bg-sage/60 text-forest'
                  : 'border-sage bg-white text-ink hover:border-forest hover:text-forest'
              }`}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save Idea'}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
