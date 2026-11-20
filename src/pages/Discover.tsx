import { useState, useMemo, useRef } from 'react';
import {
  Sparkles,
  Search as SearchIcon,
  SlidersHorizontal,
  Check,
  X,
  IndianRupee,
  Clock,
  TrendingUp,
  ArrowDownWideNarrow,
  RotateCcw,
  Leaf,
} from 'lucide-react';
import {
  categories,
  ideas,
  type CategoryId,
  type Difficulty,
  type UpcycleIdea,
} from '@/data/content';
import { Button } from '@/components/Button';
import { IdeaCard } from '@/components/IdeaCard';
import { useCollection } from '@/components/CollectionContext';
import type { PageId } from '@/components/navigation';

interface DiscoverProps {
  onNavigate: (id: PageId) => void;
  onSelectIdea: (idea: UpcycleIdea) => void;
}

type SortKey = 'cost' | 'difficulty' | 'time';
type BudgetFilter = 'all' | 'under100' | '100to300' | 'over300';

const difficultyOrder: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };

const sortOptions: { id: SortKey; label: string; icon: typeof IndianRupee }[] = [
  { id: 'cost', label: 'Lowest cost', icon: IndianRupee },
  { id: 'difficulty', label: 'Easiest first', icon: TrendingUp },
  { id: 'time', label: 'Shortest time', icon: Clock },
];

const budgetOptions: { id: BudgetFilter; label: string }[] = [
  { id: 'all', label: 'Any budget' },
  { id: 'under100', label: 'Under ₹100' },
  { id: '100to300', label: '₹100 – ₹300' },
  { id: 'over300', label: 'Over ₹300' },
];

const difficultyOptions: { id: Difficulty | 'all'; label: string }[] = [
  { id: 'all', label: 'All levels' },
  { id: 'Easy', label: 'Easy' },
  { id: 'Medium', label: 'Medium' },
  { id: 'Hard', label: 'Hard' },
];

