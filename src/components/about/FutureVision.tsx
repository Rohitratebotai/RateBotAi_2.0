import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { id: 'pms', label: 'PMS', className: 'left-1/2 top-8 -translate-x-1/2' },
  { id: 'cms', label: 'CMS', className: 'left-8 top-1/2 -translate-y-1/2' },
  { id: 'bms', label: 'BMS', className: 'right-8 top-1/2 -translate-y-1/2' },
  { id: 'booking', label: 'Booking', className: 'bottom-12 left-1/4' },
  { id: 'channel', label: 'Channel', className: 'bottom-12 right-1/4' },
];

export function FutureVision() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo('.fv-node', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, stagger: 0.1, ease: 'power2.out' }, 0)
        .fromTo('.fv-line', { strokeDashoffset: 120 }, { strokeDashoffset: 0, ease: 'none', duration: 0.6 }, 0.2)
        .to('.fv-core', { scale: 1.2, ease: 'none' }, 0.4)
        .to('.fv-composition', { scale: 1.1, ease: 'none' }, 0.6);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-canvas-subtle dark:bg-navy-950/50">
      <div className="container-px flex h-full items-center justify-center">
        <div className="fv-composition relative h-[380px] w-full max-w-xl">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 380" preserveAspectRatio="none">
            <line className="fv-line" x1="200" y1="180" x2="200" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
            <line className="fv-line" x1="180" y1="190" x2="60" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
            <line className="fv-line" x1="220" y1="190" x2="340" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
            <line className="fv-line" x1="180" y1="210" x2="120" y2="300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
            <line className="fv-line" x1="220" y1="210" x2="280" y2="300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>

          <div className="fv-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-2xl bg-navy-900 px-8 py-5 text-center shadow-card dark:bg-white">
              <span className="text-base font-extrabold tracking-tight text-white dark:text-navy-900">
                RateBotAI
              </span>
            </div>
          </div>

          {nodes.map((node) => (
            <div key={node.id} className={`fv-node absolute ${node.className}`}>
              <div className="surface rounded-2xl px-5 py-3 text-center shadow-soft">
                <span className="text-sm font-bold text-navy-900 dark:text-white">
                  {node.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
