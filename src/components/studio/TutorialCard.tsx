import { ArrowRight, Clock, IndianRupee, ListChecks } from 'lucide-react';
import { categories } from '@/data/content';
import type { Tutorial } from '@/data/tutorials';

import { difficultyStyles } from './difficultyStyles';

interface TutorialCardProps {
  tutorial: Tutorial;
  doneCount: number;
  started: boolean;
  onOpen: () => void;
  index?: number;
}

export function TutorialCard({ tutorial, doneCount, started, onOpen, index = 0 }: TutorialCardProps) {
  const categoryName = categories.find((c) => c.id === tutorial.category)?.shortName;
  const total = tutorial.steps.length;
  const percent = Math.round((doneCount / total) * 100);
  const completed = doneCount === total;

  return (
    <button
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={tutorial.image}
          alt={tutorial.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
            {categoryName}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${difficultyStyles[tutorial.difficulty]}`}>
            {tutorial.difficulty}
          </span>
        </div>
        {completed && (
          <span className="absolute right-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-lime">
            Completed
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{tutorial.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{tutorial.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} /> {tutorial.timeMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-forest">
            <IndianRupee size={13} /> {tutorial.budgetInr}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ListChecks size={14} /> {total} steps
          </span>
        </div>

        {started && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
              <span>{completed ? 'All steps done' : `${doneCount} of ${total} steps`}</span>
              <span>{percent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sage/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest to-lime transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-all group-hover:gap-2.5">
          {started ? 'Continue project' : 'View project'} <ArrowRight size={15} />
        </span>
      </div>
    </button>
  );
}
