import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function useGalleryLikes() {
  const [likes, setLikes] = useLocalStorage<string[]>('rewear:gallery-likes', []);

  const toggleLike = useCallback(
    (id: string) =>
      setLikes((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setLikes],
  );

  return { likes, toggleLike };
}
