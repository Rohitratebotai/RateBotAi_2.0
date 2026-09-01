import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Hero2 } from '@/components/hero/Hero2';

export function HeroPreview() {
  return (
    <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-canvas-line dark:border-navy-700">
          <div className="container-px py-6 text-center">
            <p className="eyebrow text-navy-400 dark:text-navy-300">
              Experimental Hero Design Below
            </p>
          </div>
        </div>
        <Hero2 />
      </main>
      <Footer />
    </div>
  );
}
