import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  CheckCircle2,
  Droplets,
  Hammer,
  Layers,
  Package,
  Paintbrush,
  Ruler,
  Scissors,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { StepIcon, TutorialStep } from '@/data/tutorials';

const STEP_ICONS: Record<StepIcon, LucideIcon> = {
  scissors: Scissors,
  ruler: Ruler,
  brush: Paintbrush,
  wrench: Wrench,
  droplets: Droplets,
  layers: Layers,
  hammer: Hammer,
  sparkles: Sparkles,
  package: Package,
  check: Check,
};

interface StepPlayerProps {
  steps: TutorialStep[];
  doneSteps: number[];
  started: boolean;
  onToggleStep: (index: number) => void;
}

export function StepPlayer({ steps, doneSteps, started, onToggleStep }: StepPlayerProps) {
  const [current, setCurrent] = useState(() => {
    const firstOpen = steps.findIndex((_, i) => !doneSteps.includes(i));
    return firstOpen === -1 ? 0 : firstOpen;
  });

  const step = steps[current];
  const Icon = STEP_ICONS[step.icon];
  const isDone = doneSteps.includes(current);
  const percent = Math.round((doneSteps.length / steps.length) * 100);
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-sage/60 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Step {current + 1} of {steps.length}
          </p>
          <p className="text-xs font-semibold text-forest">{percent}% complete</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-sage/70" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest to-lime transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div key={current} className="mt-6 animate-fade-up">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest text-lime">
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-forest">Step {current + 1}</p>
              <h3 className="mt-0.5 font-display text-xl font-semibold text-ink">{step.title}</h3>
            </div>
          </div>
          <p className="mt-4 text-base leading-relaxed text-muted">{step.body}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-sage/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => onToggleStep(current)}
            disabled={!started}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
              isDone
                ? 'bg-sage/70 text-forest hover:bg-sage'
                : 'border border-forest/20 bg-white text-forest hover:border-forest'
            }`}
          >
            {isDone ? <CheckCircle2 size={17} /> : <Circle size={17} />}
            {isDone ? 'Step completed' : 'Mark step as done'}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrent((c) => c - 1)}
              disabled={isFirst}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-sage bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sage/50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={() => setCurrent((c) => c + 1)}
              disabled={isLast}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
        {!started && (
          <p className="mt-4 text-xs text-muted">Start the project to start tracking your progress.</p>
        )}
      </div>

      <ol className="space-y-2">
        {steps.map((s, i) => {
          const done = doneSteps.includes(i);
          const active = i === current;
          return (
            <li key={s.title}>
              <button
                onClick={() => setCurrent(i)}
                aria-current={active ? 'step' : undefined}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
                  active
                    ? 'border-forest bg-white shadow-soft'
                    : 'border-transparent bg-white/60 hover:border-sage hover:bg-white'
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    done ? 'bg-forest text-lime' : 'bg-sage/70 text-forest'
                  }`}
                >
                  {done ? <Check size={14} /> : i + 1}
                </span>
                <span className={`text-sm font-medium ${done ? 'text-muted line-through' : 'text-ink'}`}>
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
