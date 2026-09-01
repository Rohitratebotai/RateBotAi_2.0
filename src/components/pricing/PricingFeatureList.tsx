import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { type PricingFeature } from '@/data/pricingData';

type Props = {
  features: PricingFeature[];
  expanded: boolean;
  featureTitle: string;
  onToggle: () => void;
};

const COLLAPSED_COUNT = 3;

export function PricingFeatureList({ features, expanded, featureTitle, onToggle }: Props) {
  const visibleCount = expanded ? features.length : COLLAPSED_COUNT;
  const hasMore = features.length > COLLAPSED_COUNT;

  return (
    <div>
      <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-navy-400 dark:text-navy-300">
        {featureTitle}
      </p>

      <ul className="mt-4 space-y-1">
        {features.slice(0, COLLAPSED_COUNT).map((f, i) => (
          <FeatureRow key={`${f.feature}-${i}`} feature={f} />
        ))}

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.li
              key="expanded-features"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="space-y-1">
                {features.slice(COLLAPSED_COUNT).map((f, i) => (
                  <motion.div
                    key={`${f.feature}-extra-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <FeatureRow feature={f} />
                  </motion.div>
                ))}
              </ul>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <button
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-white"
        >
          {expanded ? 'Show Less' : 'Show More'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {'\u2304'}
          </motion.span>
        </button>
      )}
    </div>
  );
}

function FeatureRow({ feature }: { feature: PricingFeature }) {
  return (
    <li className="group flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-canvas-subtle dark:hover:bg-navy-800/60">
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 ${
          feature.isAvailable
            ? 'bg-navy-900 text-white dark:bg-white dark:text-navy-900'
            : 'bg-rose-100 text-rose-500 dark:bg-rose-900/40'
        }`}
      >
        {feature.isAvailable ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
      </span>
      <span
        className={`text-sm leading-relaxed ${
          feature.isAvailable
            ? 'text-navy-700 dark:text-navy-100'
            : 'text-tertiary line-through'
        }`}
      >
        {feature.feature}
      </span>
    </li>
  );
}
