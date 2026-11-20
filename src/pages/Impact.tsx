import { useMemo } from 'react';
import {
  Wind,
  Trash2,
  Leaf,
  TrendingUp,
  Award,
  Bookmark,
  Wrench,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { tutorials } from '@/data/tutorials';
import { useCollection } from '@/components/CollectionContext';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import type { PageId } from '@/components/navigation';

interface ImpactProps {
  onNavigate: (id: PageId) => void;
}

interface Milestone {
  id: string;
  label: string;
  detail: string;
  icon: typeof Award;
  target: number;
  current: number;
}

export function Impact({ onNavigate }: ImpactProps) {
  const { saved, completed } = useCollection();
  const { progress } = useTutorialProgress();

  const stats = useMemo(() => {
    const finishedTutorials = tutorials.filter((t) => completed.includes(t.id));
    // Items reused: sum of each finished tutorial's declared item count.
    // Each completed idea is counted as one reused item (clearly labelled estimate).
    const itemsReused =
      finishedTutorials.reduce((sum, t) => sum + t.itemsReused, 0) + Math.max(completed.length - finishedTutorials.length, 0);
    // Estimates: ~2.5 kg CO2e and ~1.2 kg waste diverted per completed project.
    const co2SavedKg = Math.round(completed.length * 2.5 * 10) / 10;
    const wasteDivertedKg = Math.round(completed.length * 1.2 * 10) / 10;
    const waterSavedL = completed.length * 35;
    const stepsTicked = Object.values(progress).reduce((sum, steps) => sum + steps.length, 0);
    const savedTutorials = tutorials.filter((t) => saved.includes(t.id));
    return {
      projectsCompleted: completed.length,
      itemsReused,
      co2SavedKg,
      wasteDivertedKg,
      waterSavedL,
      stepsTicked,
      savedIdeas: saved.length,
      savedTutorials: savedTutorials.length,
      finishedTutorials,
      inProgress: tutorials.filter((t) => t.id in progress && !completed.includes(t.id)).length,
    };
  }, [saved, completed, progress]);

  const milestones: Milestone[] = [
    { id: 'first-steps', label: 'First Steps', detail: 'Start your first DIY project', icon: Wrench, target: 1, current: Object.keys(progress).length },
    { id: 'halfway', label: 'Halfway There', detail: 'Complete your first project', icon: CheckCircle2, target: 1, current: stats.projectsCompleted },
    { id: 'collector', label: 'Inspiration Collector', detail: 'Save 5 ideas to your collection', icon: Bookmark, target: 5, current: stats.savedIdeas + stats.savedTutorials },
    { id: 'serial-maker', label: 'Serial Maker', detail: 'Complete 5 projects', icon: Award, target: 5, current: stats.projectsCompleted },
    { id: 'waste-warrior', label: 'Waste Warrior', detail: 'Divert 5 kg of waste (est.)', icon: Trash2, target: 5, current: stats.wasteDivertedKg },
    { id: 'planet-hero', label: 'Planet Hero', detail: 'Divert 10 kg of waste (est.)', icon: Leaf, target: 10, current: stats.wasteDivertedKg },
  ];

  const distribution = useMemo(() => {
    const byCategory = new Map<string, number>();
    for (const t of stats.finishedTutorials) {
      byCategory.set(t.category, (byCategory.get(t.category) ?? 0) + 1);
    }
    const max = Math.max(...byCategory.values(), 1);
    return [...byCategory.entries()].map(([catId, count]) => ({
      catId,
      count,
      percent: Math.round((count / max) * 100),
    }));
  }, [stats.finishedTutorials]);

  const summary =
    stats.projectsCompleted === 0
      ? {
          title: 'Your impact story starts here.',
          body: 'Complete a DIY project or save an idea, and this dashboard will start tracking the waste you divert and the emissions you avoid. All figures are clearly labelled estimates.',
          cta: 'Open the DIY Studio',
          target: 'studio' as const,
        }
      : {
          title: `You have completed ${stats.projectsCompleted} ${stats.projectsCompleted === 1 ? 'project' : 'projects'} and saved ${stats.savedIdeas + stats.savedTutorials} ${stats.savedIdeas + stats.savedTutorials === 1 ? 'idea' : 'ideas'}.`,
          body: `Based on average material weights, that is roughly ${stats.wasteDivertedKg} kg of waste diverted from landfill and about ${stats.co2SavedKg} kg of CO2 avoided. Keep going - every project counts.`,
          cta: 'Start another project',
          target: 'studio' as const,
        };

  const hasAnyActivity =
    stats.projectsCompleted > 0 || stats.savedIdeas + stats.savedTutorials > 0 || stats.stepsTicked > 0;

  const estimateLabel = 'Clear estimates, based on average material weights, not measured values.';

  return (
    <div className="space-y-10 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest to-forest-deep p-7 shadow-card sm:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <TrendingUp size={14} /> Your Impact
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            The difference your reuse makes.
          </h1>
          <p className="mt-3 text-sm text-sage/90 sm:text-base">
            Tracked from your completed projects and saved ideas. All impact
            figures are estimates, not measured values.
          </p>
        </div>
      </section>

      {/* Highlight metrics */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{estimateLabel}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CheckCircle2, label: 'Projects completed', value: String(stats.projectsCompleted) },
            { icon: Package, label: 'Items reused (est.)', value: String(stats.itemsReused) },
            { icon: Trash2, label: 'Waste diverted (est.)', value: `${stats.wasteDivertedKg} kg` },
            { icon: Wind, label: 'CO2 avoided (est.)', value: `${stats.co2SavedKg} kg` },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="group relative overflow-hidden rounded-3xl border border-sage/60 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-lime/20 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep text-lime shadow-soft">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-ink">{m.value}</p>
                  <p className="text-sm font-semibold text-ink">{m.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Charts */}
      {hasAnyActivity ? (
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Projects by material</h2>
            {distribution.length > 0 ? (
              <div className="mt-6 flex h-52 items-end justify-between gap-3">
                {distribution.map((d, i) => {
                  const name = tutorials.find((t) => t.category === d.catId)?.title.split(' ')[0] ?? d.catId;
                  return (
                    <div key={d.catId} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-muted">{d.count}</span>
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-xl bg-gradient-to-t from-forest to-lime shadow-soft origin-bottom animate-grow-bar"
                          style={{ height: `${d.percent}%`, animationDelay: `${i * 90}ms` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-muted">{name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted">
                Complete a project to see this chart fill in.
              </p>
            )}
          </div>

          <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
            <h2 className="font-display text-lg font-semibold text-ink">Journey progress</h2>
            <div className="mt-6 space-y-5">
              <ProgressRow
                label="Saved items"
                current={stats.savedIdeas + stats.savedTutorials}
                target={Math.max(stats.savedIdeas + stats.savedTutorials, 5)}
              />
              <ProgressRow
                label="Projects completed"
                current={stats.projectsCompleted}
                target={Math.max(stats.projectsCompleted, 5)}
              />
              <ProgressRow
                label="Steps ticked across projects"
                current={stats.stepsTicked}
                target={Math.max(stats.stepsTicked, 10)}
              />
              {stats.inProgress > 0 && (
                <p className="text-xs font-medium text-forest">
                  {stats.inProgress} {stats.inProgress === 1 ? 'project is' : 'projects are'} still in progress.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Badges */}
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink sm:text-2xl">
          <Award size={20} className="text-forest" /> Milestones & badges
        </h2>
        <p className="mt-1.5 text-sm text-muted">Earn badges as your impact grows.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const earned = m.current >= m.target;
            const percent = Math.min(Math.round((m.current / m.target) * 100), 100);
            return (
              <div
                key={m.id}
                className={`relative overflow-hidden rounded-3xl border p-5 shadow-soft transition-all animate-fade-up ${
                  earned ? 'border-lime bg-gradient-to-br from-lime/25 to-white' : 'border-sage/60 bg-white'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${
                      earned ? 'bg-forest text-lime' : 'bg-sage/60 text-forest/60'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {earned && (
                    <span className="rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-lime">
                      Earned
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">{m.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{m.detail}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sage/70">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${earned ? 'bg-forest' : 'bg-lime'}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-medium text-muted">
                  {earned ? 'Unlocked' : `${m.current} of ${m.target}`}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Motivation */}
      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep to-forest p-7 text-white shadow-card sm:p-9">
          <Leaf size={24} className="text-lime" />
          <h2 className="mt-4 font-display text-2xl font-semibold leading-snug">{summary.title}</h2>
          <p className="mt-2 text-sm text-sage/85">{summary.body}</p>
          <button
            onClick={() => onNavigate(summary.target)}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest-deep transition-all hover:gap-2.5"
          >
            {summary.cta}
          </button>
        </div>

        <div className="rounded-4xl border border-sage/60 bg-white p-7 shadow-soft">
          <h3 className="font-display text-lg font-semibold text-ink">Your impact at a glance</h3>
          <dl className="mt-4 space-y-3">
            {[
              { l: 'Projects completed', v: String(stats.projectsCompleted) },
              { l: 'Items reused (est.)', v: String(stats.itemsReused) },
              { l: 'Waste diverted (est.)', v: `${stats.wasteDivertedKg} kg` },
              { l: 'Water saved (est.)', v: `${stats.waterSavedL} L` },
              { l: 'Steps ticked', v: String(stats.stepsTicked) },
            ].map((row) => (
              <div
                key={row.l}
                className="flex items-center justify-between border-b border-sage/40 pb-3 last:border-0 last:pb-0"
              >
                <dt className="text-sm text-muted">{row.l}</dt>
                <dd className="font-display text-lg font-bold text-forest">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

function ProgressRow({ label, current, target }: { label: string; current: number; target: number }) {
  const percent = Math.min(Math.round((current / target) * 100), 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>{label}</span>
        <span>
          {current} / {target}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sage/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-forest to-lime transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
