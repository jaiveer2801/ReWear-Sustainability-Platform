import { ArrowLeft, Clock, IndianRupee, ListChecks } from 'lucide-react';
import { categories } from '@/data/content';
import type { Tutorial } from '@/data/tutorials';
import { useCollection } from '@/components/CollectionContext';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import { Button } from '@/components/Button';
import { StepPlayer } from './StepPlayer';
import { ProjectSidebar } from './ProjectSidebar';
import { difficultyStyles } from './difficultyStyles';

interface TutorialViewProps {
  tutorial: Tutorial;
  onBack: () => void;
}

export function TutorialView({ tutorial, onBack }: TutorialViewProps) {
  const { progress, startProject, toggleStep } = useTutorialProgress();
  const { saved, toggleSave, completed, toggleCompleted } = useCollection();

  const started = tutorial.id in progress;
  const doneSteps = progress[tutorial.id] ?? [];
  const isSaved = saved.includes(tutorial.id);
  const isCompleted = completed.includes(tutorial.id);
  const categoryName = categories.find((c) => c.id === tutorial.category)?.name;

  const handleToggleStep = (index: number) => {
    if (isCompleted && doneSteps.includes(index)) toggleCompleted(tutorial.id);
    toggleStep(tutorial.id, index);
  };

  return (
    <div className="space-y-6 pb-10">
      <Button variant="ghost" icon={<ArrowLeft size={16} />} onClick={onBack}>
        All DIY projects
      </Button>

      <section className="overflow-hidden rounded-4xl border border-sage/60 bg-white shadow-soft animate-fade-up">
        <div className="relative aspect-[21/9] max-h-72 w-full overflow-hidden">
          <img src={tutorial.image} alt={tutorial.imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
              {categoryName}
            </span>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white drop-shadow-sm sm:text-4xl">
              {tutorial.title}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 p-5 sm:p-6">
          <p className="w-full text-sm leading-relaxed text-muted sm:text-base">{tutorial.description}</p>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${difficultyStyles[tutorial.difficulty]}`}>
            {tutorial.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
            <Clock size={13} /> {tutorial.timeMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
            <IndianRupee size={13} /> {tutorial.budgetInr} est.
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1.5 text-xs font-semibold text-forest">
            <ListChecks size={13} /> {tutorial.steps.length} steps
          </span>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <StepPlayer
          steps={tutorial.steps}
          doneSteps={doneSteps}
          started={started}
          onToggleStep={handleToggleStep}
        />
        <ProjectSidebar
          tutorial={tutorial}
          started={started}
          doneCount={doneSteps.length}
          isSaved={isSaved}
          isCompleted={isCompleted}
          onStart={() => startProject(tutorial.id)}
          onToggleSave={() => toggleSave(tutorial.id)}
          onToggleCompleted={() => toggleCompleted(tutorial.id)}
        />
      </div>
    </div>
  );
}
