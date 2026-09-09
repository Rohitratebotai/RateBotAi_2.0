import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { platformProducts } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DashboardMockup } from '@/components/ui/DashboardMockup';
import { AnchorButton } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

// How much extra scroll distance (px) the pin holds per tab step.
// 4 products => 3 steps between them => (4 - 1) * STEP_DISTANCE total.
const STEP_DISTANCE = 900;

export function ProductsShowcase() {
  const [active, setActive] = useState(0);
  const product = platformProducts[active];

  const sectionRef = useRef<HTMLElement>(null);

  // Keep the latest `active` readable inside the ScrollTrigger
  // callback without re-creating the trigger on every tab change.
  const activeRef = useRef(active);
  activeRef.current = active;

  const stepCount = platformProducts.length - 1;
  const totalScrollDistance = stepCount * STEP_DISTANCE;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || stepCount <= 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // With reduced motion, skip pinning/scrubbing entirely —
    // the section just scrolls past showing the first product.
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        // Snap so the pin settles on a whole tab rather than
        // leaving the user stuck between two tabs mid-scroll.
        snap: {
          snapTo: 1 / stepCount,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const index = Math.round(self.progress * stepCount);
          if (index !== activeRef.current) {
            setActive(index);
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [stepCount, totalScrollDistance]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-20 lg:py-28"
    >
      <div className="container-px">
        <SectionHeading
          eyebrow="Products"
          title="One platform. Four connected products."
          subtitle="Explore each part of the RateBotAI ecosystem. Select a product to see what it does and how it looks."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="eyebrow text-navy-400 dark:text-navy-300">{product.tagline}</p>
                <h3 className="mt-3 text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">{product.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-secondary">{product.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-navy-100">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <AnchorButton href="#contact" variant="secondary" iconRight={<ArrowRight size={16} />}>
                    Learn More
                  </AnchorButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <DashboardMockup active={product.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}