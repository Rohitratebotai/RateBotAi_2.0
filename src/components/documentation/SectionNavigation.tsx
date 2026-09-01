import { useEffect, useRef, useState } from 'react';
import { type DocumentationSection } from '@/data/documentationData';

type Props = {
  sections: DocumentationSection[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function SectionNavigation({ sections, activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const activeSection = sections.find((s) => s.id === activeId);

  return (
    <div ref={ref} className="relative">
      {/* Desktop horizontal nav */}
      <div className="hidden lg:block">
        <div className="surface flex items-center gap-1 overflow-x-auto rounded-full p-1.5 shadow-soft">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active
                    ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-900'
                    : 'text-navy-500 hover:text-navy-900 dark:text-navy-300 dark:hover:text-white'
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="surface flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold text-navy-900 shadow-soft dark:text-white"
          aria-expanded={open}
        >
          <span>{activeSection?.title ?? 'Sections'}</span>
          <span
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            {'\u2304'}
          </span>
        </button>
        {open && (
          <div className="surface absolute z-20 mt-2 w-full overflow-hidden rounded-2xl shadow-card">
            {sections.map((s) => {
              const active = s.id === activeId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelect(s.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-5 py-3 text-left text-sm font-medium transition-colors ${
                    active
                      ? 'bg-navy-50 text-navy-900 dark:bg-navy-700 dark:text-white'
                      : 'text-navy-500 hover:bg-canvas-subtle hover:text-navy-900 dark:text-navy-300 dark:hover:bg-navy-800 dark:hover:text-white'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      active ? 'bg-navy-900 dark:bg-white' : 'bg-navy-300 dark:bg-navy-600'
                    }`}
                  />
                  {s.title}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
