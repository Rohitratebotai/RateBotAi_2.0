import { motion } from 'framer-motion';
import { ecosystem } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

function Node({ label, sublabel, delay }: { label: string; sublabel: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="surface flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-center shadow-soft"
    >
      <span className="text-sm font-bold text-navy-900 dark:text-white">{label}</span>
      <span className="mt-0.5 text-2xs uppercase tracking-wider text-tertiary">{sublabel}</span>
    </motion.div>
  );
}

export function PlatformOverview() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const nodes = ecosystem.nodes;

  return (
    <section id="platform" className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="The Platform"
          title={ecosystem.title}
          subtitle={ecosystem.subtitle}
        />

        <div ref={ref} className="mx-auto mt-16 max-w-4xl">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-navy-900 px-8 py-4 text-center shadow-card dark:bg-white"
            >
              <span className="text-base font-extrabold tracking-tight text-white dark:text-navy-900">RATEBOTAI</span>
            </motion.div>

            <svg className="my-2 h-12 w-px" viewBox="0 0 2 48" preserveAspectRatio="none">
              <motion.line
                x1="1" y1="0" x2="1" y2="48"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-navy-300 dark:text-navy-600"
                initial={inView ? { pathLength: 0 } : {}}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6 }}
              />
            </svg>

            <div className="grid w-full gap-4 sm:grid-cols-3">
              <Node label={nodes[0].label} sublabel={nodes[0].sublabel} delay={0.2} />
              <Node label={nodes[1].label} sublabel={nodes[1].sublabel} delay={0.3} />
              <Node label={nodes[2].label} sublabel={nodes[2].sublabel} delay={0.4} />
            </div>

            <svg className="my-2 h-12 w-px" viewBox="0 0 2 48" preserveAspectRatio="none">
              <motion.line
                x1="1" y1="0" x2="1" y2="48"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-navy-300 dark:text-navy-600"
                initial={inView ? { pathLength: 0 } : {}}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </svg>

            <Node label={nodes[3].label} sublabel={nodes[3].sublabel} delay={0.6} />

            <svg className="my-2 h-12 w-px" viewBox="0 0 2 48" preserveAspectRatio="none">
              <motion.line
                x1="1" y1="0" x2="1" y2="48"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-navy-300 dark:text-navy-600"
                initial={inView ? { pathLength: 0 } : {}}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="rounded-2xl border-2 border-navy-900 px-10 py-4 text-center dark:border-white"
            >
              <span className="text-base font-extrabold tracking-tight text-navy-900 dark:text-white">MORE REVENUE</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
