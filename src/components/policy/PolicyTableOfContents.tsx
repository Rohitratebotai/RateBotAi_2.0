import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type PolicySection } from '@/data/policyData';

type Props = {
  sections: PolicySection[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function PolicyTableOfContents({ sections, activeId, onSelect }: Props) {
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
    <div ref={ref}>
      <p className="mb-4 text-2xs font-semibold uppercase tracking-[0.18em] text-tertiary">
        Table of Contents
      </p>

      {/* Desktop sticky nav */}
      <nav className="hidden lg:block">
        <ul className="space-y-1">
          {sections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => onSelect(s.id)}
                  className={`relative flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-2 text-left text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-canvas-subtle text-navy-900 dark:bg-navy-800 dark:text-white'
                      : 'text-navy-500 hover:bg-canvas-subtle/60 hover:text-navy-900 dark:text-navy-300 dark:hover:bg-navy-800/60 dark:hover:text-white'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                      active ? 'bg-navy-900 dark:bg-white' : 'bg-navy-300 dark:bg-navy-600'
                    }`}
                  />
                  <span className="leading-snug">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="surface flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold text-navy-900 shadow-soft dark:text-white"
          aria-expanded={open}
        >
          <span>{activeSection?.title ?? 'On this page'}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <nav className="surface mt-2 overflow-hidden rounded-2xl shadow-soft">
            <ul>
              {sections.map((s) => {
                const active = s.id === activeId;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        onSelect(s.id);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-5 py-3 text-left text-sm font-medium transition-colors ${
                        active
                          ? 'bg-canvas-subtle text-navy-900 dark:bg-navy-800 dark:text-white'
                          : 'text-navy-500 hover:bg-canvas-subtle hover:text-navy-900 dark:text-navy-300 dark:hover:bg-navy-800 dark:hover:text-white'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          active ? 'bg-navy-900 dark:bg-white' : 'bg-navy-300 dark:bg-navy-600'
                        }`}
                      />
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
