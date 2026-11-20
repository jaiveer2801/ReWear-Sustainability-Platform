import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

const sizes = {
  sm: { box: 'h-8 w-8', icon: 16, text: 'text-lg' },
  md: { box: 'h-10 w-10', icon: 20, text: 'text-xl' },
  lg: { box: 'h-12 w-12', icon: 24, text: 'text-2xl' },
};

export function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
  const s = sizes[size];
  const wordColor = variant === 'light' ? 'text-white' : 'text-ink';
  const tagColor = variant === 'light' ? 'text-sage/80' : 'text-muted';

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className={`${s.box} relative grid place-items-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep shadow-soft`}
      >
        <Leaf size={s.icon} className="text-lime" strokeWidth={2.4} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-warm" />
      </div>
      <div className="leading-none">
        <span className={`font-display font-semibold tracking-tight ${s.text} ${wordColor}`}>
          ReWear
        </span>
        <p className={`text-[11px] font-medium ${tagColor} mt-0.5`}>
          Give it a second life
        </p>
      </div>
    </div>
  );
}
