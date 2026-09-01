import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { hero } from '@/data/siteData';
import { AnchorButton } from '@/components/ui/Button';
import { DashboardMockup } from '@/components/ui/DashboardMockup';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-canvas-subtle/60 to-transparent dark:from-navy-800/40" />

      <div className="container-px">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-canvas-line bg-canvas px-4 py-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-navy-500 shadow-soft dark:border-navy-700 dark:bg-navy-800 dark:text-navy-300"
          >
            <Sparkles size={13} className="text-navy-400" />
            {hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 dark:text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <AnchorButton href={hero.primaryCta.href} size="lg" iconRight={<ArrowRight size={18} />}>
              {hero.primaryCta.label}
            </AnchorButton>
            <AnchorButton href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </AnchorButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <DashboardMockup active="dynamic-pricing" />
        </motion.div>
      </div>
    </section>
  );
}
