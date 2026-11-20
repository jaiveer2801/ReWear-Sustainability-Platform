import {
  Sparkles,
  CheckCircle2,
  Recycle,
  ArrowRight,
  Leaf,
  TrendingUp,
} from 'lucide-react';
import {
  ideas,
  categories,
  quickStats,
  heroImage,
  motivationImage,
  type UpcycleIdea,
} from '@/data/content';
import { Button } from '@/components/Button';
import { IdeaCard } from '@/components/IdeaCard';
import { useCollection } from '@/components/CollectionContext';
import type { PageId } from '@/components/navigation';

const statIcons = { Sparkles, CheckCircle2, Recycle };

interface DashboardProps {
  onNavigate: (id: PageId) => void;
  onSelectIdea: (idea: UpcycleIdea) => void;
}

export function Dashboard({ onNavigate, onSelectIdea }: DashboardProps) {
  const { saved, toggleSave } = useCollection();
  const featured = ideas.filter((i) => i.featured).slice(0, 4);
  const recent = ideas.slice(0, 4);

  return (
    <div className="space-y-12 pb-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest via-forest to-forest-deep shadow-card">
        <div className="absolute inset-0 opacity-30">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lime/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />

        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:p-14">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
              <Leaf size={14} /> Sustainability & upcycling platform
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] text-white text-balance sm:text-4xl lg:text-5xl">
              Give your unwanted things a new purpose.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sage/90 sm:text-base">
              ReWear helps you discover creative, practical ways to transform
              discarded or unused products into useful, beautiful items — one
              second life at a time.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                iconRight
                onClick={() => onNavigate('discover')}
              >
                Start Reusing
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => onNavigate('about')}
              >
                Learn the mission
              </Button>
            </div>
          </div>

          <div className="relative hidden animate-fade-up lg:block" style={{ animationDelay: '120ms' }}>
            <div className="relative rounded-3xl p-2 shadow-lift ring-1 ring-white/15">
              <img
                src={heroImage}
                alt="Hands holding a seedling"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur animate-float-slow">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime/40 text-forest">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-none text-ink">86 kg</p>
                <p className="text-[11px] font-medium text-muted">CO₂ saved this year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        {quickStats.map((stat, i) => {
          const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? Sparkles;
          return (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-3xl border border-sage/60 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sage/40 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep text-lime shadow-soft">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold leading-none text-ink">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
                  <p className="text-xs text-muted">{stat.caption}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Featured ideas */}
      <section>
        <SectionHeader
          eyebrow="Featured"
          title="Upcycling ideas worth trying"
          subtitle="Hand-picked transformations to spark your next project."
          action={{ label: 'Browse all', onClick: () => onNavigate('explore') }}
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((idea, i) => (
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
      </section>

      {/* Category strip */}
      <section>
        <SectionHeader
          eyebrow="Categories"
          title="Explore by material"
          subtitle="Eight material streams, each with dozens of ideas."
          action={{ label: 'See all categories', onClick: () => onNavigate('explore') }}
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('explore')}
              className="group flex items-center gap-3 rounded-2xl border border-sage/60 bg-white p-3.5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{cat.name}</p>
                <p className="text-xs text-muted">{cat.ideasCount} ideas</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Motivation banner */}
      <section className="relative overflow-hidden rounded-4xl bg-forest-deep shadow-card">
        <div className="absolute inset-0 opacity-25">
          <img src={motivationImage} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-lime backdrop-blur">
              <Recycle size={14} /> Sustainability motivation
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-white text-balance sm:text-3xl">
              Every year, 92 million tonnes of textile waste is created worldwide.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-sage/85 sm:text-base">
              Reusing even one item saves water, cuts emissions, and keeps
              perfectly good materials out of landfills. Your next project
              makes a measurable difference.
            </p>
          </div>
          <Button
            variant="secondary"
            iconRight
            className="shrink-0"
            onClick={() => onNavigate('impact')}
          >
            See your impact
          </Button>
        </div>
      </section>

      {/* Recently explored */}
      <section>
        <SectionHeader
          eyebrow="Recently explored"
          title="Fresh from the studio"
          subtitle="The latest ideas the community has been browsing."
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((idea, i) => (
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
      </section>
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

function SectionHeader({ eyebrow, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-forest/70">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-[28px]">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-forest hover:gap-2.5 transition-all sm:self-auto"
        >
          {action.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
}
