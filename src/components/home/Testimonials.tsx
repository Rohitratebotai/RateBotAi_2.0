import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        <SectionHeading eyebrow="Customer Stories" title="Trusted by hospitality teams." />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="surface relative rounded-4xl p-8 shadow-card sm:p-12">
            <Quote className="absolute right-8 top-8 text-navy-100 dark:text-navy-700" size={48} />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl font-medium leading-relaxed text-navy-900 dark:text-white sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-sm font-bold text-navy-900 dark:text-white">{t.author}</p>
                  <p className="text-sm text-tertiary">{t.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-navy-900 dark:bg-white' : 'w-2 bg-navy-200 dark:bg-navy-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
