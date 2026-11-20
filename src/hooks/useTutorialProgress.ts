import { useLocalStorage } from '@/hooks/useLocalStorage';

export type TutorialProgress = Record<string, number[]>;

export function useTutorialProgress() {
  const [progress, setProgress] = useLocalStorage<TutorialProgress>('rewear:tutorial-steps', {});

  const startProject = (id: string) =>
    setProgress((prev) => (id in prev ? prev : { ...prev, [id]: [] }));

  const toggleStep = (id: string, index: number) =>
    setProgress((prev) => {
      const done = prev[id] ?? [];
      const next = done.includes(index)
        ? done.filter((i) => i !== index)
        : [...done, index].sort((a, b) => a - b);
      return { ...prev, [id]: next };
    });

  return { progress, startProject, toggleStep };
}
