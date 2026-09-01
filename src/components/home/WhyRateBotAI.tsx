import { motion } from 'framer-motion';
import { whyRateBotAI } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

export function WhyRateBotAI() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="why" className="py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why RateBotAI"
          title="Technology Built Around Your Hotel."
          subtitle="From integration to scale, every part of the platform is designed to make running your hotel simpler and more profitable."
        />

        <div ref={ref} className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyRateBotAI.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="border-l-2 border-canvas-line pl-6 dark:border-navy-700"
            >
              <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-navy-300 dark:text-navy-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-navy-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
