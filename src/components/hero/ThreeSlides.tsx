
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DashboardMockupCMS from "@/components/ui/DashboardMockupCMS";
import DashboardMockupPMS from "@/components/ui/DashboardMockupPMS";
import DashboardMockupBMS from "@/components/ui/DashboardMockupBMS";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  id: number;
  label: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: 1,
    label: "CMS PLATFORM",
    title: "Manage your property content with ease.",
    description:
      "Create, manage and update your hotel content from a single centralized platform designed for modern hospitality businesses.",
  },
  {
    id: 2,
    label: "BMS PLATFORM",
    title: "Simplify your booking management.",
    description:
      "Manage reservations, rooms, pricing and availability with a powerful booking management system built for growing businesses.",
  },
  {
    id: 3,
    label: "PMS PLATFORM",
    title: "Everything your property needs.",
    description:
      "Streamline daily property operations with a centralized PMS that connects your teams, rooms, guests and reservations.",
  },
];

const mockupComponents = [
  DashboardMockupCMS,
  DashboardMockupBMS,
  DashboardMockupPMS,
];

// Individual scale for each dashboard.
// CMS is intentionally smaller because it has a larger intrinsic layout.
const mockupScales = ["scale-[0.62]", "scale-[0.70]", "scale-[0.68]"];

const features = ["Easy to use", "Scalable", "Real-time"];

