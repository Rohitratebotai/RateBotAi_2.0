import { motion } from 'framer-motion';
import { type DocumentationSection } from '@/data/documentationData';

type Props = {
  section: DocumentationSection;
  index: number;
};

export function DocumentationSection({ section, index }: Props) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 border-b border-canvas-line py-10 last:border-b-0 dark:border-navy-700 lg:scroll-mt-32"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-navy-300 dark:text-navy-500">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white">
          {section.title}
        </h2>
      </div>

      {section.description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary">
          {section.description}
        </p>
      )}

      {section.content && section.content.length > 0 && (
        <div className="mt-5 max-w-2xl space-y-4">
          {section.content.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-secondary">
              {para}
            </p>
          ))}
        </div>
      )}

      {section.image && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-canvas-line shadow-soft dark:border-navy-700">
          <img
            src={section.image}
            alt={`${section.title} screenshot`}
            className="w-full"
            loading="lazy"
          />
        </div>
      )}
    </motion.section>
  );
}
