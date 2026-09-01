import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustMetrics } from '@/components/home/TrustMetrics';
import { ProblemSection } from '@/components/home/ProblemSection';
import { PlatformOverview } from '@/components/home/PlatformOverview';
import { ProductsShowcase } from '@/components/home/ProductsShowcase';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { DynamicPricingSection } from '@/components/home/DynamicPricingSection';
import { DirectBookingSection } from '@/components/home/DirectBookingSection';
import { IntegrationsSection } from '@/components/home/IntegrationsSection';
import { WhyRateBotAI } from '@/components/home/WhyRateBotAI';
import { HotelHighlights } from '@/components/home/HotelHighlights';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export function Home() {
  return (
    <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
      <Navbar />
      <main>
        <Hero />
        <TrustMetrics />
        <ProblemSection />
        <PlatformOverview />
        <ProductsShowcase />
        {/* <ProductShowcase /> */}
        <DynamicPricingSection />
        <DirectBookingSection />
        <IntegrationsSection />
        <WhyRateBotAI />
        <HotelHighlights />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
