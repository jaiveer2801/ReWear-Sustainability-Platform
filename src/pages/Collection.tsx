import { useState } from 'react';
import { Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';
import { ideas, type UpcycleIdea } from '@/data/content';
import { tutorials } from '@/data/tutorials';
import { IdeaCard } from '@/components/IdeaCard';
import { Button } from '@/components/Button';
import { useCollection } from '@/components/CollectionContext';
import { TutorialCard } from '@/components/studio/TutorialCard';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import type { PageId } from '@/components/navigation';

interface CollectionProps {
  onNavigate: (id: PageId) => void;
  onSelectIdea: (idea: UpcycleIdea) => void;
  onSelectTutorial: (id: string) => void;
}

export function Collection({ onNavigate, onSelectIdea, onSelectTutorial }: CollectionProps) {
  const { saved, toggleSave, completed } = useCollection();
  const { progress } = useTutorialProgress();
  const [tab, setTab] = useState<'saved' | 'completed'>('saved');
  const savedIdeas = ideas.filter((i) => saved.includes(i.id));
  const savedTutorials = tutorials.filter((t) => saved.includes(t.id));
  const completedTutorials = tutorials.filter((t) => completed.includes(t.id));

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-sage via-warm to-warm border border-sage/60 p-7 sm:p-10">
        <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-lime/25 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold text-forest">
            <Bookmark size={14} /> My Collection
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ideas you've saved and projects you've finished.
          </h1>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Build your personal library of upcycling inspiration. Bookmark
            ideas and DIY projects to revisit later.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('saved')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            tab === 'saved'
              ? 'bg-forest text-white shadow-soft'
              : 'border border-sage bg-white text-ink hover:bg-sage/50'
          }`}
        >
          <Bookmark size={15} /> Saved ({savedIdeas.length + savedTutorials.length})
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            tab === 'completed'
              ? 'bg-forest text-white shadow-soft'
              : 'border border-sage bg-white text-ink hover:bg-sage/50'
          }`}
        >
          <BookmarkCheck size={15} /> Completed ({completedTutorials.length})
        </button>
      </div>

      {tab === 'saved' && (
        savedIdeas.length + savedTutorials.length > 0 ? (
          <div className="space-y-10">
            {savedTutorials.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-lg font-semibold text-ink">DIY projects</h2>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {savedTutorials.map((tutorial, i) => (
                    <TutorialCard
                      key={tutorial.id}
                      tutorial={tutorial}
                      doneCount={progress[tutorial.id]?.length ?? 0}
                      started={tutorial.id in progress}
                      index={i}
                      onOpen={() => onSelectTutorial(tutorial.id)}
                    />
                  ))}
                </div>
              </section>
            )}
            {savedIdeas.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display text-lg font-semibold text-ink">Ideas</h2>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {savedIdeas.map((idea, i) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      index={i}
                      saved
                      onToggleSave={toggleSave}
                      onClick={() => onSelectIdea(idea)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <EmptyState
            icon={<Bookmark size={28} />}
            title="Nothing saved yet"
            body="Tap the bookmark on any idea or DIY project to add it to your collection."
            action={{ label: 'Find ideas to save', onClick: () => onNavigate('explore') }}
          />
        )
      )}

      {tab === 'completed' && (
        completedTutorials.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {completedTutorials.map((tutorial, i) => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                doneCount={progress[tutorial.id]?.length ?? 0}
                started
                index={i}
                onOpen={() => onSelectTutorial(tutorial.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Sparkles size={28} />}
            title="No completed projects yet"
            body="Finish every step of a DIY project and mark it complete to see it here."
            action={{ label: 'Open the DIY Studio', onClick: () => onNavigate('studio') }}
          />
        )
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: { label: string; onClick: () => void };
}

function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-sage bg-white/60 p-12 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-sage/60 text-forest">
        {icon}
      </div>
      <p className="mt-5 font-display text-xl font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{body}</p>
      <div className="mt-5 flex justify-center">
        <Button variant="primary" iconRight onClick={action.onClick}>
          {action.label}
        </Button>
      </div>
    </div>
  );
}
