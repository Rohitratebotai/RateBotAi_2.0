import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DocumentationBreadcrumb } from '@/components/documentation/DocumentationBreadcrumb';
import { ModuleHeader } from '@/components/documentation/ModuleHeader';
import { SectionNavigation } from '@/components/documentation/SectionNavigation';
import { DocumentationSection } from '@/components/documentation/DocumentationSection';
import { getModuleBySlug } from '@/data/documentationData';

const NAV_OFFSET = 96;

export function ModuleDocumentation() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const module = slug ? getModuleBySlug(slug) : undefined;

  const [activeId, setActiveId] = useState<string>(module?.sections[0]?.id ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const manualScrollRef = useRef(false);

  // Reset active section when module changes
  useEffect(() => {
    if (module) {
      setActiveId(module.sections[0]?.id ?? '');
    }
  }, [module?.id]);

  // Handle hash on initial load: scroll to the section in the URL
  useEffect(() => {
    if (!module) return;
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
  }, [module?.id]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    if (!module) return;
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

    module.sections.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [module?.id]);

  if (!module) {
    return (
      <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
        <Navbar />
        <main className="container-px flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Module not found</h1>
          <p className="mt-3 text-secondary">The documentation module you&rsquo;re looking for doesn&rsquo;t exist.</p>
          <button
            onClick={() => navigate('/documentation')}
            className="mt-6 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100"
          >
            Back to Documentation
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSelect = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      manualScrollRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      navigate(`/documentation/${module.slug}#${id}`, { replace: true });
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
            <DocumentationBreadcrumb moduleTitle={module.title} />
            <div className="mt-8">
              <ModuleHeader module={module} />
            </div>
          </div>
        </section>

        {/* Sticky section navigation */}
        <div className="sticky top-16 z-30 border-y border-canvas-line bg-canvas/80 backdrop-blur-xl dark:border-navy-700 dark:bg-navy-900/80 lg:top-20">
          <div className="container-px py-4">
            <SectionNavigation
              sections={module.sections}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* Documentation content */}
        <section className="py-10 lg:py-14">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              {module.sections.map((section, i) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                >
                  <DocumentationSection section={section} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
