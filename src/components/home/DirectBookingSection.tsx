import { motion } from 'framer-motion';
import { ArrowDown, Check, Globe, Smartphone } from 'lucide-react';
import { directBooking } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

const stepIcons = [Globe, Smartphone, Check];

export function DirectBookingSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow={directBooking.eyebrow}
          title={directBooking.title}
          subtitle={directBooking.subtitle}
        />

        <div ref={ref} className="mx-auto mt-16 max-w-4xl">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-2">
            {directBooking.steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-3 sm:flex-row">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="surface flex w-56 flex-col items-center rounded-2xl px-6 py-7 text-center shadow-soft"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                    {(() => {
                      const Icon = stepIcons[i];
                      return <Icon size={22} />;
                    })()}
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-navy-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 text-2xs text-tertiary">{step.description}</p>
                </motion.div>
                {i < directBooking.steps.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                    className="rotate-90 text-navy-300 dark:text-navy-600 sm:rotate-0"
                  >
                    <ArrowDown size={20} />
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-2"
          >
            {directBooking.benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2.5 rounded-xl border border-canvas-line bg-canvas-subtle px-4 py-3 text-sm text-navy-700 dark:border-navy-700 dark:bg-navy-800/60 dark:text-navy-100"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                  <Check size={11} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
