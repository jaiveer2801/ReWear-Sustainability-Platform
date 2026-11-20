import { useEffect } from 'react';
import {
  X,
  Clock,
  Recycle,
  ListChecks,
  Package,
  ArrowRight,
  Sparkles,
  IndianRupee,
  Heart,
} from 'lucide-react';
import type { UpcycleIdea } from '@/data/content';
import { categories } from '@/data/content';
import { Button } from './Button';
import { ProjectPhotos } from './ProjectPhotos';

interface IdeaModalProps {
  idea: UpcycleIdea | null;
  onClose: () => void;
  saved: boolean;
  onToggleSave: (id: string) => void;
}

export function IdeaModal({ idea, onClose, saved, onToggleSave }: IdeaModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (idea) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [idea, onClose]);

  if (!idea) return null;
  const cat = categories.find((c) => c.id === idea.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-4xl bg-warm shadow-lift sm:rounded-4xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden">
          <img src={idea.image} alt={idea.to} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-forest backdrop-blur transition hover:bg-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
              {cat?.name}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white drop-shadow-sm sm:text-3xl">
              {idea.to}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
              <Clock size={13} /> {idea.timeMinutes} min
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
              <Sparkles size={13} /> {idea.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
              <IndianRupee size={13} /> {idea.budgetInr} est.
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/40 px-3 py-1.5 text-xs font-semibold text-forest-deep">
              <Recycle size={13} /> {idea.co2SavedKg} kg CO₂ saved
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-muted">{idea.from}</span>
              <ArrowRight size={15} className="text-lime" />
              <span className="font-semibold text-forest">{idea.to}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{idea.description}</p>
          </div>

          <section className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <Package size={17} className="text-forest" /> Materials
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {idea.materials.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-sage bg-white px-3 py-1.5 text-xs font-medium text-ink"
                >
                  {m}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <ListChecks size={17} className="text-forest" /> Steps
            </h3>
            <ol className="mt-3 space-y-3">
              {idea.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest text-xs font-bold text-lime">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-6">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
              <Heart size={17} className="text-forest" /> Benefits of reusing this material
            </h3>
            <ul className="mt-3 space-y-2">
              {idea.benefits.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <ProjectPhotos ideaId={idea.id} ideaTitle={idea.to} />
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-sage/60 bg-warm/95 px-6 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <IndianRupee size={15} className="text-forest" />
            <span className="font-display font-bold text-ink">₹{idea.budgetInr}</span>
            <span className="text-xs">est. cost</span>
          </div>
          <Button variant="secondary" className="ml-auto">
            Start this project
          </Button>
          <Button
            variant={saved ? 'outline' : 'primary'}
            onClick={() => onToggleSave(idea.id)}
          >
            {saved ? 'Saved' : 'Save Idea'}
          </Button>
        </div>
      </div>
    </div>
  );
}
