import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const words = ['connected', 'simpler', 'smarter', 'more human'];

export function PhilosophyScroll() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
        },
      });

      words.forEach((_, i) => {
        if (i > 0) {
          tl.to(`[data-word="${i - 1}"]`, { opacity: 0, scale: 0.8, y: -20, ease: 'power2.in' }, (i - 1) * 0.3)
            .fromTo(`[data-word="${i}"]`, { opacity: 0, scale: 1.2, y: 20 }, { opacity: 1, scale: 1, y: 0, ease: 'power2.out' }, (i - 1) * 0.3 + 0.05);
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-canvas-subtle dark:bg-navy-950/50">
      <div className="container-px flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-xl leading-relaxed text-secondary sm:text-2xl">
            We believe hospitality technology
          </p>
          <p className="mt-2 text-xl leading-relaxed text-secondary sm:text-2xl">should feel</p>
          <div className="relative mt-6 h-20 sm:h-28">
            {words.map((word, i) => (
              <span
                key={word}
                data-word={i}
                className={`absolute inset-0 text-4xl font-extrabold tracking-tight gradient-text sm:text-6xl lg:text-7xl ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
              >
                {word}.
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
