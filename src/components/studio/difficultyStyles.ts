import type { Difficulty } from '@/data/content';

export const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-lime/30 text-forest',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};
