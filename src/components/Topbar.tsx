import { Menu, Bell, CheckCircle2, Bookmark, Target } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { navItems, type PageId } from './navigation';

interface TopbarProps {
  active: PageId;
  onMenu: () => void;
  onNavigate: (id: PageId) => void;
}

export function Topbar({ active, onMenu, onNavigate }: TopbarProps) {
  const current = navItems.find((n) => n.id === active);
  const [bellOpen, setBellOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-sage/60 bg-warm/85 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        className="grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-sage/60 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="lg:hidden">
        <Logo size="sm" />
      </div>

      <div className="hidden flex-1 lg:block">
        <h1 className="font-display text-lg font-semibold text-ink">{current?.label}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-sage/60"
            aria-label="Notifications"
            aria-expanded={bellOpen}
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime ring-2 ring-warm" />
          </button>
          {bellOpen && (
            <div
              className="absolute right-0 top-12 z-30 w-72 rounded-3xl border border-sage/60 bg-white p-4 shadow-lift animate-fade-up"
              role="menu"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">This week</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2.5 rounded-2xl p-2 hover:bg-sage/40">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-forest" />
                  <span className="text-ink">
                    New tutorials are live in the <button onClick={() => { onNavigate('studio'); setBellOpen(false); }} className="font-semibold text-forest underline-offset-2 hover:underline">DIY Studio</button>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-2xl p-2 hover:bg-sage/40">
                  <Target size={16} className="mt-0.5 shrink-0 text-forest" />
                  <span className="text-ink">
                    Weekly eco challenges are open — <button onClick={() => { onNavigate('challenges'); setBellOpen(false); }} className="font-semibold text-forest underline-offset-2 hover:underline">join one</button>
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-2xl p-2 hover:bg-sage/40">
                  <Bookmark size={16} className="mt-0.5 shrink-0 text-forest" />
                  <span className="text-ink">
                    Save ideas to your <button onClick={() => { onNavigate('collection'); setBellOpen(false); }} className="font-semibold text-forest underline-offset-2 hover:underline">collection</button> to track impact
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigate('profile')}
          className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-lime to-forest ring-2 ring-white shadow-soft transition hover:ring-lime"
          aria-label="Open my profile"
        />
      </div>
    </header>
  );
}
