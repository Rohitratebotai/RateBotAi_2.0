import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <div ref={ref} className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="eyebrow text-navy-500 dark:text-navy-300"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-navy-900 dark:text-white sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 text-lg leading-relaxed text-secondary"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
