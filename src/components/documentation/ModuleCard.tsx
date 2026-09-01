import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type DocumentationModule } from '@/data/documentationData';
import { getModuleIcon } from './moduleIcons';

type Props = {
  module: DocumentationModule;
  index: number;
};

export function ModuleCard({ module, index }: Props) {
  const Icon = getModuleIcon(module.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/documentation/${module.slug}`}
        className="surface group flex h-full flex-col rounded-4xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-white transition-colors duration-300 group-hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:group-hover:bg-navy-100">
          <Icon size={22} />
        </span>

        <h3 className="mt-5 text-xl font-bold tracking-tight text-navy-900 dark:text-white">
          {module.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">{module.description}</p>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition-colors group-hover:text-navy-900 dark:text-navy-200 dark:group-hover:text-white">
          Explore Documentation
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
