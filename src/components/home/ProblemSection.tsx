import { motion } from 'framer-motion';
import { problems } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

export function ProblemSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="The Challenge"
          title="Hotel Operations Shouldn't Be Complicated."
          subtitle="Running a hotel today means managing a web of channels, rates, and systems that rarely talk to each other. The result is busywork, missed revenue, and risk."
        />

        <div ref={ref} className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-canvas-line bg-canvas-line dark:border-navy-700 dark:bg-navy-700 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative bg-canvas p-8 transition-colors hover:bg-canvas-subtle dark:bg-navy-900 dark:hover:bg-navy-800"
            >
              <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-navy-300 dark:text-navy-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900 dark:text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{p.description}</p>
              <span className="mt-6 block h-px w-0 bg-navy-400 transition-all duration-500 group-hover:w-full dark:bg-navy-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
