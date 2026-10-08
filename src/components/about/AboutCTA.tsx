import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { AnchorButton } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function AboutCTA() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
        },
      });

      tl.to('.cta-card', { scale: 1, ease: 'none' }, 0)
        .to('.cta-title', { scale: 1.1, ease: 'none' }, 0.2)
        .fromTo('.cta-buttons', { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.5);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative h-screen overflow-hidden">
      <div className="container-px flex h-full items-center justify-center">
        <div
          className="cta-card relative overflow-hidden rounded-4xl bg-navy-900 px-6 py-16 text-center shadow-glow sm:px-12 lg:py-24"
          style={{ transform: 'scale(0.85)' }}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative">
            <h2 className="cta-title mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              The future of hospitality is connected.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy-200">
              Let&rsquo;s build it together.
            </p>
            <div className="cta-buttons mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AnchorButton
                href="/#products"
                size="lg"
                className="!bg-white !text-navy-900 hover:!bg-navy-100"
                iconRight={<ArrowRight size={18} />}
              >
                Explore Our Products
              </AnchorButton>
              <AnchorButton
                href="/#contact"
                size="lg"
                variant="secondary"
                className="!border-white/30 py-2 !text-white hover:!bg-white/10 hover:!border-white/50"
              >
                Talk to Us
              </AnchorButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
