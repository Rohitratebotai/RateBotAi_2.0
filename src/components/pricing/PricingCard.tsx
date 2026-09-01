import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type BillingCycle, type CurrencyOption, type PricingPlan, formatPrice } from '@/data/pricingData';
import { calculateRoomBasedPrice } from '@/utils/pricing';
import { PricingFeatureList } from './PricingFeatureList';
import { AnchorButton } from '@/components/ui/Button';

type Props = {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  currency: CurrencyOption;
  roomCount: number;
};

export function PricingCard({ plan, billingCycle, currency, roomCount }: Props) {
  const [expanded, setExpanded] = useState(false);

  const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const inrPrice = calculateRoomBasedPrice(basePrice, roomCount);
  const period = billingCycle === 'monthly' ? '/month' : '/year';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="surface group flex flex-col rounded-4xl p-7 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-8"
    >
      <div>
        <h3 className="text-xl font-bold tracking-tight text-navy-900 dark:text-white">
          {plan.primaryTitle}
        </h3>
        <p className="mt-1 text-sm text-secondary">{plan.secondaryTitle}</p>
      </div>

      <div className="mt-6 flex items-end gap-1.5">
        <span className="text-sm font-medium text-secondary">{currency.symbol}</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`${currency.code}-${inrPrice}`}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-extrabold tracking-tight text-navy-900 dark:text-white"
          >
            {formatPrice(inrPrice, currency)}
          </motion.span>
        </AnimatePresence>
        <span className="mb-1 text-sm font-medium text-tertiary">{period}</span>
      </div>

      <div className="mt-6">
        <AnchorButton href="#contact" size="md" className="w-full" iconRight={<ArrowRight size={16} />}>
          Get Started
        </AnchorButton>
      </div>

      <div className="mt-7 border-t border-canvas-line pt-6 dark:border-navy-700">
        <PricingFeatureList
          features={plan.features}
          expanded={expanded}
          featureTitle={plan.featureTitle}
          onToggle={() => setExpanded((prev) => !prev)}
        />
      </div>
    </motion.div>
  );
}
