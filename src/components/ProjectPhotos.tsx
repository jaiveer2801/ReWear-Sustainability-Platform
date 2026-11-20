import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Camera, ImagePlus, Loader2, X } from 'lucide-react';
import { listProjectPhotos, uploadProjectPhoto, validatePhotoFile, type ProjectPhoto } from '@/lib/projectPhotos';
import { Button } from './Button';

interface ProjectPhotosProps {
  ideaId: string;
  ideaTitle: string;
}

type LoadState = 'loading' | 'ready' | 'error';

export function ProjectPhotos({ ideaId, ideaTitle }: ProjectPhotosProps) {
  const [photos, setPhotos] = useState<ProjectPhoto[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoadState('loading');
    listProjectPhotos(ideaId)
      .then((rows) => {
        if (!active) return;
        setPhotos(rows);
        setLoadState('ready');
      })
      .catch(() => {
        if (active) setLoadState('error');
      });
    return () => {
      active = false;
    };
  }, [ideaId, reloadKey]);

  const handleUploaded = (photo: ProjectPhoto) => {
    setPhotos((current) => [photo, ...current]);
    setLoadState('ready');
  };

  return (
    <section className="mt-8 border-t border-sage/60 pt-6">
      <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
        <Camera size={17} className="text-forest" /> Made it? Share your photo
      </h3>
      <p className="mt-1 text-sm text-muted">
        Show the finished {ideaTitle.toLowerCase()} to the community.
      </p>

      <PhotoUploadForm ideaId={ideaId} onUploaded={handleUploaded} />

      <div className="mt-6">
        {loadState === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin text-forest" /> Loading shared photos...
          </div>
        )}

        {loadState === 'error' && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <span>We could not load shared photos.</span>
            <Button variant="outline" onClick={() => setReloadKey((k) => k + 1)}>
              Try again
            </Button>
          </div>
        )}

        {loadState === 'ready' && photos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-sage bg-white/60 p-6 text-center text-sm text-muted">
            No photos yet. Be the first to share your finished project.
          </div>
        )}

        {loadState === 'ready' && photos.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.id} className="overflow-hidden rounded-2xl bg-white shadow-soft animate-fade-up">
                <img
                  src={photo.url}
                  alt={photo.caption ?? `Shared photo of ${ideaTitle}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                {photo.caption && (
                  <p className="line-clamp-2 px-3 py-2 text-xs leading-relaxed text-muted">{photo.caption}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

interface PhotoUploadFormProps {
  ideaId: string;
  onUploaded: (photo: ProjectPhoto) => void;
}

function PhotoUploadForm({ ideaId, onUploaded }: PhotoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const resetForm = () => {
    setFile(null);
    setCaption('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0] ?? null;
    setSuccess(null);
    if (!next) {
      setFile(null);
      return;
    }
    const validationError = validatePhotoFile(next);
    if (validationError) {
      setError(validationError);
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setError(null);
    setFile(next);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || submitting) return;
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const photo = await uploadProjectPhoto(ideaId, file, caption);
      onUploaded(photo);
      resetForm();
      setSuccess('Thanks! Your photo is now shared with the community.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-2xl bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <label className="group relative grid aspect-square w-full shrink-0 cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed border-sage bg-warm transition-colors hover:border-forest sm:w-32">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected project preview" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-1.5 text-xs font-medium text-muted transition-colors group-hover:text-forest">
              <ImagePlus size={22} /> Choose photo
            </span>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={handleFileChange}
            disabled={submitting}
          />
        </label>

        <div className="flex flex-1 flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink">Caption (optional)</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 280))}
              rows={2}
              placeholder="What did you make? Any tips for others?"
              className="resize-none rounded-xl border border-sage bg-warm px-3 py-2 text-sm text-ink placeholder:text-muted/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime/60"
            />
            <span className="self-end text-[11px] text-muted">{caption.length}/280</span>
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={!file || submitting}
              className="disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
              icon={submitting ? <Loader2 size={15} className="animate-spin" /> : undefined}
            >
              {submitting ? 'Sharing...' : 'Share photo'}
            </Button>
            {file && !submitting && (
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setError(null);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-forest"
              >
                <X size={13} /> Remove
              </button>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
              {error}
            </p>
          )}
          {success && (
            <p role="status" className="rounded-xl bg-sage/70 px-3 py-2 text-xs font-medium text-forest">
              {success}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
