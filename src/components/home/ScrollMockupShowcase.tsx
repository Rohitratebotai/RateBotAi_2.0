import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type ComponentType,
} from "framer-motion";

import { useRef, useState } from "react";

import DashboardMockupCMS from "../ui/DashboardMockupCMS";
import DashboardMockupBMS from "../ui/DashboardMockupBMS";
import DashboardMockupPMS from "../ui/DashboardMockupPMS";

/* ============================================================================
   TYPES
============================================================================ */

interface MockupProps {
  className?: string;
}

interface ShowcaseItem {
  id: string;
  label: string;
  component: ComponentType<MockupProps>;
}

interface ScrollMockupShowcaseProps {
  items?: ShowcaseItem[];
  className?: string;
}

/* ============================================================================
   DEFAULT ITEMS
============================================================================ */

const defaultItems: ShowcaseItem[] = [
  { id: "cms", label: "CMS", component: DashboardMockupCMS },
  { id: "bms", label: "BMS", component: DashboardMockupBMS },
  { id: "pms", label: "PMS", component: DashboardMockupPMS },
];

/* ============================================================================
   HOW THIS WORKS

   1. The "track" is a tall div: items.length * 100vh.
   2. Inside it, a "stage" div is `sticky top-0 h-screen`. As long as the
      track is intersecting the viewport, the stage stays pinned in place —
      that's the "stuck" feeling.
   3. useScroll measures scroll progress (0 → 1) across exactly that track,
      using offsets "start start" (progress 0 the instant the track's top
      hits the viewport top) to "end end" (progress 1 the instant the
      track's bottom hits the viewport bottom).
   4. That progress, split evenly into items.length buckets, picks which
      mockup is "active". Item i owns progress range [i/N, (i+1)/N).
   5. Once the user scrolls past progress 1, the track ends, the stage
      un-sticks, and the page continues normally into the next section.

   This is scroll-only — no click navigation, no manual scroll jumps — so
   there's nothing to get out of sync with the browser's own scroll state.
============================================================================ */

export default function ScrollMockupShowcase({
  items = defaultItems,
  className = "",
}: ScrollMockupShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smoothed copy, used only for the subtle scale/opacity polish on the
  // active mockup — never used to decide which item is active, so it can
  // never desync the index from what's actually on screen.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!items.length) return;

    const clamped = Math.max(0, Math.min(0.999999, value));
    const nextIndex = Math.min(
      items.length - 1,
      Math.floor(clamped * items.length)
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  // A gentle "settle in" pulse each time a mockup becomes active: scales
  // from slightly-small up to full size as its segment begins.
  const withinSegmentProgress = useTransform(smoothProgress, (value) => {
    const segment = 1 / Math.max(items.length, 1);
    const positionInSegment = (value % segment) / segment;
    return Number.isFinite(positionInSegment) ? positionInSegment : 0;
  });

  const mockupScale = useTransform(
    withinSegmentProgress,
    [0, 0.3, 1],
    [0.96, 1, 1]
  );

  const activeItem = items[activeIndex];
  const ActiveMockup = activeItem?.component;

  if (!items.length) {
    return null;
  }

  return (
    <section className={`relative bg-[#f8f8f6] ${className}`}>
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${items.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          {/* GLOW */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                h-[420px]
                w-[720px]
                rounded-[60px]
                bg-blue-100/40
                blur-[110px]
              "
            />
          </div>

          {/* LABEL */}
          <div className="mb-8 text-xs font-bold tracking-[0.3em] text-slate-400">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            <span className="mx-3 text-slate-300">—</span>
            {activeItem.label}
          </div>

          {/* MOCKUP */}
          <motion.div
            style={{ scale: reduceMotion ? 1 : mockupScale }}
            className="relative flex w-full max-w-[900px] items-center justify-center px-6"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {ActiveMockup && (
                <motion.div
                  key={activeItem.id}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion ? 0 : -24,
                  }}
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full"
                >
                  <ActiveMockup className="w-full max-h-[62vh]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* PROGRESS DOTS (indicator only — not clickable, always in sync
              with scroll because it just reads activeIndex directly) */}
          <div className="mt-10 flex items-center gap-2">
            {items.map((item, index) => (
              <span
                key={item.id}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${index === activeIndex ? "w-8 bg-[#071b3d]" : "w-1.5 bg-slate-300"}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}