import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function MissionReveal() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        },
      });

      tl.to('.mission-bg', { backgroundColor: '#071B3D', ease: 'none' })
        .to('.mission-eyebrow', { opacity: 1, color: '#94A3B8', ease: 'none' }, '<')
        
        // Expanded top and bottom clip bounds (-10%) to account for descenders like 'y' and 'p'
        .fromTo(
          '.mission-fill-1',
          { clipPath: 'inset(-10% 100% -10% 0)' },
          { clipPath: 'inset(-10% 0% -10% 0)', ease: 'none' }
        )
        .fromTo(
          '.mission-fill-2',
          { clipPath: 'inset(-10% 100% -10% 0)' },
          { clipPath: 'inset(-10% 0% -10% 0)', ease: 'none' },
          '>'
        )
        .fromTo(
          '.mission-fill-3',
          { clipPath: 'inset(-10% 100% -10% 0)' },
          { clipPath: 'inset(-10% 0% -10% 0)', ease: 'none' },
          '>'
        );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative h-screen overflow-hidden">
      <div className="mission-bg absolute inset-0 bg-navy-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-px relative z-10 flex h-full items-center justify-center">
        <div className="max-w-3xl text-center">
          <p className="mission-eyebrow eyebrow text-navy-300 opacity-50">Our Mission</p>
          <h2 className="mt-8 text-3xl font-extrabold leading-[1.25] tracking-tight sm:text-4xl lg:text-5xl">
            
            {/* Line 1 */}
            <span className="relative block py-1">
              <span className="text-gray-500/50">
                Make hospitality technology
              </span>
              <span className="mission-fill-1 absolute inset-0 py-1 select-none text-white">
                Make hospitality technology
              </span>
            </span>

            {/* Line 2 */}
            <span className="relative block py-1">
              <span className="text-gray-500/50">
                simpler, smarter,
              </span>
              <span className="mission-fill-2 absolute inset-0 py-1 select-none text-white">
                simpler, smarter,
              </span>
            </span>

            {/* Line 3 */}
            <span className="relative block py-1">
              <span className="text-gray-500/50">
                and more connected.
              </span>
              <span className="mission-fill-3 absolute inset-0 py-1 select-none text-white">
                and more connected.
              </span>
            </span>

          </h2>
        </div>
      </div>
    </section>
  );
}