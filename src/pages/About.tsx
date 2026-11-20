import { Leaf, Recycle, Heart, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';
import { motivationImage } from '@/data/content';
import type { PageId } from '@/components/navigation';

const values = [
  {
    icon: Recycle,
    title: 'Reduce waste at the source',
    body: 'The most sustainable product is the one you already own. We help you keep it useful.',
  },
  {
    icon: Heart,
    title: 'Make creativity accessible',
    body: 'Every idea includes step-by-step instructions, materials, and difficulty guidance.',
  },
  {
    icon: Target,
    title: 'Measure real impact',
    body: 'Track CO₂ saved, water conserved, and items diverted from landfill as you build.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Explore ideas',
    body: 'Browse categories and discover transformations for materials you already have.',
  },
  {
    n: '02',
    title: 'Start a project',
    body: 'Open any idea for materials, steps, and time estimates — then begin building.',
  },
  {
    n: '03',
    title: 'Save & collect',
    body: 'Bookmark ideas to your collection and mark projects as completed.',
  },
  {
    n: '04',
    title: 'Track your impact',
    body: 'Watch your sustainability metrics grow with every item you reuse.',
  },
];

interface AboutProps {
  onNavigate: (id: PageId) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest to-forest-deep p-7 shadow-card sm:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <Leaf size={14} /> About ReWear
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            We exist to make reuse the obvious choice.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-sage/90 sm:text-base">
            ReWear is a sustainability and upcycling platform that helps people
            discover creative, practical ways to transform unwanted, discarded,
            or unused products into useful and valuable items — turning everyday
            waste into everyday value.
          </p>
        </div>
      </section>

      {/* Mission image block */}
      <section className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-hidden rounded-4xl shadow-card">
          <img
            src={motivationImage}
            alt="Hands holding green leaves"
            className="h-full min-h-[280px] w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center rounded-4xl border border-sage/60 bg-white p-7 shadow-soft sm:p-9">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Why upcycling matters
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Globally, we produce millions of tonnes of waste each year from
            textiles, plastics, electronics, and packaging. Most of it is
            buried or burned — even though the materials are perfectly reusable.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Upcycling reclaims that value. It uses less energy, less water, and
            fewer raw materials than recycling or buying new. And it turns
            something discarded into something you genuinely want.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { v: '92M', l: 'tonnes textile waste / year' },
              { v: '2,400 L', l: 'water saved per reuse' },
              { v: '86 kg', l: 'CO₂ saved by our users' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-sage/50 p-4 text-center">
                <p className="font-display text-xl font-bold text-forest">{s.v}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What we stand for
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-3xl border border-sage/60 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep text-lime shadow-soft">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-4xl border border-sage/60 bg-white p-7 shadow-soft sm:p-10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-forest" />
          <h2 className="font-display text-2xl font-semibold text-ink">How it works</h2>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="font-display text-3xl font-bold text-lime">{s.n}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              {i < steps.length - 1 && (
                <ArrowRight
                  size={18}
                  className="absolute -right-3 top-2 hidden text-sage lg:block"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-sage/50 pt-6">
          <Button variant="primary" iconRight onClick={() => onNavigate('explore')}>
            Start exploring ideas
          </Button>
        </div>
      </section>
    </div>
  );
}