export function Discover({ onNavigate, onSelectIdea }: DiscoverProps) {
  const { saved, toggleSave } = useCollection();
  const [selectedMats, setSelectedMats] = useState<Set<CategoryId>>(new Set());
  const [hasSearched, setHasSearched] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [budget, setBudget] = useState<BudgetFilter>('all');
  const [matFilter, setMatFilter] = useState<CategoryId | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('cost');
  const [toast, setToast] = useState<string | null>(null);

  const toggleMaterial = (id: CategoryId) => {
    setSelectedMats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (hasSearched) setHasSearched(true);
  };

  const clearMaterials = () => {
    setSelectedMats(new Set());
    setHasSearched(false);
  };

  const selectAll = () => {
    setSelectedMats(new Set(categories.map((c) => c.id)));
  };

  const toastTimer = useRef<number | undefined>(undefined);
  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  const handleSaveToggle = (id: string) => {
    const wasSaved = saved.includes(id);
    toggleSave(id);
    showToast(wasSaved ? 'Removed from your collection' : 'Saved to your collection');
  };

  const handleDiscover = () => {
    if (selectedMats.size === 0) {
      showToast('Select at least one material to discover ideas');
      return;
    }
    setHasSearched(true);
    setMatFilter('all');
    setDifficulty('all');
    setBudget('all');
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const results = useMemo(() => {
    if (!hasSearched || selectedMats.size === 0) return [];

    let list = ideas.filter((idea) => selectedMats.has(idea.category));

    if (difficulty !== 'all') list = list.filter((i) => i.difficulty === difficulty);
    if (matFilter !== 'all') list = list.filter((i) => i.category === matFilter);
    if (budget !== 'all') {
      list = list.filter((i) => {
        if (budget === 'under100') return i.budgetInr < 100;
        if (budget === '100to300') return i.budgetInr >= 100 && i.budgetInr <= 300;
        return i.budgetInr > 300;
      });
    }

    list = [...list].sort((a, b) => {
      if (sort === 'cost') return a.budgetInr - b.budgetInr;
      if (sort === 'time') return a.timeMinutes - b.timeMinutes;
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    return list;
  }, [hasSearched, selectedMats, difficulty, budget, matFilter, sort]);

  const activeFilterCount =
    (difficulty !== 'all' ? 1 : 0) + (budget !== 'all' ? 1 : 0) + (matFilter !== 'all' ? 1 : 0);

  return (
    <div className="space-y-10 pb-10">
      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 animate-fade-up">
          <div className="flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-lift">
            <Check size={16} className="text-lime" /> {toast}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest via-forest to-forest-deep p-7 shadow-card sm:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <Sparkles size={14} /> Reuse Discovery Engine
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            What do you want to give a second life?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sage/90 sm:text-base">
            Select the materials you have lying around, and we'll match you with
            practical upcycling ideas — complete with budget, time and
            step-by-step instructions.
          </p>
        </div>
      </section>

      {/* Material selection */}
      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Choose your materials
            </h2>
            <p className="mt-1 text-sm text-muted">
              Select one or more — you can combine materials for more ideas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="rounded-full border border-sage bg-white px-3.5 py-2 text-xs font-semibold text-forest transition hover:bg-sage/50"
            >
              Select all
            </button>
            {selectedMats.size > 0 && (
              <button
                onClick={clearMaterials}
                className="inline-flex items-center gap-1.5 rounded-full border border-sage bg-white px-3.5 py-2 text-xs font-semibold text-muted transition hover:bg-sage/50"
              >
                <RotateCcw size={13} /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const selected = selectedMats.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleMaterial(cat.id)}
                className={`group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 animate-fade-up ${
                  selected
                    ? 'border-forest bg-forest text-white shadow-lift'
                    : 'border-sage/60 bg-white text-ink hover:-translate-y-1 hover:shadow-card'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex w-full items-start justify-between">
                  <div
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl transition ${
                      selected ? 'ring-2 ring-lime' : ''
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all ${
                      selected
                        ? 'bg-lime text-forest-deep scale-100'
                        : 'bg-sage/60 text-transparent scale-90'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${selected ? 'text-white' : 'text-ink'}`}>
                    {cat.name}
                  </p>
                  <p className={`mt-1 line-clamp-2 text-xs leading-snug ${selected ? 'text-sage/80' : 'text-muted'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Discover button + selected chips */}
        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-sage/60 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-muted">
              {selectedMats.size === 0
                ? 'No materials selected'
                : `${selectedMats.size} ${selectedMats.size === 1 ? 'material' : 'materials'} selected`}
            </span>
            {selectedMats.size > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {[...selectedMats].map((id) => {
                  const cat = categories.find((c) => c.id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-sage/60 px-2.5 py-1 text-xs font-medium text-forest"
                    >
                      {cat?.shortName}
                      <button
                        onClick={() => toggleMaterial(id)}
                        className="text-forest/60 hover:text-forest"
                        aria-label={`Remove ${cat?.shortName}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <Button
            variant="primary"
            iconRight
            onClick={handleDiscover}
            className={selectedMats.size === 0 ? 'opacity-60' : ''}
          >
            Discover Reuse Ideas
          </Button>
        </div>
      </section>

      {/* Results */}
      <section id="results">
        {hasSearched && selectedMats.size > 0 ? (
          <>
            {/* Filter & sort bar */}
            <div className="rounded-3xl border border-sage/60 bg-white p-4 shadow-soft sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-forest" />
                  <h2 className="font-display text-base font-semibold text-ink sm:text-lg">
                    {results.length} {results.length === 1 ? 'idea' : 'ideas'} found
                  </h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        setDifficulty('all');
                        setBudget('all');
                        setMatFilter('all');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-forest"
                    >
                      <X size={12} /> Clear filters
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {/* Filters */}
                <div className="space-y-3">
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Material
                    </p>
                    <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                      <FilterPill
                        active={matFilter === 'all'}
                        onClick={() => setMatFilter('all')}
                      >
                        All
                      </FilterPill>
                      {[...selectedMats].map((id) => {
                        const cat = categories.find((c) => c.id === id);
                        return (
                          <FilterPill
                            key={id}
                            active={matFilter === id}
                            onClick={() => setMatFilter(id)}
                          >
                            {cat?.shortName}
                          </FilterPill>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Difficulty
                      </p>
                      <div className="flex gap-1.5">
                        {difficultyOptions.map((o) => (
                          <FilterPill
                            key={o.id}
                            active={difficulty === o.id}
                            onClick={() => setDifficulty(o.id)}
                          >
                            {o.label}
                          </FilterPill>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Budget
                      </p>
                      <div className="flex gap-1.5">
                        {budgetOptions.map((o) => (
                          <FilterPill
                            key={o.id}
                            active={budget === o.id}
                            onClick={() => setBudget(o.id)}
                          >
                            {o.label}
                          </FilterPill>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="lg:border-l lg:border-sage/50 lg:pl-5">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <ArrowDownWideNarrow size={12} /> Sort by
                  </p>
                  <div className="flex gap-1.5">
                    {sortOptions.map((o) => {
                      const Icon = o.icon;
                      return (
                        <FilterPill
                          key={o.id}
                          active={sort === o.id}
                          onClick={() => setSort(o.id)}
                        >
                          <Icon size={13} /> {o.label}
                        </FilterPill>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Idea cards */}
            {results.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((idea, i) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    index={i}
                    saved={saved.includes(idea.id)}
                    onToggleSave={handleSaveToggle}
                    onClick={() => onSelectIdea(idea)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-sage bg-white/60 p-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-sage/60 text-forest">
                  <SearchIcon size={28} />
                </div>
                <p className="mt-5 font-display text-xl font-semibold text-ink">
                  No ideas match your filters
                </p>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
                  Try widening your budget or difficulty filters, or select
                  more materials.
                </p>
                <button
                  onClick={() => {
                    setDifficulty('all');
                    setBudget('all');
                    setMatFilter('all');
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
                >
                  <RotateCcw size={14} /> Reset filters
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty state — before search */
          <div className="rounded-3xl border border-dashed border-sage bg-white/60 p-10 text-center sm:p-16">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-forest to-forest-deep text-lime shadow-card animate-float-slow">
              <Leaf size={34} />
            </div>
            <p className="mt-6 font-display text-2xl font-semibold text-ink">
              Ready when you are.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted sm:text-base">
              Pick one or more materials above and tap{' '}
              <span className="font-semibold text-forest">Discover Reuse Ideas</span>{' '}
              to see matching upcycling projects with budgets, time estimates
              and full instructions.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" iconRight onClick={() => onNavigate('explore')}>
                Or browse all categories
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
        active
          ? 'bg-forest text-white shadow-soft'
          : 'border border-sage bg-white text-ink hover:bg-sage/50'
      }`}
    >
      {children}
    </button>
  );
}
