import { motion } from 'framer-motion';
import { Activity, BarChart3, TrendingUp } from 'lucide-react';
import { dynamicPricing } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

const icons = [TrendingUp, Activity, BarChart3];

export function DynamicPricingSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={dynamicPricing.eyebrow}
              title={dynamicPricing.title}
              subtitle={dynamicPricing.subtitle}
              align="left"
            />
            <div ref={ref} className="mt-10 space-y-6">
              {dynamicPricing.points.map((p, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900 dark:text-white">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-secondary">{p.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="surface relative overflow-hidden rounded-4xl p-6 shadow-glow sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">Rate Optimization</p>
                <p className="mt-0.5 text-2xs text-tertiary">AI-adjusted in real time</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-canvas-line px-3 py-1 text-2xs font-medium text-secondary dark:border-navy-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: 'Occupancy', value: 87, color: 'from-navy-500 to-navy-400' },
                { label: 'Demand', value: 72, color: 'from-navy-400 to-navy-300' },
                { label: 'Room Rate', value: 64, color: 'from-navy-600 to-navy-500' },
                { label: 'Revenue', value: 91, color: 'from-navy-700 to-navy-500' },
              ].map((row, i) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-navy-700 dark:text-navy-200">{row.label}</span>
                    <span className="font-semibold text-navy-900 dark:text-white">{row.value}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-line dark:bg-navy-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${row.value}%` } : {}}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${row.color} dark:opacity-90`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-canvas-line bg-canvas p-4 dark:border-navy-700 dark:bg-navy-800">
                <p className="text-2xs uppercase tracking-wider text-tertiary">Suggested Rate</p>
                <p className="mt-1 text-2xl font-bold text-navy-900 dark:text-white">₹4,850</p>
                <p className="text-2xs font-semibold text-emerald-600 dark:text-emerald-400">+9.4% vs static</p>
              </div>
              <div className="rounded-xl border border-canvas-line bg-canvas p-4 dark:border-navy-700 dark:bg-navy-800">
                <p className="text-2xs uppercase tracking-wider text-tertiary">RevPAR</p>
                <p className="mt-1 text-2xl font-bold text-navy-900 dark:text-white">₹4,220</p>
                <p className="text-2xs font-semibold text-emerald-600 dark:text-emerald-400">+15% lift</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
