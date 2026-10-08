// import { Navbar } from '@/components/layout/Navbar';
// import { Footer } from '@/components/layout/Footer';
// import { Hero } from '@/components/home/Hero';
import { TrustMetrics } from '@/components/home/TrustMetrics';
import { ProblemSection } from '@/components/home/ProblemSection';
import { PlatformOverview } from '@/components/home/PlatformOverview';
// import { ProductsShowcase } from '@/components/home/ProductsShowcase';
// import { DynamicPricingSection } from '@/components/home/DynamicPricingSection';
import { DirectBookingSection } from '@/components/home/DirectBookingSection';
import { IntegrationsSection } from '@/components/home/IntegrationsSection';
import { HotelHighlights } from '@/components/home/HotelHighlights';
// import { Testimonials } from '@/components/home/Testimonials';
// import { FinalCTA } from '@/components/home/FinalCTA';
import Reviews from '@/components/home/Reviews';
import { OtaConnected } from '@/components/home/OtaConnected';
import ProductShowcase from '@/components/home/ScrollMockupShowcase';
import InfiniteScrollHero from '@/components/hero/InfiniteScrollHero';
// import ThreeSlideScroll from '@/components/hero/ThreeSlides';
import TrialComp from '@/components/trialComp/TrialComp';
// import TrialComp2 from '@/components/trialComp/TrialComp2';
import { MissionReveal } from '@/components/about/MissionReveal';
import { AboutCTA } from '@/components/about';
import DashboardMockupCMSNew from '@/components/ui/DashboardMockupCMSNew'

export function Home() {

  return (
    <div className="relative min-h-screen bg-canvas overflow-x-hidden dark:bg-navy-900">

      <main>
        <InfiniteScrollHero />
        <DashboardMockupCMSNew />
        {/* <TrialComp2 /> */}
        <TrialComp />
        <section className="">

          {/* Your next section */}
          {/* <ThreeSlideScroll /> */}
          {/* <Hero /> */}
          {/* <ProductShowcase /> */}
          <MissionReveal />
          <OtaConnected />
          <TrustMetrics />
          <ProblemSection />
          <PlatformOverview />
          {/* <ProductsShowcase /> */}
          {/* <DynamicPricingSection /> */}
          <DirectBookingSection />
          <IntegrationsSection />
          <HotelHighlights />
          {/* <Testimonials /> */}
          <Reviews />
          <AboutCTA />
          {/* <FinalCTA /> */}
        </section>

      </main>
    </div >
  );
}
