import { motion } from 'framer-motion';
import { type CurrencyCode, type CurrencyOption, currencyList } from '@/data/pricingData';

type Props = {
  currency: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
};

export function CurrencySelector({ currency, onChange }: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex rounded-full border border-canvas-line bg-canvas p-1 shadow-soft dark:border-navy-700 dark:bg-navy-800">
        {currencyList.map((opt: CurrencyOption) => {
          const active = currency === opt.code;
          return (
            <button
              key={opt.code}
              onClick={() => onChange(opt.code)}
              aria-pressed={active}
              className="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
            >
              {active && (
                <motion.span
                  layoutId="currency-selector-pill"
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
                <span className="mr-1">{opt.symbol}</span>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
