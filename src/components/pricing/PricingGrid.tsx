import { type BillingCycle, type CurrencyOption, type PricingPlan } from '@/data/pricingData';
import { PricingCard } from './PricingCard';

type Props = {
  plans: PricingPlan[];
  billingCycle: BillingCycle;
  currency: CurrencyOption;
  roomCount: number;
};

export function PricingGrid({ plans, billingCycle, currency, roomCount }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          billingCycle={billingCycle}
          currency={currency}
          roomCount={roomCount}
        />
      ))}
    </div>
  );
}
