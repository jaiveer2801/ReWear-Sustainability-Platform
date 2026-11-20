import { useMemo, useState } from 'react';
import { Search, Wrench, X } from 'lucide-react';
import { categories, type Difficulty } from '@/data/content';
import { tutorials } from '@/data/tutorials';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import { TutorialCard } from '@/components/studio/TutorialCard';
import { TutorialView } from '@/components/studio/TutorialView';

interface StudioProps {
  activeTutorialId: string | null;
  onSelectTutorial: (id: string | null) => void;
}

type DifficultyFilter = Difficulty | 'All';
const DIFFICULTIES: DifficultyFilter[] = ['All', 'Easy', 'Medium', 'Hard'];

export function Studio({ activeTutorialId, onSelectTutorial }: StudioProps) {
  const activeTutorial = tutorials.find((t) => t.id === activeTutorialId) ?? null;

  if (activeTutorial) {
    return <TutorialView key={activeTutorial.id} tutorial={activeTutorial} onBack={() => onSelectTutorial(null)} />;
  }

  return <ProjectList onSelectTutorial={onSelectTutorial} />;
}

interface ProjectListProps {
  onSelectTutorial: (id: string) => void;
}

function ProjectList({ onSelectTutorial }: ProjectListProps) {
  const { progress } = useTutorialProgress();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutorials.filter((t) => {
      if (difficulty !== 'All' && t.difficulty !== difficulty) return false;
      if (!q) return true;
      const categoryName = categories.find((c) => c.id === t.category)?.name ?? '';
      return [t.title, t.description, categoryName].some((field) => field.toLowerCase().includes(q));
    });
  }, [query, difficulty]);

  const clearFilters = () => {
    setQuery('');
    setDifficulty('All');
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <Wrench size={14} /> DIY Studio
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Step-by-step projects you can build at home.
          </h1>
          <p className="mt-3 text-sm text-sage/90 sm:text-base">
            Pick a tutorial, follow the numbered steps, tick off your progress and
            save finished projects to your collection.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or materials"
              aria-label="Search DIY projects"
              className="w-full rounded-full border border-sage bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 shadow-soft transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                aria-pressed={difficulty === level}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  difficulty === level
                    ? 'bg-forest text-white shadow-soft'
                    : 'border border-sage bg-white text-ink hover:bg-sage/50'
                }`}
              >
                {level === 'All' ? 'All levels' : level}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted">
          Showing {visible.length} of {tutorials.length} projects
        </p>

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((tutorial, i) => {
              const done = progress[tutorial.id] ?? [];
              return (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  doneCount={done.length}
                  started={tutorial.id in progress}
                  index={i}
                  onOpen={() => onSelectTutorial(tutorial.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-sage bg-white/60 p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-sage/60 text-forest">
              <Search size={26} />
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-ink">No projects match your filters</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              Try a different word or choose another difficulty level.
            </p>
            <button
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-forest/20 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-sage/50"
            >
              <X size={14} /> Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
