import { motion } from 'framer-motion';
import { type DocumentationModule } from '@/data/documentationData';
import { getModuleIcon } from './moduleIcons';

type Props = {
  module: DocumentationModule;
};

export function ModuleHeader({ module }: Props) {
  const Icon = getModuleIcon(module.icon);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white dark:bg-white dark:text-navy-900"
      >
        <Icon size={26} />
      </motion.span>
      <div>
        <p className="eyebrow text-navy-400 dark:text-navy-300">{module.title}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-4xl">
          {module.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-secondary">
          {module.longDescription}
        </p>
      </div>
    </div>
  );
}
