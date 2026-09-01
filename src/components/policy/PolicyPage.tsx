import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PolicyBreadcrumb } from './PolicyBreadcrumb';
import { PolicyHeader } from './PolicyHeader';
import { PolicyTableOfContents } from './PolicyTableOfContents';
import { PolicySection } from './PolicySection';
import { type PolicyDocument } from '@/data/policyData';

const NAV_OFFSET = 96;

type Props = {
  data: PolicyDocument;
};

export function PolicyPage({ data }: Props) {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(data.sections[0]?.id ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const manualScrollRef = useRef(false);
  const basePathRef = useRef<string>('');

  // Derive the current base path (without hash) for URL updates
  useEffect(() => {
    basePathRef.current = window.location.pathname;
  }, []);

  // Reset active section when document changes
  useEffect(() => {
    setActiveId(data.sections[0]?.id ?? '');
  }, [data.title]);

  // Handle hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const el = sectionRefs.current[hash];
    if (el) {
      manualScrollRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(hash);
      window.setTimeout(() => {
        manualScrollRef.current = false;
      }, 800);
    }
  }, [data.title]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualScrollRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.getAttribute('id');
          if (id) setActiveId(id);
        }
      },
      { rootMargin: `-${NAV_OFFSET}px 0px -60% 0px`, threshold: [0, 0.25, 0.5, 1] },
    );

    data.sections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data.title]);

  const handleSelect = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      manualScrollRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      navigate(`${basePathRef.current}#${id}`, { replace: true });
      window.setTimeout(() => {
        manualScrollRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
      <Navbar />
      <main>
        {/* Breadcrumb + header */}
        <section className="pt-28 pb-8 lg:pt-36 lg:pb-10">
          <div className="container-px">
            <PolicyBreadcrumb documentTitle={data.title} />
            <div className="mt-8">
              <PolicyHeader document={data} />
            </div>
            {data.introduction && (
              <div className="mt-6 max-w-3xl rounded-2xl border border-canvas-line bg-canvas-subtle p-5 dark:border-navy-700 dark:bg-navy-800/50">
                <p className="text-[0.95rem] leading-[1.75] text-secondary">{data.introduction}</p>
              </div>
            )}
          </div>
        </section>

        {/* Content: TOC + document */}
        <section className="pb-20 lg:pb-28">
          <div className="container-px">
            <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:gap-16">
              {/* Sticky TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <PolicyTableOfContents
                    sections={data.sections}
                    activeId={activeId}
                    onSelect={handleSelect}
                  />
                </div>
              </aside>

              {/* Mobile TOC */}
              <div className="mb-8 lg:hidden">
                <PolicyTableOfContents
                  sections={data.sections}
                  activeId={activeId}
                  onSelect={handleSelect}
                />
              </div>

              {/* Document content */}
              <div className="max-w-3xl">
                {data.sections.map((section) => (
                  <div
                    key={section.id}
                    ref={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                  >
                    <PolicySection section={section} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
