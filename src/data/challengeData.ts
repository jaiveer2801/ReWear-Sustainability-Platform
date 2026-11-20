import { Award, Flame, Trophy } from 'lucide-react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  steps: string[];
  reward: string;
  badgeIcon: typeof Award;
  week: string;
}

export const challenges: Challenge[] = [
  {
    id: 'closet-revival',
    title: 'Closet Revival',
    description:
      'Give your forgotten clothes a second life instead of buying new. Pull out what you no longer wear and turn it into something useful.',
    goal: 'Complete 4 clothing reuse actions this week',
    steps: [
      'Pull out 5 garments you have not worn in a year',
      'Turn one old t-shirt into a tote or cleaning rag',
      'Repair or restyle one garment instead of discarding it',
      'Donate or swap the rest with friends or a local drive',
    ],
    reward: 'Closet Revival badge',
    badgeIcon: Flame,
    week: 'Week 1',
  },
  {
    id: 'plastic-free-week',
    title: 'Plastic-Free Week',
    description:
      'Refuse, reduce and replace single-use plastic for seven days. Small daily swaps add up to a big dent in your plastic footprint.',
    goal: 'Make 5 plastic swaps this week',
    steps: [
      'Carry a reusable bottle and shopping bag all week',
      'Refuse one plastic straw, cutlery set or bag',
      'Buy one pantry item in bulk or paper packaging',
      'Cook one meal with zero plastic-packaged ingredients',
      'Repurpose a plastic bottle into a planter or organiser',
    ],
    reward: 'Plastic-Free Champion badge',
    badgeIcon: Trophy,
    week: 'Week 2',
  },
  {
    id: 'seven-day-reuse',
    title: '7-Day Reuse Challenge',
    description:
      'One small reuse action every day for a week. Build the habit of seeing waste as a resource, one day at a time.',
    goal: 'Reuse something every day for 7 days',
    steps: [
      'Day 1-2: Reuse a jar or box for storage',
      'Day 3-4: Turn scraps into a craft or garden project',
      'Day 5-6: Mend, repair or repurpose something broken',
      'Day 7: Share or gift one upcycled creation',
    ],
    reward: '7-Day Streak badge',
    badgeIcon: Award,
    week: 'Week 3',
  },
];
