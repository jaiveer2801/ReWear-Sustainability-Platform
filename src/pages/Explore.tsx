import { useState } from 'react';
import { Compass, Search, SlidersHorizontal } from 'lucide-react';
import { categories, ideas, type CategoryId, type UpcycleIdea } from '@/data/content';
import { CategoryCard } from '@/components/CategoryCard';
import { IdeaCard } from '@/components/IdeaCard';
import { useCollection } from '@/components/CollectionContext';

interface ExploreProps {
  onSelectIdea: (idea: UpcycleIdea) => void;
}

type Filter = 'all' | CategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All ideas' },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.shortName })),
];

export function Explore({ onSelectIdea }: ExploreProps) {
  const [active, setActive] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const { saved, toggleSave } = useCollection();

  const filtered = ideas.filter((idea) => {
    const matchesCat = active === 'all' || idea.category === active;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      idea.title.toLowerCase().includes(q) ||
      idea.from.toLowerCase().includes(q) ||
      idea.to.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-sage via-warm to-warm border border-sage/60 p-7 sm:p-10">
        <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-lime/25 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold text-forest">
            <Compass size={14} /> Explore
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Discover what your old things can become.
          </h1>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Browse eight material categories, each packed with creative
            upcycling ideas — from easy crafts to advanced builds.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-full border border-sage bg-white px-4 py-2.5 shadow-soft">
            <Search size={18} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by material or project…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Material categories
          </h2>
          <span className="text-sm text-muted">{categories.length} streams</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={i}
              onClick={() => {
                setActive(cat.id);
                document.getElementById('ideas')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Ideas with filter */}
      <section id="ideas">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            All upcycling ideas
          </h2>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <SlidersHorizontal size={15} /> {filtered.length} shown
          </span>
        </div>

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === f.id
                  ? 'bg-forest text-white shadow-soft'
                  : 'border border-sage bg-white text-ink hover:bg-sage/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((idea, i) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                index={i}
                saved={saved.includes(idea.id)}
                onToggleSave={toggleSave}
                onClick={() => onSelectIdea(idea)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-sage bg-white/60 p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">No ideas found</p>
            <p className="mt-1.5 text-sm text-muted">
              Try a different category or search term.
            </p>
            <button
              onClick={() => {
                setActive('all');
                setQuery('');
              }}
              className="mt-4 text-sm font-semibold text-forest hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
