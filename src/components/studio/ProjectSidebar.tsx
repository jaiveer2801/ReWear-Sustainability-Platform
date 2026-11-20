import { Bookmark, BookmarkCheck, CheckCircle2, Play, Package, Wrench } from 'lucide-react';
import type { Tutorial } from '@/data/tutorials';
import { Button } from '@/components/Button';

interface ProjectSidebarProps {
  tutorial: Tutorial;
  started: boolean;
  doneCount: number;
  isSaved: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onToggleSave: () => void;
  onToggleCompleted: () => void;
}

export function ProjectSidebar({
  tutorial,
  started,
  doneCount,
  isSaved,
  isCompleted,
  onStart,
  onToggleSave,
  onToggleCompleted,
}: ProjectSidebarProps) {
  const total = tutorial.steps.length;
  const allDone = doneCount === total;

  const statusLabel = isCompleted
    ? 'Completed'
    : started
      ? `In progress - ${doneCount} of ${total} steps`
      : 'Not started';

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-sage/60 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Project status</p>
        <p className="mt-1.5 font-display text-lg font-semibold text-ink">{statusLabel}</p>

        <div className="mt-4 flex flex-col gap-2.5">
          {!started ? (
            <Button variant="primary" onClick={onStart} icon={<Play size={15} />} className="w-full justify-center">
              Start Project
            </Button>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-sage/70 px-5 py-3 text-sm font-semibold text-forest">
              <CheckCircle2 size={16} /> Project started
            </span>
          )}

          <Button
            variant={isSaved ? 'outline' : 'secondary'}
            onClick={onToggleSave}
            icon={isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            className="w-full justify-center"
          >
            {isSaved ? 'Saved to My Collection' : 'Save to My Collection'}
          </Button>

          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            onClick={onToggleCompleted}
            disabled={!isCompleted && !allDone}
            icon={<CheckCircle2 size={15} />}
            className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isCompleted ? 'Mark as not completed' : 'Mark Project as Completed'}
          </Button>
          {!isCompleted && !allDone && (
            <p className="text-xs text-muted">Tick off every step to unlock completion.</p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-sage/60 bg-white p-5 shadow-soft">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          <Package size={16} className="text-forest" /> Materials
        </h3>
        <ul className="mt-3 space-y-2">
          {tutorial.materials.map((m) => (
            <li key={m} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
              {m}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 flex items-center gap-2 font-display text-base font-semibold text-ink">
          <Wrench size={16} className="text-forest" /> Tools
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {tutorial.tools.map((t) => (
            <span key={t} className="rounded-full border border-sage bg-warm px-3 py-1.5 text-xs font-medium text-ink">
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
