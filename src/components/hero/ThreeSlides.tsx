import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      /*
       * ==================================================
       * INITIAL SLIDE POSITIONS
       * ==================================================
       */

      gsap.set(slidesRef.current, {
        xPercent: 100,
      });

      gsap.set(slidesRef.current[0], {
        xPercent: 0,
      });

      /*
       * ==================================================
       * INITIAL LEFT CONTENT
       * ==================================================
       */

      gsap.set(labelRef.current, {
        opacity: 0,
        x: -40,
        filter: "blur(8px)",
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        x: -50,
        filter: "blur(10px)",
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        x: -40,
        filter: "blur(8px)",
      });

      gsap.set(featuresRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 25,
      });

      /*
       * ==================================================
       * INITIAL RIGHT MOCKUPS
       * ==================================================
       */

      gsap.set(mockupRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.88,
        rotateY: -8,
        filter: "blur(6px)",
      });

      /*
       * ==================================================
       * FIRST SLIDE ENTRANCE
       * ==================================================
       */

      const firstSlide = gsap.timeline();

      firstSlide
        .to(labelRef.current[0], {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          titleRef.current[0],
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          descriptionRef.current[0],
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .to(
          featuresRef.current[0],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          buttonRef.current[0],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          mockupRef.current[0],
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );

      /*
       * ==================================================
       * MAIN SCROLL TIMELINE
       * ==================================================
       */

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
       * ==================================================
       * SLIDE 1 → SLIDE 2
       * ==================================================
       */

      timeline.to(
        slidesRef.current[0],
        {
          xPercent: -100,
          ease: "none",
        },
        0
      );

      timeline.to(
        slidesRef.current[1],
        {
          xPercent: 0,
          ease: "none",
        },
        0
      );

      /*
       * Slide 1 content exits
       */

      timeline.to(
        labelRef.current[0],
        {
          opacity: 0,
          x: -35,
          filter: "blur(6px)",
          duration: 0.25,
        },
        0
      );

      timeline.to(
        titleRef.current[0],
        {
          opacity: 0,
          x: -45,
          filter: "blur(8px)",
          duration: 0.3,
        },
        0
      );

      timeline.to(
        descriptionRef.current[0],
        {
          opacity: 0,
          x: -35,
          filter: "blur(6px)",
          duration: 0.25,
        },
        0
      );

      timeline.to(
        featuresRef.current[0],
        {
          opacity: 0,
          y: -20,
          duration: 0.25,
        },
        0
      );

      timeline.to(
        buttonRef.current[0],
        {
          opacity: 0,
          y: -20,
          duration: 0.25,
        },
        0
      );

      /*
       * Slide 1 mockup exits
       */

      timeline.to(
        mockupRef.current[0],
        {
          opacity: 0,
          x: -100,
          scale: 0.9,
          rotateY: 8,
          filter: "blur(6px)",
          duration: 0.35,
        },
        0
      );

      /*
       * ==================================================
       * SLIDE 2 CONTENT ENTER
       * ==================================================
       */

      timeline.to(
        labelRef.current[1],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "power3.out",
        },
        0.42
      );

      timeline.to(
        titleRef.current[1],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        },
        0.5
      );

      timeline.to(
        descriptionRef.current[1],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        },
        0.58
      );

      timeline.to(
        featuresRef.current[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        0.65
      );

      timeline.to(
        buttonRef.current[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        0.72
      );

      /*
       * Slide 2 mockup enters
       */

      timeline.to(
        mockupRef.current[1],
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        0.42
      );

      /*
       * ==================================================
       * SLIDE 2 → SLIDE 3
       * ==================================================
       */

      timeline.to(
        slidesRef.current[1],
        {
          xPercent: -100,
          ease: "none",
        },
        1
      );

      timeline.to(
        slidesRef.current[2],
        {
          xPercent: 0,
          ease: "none",
        },
        1
      );

      /*
       * Slide 2 content exits
       */

      timeline.to(
        labelRef.current[1],
        {
          opacity: 0,
          x: -35,
          filter: "blur(6px)",
          duration: 0.25,
        },
        1
      );

      timeline.to(
        titleRef.current[1],
        {
          opacity: 0,
          x: -45,
          filter: "blur(8px)",
          duration: 0.3,
        },
        1
      );

      timeline.to(
        descriptionRef.current[1],
        {
          opacity: 0,
          x: -35,
          filter: "blur(6px)",
          duration: 0.25,
        },
        1
      );

      timeline.to(
        featuresRef.current[1],
        {
          opacity: 0,
          y: -20,
          duration: 0.25,
        },
        1
      );

      timeline.to(
        buttonRef.current[1],
        {
          opacity: 0,
          y: -20,
          duration: 0.25,
        },
        1
      );

      /*
       * Slide 2 mockup exits
       */

      timeline.to(
        mockupRef.current[1],
        {
          opacity: 0,
          x: -100,
          scale: 0.9,
          rotateY: 8,
          filter: "blur(6px)",
          duration: 0.35,
        },
        1
      );

      /*
       * ==================================================
       * SLIDE 3 CONTENT ENTER
       * ==================================================
       */

      timeline.to(
        labelRef.current[2],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "power3.out",
        },
        1.42
      );

      timeline.to(
        titleRef.current[2],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        },
        1.5
      );

      timeline.to(
        descriptionRef.current[2],
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        },
        1.58
      );

      timeline.to(
        featuresRef.current[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        1.65
      );

      timeline.to(
        buttonRef.current[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        1.72
      );

      /*
       * Slide 3 mockup enters
       */

      timeline.to(
        mockupRef.current[2],
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        1.42
      );

      /*
       * ==================================================
       * CONTINUOUS MOCKUP FLOAT
       * ==================================================
       */

      mockupRef.current.forEach((mockup) => {
        gsap.to(mockup, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ================================================
          PRODUCT SHOWCASE
      ================================================= */}

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-white"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(element) => {
              if (element) {
                slidesRef.current[index] = element;
              }
            }}
            className="
              absolute
              inset-0
              h-screen
              w-full
              bg-navy-800/60
            "
          >
            <div
              className="
                mx-auto
                flex
                h-full
                w-full
                max-w-7xl
                items-center
                px-6
                md:px-10
                lg:px-16
              "
            >
              {/* ==========================================
                  LEFT CONTENT
              ========================================== */}

              <div
                ref={(element) => {
                  if (element) {
                    contentRef.current[index] = element;
                  }
                }}
                className="w-full md:w-1/2 md:pr-10 lg:pr-16"
              >
                {/* Label */}

                <p
                  ref={(element) => {
                    if (element) {
                      labelRef.current[index] = element;
                    }
                  }}
                  className="
                    mb-5
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-navy-800
                  "
                >
                  {slide.label}
                </p>

                {/* Title */}

                <h2
                  ref={(element) => {
                    if (element) {
                      titleRef.current[index] = element;
                    }
                  }}
                  className="
                    max-w-xl
                    text-4xl
                    font-bold
                    leading-tight
                    text-white
                    md:text-5xl
                    lg:text-6xl
                  "
                >
                  {slide.title}
                </h2>

                {/* Description */}

                <p
                  ref={(element) => {
                    if (element) {
                      descriptionRef.current[index] = element;
                    }
                  }}
                  className="
                    mt-6
                    max-w-lg
                    text-base
                    leading-7
                    text-white/70
                    md:text-lg
                  "
                >
                  {slide.description}
                </p>

                {/* Features */}

                <div
                  ref={(element) => {
                    if (element) {
                      featuresRef.current[index] = element;
                    }
                  }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <span
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-navy-800/40
                      px-4
                      py-2
                      text-sm
                      text-white/80
                      backdrop-blur-sm
                    "
                  >
                    Easy to use
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-navy-800/40
                      px-4
                      py-2
                      text-sm
                      text-white/80
                      backdrop-blur-sm
                    "
                  >
                    Scalable
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-navy-800/40
                      px-4
                      py-2
                      text-sm
                      text-white/80
                      backdrop-blur-sm
                    "
                  >
                    Real-time
                  </span>
                </div>

                {/* Button */}

                <button
                  ref={(element) => {
                    if (element) {
                      buttonRef.current[index] = element;
                    }
                  }}
                  className="
                    mt-8
                    rounded-full
                    bg-white
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-navy-800
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  Explore Platform
                </button>
              </div>

              {/* ==========================================
                  RIGHT MOCKUP
              ========================================== */}

              <div className="hidden w-1/2 items-center justify-center pl-8 md:flex lg:pl-12">
                <div
                  ref={(element) => {
                    if (element) {
                      mockupRef.current[index] = element;
                    }
                  }}
                  className="relative w-full max-w-2xl"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  {/* Browser */}

                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-navy-800/10
                      bg-white
                      shadow-[0_30px_80px_rgba(5,21,45,0.25)]
                    "
                  >
                    {/* Browser Header */}

                    <div
                      className="
                        flex
                        h-11
                        items-center
                        gap-2
                        border-b
                        border-navy-800/10
                        bg-gray-50
                        px-4
                      "
                    >
                      <div className="h-3 w-3 rounded-full bg-navy-800/20" />

                      <div className="h-3 w-3 rounded-full bg-navy-800/15" />

                      <div className="h-3 w-3 rounded-full bg-navy-800/10" />

                      <div
                        className="
                          ml-4
                          h-5
                          flex-1
                          rounded-md
                          bg-navy-800/5
                        "
                      />
                    </div>

                    {/* Dashboard */}

                    <div className="p-5">
                      {/* Header */}

                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <div className="h-5 w-32 rounded bg-navy-800/15" />

                          <div className="mt-2 h-3 w-48 rounded bg-navy-800/5" />
                        </div>

                        <div className="h-9 w-24 rounded-lg bg-navy-800/10" />
                      </div>

                      {/* Stats */}

                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="
                              rounded-xl
                              border
                              border-navy-800/5
                              bg-navy-800/[0.03]
                              p-4
                            "
                          >
                            <div className="h-3 w-20 rounded bg-navy-800/10" />

                            <div className="mt-3 h-7 w-16 rounded bg-navy-800/20" />
                          </div>
                        ))}
                      </div>

                      {/* Chart */}

                      <div
                        className="
                          mt-5
                          rounded-xl
                          border
                          border-navy-800/5
                          bg-navy-800/[0.03]
                          p-5
                        "
                      >
                        <div className="mb-5 h-4 w-28 rounded bg-navy-800/15" />

                        <div className="flex h-40 items-end gap-3">
                          <div className="h-[35%] flex-1 rounded-t bg-navy-800/10" />

                          <div className="h-[55%] flex-1 rounded-t bg-navy-800/15" />

                          <div className="h-[45%] flex-1 rounded-t bg-navy-800/10" />

                          <div className="h-[75%] flex-1 rounded-t bg-navy-800/20" />

                          <div className="h-[65%] flex-1 rounded-t bg-navy-800/15" />

                          <div className="h-[90%] flex-1 rounded-t bg-navy-800/25" />
                        </div>
                      </div>

                      {/* Bottom Cards */}

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div
                          className="
                            h-16
                            rounded-xl
                            border
                            border-navy-800/5
                            bg-navy-800/[0.03]
                          "
                        />

                        <div
                          className="
                            h-16
                            rounded-xl
                            border
                            border-navy-800/5
                            bg-navy-800/[0.03]
                          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Glow */}

                  <div
                    className="
                      absolute
                      -bottom-12
                      -right-12
                      -z-10
                      h-48
                      w-48
                      rounded-full
                      bg-navy-800/20
                      blur-3xl
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================================================
          NEXT COMPONENT
      ================================================= */}

      <section className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-navy-800/50">
            Next Section
          </p>

          <h2 className="mt-4 text-5xl font-bold text-navy-800">
            Continue Exploring
          </h2>
        </div>
      </section>
    </>
  );
};

export default ThreeSlideHorizontal;
