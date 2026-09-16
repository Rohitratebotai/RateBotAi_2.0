
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  id: number;
  label: string;
  title: string;
  description: string;
  color: string;
};

const slides: Slide[] = [
  {
    id: 1,
    label: "CMS PLATFORM",
    title: "Manage your property content with ease.",
    description:
      "Create, manage and update your hotel content from a single centralized platform designed for modern hospitality businesses.",
    color: "bg-red-500",
  },
  {
    id: 2,
    label: "BMS PLATFORM",
    title: "Simplify your booking management.",
    description:
      "Manage reservations, rooms, pricing and availability with a powerful booking management system built for growing businesses.",
    color: "bg-green-500",
  },
  {
    id: 3,
    label: "PMS PLATFORM",
    title: "Everything your property needs.",
    description:
      "Streamline daily property operations with a centralized PMS that connects your teams, rooms, guests and reservations.",
    color: "bg-blue-500",
  },
];

const ThreeSlideHorizontal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * ----------------------------------------
       * INITIAL POSITION
       * ----------------------------------------
       *
       * All slides start outside the viewport
       * on the right.
       */
      gsap.set(slidesRef.current, {
        xPercent: 100,
      });

      /*
       * First slide is visible initially.
       */
      gsap.set(slidesRef.current[0], {
        xPercent: 0,
      });

      /*
       * ----------------------------------------
       * MAIN TIMELINE
       * ----------------------------------------
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          /*
           * Animation starts when section reaches
           * the top of the viewport.
           */
          start: "top top",

          /*
           * Two transitions:
           *
           * Slide 1 → Slide 2
           * Slide 2 → Slide 3
           */
          end: `+=${(slides.length - 1) * 100}%`,

          /*
           * Animation follows user's scroll.
           */
          scrub: 1,

          /*
           * Keep the section fixed while
           * slides are changing.
           */
          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /*
       * ----------------------------------------
       * SLIDE 1 → SLIDE 2
       * ----------------------------------------
       */

      timeline.to(slidesRef.current[0], {
        xPercent: -100,
        ease: "none",
      });

      timeline.to(
        slidesRef.current[1],
        {
          xPercent: 0,
          ease: "none",
        },
        "<"
      );

      /*
       * ----------------------------------------
       * SLIDE 2 → SLIDE 3
       * ----------------------------------------
       */

      timeline.to(slidesRef.current[1], {
        xPercent: -100,
        ease: "none",
      });

      timeline.to(
        slidesRef.current[2],
        {
          xPercent: 0,
          ease: "none",
        },
        "<"
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(element) => {
            if (element) {
              slidesRef.current[index] = element;
            }
          }}
          className={`
            absolute
            inset-0
            h-screen
            w-full
            ${slide.color}
          `}
        >
          {/* --------------------------------
              SLIDE CONTENT
          -------------------------------- */}
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-10 lg:px-16">
            {/* ================================
                LEFT SECTION
            ================================= */}

            <div className="w-full pr-0 md:w-1/2 md:pr-10 lg:pr-16">
              {/* Small Label */}
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                {slide.label}
              </p>

              {/* Title */}
              <h2 className="max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-white/80 md:text-lg">
                {slide.description}
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  Easy to use
                </span>

                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  Scalable
                </span>

                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  Real-time
                </span>
              </div>

              {/* Button */}
              <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105">
                Explore Platform
              </button>
            </div>

            {/* ================================
                RIGHT SECTION
            ================================= */}

            <div className="hidden w-1/2 items-center justify-center pl-8 md:flex lg:pl-12">
              <div className="relative w-full max-w-2xl">
                {/* Browser Mockup */}
                <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
                  {/* Browser Header */}
                  <div className="flex h-10 items-center gap-2 border-b border-gray-200 bg-gray-100 px-4">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />

                    <div className="ml-4 h-5 flex-1 rounded-md bg-gray-200" />
                  </div>

                  {/* Mockup Content */}
                  <div className="p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <div className="h-5 w-32 rounded bg-gray-200" />
                        <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
                      </div>

                      <div className="h-9 w-24 rounded-lg bg-gray-200" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-gray-100 p-4">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                        <div className="mt-3 h-7 w-16 rounded bg-gray-300" />
                      </div>

                      <div className="rounded-xl bg-gray-100 p-4">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                        <div className="mt-3 h-7 w-16 rounded bg-gray-300" />
                      </div>

                      <div className="rounded-xl bg-gray-100 p-4">
                        <div className="h-3 w-20 rounded bg-gray-200" />
                        <div className="mt-3 h-7 w-16 rounded bg-gray-300" />
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="mt-5 rounded-xl bg-gray-100 p-5">
                      <div className="mb-5 h-4 w-28 rounded bg-gray-200" />

                      <div className="flex h-40 items-end gap-3">
                        <div className="h-[35%] flex-1 rounded-t bg-gray-300" />
                        <div className="h-[55%] flex-1 rounded-t bg-gray-300" />
                        <div className="h-[45%] flex-1 rounded-t bg-gray-300" />
                        <div className="h-[75%] flex-1 rounded-t bg-gray-300" />
                        <div className="h-[65%] flex-1 rounded-t bg-gray-300" />
                        <div className="h-[90%] flex-1 rounded-t bg-gray-300" />
                      </div>
                    </div>

                    {/* Bottom Cards */}
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="h-16 rounded-xl bg-gray-100" />
                      <div className="h-16 rounded-xl bg-gray-100" />
                    </div>
                  </div>
                </div>

                {/* Decorative Background */}
                <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ThreeSlideHorizontal;

