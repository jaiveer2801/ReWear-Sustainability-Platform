import { useMemo, useState } from 'react';
import { Heart, Images, LayoutGrid, Search, X, Bookmark, BookmarkCheck, ChevronsLeftRight } from 'lucide-react';
import { categories, type CategoryId } from '@/data/content';
import { galleryItems } from '@/data/gallery';
import { useGalleryLikes } from '@/hooks/useGalleryLikes';
import { useCollection } from '@/components/CollectionContext';

interface GalleryProps {
  onSelectIdea: (id: string) => void;
}

type CategoryFilter = CategoryId | 'all';

export function Gallery({ onSelectIdea }: GalleryProps) {
  const { likes, toggleLike } = useGalleryLikes();
  const { saved, toggleSave } = useCollection();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [compareId, setCompareId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryItems.filter(({ idea }) => {
      if (category !== 'all' && idea.category !== category) return false;
      if (!q) return true;
      const categoryName = categories.find((c) => c.id === idea.category)?.name ?? '';
      return [idea.title, idea.description, categoryName].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, category]);

  const activeFilterCount = (query.trim() ? 1 : 0) + (category !== 'all' ? 1 : 0);
  const compare = compareId ? galleryItems.find((g) => g.idea.id === compareId) : null;

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <Images size={14} /> Transformation Gallery
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Real makeovers, from waste to wonderful.
          </h1>
          <p className="mt-3 text-sm text-sage/90 sm:text-base">
            Browse what discarded materials can become. Like what inspires you
            and save projects to your collection.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transformations"
              aria-label="Search transformations"
              className="w-full rounded-full border border-sage bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 shadow-soft transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <FilterChip active={category === 'all'} onClick={() => setCategory('all')} icon={<LayoutGrid size={13} />}>
              All
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(category === c.id ? 'all' : c.id)}
              >
                {c.shortName}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing {visible.length} of {galleryItems.length} transformations
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-forest-deep"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map(({ idea, baseLikes }, i) => {
              const liked = likes.includes(idea.id);
              const isSaved = saved.includes(idea.id);
              return (
                <article
                  key={idea.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <button
                    onClick={() => onSelectIdea(idea.id)}
                    className="relative aspect-[16/10] overflow-hidden text-left"
                    aria-label={`Open ${idea.to}`}
                  >
                    <img
                      src={idea.image}
                      alt={idea.to}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
                      {categories.find((c) => c.id === idea.category)?.shortName}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
                      <ChevronsLeftRight size={12} /> Before / after
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{idea.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{idea.description}</p>

                    <div className="mt-4 flex items-center gap-2 pt-2">
                      <button
                        onClick={() => toggleLike(idea.id)}
                        aria-pressed={liked}
                        aria-label={liked ? 'Unlike' : 'Like'}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                          liked ? 'bg-rose-100 text-rose-600' : 'border border-sage bg-warm text-muted hover:border-rose-200 hover:text-rose-500'
                        }`}
                      >
                        <Heart size={14} className={liked ? 'fill-current' : ''} />
                        {baseLikes + (liked ? 1 : 0)}
                      </button>
                      <button
                        onClick={() => toggleSave(idea.id)}
                        aria-pressed={isSaved}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                          isSaved ? 'bg-sage/70 text-forest' : 'border border-sage bg-warm text-muted hover:border-forest hover:text-forest'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      <button
                        onClick={() => setCompareId(idea.id)}
                        className="ml-auto text-xs font-semibold text-forest transition-colors hover:text-forest-deep"
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-sage bg-white/60 p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-sage/60 text-forest">
              <Search size={26} />
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-ink">No transformations found</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              Try a different word or browse all categories.
            </p>
          </div>
        )}
      </section>

      {compare && (
        <BeforeAfterOverlay
          item={compare}
          liked={likes.includes(compare.idea.id)}
          onToggleLike={() => toggleLike(compare.idea.id)}
          onClose={() => setCompareId(null)}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
        active ? 'bg-forest text-white shadow-soft' : 'border border-sage bg-white text-ink hover:bg-sage/50'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function BeforeAfterOverlay({
  item,
  liked,
  onToggleLike,
  onClose,
}: {
  item: (typeof galleryItems)[number];
  liked: boolean;
  onToggleLike: () => void;
  onClose: () => void;
}) {
  const { idea, beforeImage } = item;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Before and after: ${idea.to}`}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-t-4xl bg-warm shadow-lift sm:rounded-4xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative grid grid-cols-2">
          <figure className="relative">
            <img src={beforeImage} alt={`Before: raw ${idea.from}`} className="aspect-square w-full object-cover" />
            <figcaption className="absolute left-3 top-3 rounded-full bg-forest-deep/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              Before
            </figcaption>
          </figure>
          <figure className="relative">
            <img src={idea.image} alt={`After: ${idea.to}`} className="aspect-square w-full object-cover" />
            <figcaption className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-forest-deep">
              After
            </figcaption>
          </figure>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-forest backdrop-blur transition hover:bg-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {idea.from} → {idea.to}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink sm:text-2xl">{idea.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{idea.description}</p>
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={onToggleLike}
              aria-pressed={liked}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                liked ? 'bg-rose-100 text-rose-600' : 'border border-sage bg-white text-muted hover:text-rose-500'
              }`}
            >
              <Heart size={15} className={liked ? 'fill-current' : ''} /> {liked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={onClose}
              className="ml-auto rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
