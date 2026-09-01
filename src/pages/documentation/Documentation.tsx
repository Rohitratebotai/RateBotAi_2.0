import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DocumentationHero } from '@/components/documentation/DocumentationHero';
import { ModuleGrid } from '@/components/documentation/ModuleGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Documentation() {
  return (
    <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
      <Navbar />
      <main>
        <DocumentationHero />
        <section className="pb-20 lg:pb-28">
          <div className="container-px">
            <SectionHeading
              eyebrow="Explore Modules"
              title="Browse by module"
              subtitle="Select a module to view its documentation sections."
              align="left"
            />
            <div className="mt-12">
              <ModuleGrid />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
