import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CollectionState {
  saved: string[];
  explored: string[];
  completed: string[];
  toggleSave: (id: string) => void;
  markExplored: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const CollectionContext = createContext<CollectionState | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useLocalStorage<string[]>('rewear:saved', []);
  const [explored, setExplored] = useLocalStorage<string[]>('rewear:explored', []);
  const [completed, setCompleted] = useLocalStorage<string[]>('rewear:completed', []);

  const toggleSave = useCallback(
    (id: string) =>
      setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setSaved],
  );

  const markExplored = useCallback(
    (id: string) => setExplored((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setExplored],
  );

  const toggleCompleted = useCallback(
    (id: string) =>
      setCompleted((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [setCompleted],
  );

  return (
    <CollectionContext.Provider
      value={{ saved, explored, completed, toggleSave, markExplored, toggleCompleted }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollection must be used within CollectionProvider');
  return ctx;
}
