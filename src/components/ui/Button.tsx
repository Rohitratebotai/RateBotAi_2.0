import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
};

const base =
  'group inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100 shadow-soft hover:shadow-card',
  secondary:
    'bg-transparent text-navy-900 border border-navy-200 hover:border-navy-400 hover:bg-navy-50 dark:text-white dark:border-navy-600 dark:hover:border-navy-400 dark:hover:bg-navy-800',
  ghost:
    'bg-transparent text-navy-700 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-200 dark:hover:text-white dark:hover:bg-navy-800',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  iconRight,
  ...rest
}: CommonProps & { href: string; external?: boolean }) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </>
  );

  if (rest.external) {
    return (
      <a href={rest.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link to={rest.href} className={cls}>
      {content}
    </Link>
  );
}

export function AnchorButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  iconRight,
  href,
}: CommonProps & { href: string }) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  return (
    <a href={href} className={cls}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </a>
  );
}
