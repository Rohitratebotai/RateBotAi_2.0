import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PricingHero } from '@/components/pricing/PricingHero';
import { BillingToggle } from '@/components/pricing/BillingToggle';
import { CurrencySelector } from '@/components/pricing/CurrencySelector';
import { RoomSelector } from '@/components/pricing/RoomSelector';
import { PricingGrid } from '@/components/pricing/PricingGrid';
import { type BillingCycle, type CurrencyCode, currencies, pricingPlans } from '@/data/pricingData';
import { DEFAULT_ROOMS } from '@/utils/pricing';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR');
  const [roomCount, setRoomCount] = useState<number>(DEFAULT_ROOMS);

  return (
    <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
      <Navbar />
      <main>
        <PricingHero />
        <section className="pb-20 lg:pb-28">
          <div className="container-px">
            <div className="mx-auto mb-10 max-w-2xl">
              <RoomSelector roomCount={roomCount} onChange={setRoomCount} />
            </div>
            <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
              <CurrencySelector currency={currencyCode} onChange={setCurrencyCode} />
            </div>
            <PricingGrid
              plans={pricingPlans}
              billingCycle={billingCycle}
              currency={currencies[currencyCode]}
              roomCount={roomCount}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
