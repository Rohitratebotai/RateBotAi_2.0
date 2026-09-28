import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const sections = [
  { label: 'Philosophy', num: '01' },
  { label: 'Mission', num: '02' },
  { label: 'CTA', num: '03' },
];

export function ScrollProgress() {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const handler = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = y / total;
      setActive(Math.min(Math.floor(progress * sections.length), sections.length - 1));
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={root}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 lg:flex"
    >
      {sections.map((s, i) => (
        <div key={s.num} className="flex items-center gap-2">
          <span
            className={`text-2xs font-semibold transition-all duration-300 ${active === i ? 'text-navy-900 opacity-100 dark:text-white' : 'text-tertiary opacity-0'
              }`}
          >
            {s.label}
          </span>
          <span
            className={`rounded-full transition-all duration-300 ${active === i
                ? 'h-1.5 w-6 bg-navy-900 dark:bg-white'
                : 'h-1.5 w-1.5 bg-navy-300 dark:bg-navy-600'
              }`}
          />
        </div>
      ))}
    </div>
  );
}
