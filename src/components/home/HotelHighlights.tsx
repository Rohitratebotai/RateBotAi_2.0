import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView } from '@/hooks/useInView';

const highlights = [
  { number: '01', title: 'Connected Operations', description: 'Every module shares one source of truth.' },
  { number: '02', title: 'Real-Time Visibility', description: 'Live data across your entire property.' },
  { number: '03', title: 'Smarter Workflows', description: 'Automate the busywork, focus on guests.' },
  { number: '04', title: 'One Hospitality Platform', description: 'Built for hotels, designed to scale.' },
];

export function HotelHighlights() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-16 lg:py-20">
      <div className="container-px">
        <SectionHeading
          eyebrow="Built for Modern Hotels"
          title="Built for the Way Hotels Operate Today"
          align="center"
        />

        <div
          ref={ref}
          className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group"
            >
              <span className="text-2xs font-bold tracking-[0.18em] text-navy-300 dark:text-navy-500">
                {item.number}
              </span>
              <h3 className="mt-3 text-base font-semibold text-navy-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
