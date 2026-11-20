import { useMemo, useRef, useState } from 'react';
import {
  Award,
  Bookmark,
  Camera,
  CheckCircle2,
  Flame,
  Leaf,
  MapPin,
  Pencil,
  ScanSearch,
  Store,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react';
import { useCollection } from '@/components/CollectionContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import { tutorials } from '@/data/tutorials';
import { ideas } from '@/data/content';
import { challenges as challengeList } from '@/data/challengeData';
import type { PageId } from '@/components/navigation';

interface ProfileProps {
  onNavigate: (id: PageId) => void;
  onSelectTutorial: (id: string | null) => void;
}

interface ProfileMeta {
  username: string;
  bio: string;
  location: string;
  avatar: string | null;
}

const defaultProfile: ProfileMeta = {
  username: 'GreenMaker',
  bio: 'Turning everyday waste into useful things, one project at a time.',
  location: 'Bengaluru, India',
  avatar: null,
};

export function Profile({ onNavigate, onSelectTutorial }: ProfileProps) {
  const { saved, completed } = useCollection();
  const { progress } = useTutorialProgress();
  const [meta, setMeta] = useLocalStorage<ProfileMeta>('rewear:profile', defaultProfile);
  const [challengeState] = useLocalStorage<Record<string, { joined: boolean; completedSteps: string[]; badgeEarned: boolean }>>('rewear:challenges', {});
  const [listings, setMarketListings] = useLocalStorage<Array<{ id: string; title: string; price: number; image: string }>>('rewear:market-listings', []);
  const [posts, setExchangePosts] = useLocalStorage<Array<{ id: string; name: string; owner: string }>>('rewear:exchange-posts', []);
  const [editing, setEditing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => {
    const finishedTutorials = tutorials.filter((t) => completed.includes(t.id));
    const itemsReused =
      finishedTutorials.reduce((sum, t) => sum + t.itemsReused, 0) +
      Math.max(completed.length - finishedTutorials.length, 0);
    const co2SavedKg = Math.round(completed.length * 2.5 * 10) / 10;
    const wasteDivertedKg = Math.round(completed.length * 1.2 * 10) / 10;
    const stepsTicked = Object.values(progress).reduce((sum, steps) => sum + steps.length, 0);
    const badges = Object.values(challengeState).filter((e) => e.badgeEarned).length;
    const challengesJoined = Object.values(challengeState).filter((e) => e.joined).length;
    const myMarketListings = listings.length;
    const myExchangePosts = posts.filter((p) => p.owner === 'you').length;
    return {
      projectsCompleted: completed.length,
      itemsReused,
      co2SavedKg,
      wasteDivertedKg,
      stepsTicked,
      badges,
      challengesJoined,
      myMarketListings,
      myExchangePosts,
      finishedTutorials,
    };
  }, [completed, progress, challengeState, listings, posts]);

  const earnedBadges = useMemo(() => {
    const list: { label: string; detail: string }[] = [];
    for (const c of challengeList) {
      if (challengeState[c.id]?.badgeEarned) list.push({ label: c.title, detail: c.reward });
    }
    if (stats.projectsCompleted >= 5) list.push({ label: 'Serial Maker', detail: '5 projects completed' });
    if (stats.projectsCompleted >= 1) list.push({ label: 'Halfway There', detail: 'First project completed' });
    return list;
  }, [challengeState, stats.projectsCompleted]);

  const savedIdeas = ideas.filter((i) => saved.includes(i.id));

  const handleAvatar = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setMeta({ ...meta, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeExchangePost = (id: string) => {
    setExchangePosts((prev) => prev.filter((p) => p.id !== id));
  };

  const removeMarketListing = (id: string) => {
    setMarketListings((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header card */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            {meta.avatar ? (
              <img
                src={meta.avatar}
                alt="Your avatar"
                className="h-24 w-24 rounded-full object-cover ring-4 ring-white/25"
              />
            ) : (
              <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-lime to-forest text-forest-deep ring-4 ring-white/25">
                <User size={40} />
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-white text-forest shadow-soft transition hover:bg-lime"
              aria-label="Change profile photo"
            >
              <Camera size={14} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleAvatar(f);
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="space-y-3">
                <input
                  value={meta.username}
                  onChange={(e) => setMeta({ ...meta, username: e.target.value })}
                  maxLength={40}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-display text-lg font-semibold text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="Username"
                />
                <textarea
                  value={meta.bio}
                  onChange={(e) => setMeta({ ...meta, bio: e.target.value })}
                  rows={2}
                  maxLength={160}
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="Short bio"
                />
                <input
                  value={meta.location}
                  onChange={(e) => setMeta({ ...meta, location: e.target.value })}
                  maxLength={60}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="Location"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-xs font-semibold text-forest-deep transition hover:gap-2"
                  >
                    <CheckCircle2 size={13} /> Done
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="font-display text-3xl font-semibold text-white">{meta.username}</h1>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-sage/80">
                  <MapPin size={13} /> {meta.location}
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-sage/90">{meta.bio}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur transition hover:bg-white/20"
                >
                  <Pencil size={12} /> Edit profile
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CheckCircle2, label: 'Projects completed', value: String(stats.projectsCompleted), page: 'studio' as const },
          { icon: Bookmark, label: 'Ideas saved', value: String(saved.length), page: 'collection' as const },
          { icon: Award, label: 'Challenge badges', value: String(stats.badges), page: 'challenges' as const },
          { icon: Leaf, label: 'Waste diverted (est.)', value: `${stats.wasteDivertedKg} kg`, page: 'impact' as const },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() => onNavigate(s.page)}
              className="group relative overflow-hidden rounded-3xl border border-sage/60 bg-white p-6 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-lime/20 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep text-lime shadow-soft">
                  <Icon size={20} />
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-ink">{s.value}</p>
                <p className="text-sm font-semibold text-ink">{s.label}</p>
              </div>
            </button>
          );
        })}
      </section>

      {/* Sustainability detail + badges */}
      <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <TrendingUp size={18} className="text-forest" /> Sustainability statistics
          </h2>
          <p className="mt-1 text-xs text-muted">Estimates based on average material weights.</p>
          <dl className="mt-4 space-y-3">
            {[
              { l: 'Items reused (est.)', v: String(stats.itemsReused) },
              { l: 'CO2 avoided (est.)', v: `${stats.co2SavedKg} kg` },
              { l: 'Waste diverted (est.)', v: `${stats.wasteDivertedKg} kg` },
              { l: 'Steps ticked across tutorials', v: String(stats.stepsTicked) },
              { l: 'Challenges joined', v: String(stats.challengesJoined) },
              { l: 'Marketplace listings', v: String(stats.myMarketListings) },
              { l: 'Exchange posts', v: String(stats.myExchangePosts) },
            ].map((row) => (
              <div key={row.l} className="flex items-center justify-between border-b border-sage/40 pb-3 last:border-0 last:pb-0">
                <dt className="text-sm text-muted">{row.l}</dt>
                <dd className="font-display text-lg font-bold text-forest">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <Award size={18} className="text-forest" /> Achievement badges
          </h2>
          {earnedBadges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {earnedBadges.map((b) => (
                <span
                  key={b.label}
                  title={b.detail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-lime bg-lime/20 px-3.5 py-2 text-xs font-semibold text-forest"
                >
                  <Award size={13} /> {b.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-sage bg-warm p-4 text-sm text-muted">
              No badges yet. Join a challenge to start earning them.
            </p>
          )}
          <button
            onClick={() => onNavigate('challenges')}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-forest-deep"
          >
            <Flame size={14} /> Go to challenges
          </button>
        </div>
      </section>

      {/* Completed projects */}
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <CheckCircle2 size={18} className="text-forest" /> Completed projects
        </h2>
        {stats.finishedTutorials.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.finishedTutorials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => onSelectTutorial(t.id)}
                className="group overflow-hidden rounded-3xl border border-sage/60 bg-white text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img src={t.image} alt={t.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold text-ink">{t.title}</p>
                  <p className="mt-1 text-xs text-muted">{t.category}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-sage bg-white/60 p-8 text-center">
            <p className="font-display text-lg font-semibold text-ink">Nothing completed yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
              Finish a tutorial in the DIY Studio and it will show up here.
            </p>
            <button
              onClick={() => onNavigate('studio')}
              className="mt-4 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Open DIY Studio
            </button>
          </div>
        )}
      </section>

      {/* Saved ideas */}
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <Bookmark size={18} className="text-forest" /> Saved ideas
        </h2>
        {savedIdeas.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {savedIdeas.map((idea, i) => (
              <div
                key={idea.id}
                className="overflow-hidden rounded-3xl border border-sage/60 bg-white shadow-soft animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img src={idea.image} alt={idea.to} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold text-ink">{idea.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {idea.difficulty} · {idea.timeMinutes} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-sage bg-white/60 p-8 text-center">
            <p className="font-display text-lg font-semibold text-ink">No saved ideas yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
              Save ideas from Explore, Discover or the Scanner to build your shortlist.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className="mt-4 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Browse ideas
            </button>
          </div>
        )}
      </section>

      {/* Marketplace + exchange activity */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <Store size={18} className="text-forest" /> Marketplace listings
          </h2>
          {listings.length > 0 ? (
            <div className="mt-4 space-y-3">
              {listings.slice(0, 4).map((l) => (
                <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-sage/60 bg-warm p-3">
                  <img src={l.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{l.title}</p>
                  <button
                    onClick={() => removeMarketListing(l.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-600"
                    aria-label={`Delete listing ${l.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-sage bg-warm p-4 text-sm text-muted">
              No listings yet. Create one from the Marketplace.
            </p>
          )}
          <button
            onClick={() => onNavigate('marketplace')}
            className="mt-4 text-sm font-semibold text-forest transition-colors hover:text-forest-deep"
          >
            Open Marketplace →
          </button>
        </div>

        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <ScanSearch size={18} className="text-forest" /> Exchange posts
          </h2>
          {posts.filter((p) => p.owner === 'you').length > 0 ? (
            <div className="mt-4 space-y-3">
              {posts
                .filter((p) => p.owner === 'you')
                .map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-sage/60 bg-warm p-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sage/60 text-forest">
                      <Leaf size={16} />
                    </div>
                    <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{p.name}</p>
                    <button
                      onClick={() => removeExchangePost(p.id)}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-rose-50 hover:text-rose-600"
                      aria-label={`Delete post ${p.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-sage bg-warm p-4 text-sm text-muted">
              No exchange posts yet. Share a material from the Exchange page.
            </p>
          )}
          <button
            onClick={() => onNavigate('exchange')}
            className="mt-4 text-sm font-semibold text-forest transition-colors hover:text-forest-deep"
          >
            Open Exchange →
          </button>
        </div>
      </section>
    </div>
  );
}
