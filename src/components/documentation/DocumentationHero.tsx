import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function DocumentationHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[400px] bg-gradient-to-b from-canvas-subtle/60 to-transparent dark:from-navy-800/40" />

      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-canvas-line bg-canvas px-4 py-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-navy-500 shadow-soft dark:border-navy-700 dark:bg-navy-800 dark:text-navy-300"
          >
            <Sparkles size={13} className="text-navy-400" />
            RateBotAI Documentation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Everything you need to know about RateBotAI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary"
          >
            Explore our hospitality technology platform and learn how each module helps you manage and grow your property.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mx-auto mt-9 max-w-xl"
          >
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tertiary"
              />
              <input
                type="text"
                placeholder="Search documentation..."
                aria-label="Search documentation"
                className="h-13 w-full rounded-full border border-canvas-line bg-canvas pl-12 pr-5 text-base text-navy-900 shadow-soft transition-colors placeholder:text-tertiary focus:border-navy-400 dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-300 dark:focus:border-navy-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
