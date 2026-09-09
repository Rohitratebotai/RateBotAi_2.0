import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustMetrics } from '@/components/home/TrustMetrics';
import { ProblemSection } from '@/components/home/ProblemSection';
import { PlatformOverview } from '@/components/home/PlatformOverview';
import { ProductsShowcase } from '@/components/home/ProductsShowcase';
import { DynamicPricingSection } from '@/components/home/DynamicPricingSection';
import { DirectBookingSection } from '@/components/home/DirectBookingSection';
import { IntegrationsSection } from '@/components/home/IntegrationsSection';
import { WhyRateBotAI } from '@/components/home/WhyRateBotAI';
import { HotelHighlights } from '@/components/home/HotelHighlights';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';
import Reviews from '@/components/home/Reviews';
import { OtaConnected } from '@/components/home/OtaConnected';
import ProductShowcase from '@/components/home/ProductShowcase';

export function Home() {

  return (
    <div className="relative min-h-screen bg-canvas overflow-x-hidden dark:bg-navy-900">
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase/>
        <OtaConnected />
        <TrustMetrics />
        <ProblemSection />
        <PlatformOverview />
        {/* <ProductsShowcase /> */}
        <DynamicPricingSection />
        <DirectBookingSection />
        <IntegrationsSection />
        <WhyRateBotAI />
        <HotelHighlights />
        <Testimonials />
        <Reviews />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
