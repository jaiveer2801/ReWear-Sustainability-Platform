import { useState, useEffect } from 'react';
import { navItems, type PageId } from '@/components/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { IdeaModal } from '@/components/IdeaModal';
import { CollectionProvider, useCollection } from '@/components/CollectionContext';
import { Dashboard } from '@/pages/Dashboard';
import { Discover } from '@/pages/Discover';
import { Explore } from '@/pages/Explore';
import { About } from '@/pages/About';
import { Studio } from '@/pages/Studio';
import { Collection } from '@/pages/Collection';
import { Gallery } from '@/pages/Gallery';
import { Marketplace } from '@/pages/Marketplace';
import { Exchange } from '@/pages/Exchange';
import { Scanner } from '@/pages/Scanner';
import { Challenges } from '@/pages/Challenges';
import { Profile } from '@/pages/Profile';
import { ideas } from '@/data/content';
import { Impact } from '@/pages/Impact';
import type { UpcycleIdea } from '@/data/content';

function AppShell() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<UpcycleIdea | null>(null);
  const [tutorialId, setTutorialId] = useState<string | null>(null);
  const { saved, toggleSave, markExplored } = useCollection();

  const navigate = (id: PageId) => {
    setPage(id);
    setTutorialId(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTutorial = (id: string | null) => {
    setTutorialId(id);
    if (id) {
      setPage('studio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectIdea = (idea: UpcycleIdea) => {
    setSelected(idea);
    markExplored(idea.id);
  };

  const selectIdeaById = (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (idea) selectIdea(idea);
  };

  // Sync document title with current page
  useEffect(() => {
    const item = navItems.find((n) => n.id === page);
    document.title = item ? `ReWear — ${item.label}` : 'ReWear';
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} onSelectIdea={selectIdea} />;
      case 'discover':
        return <Discover onNavigate={navigate} onSelectIdea={selectIdea} />;
      case 'explore':
        return <Explore onSelectIdea={selectIdea} />;
      case 'studio':
        return <Studio activeTutorialId={tutorialId} onSelectTutorial={selectTutorial} />;
      case 'collection':
        return (
          <Collection onNavigate={navigate} onSelectIdea={selectIdea} onSelectTutorial={selectTutorial} />
        );
      case 'gallery':
        return <Gallery onSelectIdea={selectIdeaById} />;
      case 'marketplace':
        return <Marketplace />;
      case 'exchange':
        return <Exchange />;
      case 'scanner':
        return <Scanner />;
      case 'challenges':
        return <Challenges />;
      case 'profile':
        return <Profile onNavigate={navigate} onSelectTutorial={selectTutorial} />;
      case 'impact':
        return <Impact onNavigate={navigate} />;
      case 'about':
        return <About onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} onSelectIdea={selectIdea} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-warm">
      <Sidebar active={page} onNavigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar active={page} onMenu={() => setMenuOpen(true)} onNavigate={navigate} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div key={page} className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
        <footer className="border-t border-sage/60 px-6 py-5 text-center text-xs text-muted">
          ReWear — Give every product a second life. A concept platform for sustainable upcycling.
        </footer>
      </div>

      <IdeaModal
        idea={selected}
        onClose={() => setSelected(null)}
        saved={selected ? saved.includes(selected.id) : false}
        onToggleSave={toggleSave}
      />
    </div>
  );
}

export default function App() {
  return (
    <CollectionProvider>
      <AppShell />
    </CollectionProvider>
  );
}
