import { useMemo } from 'react';
import { CheckCircle2, Circle, Flame, Lock, Target, Trophy } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { challenges } from '@/data/challengeData';

interface JoinedState {
  [challengeId: string]: {
    joined: boolean;
    completedSteps: string[];
    badgeEarned: boolean;
  };
}

export function Challenges() {
  const [joined, setJoined] = useLocalStorage<JoinedState>('rewear:challenges', {});

  const getEntry = (id: string) =>
    joined[id] ?? { joined: false, completedSteps: [], badgeEarned: false };

  const toggleJoin = (id: string) =>
    setJoined((prev) => {
      const entry = prev[id] ?? { joined: false, completedSteps: [], badgeEarned: false };
      return { ...prev, [id]: { ...entry, joined: !entry.joined } };
    });

  const toggleStep = (challengeId: string, step: string) =>
    setJoined((prev) => {
      const entry = prev[challengeId] ?? { joined: true, completedSteps: [], badgeEarned: false };
      const done = entry.completedSteps.includes(step)
        ? entry.completedSteps.filter((s) => s !== step)
        : [...entry.completedSteps, step];
      const challenge = challenges.find((c) => c.id === challengeId);
      const badgeEarned = challenge ? done.length === challenge.steps.length : false;
      return { ...prev, [challengeId]: { ...entry, completedSteps: done, badgeEarned } };
    });

  const activeCount = useMemo(
    () => Object.values(joined).filter((e) => e.joined).length,
    [joined],
  );
  const badgeCount = useMemo(
    () => Object.values(joined).filter((e) => e.badgeEarned).length,
    [joined],
  );

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <Target size={14} /> Eco Challenges
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Small weekly actions, lasting habits.
          </h1>
          <p className="mt-3 text-sm text-sage/90 sm:text-base">
            Join a challenge, tick off simple reuse actions, and earn badges as
            you go. You have {activeCount} {activeCount === 1 ? 'challenge' : 'challenges'} active
            and {badgeCount} {badgeCount === 1 ? 'badge' : 'badges'} earned.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {challenges.map((c, i) => {
          const entry = getEntry(c.id);
          const percent = Math.round((entry.completedSteps.length / c.steps.length) * 100);
          const complete = entry.badgeEarned;
          const Badge = c.badgeIcon;
          return (
            <article
              key={c.id}
              className={`flex flex-col overflow-hidden rounded-4xl border p-6 shadow-soft transition-all hover:-translate-y-1 animate-fade-up sm:p-7 ${
                complete
                  ? 'border-lime bg-gradient-to-br from-lime/25 to-white'
                  : 'border-sage/60 bg-white'
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-sage/60 px-2.5 py-1 text-[11px] font-semibold text-forest">
                  {c.week}
                </span>
                {entry.joined && !complete && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-lime">
                    <Flame size={11} /> Active
                  </span>
                )}
                {complete && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-lime">
                    <Trophy size={11} /> Complete
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-display text-xl font-semibold text-ink">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>

              <div className="mt-4 rounded-2xl bg-warm p-3.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Goal</p>
                <p className="mt-1 text-sm font-semibold text-ink">{c.goal}</p>
              </div>

              <ul className="mt-4 flex-1 space-y-2.5">
                {c.steps.map((step) => {
                  const done = entry.completedSteps.includes(step);
                  return (
                    <li key={step}>
                      <button
                        onClick={() => entry.joined && toggleStep(c.id, step)}
                        disabled={!entry.joined}
                        className="flex w-full items-start gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-sage/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {done ? (
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-forest" />
                        ) : (
                          <Circle size={17} className="mt-0.5 shrink-0 text-muted" />
                        )}
                        <span className={`text-sm leading-snug ${done ? 'text-ink line-through decoration-sage' : 'text-muted'}`}>
                          {step}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-muted">
                  <span>Progress</span>
                  <span>
                    {entry.completedSteps.length} / {c.steps.length}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sage/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-forest to-lime transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-forest">
                  {complete ? (
                    <>
                      <Badge size={16} /> {c.reward}
                    </>
                  ) : (
                    <>
                      <Lock size={13} /> Reward: {c.reward}
                    </>
                  )}
                </div>
                <button
                  onClick={() => toggleJoin(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                    entry.joined
                      ? 'border border-sage bg-white text-ink hover:bg-sage/50'
                      : 'bg-forest text-white hover:bg-forest-deep'
                  }`}
                >
                  {entry.joined ? 'Leave' : 'Join challenge'}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
