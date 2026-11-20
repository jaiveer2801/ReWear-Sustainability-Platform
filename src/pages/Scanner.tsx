import { useMemo, useRef, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  IndianRupee,
  ListChecks,
  ScanSearch,
  Clock,
  Info,
  Wrench,
} from 'lucide-react';
import { categories, ideas, type CategoryId, type UpcycleIdea } from '@/data/content';
import { useCollection } from '@/components/CollectionContext';
import { inr, rupeeSymbol } from '@/lib/format';
import { difficultyStyles } from '@/components/studio/difficultyStyles';

interface ScanResult {
  categoryId: CategoryId;
  matches: UpcycleIdea[];
}

export function Scanner() {
  const { saved, toggleSave } = useCollection();
  const [preview, setPreview] = useState<string | null>(null);
  const [pickedCategory, setPickedCategory] = useState<CategoryId | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Demo classification: image traits (aspect ratio, size) map to a category.
  // No AI model is involved — this is a deterministic stand-in.
  const demoClassify = (dataUrl: string, fileName: string): CategoryId => {
    const name = fileName.toLowerCase();
    const byName: Array<[string, CategoryId]> = [
      ['shirt', 'clothing'], ['jean', 'clothing'], ['fabric', 'clothing'], ['cloth', 'clothing'],
      ['bottle', 'plastic'], ['plastic', 'plastic'],
      ['box', 'paper'], ['card', 'paper'], ['paper', 'paper'],
      ['jar', 'glass'], ['glass', 'glass'], ['bottle-glass', 'glass'],
      ['wood', 'wood'], ['pallet', 'wood'],
      ['phone', 'electronics'], ['cable', 'electronics'], ['electronic', 'electronics'],
      ['can', 'metal'], ['tin', 'metal'], ['metal', 'metal'],
    ];
    for (const [token, cat] of byName) {
      if (name.includes(token)) return cat;
    }
    const hash = [...dataUrl].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 997, 7);
    const order: CategoryId[] = ['clothing', 'plastic', 'paper', 'glass', 'wood', 'metal'];
    return order[hash % order.length];
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(typeof reader.result === 'string' ? reader.result : null);
      setResult(null);
      setPickedCategory(null);
    };
    reader.readAsDataURL(file);
  };

  const runScan = () => {
    if (!preview) return;
    setScanning(true);
    setResult(null);
    // Brief pause so the scan feels responsive before showing results.
    window.setTimeout(() => {
      const file = fileRef.current?.files?.[0];
      const categoryId =
        pickedCategory ??
        (file ? demoClassify(preview, file.name) : demoClassify(preview, 'image.png'));
      setResult({
        categoryId,
        matches: ideas
          .filter((i) => i.category === categoryId)
          .sort((a, b) => a.budgetInr - b.budgetInr),
      });
      setScanning(false);
    }, 900);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setPickedCategory(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const resultLabel = result ? categories.find((c) => c.id === result.categoryId) : null;

  const suggestionText = useMemo(() => {
    if (!result) return '';
    return `Looks like ${resultLabel?.name.toLowerCase()} — here are ideas sorted by cost.`;
  }, [result, resultLabel]);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-forest-deep via-forest to-forest p-7 shadow-card sm:p-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-lime backdrop-blur">
            <ScanSearch size={14} /> Smart Material Scanner
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Snap it, scan it, reuse it.
          </h1>
          <p className="mt-3 text-sm text-sage/90 sm:text-base">
            Upload a photo of something you'd normally throw away, and get
            upcycling ideas matched to it.
          </p>
        </div>
      </section>

      <div className="rounded-3xl border border-lime bg-lime/15 p-4 text-sm text-ink">
        <p className="flex items-start gap-2">
          <Info size={16} className="mt-0.5 shrink-0 text-forest" />
          <span>
            This is a <strong>simulated demo scanner</strong>, not an AI image classifier. It suggests a
            material based on your file name and simple rules — then matches real reuse ideas from the
            ReWear library.
          </span>
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          <h2 className="font-display text-lg font-semibold text-ink">1. Add a photo</h2>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {preview ? (
            <div className="mt-4">
              <img
                src={preview}
                alt="Uploaded material preview"
                className="aspect-[16/10] w-full rounded-2xl border border-sage object-cover"
              />
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="rounded-full border border-sage bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:bg-sage/50"
                >
                  Replace photo
                </button>
                <button
                  onClick={reset}
                  className="rounded-full border border-sage bg-white px-4 py-2 text-xs font-semibold text-muted transition hover:text-ink"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-sage bg-warm px-6 py-12 text-center transition-colors hover:border-forest hover:bg-lime/10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sage/60 text-forest">
                <ImagePlus size={24} />
              </div>
              <span className="text-sm font-semibold text-ink">Click to upload an image</span>
              <span className="text-xs text-muted">JPG, PNG or WebP — stays on your device</span>
            </button>
          )}

          <h2 className="mt-7 font-display text-lg font-semibold text-ink">2. Confirm the material (optional)</h2>
          <p className="mt-1 text-xs text-muted">
            The demo scan guesses from the file name. Pick a material to override it.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setPickedCategory(pickedCategory === c.id ? null : c.id)}
                aria-pressed={pickedCategory === c.id}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                  pickedCategory === c.id
                    ? 'bg-forest text-white shadow-soft'
                    : 'border border-sage bg-white text-ink hover:bg-sage/50'
                }`}
              >
                {c.shortName}
              </button>
            ))}
          </div>

          <button
            onClick={runScan}
            disabled={!preview || scanning}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {scanning ? (
              <>
                <Camera size={16} className="animate-pulse" /> Scanning…
              </>
            ) : (
              <>
                <ScanSearch size={16} /> Scan material
              </>
            )}
          </button>
        </div>

        <div className="rounded-4xl border border-sage/60 bg-white p-6 shadow-soft sm:p-7">
          {!result && !scanning && (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-sage/60 text-forest">
                <ScanSearch size={26} />
              </div>
              <p className="mt-5 font-display text-xl font-semibold text-ink">No scan yet</p>
              <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted">
                Upload a photo and press "Scan material" to see matching reuse ideas.
              </p>
            </div>
          )}
          {scanning && (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="grid h-16 w-16 animate-pulse place-items-center rounded-3xl bg-lime text-forest-deep">
                <Camera size={26} />
              </div>
              <p className="mt-5 font-display text-xl font-semibold text-ink">Analysing your material…</p>
              <p className="mt-1.5 text-sm text-muted">Simulated classification in progress</p>
            </div>
          )}
          {result && !scanning && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Scan result</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Detected: {resultLabel?.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{suggestionText}</p>

              <div className="mt-5 space-y-4">
                {result.matches.map((idea, i) => {
                  const isSaved = saved.includes(idea.id);
                  const diff = difficultyStyles[idea.difficulty];
                  return (
                    <article
                      key={idea.id}
                      className="flex gap-4 rounded-3xl border border-sage/60 bg-warm p-4 animate-fade-up"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <img
                        src={idea.image}
                        alt={idea.to}
                        loading="lazy"
                        className="hidden h-24 w-24 shrink-0 rounded-2xl object-cover sm:block"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base font-semibold text-ink">{idea.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${diff}`}>
                            {idea.difficulty}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                          <span className="inline-flex items-center gap-1">
                            <IndianRupee size={12} /> {rupeeSymbol}
                            {inr(idea.budgetInr)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} /> {idea.timeMinutes} min
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Wrench size={12} /> {idea.materials.length} materials
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{idea.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => toggleSave(idea.id)}
                            aria-pressed={isSaved}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                              isSaved
                                ? 'bg-forest text-white'
                                : 'border border-sage bg-white text-ink hover:bg-sage/50'
                            }`}
                          >
                            {isSaved ? <CheckCircle2 size={13} /> : <ListChecks size={13} />}
                            {isSaved ? 'Saved to collection' : 'Save idea'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
                {result.matches.length === 0 && (
                  <p className="rounded-2xl border border-dashed border-sage bg-warm p-4 text-sm text-muted">
                    No ideas in the library for this material yet — try another scan.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
