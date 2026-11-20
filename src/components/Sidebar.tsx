import { navItems, type PageId } from './navigation';
import { Logo } from './Logo';
import { X } from 'lucide-react';

interface SidebarProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-forest-deep/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed z-40 flex h-full w-72 flex-col border-r border-sage/60 bg-warm/95 backdrop-blur transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <Logo />
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-sage/60 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-4 flex-1 px-3">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-forest text-white shadow-soft'
                        : 'text-ink/80 hover:bg-sage/60 hover:text-forest'
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white/15 text-lime'
                          : 'bg-sage/70 text-forest group-hover:bg-lime/40'
                      }`}
                    >
                      <Icon size={17} strokeWidth={2.2} />
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="m-3 rounded-3xl bg-gradient-to-br from-forest to-forest-deep p-5 text-white shadow-card">
          <p className="font-display text-base font-semibold leading-snug">
            Every item reused is one less in landfill.
          </p>
          <p className="mt-1.5 text-xs text-sage/80">
            Track your impact as you build your collection.
          </p>
          <button
            onClick={() => onNavigate('impact')}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lime hover:gap-2.5 transition-all"
          >
            View your impact →
          </button>
        </div>
      </aside>
    </>
  );
}
