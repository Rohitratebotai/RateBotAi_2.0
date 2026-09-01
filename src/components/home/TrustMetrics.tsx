import { motion } from 'framer-motion';
import { metrics } from '@/data/siteData';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { useInView } from '@/hooks/useInView';

export function TrustMetrics() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <section className="border-y border-canvas-line bg-canvas-subtle py-12 dark:border-navy-700 dark:bg-navy-950/50">
      <div ref={ref} className="container-px">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl">
                <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-secondary">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
