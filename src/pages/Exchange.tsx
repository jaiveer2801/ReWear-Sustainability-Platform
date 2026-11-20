import { useMemo, useState, type FormEvent } from 'react';
import {
  HandHeart,
  Inbox,
  LayoutGrid,
  MapPin,
  Package,
  Plus,
  Search,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { categories, type CategoryId } from '@/data/content';
import {
  demoPosts,
  demoRequests,
  pickupLabels,
  type MaterialPost,
  type MaterialRequest,
  type PickupPreference,
  type RequestStatus,
} from '@/data/exchange';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { pexelsImage } from '@/data/marketplace';

type CategoryFilter = CategoryId | 'all';

interface PostFormState {
  name: string;
  category: CategoryId;
  quantity: string;
  description: string;
  location: string;
  pickup: PickupPreference;
  image: string;
}

const emptyPost: PostFormState = {
  name: '',
  category: 'other',
  quantity: '',
  description: '',
  location: '',
  pickup: 'either',
  image: '',
};

const fallbackImages: Record<CategoryId, number> = {
  clothing: 17514500,
  plastic: 10554836,
  paper: 18785062,
  glass: 39712893,
  wood: 39333410,
  electronics: 39712893,
  metal: 7443025,
  other: 38000809,
};

export function Exchange() {
  const [posts, setPosts] = useLocalStorage<MaterialPost[]>('rewear:exchange-posts', demoPosts);
  const [requests, setRequests] = useLocalStorage<MaterialRequest[]>('rewear:exchange-requests', demoRequests);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.description, p.location, p.quantity].some((f) => f.toLowerCase().includes(q));
    });
  }, [posts, query, category]);

  const detail = detailId ? posts.find((p) => p.id === detailId) : null;
  const detailRequests = detail ? requests.filter((r) => r.postId === detail.id) : [];
  const myOutgoing = requests.filter((r) => r.requester === 'You');
  const inbox = requests.filter((r) =>
    posts.some((p) => p.id === r.postId && p.owner === 'you'),
  );

  const publishPost = (state: PostFormState) => {
    const post: MaterialPost = {
      id: `ex-${Date.now()}`,
      name: state.name.trim(),
      category: state.category,
      quantity: state.quantity.trim(),
      description: state.description.trim(),
      location: state.location.trim(),
      pickup: state.pickup,
      image: state.image.trim() || pexelsImage(fallbackImages[state.category]),
      owner: 'you',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPosts((prev) => [post, ...prev]);
    showToast('Material posted');
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setRequests((prev) => prev.filter((r) => r.postId !== id));
    if (detailId === id) setDetailId(null);
    showToast('Listing and its requests removed');
  };

  const respondToRequest = (id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const sendRequest = (post: MaterialPost, message: string) => {
    const request: MaterialRequest = {
      id: `req-${Date.now()}`,
      postId: post.id,
      requester: 'You',
      message,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setRequests((prev) => [request, ...prev]);
  };

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
              <HandHeart size={14} /> Material Exchange
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              One person's discards are another's supplies.
            </h1>
            <p className="mt-3 text-sm text-sage/90 sm:text-base">
              Give away or swap materials you no longer need, and claim what
              others are offering near you.
            </p>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-forest-deep shadow-soft transition-all hover:gap-2.5"
          >
            <Plus size={16} /> Post a material
          </button>
        </div>
      </section>

      {inbox.length > 0 && (
        <RequestsInbox
          title="Requests for your materials"
          icon={<Inbox size={18} className="text-forest" />}
          items={inbox}
          posts={posts}
          showOwnerActions
          onRespond={respondToRequest}
        />
      )}

      {myOutgoing.length > 0 && (
        <section className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <Truck size={18} className="text-forest" /> Your sent requests
          </h2>
          <div className="mt-4 space-y-2">
            {myOutgoing.map((r) => {
              const post = posts.find((p) => p.id === r.postId);
              return (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-sage/40 pb-2 last:border-0 last:pb-0"
                >
                  <p className="text-sm text-muted">
                    <span className="font-semibold text-ink">{post?.name ?? 'Removed post'}</span> — "{r.message}"
                  </p>
                  <RequestBadge status={r.status} />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials, cities"
              aria-label="Search materials"
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
            {visible.map((p, i) => {
              const mine = p.owner === 'you';
              return (
                <article
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-sage/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <button
                    onClick={() => setDetailId(p.id)}
                    className="relative aspect-[16/10] overflow-hidden text-left"
                    aria-label={`View ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest backdrop-blur">
                      {categories.find((c) => c.id === p.category)?.shortName}
                    </span>
                    {mine && (
                      <span className="absolute right-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold text-forest-deep">
                        Your post
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{p.name}</h3>
                    <p className="mt-1 text-xs font-semibold text-forest">{p.quantity}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin size={12} /> {p.location}
                      <span aria-hidden>·</span>
                      {pickupLabels[p.pickup]}
                    </div>
                    <div className="mt-4 pt-2">
                      <button
                        onClick={() => setDetailId(p.id)}
                        className={`w-full rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                          mine
                            ? 'border border-sage bg-white text-ink hover:bg-sage/50'
                            : 'bg-forest text-white hover:bg-forest-deep'
                        }`}
                      >
                        {mine ? 'Manage listing' : 'Request material'}
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
            <p className="mt-5 font-display text-xl font-semibold text-ink">No materials found</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
              Try a different search, or post something you'd like to give away.
            </p>
          </div>
        )}
      </section>

      {detail && (
        <DetailOverlay
          post={detail}
          requests={detailRequests}
          hasRequested={requests.some((r) => r.postId === detail.id && r.requester === 'You')}
          onRequest={(msg) => {
            sendRequest(detail, msg);
            showToast('Request sent');
          }}
          onRespond={respondToRequest}
          onDelete={() => deletePost(detail.id)}
          onClose={() => setDetailId(null)}
        />
      )}

      {formOpen && (
        <PostFormOverlay
          onSubmit={(state) => {
            publishPost(state);
            setFormOpen(false);
          }}
          onClose={() => setFormOpen(false)}
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

function RequestBadge({ status }: { status: RequestStatus }) {
  if (status === 'accepted')
    return <span className="rounded-full bg-lime px-3 py-1 text-[11px] font-semibold text-forest-deep">Accepted</span>;
  if (status === 'declined')
    return <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold text-rose-600">Declined</span>;
  return <span className="rounded-full bg-sage/60 px-3 py-1 text-[11px] font-semibold text-muted">Awaiting reply</span>;
}

function RequestsInbox({
  title,
  icon,
  items,
  posts,
  showOwnerActions,
  onRespond,
}: {
  title: string;
  icon: React.ReactNode;
  items: MaterialRequest[];
  posts: MaterialPost[];
  showOwnerActions?: boolean;
  onRespond?: (id: string, status: RequestStatus) => void;
}) {
  return (
    <section className="rounded-4xl border border-lime bg-lime/15 p-6 shadow-soft sm:p-7">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
        {icon} {title}
      </h2>
      <div className="mt-4 space-y-3">
        {items.map((r) => {
          const post = posts.find((p) => p.id === r.postId);
          return (
            <div key={r.id} className="rounded-2xl border border-sage/60 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">
                  {r.requester} · <span className="font-normal text-muted">{post?.name ?? 'Removed post'}</span>
                </p>
                {showOwnerActions && r.status === 'pending' && onRespond ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRespond(r.id, 'accepted')}
                      className="rounded-full bg-forest px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-forest-deep"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onRespond(r.id, 'declined')}
                      className="rounded-full border border-sage bg-white px-3.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-ink"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <RequestBadge status={r.status} />
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">"{r.message}"</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DetailOverlay({
  post,
  requests,
  hasRequested,
  onRequest,
  onRespond,
  onDelete,
  onClose,
}: {
  post: MaterialPost;
  requests: MaterialRequest[];
  hasRequested: boolean;
  onRequest: (message: string) => void;
  onRespond: (id: string, status: RequestStatus) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const mine = post.owner === 'you';
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.name}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-4xl bg-warm shadow-lift sm:rounded-4xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={post.image} alt={post.name} className="aspect-[16/9] w-full object-cover" />
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
            {categories.find((c) => c.id === post.category)?.shortName}
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{post.name}</h3>
          <p className="mt-1 text-sm font-semibold text-forest">{post.quantity}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> {post.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck size={13} /> {pickupLabels[post.pickup]}
            </span>
          </div>

          {mine ? (
            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-ink">Requests ({requests.length})</h4>
              {requests.length === 0 ? (
                <p className="mt-3 rounded-2xl border border-dashed border-sage bg-white p-4 text-sm text-muted">
                  No requests yet. They'll appear here when someone is interested.
                </p>
              ) : (
                <div className="mt-3 space-y-3">
                  {requests.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-sage/60 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">{r.requester}</p>
                        {r.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => onRespond(r.id, 'accepted')}
                              className="rounded-full bg-forest px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-forest-deep"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => onRespond(r.id, 'declined')}
                              className="rounded-full border border-sage bg-white px-3.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-ink"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <RequestBadge status={r.status} />
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">"{r.message}"</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={onDelete}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100"
              >
                <Trash2 size={14} /> Delete listing
              </button>
            </div>
          ) : hasRequested ? (
            <div className="mt-6 rounded-2xl border border-lime bg-lime/20 p-4 text-sm font-semibold text-forest">
              You've already requested this material. The owner will respond soon.
            </div>
          ) : (
            <RequestForm onSubmit={onRequest} />
          )}
        </div>
      </div>
    </div>
  );
}

function RequestForm({ onSubmit }: { onSubmit: (message: string) => void }) {
  const [message, setMessage] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSubmit(message.trim());
      }}
      className="mt-6"
    >
      <label className="block">
        <span className="text-xs font-semibold text-ink">Request this material</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          maxLength={400}
          placeholder="Introduce yourself and suggest a pickup time"
          className="mt-1.5 w-full resize-none rounded-2xl border border-sage bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
        />
      </label>
      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
      >
        Send request
      </button>
      <p className="mt-2 text-center text-xs text-muted">
        Simulated flow for this demo — no real message is sent.
      </p>
    </form>
  );
}

function PostFormOverlay({
  onSubmit,
  onClose,
}: {
  onSubmit: (state: PostFormState) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PostFormState>(emptyPost);
  const pickupOptions: PickupPreference[] = ['pickup', 'dropoff', 'either'];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quantity.trim() || !form.location.trim()) return;
    onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/50 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Post a material"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-4xl bg-warm p-6 shadow-lift sm:rounded-4xl sm:p-7 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-ink">Post a material</h3>
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
            <span className="text-xs font-semibold text-ink">Material name</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              maxLength={80}
              placeholder="e.g. Empty glass jars"
              className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-ink">Quantity</span>
              <input
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
                maxLength={60}
                placeholder="e.g. 10 jars, ~2 kg"
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
            <span className="text-xs font-semibold text-ink">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              maxLength={400}
              placeholder="Condition, cleanliness, anything a requester should know"
              className="mt-1.5 w-full resize-none rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold text-ink">Location</span>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                maxLength={80}
                placeholder="e.g. Koramangala, Bengaluru"
                className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink">Pickup preference</span>
              <select
                value={form.pickup}
                onChange={(e) => setForm({ ...form, pickup: e.target.value as PickupPreference })}
                className="mt-1.5 w-full rounded-2xl border border-sage bg-white px-4 py-2.5 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
              >
                {pickupOptions.map((p) => (
                  <option key={p} value={p}>
                    {pickupLabels[p]}
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
              className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Post material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
