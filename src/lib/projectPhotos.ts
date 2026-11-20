import { supabase } from '@/lib/supabase';

export interface ProjectPhoto {
  id: string;
  ideaId: string;
  url: string;
  caption: string | null;
  createdAt: string;
}

interface ProjectPhotoRow {
  id: string;
  idea_id: string;
  storage_path: string;
  caption: string | null;
  created_at: string;
}

const BUCKET = 'project-photos';
const MAX_BYTES = 5 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const SELECT_COLUMNS = 'id, idea_id, storage_path, caption, created_at';
const MAX_CAPTION = 280;

export function validatePhotoFile(file: File): string | null {
  if (!(file.type in EXTENSIONS)) return 'Please choose a JPEG, PNG, WebP or GIF image.';
  if (file.size > MAX_BYTES) return 'Photos must be 5 MB or smaller.';
  return null;
}

function requireClient() {
  if (!supabase) throw new Error('Photo sharing is not available right now.');
  return supabase;
}

function toProjectPhoto(row: ProjectPhotoRow): ProjectPhoto {
  const { data } = requireClient().storage.from(BUCKET).getPublicUrl(row.storage_path);
  return {
    id: row.id,
    ideaId: row.idea_id,
    url: data.publicUrl,
    caption: row.caption,
    createdAt: row.created_at,
  };
}

function isProjectPhotoRow(value: unknown): value is ProjectPhotoRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.idea_id === 'string' &&
    typeof row.storage_path === 'string' &&
    typeof row.created_at === 'string' &&
    (row.caption === null || typeof row.caption === 'string')
  );
}

export async function listProjectPhotos(ideaId: string): Promise<ProjectPhoto[]> {
  const { data, error } = await requireClient()
    .from('project_photos')
    .select(SELECT_COLUMNS)
    .eq('idea_id', ideaId)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Could not load shared photos. Please try again.');
  if (!Array.isArray(data) || !data.every(isProjectPhotoRow)) {
    throw new Error('Could not load shared photos. Please try again.');
  }
  return data.map(toProjectPhoto);
}

export async function uploadProjectPhoto(
  ideaId: string,
  file: File,
  caption: string,
): Promise<ProjectPhoto> {
  const validationError = validatePhotoFile(file);
  if (validationError) throw new Error(validationError);

  const client = requireClient();
  const path = `${ideaId}/${crypto.randomUUID()}.${EXTENSIONS[file.type]}`;

  const upload = await client.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: '3600' });
  if (upload.error) throw new Error('The photo could not be uploaded. Please try again.');

  const trimmedCaption = caption.trim().slice(0, MAX_CAPTION);
  const { data, error } = await client
    .from('project_photos')
    .insert({ idea_id: ideaId, storage_path: path, caption: trimmedCaption || null })
    .select(SELECT_COLUMNS)
    .single();

  if (error || !isProjectPhotoRow(data)) {
    throw new Error('The photo uploaded but could not be shared. Please try again.');
  }
  return toProjectPhoto(data);
}
