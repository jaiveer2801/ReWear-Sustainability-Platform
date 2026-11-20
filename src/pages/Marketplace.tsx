import { useMemo, useState, type FormEvent } from 'react';
import {
  Heart,
  LayoutGrid,
  Mail,
  MessageCircle,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Store,
  Trash2,
  X,
} from 'lucide-react';
import { categories, type CategoryId } from '@/data/content';
import { demoListings, pexelsImage, type MarketListing } from '@/data/marketplace';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { inr, rupeeSymbol } from '@/lib/format';

type CategoryFilter = CategoryId | 'all';
type Panel = { mode: 'closed' } | { mode: 'form'; listing: MarketListing | null } | { mode: 'contact'; listing: MarketListing };

const emptyForm = {
  title: '',
  description: '',
  price: '',
  category: 'clothing' as CategoryId,
  image: '',
};

export function Marketplace() {
  const [listings, setListings] = useLocalStorage<MarketListing[]>('rewear:market-listings', demoListings);
  const [favorites, setFavorites] = useLocalStorage<string[]>('rewear:market-favorites', []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [panel, setPanel] = useState<Panel>({ mode: 'closed' });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      if (category !== 'all' && l.category !== category) return false;
      if (!q) return true;
      return [l.title, l.description, l.seller.name, l.seller.city].some((f) =>
        f.toLowerCase().includes(q),
      );
    });
  }, [listings, query, category]);

  const detail = detailId ? listings.find((l) => l.id === detailId) : null;

  const upsertListing = (listing: MarketListing) => {
    setListings((prev) =>
      prev.some((l) => l.id === listing.id)
        ? prev.map((l) => (l.id === listing.id ? listing : l))
        : [{ ...listing }, ...prev],
    );
  };

  const removeListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    if (detailId === id) setDetailId(null);
    showToast('Listing removed');
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
              <Store size={14} /> ReWear Marketplace
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              Buy and sell things given a second life.
            </h1>
            <p className="mt-3 text-sm text-sage/90 sm:text-base">
              Handmade upcycled products from the community. Favourite what you
              love, or list your own creation.
            </p>
          </div>
          <button
            onClick={() => setPanel({ mode: 'form', listing: null })}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-forest-deep shadow-soft transition-all hover:gap-2.5"
          >
            <Plus size={16} /> Create listing
          </button>
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
              placeholder="Search products, sellers, cities"
              aria-label="Search marketplace"
              className="w-full rounded-full border border-sage bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted/70 shadow-soft transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <CategoryChip active={category === 'all'} onClick={() => setCategory('all')} icon={<LayoutGrid size={13} />}>
              All
            </CategoryChip>
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(category === c.id ? 'all' : c.id)}
              >
                {c.shortName}
              </CategoryChip>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((l, i) => {
              const faved = favorites.includes(l.id);
              return (
                <article
                  key={l.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <button
                    onClick={() => setDetailId(l.id)}
                    className="relative aspect-[16/10] overflow-hidden text-left"
                    aria-label={`View ${l.title}`}
                  >
                    <img
                      src={l.image}
                      alt={l.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
                      {categories.find((c) => c.id === l.category)?.shortName}
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink">{l.title}</h3>
                      <p className="shrink-0 font-display text-lg font-bold text-forest">
                        {rupeeSymbol}
                        {inr(l.price)}
                      </p>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{l.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                      <span className="inline-flex items-center gap-1 font-semibold text-ink">
                        <Store size={12} /> {l.seller.name}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{l.seller.city}</span>
                      <span className="ml-auto inline-flex items-center gap-1 font-semibold text-forest">
                        <Star size={12} className="fill-current" /> {l.seller.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setDetailId(l.id)}
                        className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-deep"
                      >
                        View details
                      </button>
                      <button
                        onClick={() => toggleFavorite(l.id)}
                        aria-pressed={faved}
                        aria-label={faved ? 'Remove from favourites' : 'Add to favourites'}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
                          faved
                            ? 'bg-rose-100 text-rose-600'
                            : 'border border-sage bg-warm text-muted hover:border-rose-200 hover:text-rose-500'
                        }`}
                      >
                        <Heart size={14} className={faved ? 'fill-current' : ''} />
                        {faved ? 'Favourited' : 'Favourite'}
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
              <Package size={26} />
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-ink">No products match</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              Try a different search or browse all categories.
            </p>
          </div>
        )}
      </section>

      {detail && (
        <DetailOverlay
          listing={detail}
          faved={favorites.includes(detail.id)}
          onToggleFavorite={() => toggleFavorite(detail.id)}
          onContact={() => setPanel({ mode: 'contact', listing: detail })}
          onEdit={() => setPanel({ mode: 'form', listing: detail })}
          onDelete={() => removeListing(detail.id)}
          onClose={() => setDetailId(null)}
        />
      )}

      {panel.mode === 'form' && (
        <ListingFormOverlay
          initial={panel.listing}
          onSubmit={(l) => {
            upsertListing(l);
            showToast(panel.listing ? 'Listing updated' : 'Listing published');
            setPanel({ mode: 'closed' });
          }}
          onClose={() => setPanel({ mode: 'closed' })}
        />
      )}

      {panel.mode === 'contact' && (
        <ContactOverlay
          listing={panel.listing}
          onClose={() => setPanel({ mode: 'closed' })}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-lift animate-fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
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

function DetailOverlay({
  listing,
  faved,
  onToggleFavorite,
  onContact,
  onEdit,
  onDelete,
  onClose,
}: {
  listing: MarketListing;
  faved: boolean;
  onToggleFavorite: () => void;
  onContact: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={listing.title}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl bg-warm shadow-lift sm:rounded-4xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={listing.image} alt={listing.title} className="aspect-[16/9] w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-forest backdrop-blur transition hover:bg-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 sm:p-7">
          <span className="rounded-full bg-sage/70 px-2.5 py-1 text-[11px] font-semibold text-forest">
            {categories.find((c) => c.id === listing.category)?.shortName}
          </span>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-ink">{listing.title}</h3>
            <p className="shrink-0 font-display text-2xl font-bold text-forest">
              {rupeeSymbol}
              {inr(listing.price)}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{listing.description}</p>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-sage/60 bg-white p-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep text-lime">
              <Store size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{listing.seller.name}</p>
              <p className="text-xs text-muted">
                {listing.seller.city} · <Star size={11} className="inline fill-current text-forest" /> {listing.seller.rating.toFixed(1)} seller rating
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={onContact}
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              <MessageCircle size={15} /> Contact seller
            </button>
            <button
              onClick={onToggleFavorite}
              aria-pressed={faved}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                faved ? 'bg-rose-100 text-rose-600' : 'border border-sage bg-white text-muted hover:text-rose-500'
              }`}
            >
              <Heart size={15} className={faved ? 'fill-current' : ''} /> {faved ? 'Favourited' : 'Favourite'}
            </button>
            <button
              onClick={onEdit}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-sage bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sage/50"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingFormOverlay({
  initial,
  onSubmit,
  onClose,
}: {
  initial: MarketListing | null;
  onSubmit: (l: MarketListing) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          price: String(initial.price),
          category: initial.category,
          image: initial.image,
        }
      : emptyForm,
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    const price = Math.max(0, Math.round(Number(form.price) || 0));
    onSubmit({
      id: initial?.id ?? `mk-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      price,
      category: form.category,
      image: form.image.trim() || pexelsFallback(form.category),
      seller: initial?.seller ?? { name: 'You', city: 'Bengaluru', rating: 5 },
      createdAt: initial?.createdAt ?? new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={initial ? 'Edit listing' : 'Create listing'}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-4xl bg-warm p-6 shadow-lift sm:rounded-4xl sm:p-7 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">
            {initial ? 'Edit listing' : 'Create a listing'}
          </h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-sage/60 text-forest transition hover:bg-sage"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink">Title</span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={80}
              placeholder="e.g. Upcycled denim tote"
              className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              maxLength={400}
              placeholder="What is it, what is it made from, its condition?"
              className="mt-1.5 w-full resize-none rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-ink">Price ({rupeeSymbol})</span>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0"
                className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as CategoryId })}
                className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-ink">Image URL (optional)</span>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Paste a photo link, or leave blank for a default"
              className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </label>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-sage bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              <ShoppingBag size={15} /> {initial ? 'Save changes' : 'Publish listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ContactOverlay({ listing, onClose }: { listing: MarketListing; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Contact ${listing.seller.name}`}
    >
      <div
        className="w-full max-w-md rounded-t-4xl bg-warm p-6 shadow-lift sm:rounded-4xl sm:p-7 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-forest-deep animate-fade-up">
              <Mail size={24} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">Message sent</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {listing.seller.name} will receive your note about "{listing.title}" and can reply to
              you directly. This demo doesn't send real email.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">Contact {listing.seller.name}</h3>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-sage/60 text-forest transition hover:bg-sage"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              About: <span className="font-semibold text-ink">{listing.title}</span>
            </p>
            <form onSubmit={submit} className="mt-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                maxLength={500}
                placeholder={`Hi ${listing.seller.name}, is this still available?`}
                className="w-full resize-none rounded-2xl border border-sage bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-sage bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
                >
                  <Mail size={15} /> Send message
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function pexelsFallback(category: CategoryId): string {
  const byCategory: Record<CategoryId, number> = {
    clothing: 17514500,
    plastic: 10554836,
    paper: 18785062,
    glass: 39712893,
    wood: 39333410,
    electronics: 39712893,
    metal: 7443025,
    other: 38000809,
  };
  return pexelsImage(byCategory[category]);
}