const ThreeSlideHorizontal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const slidesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);
  const mockupRef = useRef<HTMLDivElement[]>([]);

  const labelRef = useRef<HTMLParagraphElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement[]>([]);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ==================================================
       * INITIAL SLIDE POSITIONS
       * ================================================== */

      gsap.set(slidesRef.current, { xPercent: 100 });
      gsap.set(slidesRef.current[0], { xPercent: 0 });

      /* ==================================================
       * INITIAL HIDDEN STATE: SLIDES 2 & 3 ONLY
       * ================================================== */

      gsap.set(labelRef.current.slice(1), {
        opacity: 0,
        x: -40,
        filter: "blur(8px)",
      });

      gsap.set(titleRef.current.slice(1), {
        opacity: 0,
        x: -50,
        filter: "blur(10px)",
      });

      gsap.set(descriptionRef.current.slice(1), {
        opacity: 0,
        x: -40,
        filter: "blur(8px)",
      });

      gsap.set(featuresRef.current.slice(1), {
        opacity: 0,
        y: 25,
      });

      gsap.set(buttonRef.current.slice(1), {
        opacity: 0,
        y: 25,
      });

      gsap.set(mockupRef.current.slice(1), {
        opacity: 0,
        x: 100,
        y: 0,
        scale: 0.88,
        rotateY: -8,
        filter: "blur(6px)",
        transformOrigin: "center center",
        force3D: true,
      });

      /* ==================================================
       * OPTIONAL INTRO
       * ================================================== */

      gsap.from(contentRef.current[0], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      /* ==================================================
       * MAIN SCROLL TIMELINE
       * ================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${(slides.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Each transition:
       * slide `i` exits at time `i`
       * slide `i + 1` enters at time `i + 0.42`
       */

      for (let i = 0; i < slides.length - 1; i++) {
        const next = i + 1;

        /* ---- Slide container movement ---- */

        timeline.to(
          slidesRef.current[i],
          {
            xPercent: -100,
            ease: "none",
          },
          i
        );

        timeline.to(
          slidesRef.current[next],
          {
            xPercent: 0,
            ease: "none",
          },
          i
        );

        /* ---- Current slide content exits ---- */

        timeline.to(
          labelRef.current[i],
          {
            opacity: 0,
            x: -35,
            filter: "blur(6px)",
            duration: 0.25,
          },
          i
        );

        timeline.to(
          titleRef.current[i],
          {
            opacity: 0,
            x: -45,
            filter: "blur(8px)",
            duration: 0.3,
          },
          i
        );

        timeline.to(
          descriptionRef.current[i],
          {
            opacity: 0,
            x: -35,
            filter: "blur(6px)",
            duration: 0.25,
          },
          i
        );

        timeline.to(
          featuresRef.current[i],
          {
            opacity: 0,
            y: -20,
            duration: 0.25,
          },
          i
        );

        timeline.to(
          buttonRef.current[i],
          {
            opacity: 0,
            y: -20,
            duration: 0.25,
          },
          i
        );

        /* ---- Current mockup exits ---- */

        timeline.to(
          mockupRef.current[i],
          {
            opacity: 0,
            x: -100,
            scale: 0.9,
            rotateY: 8,
            filter: "blur(6px)",
            duration: 0.35,
          },
          i
        );

        /* ---- Next slide content enters ---- */

        timeline.to(
          labelRef.current[next],
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.35,
            ease: "power3.out",
          },
          i + 0.42
        );

        timeline.to(
          titleRef.current[next],
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power3.out",
          },
          i + 0.5
        );

        timeline.to(
          descriptionRef.current[next],
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.out",
          },
          i + 0.58
        );

        timeline.to(
          featuresRef.current[next],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          i + 0.65
        );

        timeline.to(
          buttonRef.current[next],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          i + 0.72
        );

        /* ---- Next mockup enters ---- */

        timeline.to(
          mockupRef.current[next],
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
          i + 0.42
        );
      }

      /* ==================================================
       * CONTINUOUS MOCKUP FLOAT
       * ================================================== */

      mockupRef.current.forEach((mockup) => {
        gsap.to(mockup, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* Refresh ScrollTrigger once layout is settled. */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative h-screen w-full overflow-hidden
        bg-canvas text-navy-900
        dark:bg-navy-900 dark:text-white
      "
    >
      {slides.map((slide, index) => {
        const Mockup = mockupComponents[index];

        return (
          <div
            key={slide.id}
            ref={(element) => {
              if (element) slidesRef.current[index] = element;
            }}
            className="
              absolute inset-0 h-screen w-full
              bg-canvas
              dark:bg-navy-900
            "
          >
            <div
              className="
                mx-auto flex h-full w-full max-w-[86rem]
                items-center px-6 md:px-10 lg:px-16
              "
            >
              {/* ==========================================
                  LEFT CONTENT
              ========================================== */}

              <div
                ref={(element) => {
                  if (element) contentRef.current[index] = element;
                }}
                className="w-full md:w-1/2 md:pr-10 lg:pr-16"
              >
                {/* Label */}

                <p
                  ref={(element) => {
                    if (element) labelRef.current[index] = element;
                  }}
                  className="
                    mb-5 text-sm font-semibold uppercase
                    tracking-[0.25em]
                    text-navy-500
                    dark:text-navy-300
                  "
                >
                  {slide.label}
                </p>

                {/* Title */}

                <h2
                  ref={(element) => {
                    if (element) titleRef.current[index] = element;
                  }}
                  className="
                    max-w-xl text-4xl font-bold leading-tight
                    text-navy-900
                    md:text-5xl
                    lg:text-6xl
                    dark:text-white
                  "
                >
                  {slide.title}
                </h2>

                {/* Description */}

                <p
                  ref={(element) => {
                    if (element) descriptionRef.current[index] = element;
                  }}
                  className="
                    mt-6 max-w-lg text-base leading-7
                    text-navy-500
                    md:text-lg
                    dark:text-navy-200
                  "
                >
                  {slide.description}
                </p>

                {/* Features */}

                <div
                  ref={(element) => {
                    if (element) featuresRef.current[index] = element;
                  }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="
                        rounded-full
                        border border-canvas-line
                        bg-canvas-subtle
                        px-4 py-2
                        text-sm
                        font-medium
                        text-navy-700
                        shadow-sm
                        backdrop-blur-sm
                        dark:border-navy-700
                        dark:bg-navy-800/70
                        dark:text-navy-100
                      "
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Button */}

                <button
                  ref={(element) => {
                    if (element) buttonRef.current[index] = element;
                  }}
                  className="
                    mt-8 rounded-full
                    bg-navy-900
                    px-6 py-3
                    text-sm font-semibold
                    text-white
                    shadow-lg shadow-navy-900/10
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    dark:bg-white
                    dark:text-navy-900
                    dark:shadow-black/20
                  "
                >
                  Explore Platform
                </button>
              </div>

              {/* ==========================================
                  RIGHT MOCKUP
              ========================================== */}

              <div
                className="
                  hidden w-1/2 items-center justify-center
                  pl-8 md:flex lg:pl-12
                "
              >
                {/* GSAP animation wrapper */}

                <div
                  ref={(element) => {
                    if (element) mockupRef.current[index] = element;
                  }}
                  className="
                    relative flex w-full
                    items-center justify-center
                  "
                  style={{
                    perspective: "1000px",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Static scale wrapper */}

                  <div
                    className={`origin-center ${mockupScales[index]}`}
                  >
                    <Mockup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ThreeSlideHorizontal;

