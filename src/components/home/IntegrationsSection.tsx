import { motion } from 'framer-motion';
import { integrations } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

export function IntegrationsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const nodes = integrations.nodes;
  const center = nodes[0];
  const ring = nodes.slice(1);

  return (
    <section className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow={integrations.eyebrow}
          title={integrations.title}
          subtitle={integrations.subtitle}
        />

        <div ref={ref} className="mx-auto mt-16 flex max-w-3xl items-center justify-center">
          <div className="relative flex h-[340px] w-full max-w-2xl items-center justify-center sm:h-[380px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 380">
              {ring.map((_, i) => {
                const angle = (i / ring.length) * 2 * Math.PI - Math.PI / 2;
                const x = 200 + 150 * Math.cos(angle);
                const y = 190 + 150 * Math.sin(angle);
                return (
                  <motion.line
                    key={i}
                    x1="200" y1="190" x2={x} y2={y}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    className="text-navy-300 dark:text-navy-600"
                    initial={inView ? { pathLength: 0, opacity: 0 } : {}}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="absolute z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-navy-900 text-center text-sm font-bold text-white shadow-card dark:bg-white dark:text-navy-900 sm:h-28 sm:w-28"
            >
              {center}
            </motion.div>

            {ring.map((node, i) => {
              const angle = (i / ring.length) * 2 * Math.PI - Math.PI / 2;
              const x = `calc(50% + ${150 * Math.cos(angle)}px)`;
              const y = `calc(50% + ${150 * Math.sin(angle)}px)`;
              return (
                <motion.div
                  key={node}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                  className="surface absolute z-10 rounded-xl px-3 py-2 text-center text-2xs font-semibold text-navy-900 shadow-soft dark:text-white sm:text-xs"
                >
                  {node}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
