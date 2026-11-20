import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-warm disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-forest text-white hover:bg-forest-deep hover:shadow-lift active:scale-[0.97] px-5 py-3 text-sm',
  secondary:
    'bg-lime text-forest-deep hover:bg-lime-soft hover:shadow-card active:scale-[0.97] px-5 py-3 text-sm',
  ghost:
    'text-forest hover:bg-sage/60 active:scale-[0.97] px-4 py-2.5 text-sm',
  outline:
    'border border-forest/20 text-forest hover:border-forest hover:bg-sage/50 active:scale-[0.97] px-5 py-3 text-sm',
};

export function Button({
  variant = 'primary',
  children,
  icon,
  iconRight = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {!iconRight && icon}
      {children}
      {iconRight && (icon ?? <ArrowRight size={16} />)}
    </button>
  );
}
