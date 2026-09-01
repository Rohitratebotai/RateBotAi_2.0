import { motion } from 'framer-motion';
import { type BillingCycle } from '@/data/pricingData';

type Props = {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
};

const options: { label: string; value: BillingCycle }[] = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export function BillingToggle({ billingCycle, onChange }: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex rounded-full border border-canvas-line bg-canvas p-1 shadow-soft dark:border-navy-700 dark:bg-navy-800">
        {options.map((opt) => {
          const active = billingCycle === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className="relative rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300"
            >
              {active && (
                <motion.span
                  layoutId="billing-toggle-pill"
                  className="absolute inset-0 rounded-full bg-navy-900 dark:bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  active
                    ? 'text-white dark:text-navy-900'
                    : 'text-navy-500 hover:text-navy-900 dark:text-navy-300 dark:hover:text-white'
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
