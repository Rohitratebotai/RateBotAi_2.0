
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  {
    name: "Booking",
    short: "B",
    position: "left-[2%] top-[10%]",
  },
  {
    name: "Expedia",
    short: "E",
    position: "right-[2%] top-[10%]",
  },
  {
    name: "Airbnb",
    short: "A",
    position: "left-[2%] bottom-[10%]",
  },
  {
    name: "Agoda",
    short: "A",
    position: "right-[2%] bottom-[10%]",
  },
];

const ChannelDistributionNetwork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          scale: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        coreRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.to(coreRef.current, {
        scale: 1.04,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      dotsRef.current.forEach((dot, index) => {
        gsap.to(dot, {
          x: index % 2 === 0 ? 180 : -180,
          y: index % 3 === 0 ? 70 : -70,
          duration: 2.2 + index * 0.2,
          repeat: -1,
          ease: "none",
          delay: index * 0.35,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-6 py-32 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#05152D]/10 bg-[#EAF0F7] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#05152D]" />

            <span className="text-xs font-semibold tracking-[0.16em] text-[#05152D]">
              CHANNEL DISTRIBUTION
            </span>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-[#05152D] sm:text-5xl lg:text-6xl">
            One inventory.
            <span className="block text-[#163A5F]">
              Multiple channels.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#0B2345]/60 sm:text-lg">
            Keep your property distribution connected while managing your
            inventory from one centralized platform.
          </p>
        </div>

        {/* Network */}

        <div className="relative mx-auto mt-20 h-[560px] max-w-6xl">
          {/* Lines */}

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 560"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M120 105 C300 105 350 250 500 280"
              stroke="#05152D"
              strokeOpacity="0.10"
              strokeWidth="2"
            />

            <path
              d="M880 105 C700 105 650 250 500 280"
              stroke="#05152D"
              strokeOpacity="0.10"
              strokeWidth="2"
            />

            <path
              d="M120 455 C300 455 350 320 500 280"
              stroke="#05152D"
              strokeOpacity="0.10"
              strokeWidth="2"
            />

            <path
              d="M880 455 C700 455 650 320 500 280"
              stroke="#05152D"
              strokeOpacity="0.10"
              strokeWidth="2"
            />
          </svg>

          {/* Moving Data */}

          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              ref={(el) => {
                if (el) dotsRef.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#05152D] shadow-[0_0_15px_rgba(5,21,45,0.45)]"
            />
          ))}

          {/* Channel Cards */}

          {channels.map((channel, index) => (
            <div
              key={`${channel.name}-${index}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`absolute ${channel.position} w-52`}
            >
              <div className="group rounded-2xl border border-[#05152D]/10 bg-white p-5 shadow-[0_15px_45px_rgba(5,21,45,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-[#05152D]/25 hover:shadow-[0_25px_60px_rgba(5,21,45,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#05152D] text-sm font-bold text-white">
                    {channel.short}
                  </div>

                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#163A5F]/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#05152D]" />
                    CONNECTED
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold text-[#05152D]">
                  {channel.name}
                </h3>

                <p className="mt-1 text-xs text-[#163A5F]/50">
                  Inventory synchronized
                </p>

                <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#EAF0F7]">
                  <div className="h-full w-full rounded-full bg-[#05152D]" />
                </div>
              </div>
            </div>
          ))}

          {/* Central Platform */}

          <div
            ref={coreRef}
            className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#05152D] shadow-[0_30px_90px_rgba(5,21,45,0.25)]"
          >
            <div className="absolute inset-3 rounded-full border border-white/10" />

            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight text-white">
                RateBotAI
              </div>

              <div className="mt-2 text-[9px] font-semibold tracking-[0.22em] text-white/45">
                CHANNEL MANAGER
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}

        <div className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-3 rounded-full border border-[#05152D]/10 bg-[#F7FAFD] px-5 py-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#05152D] text-xs text-white">
            ✓
          </span>

          <span className="text-sm font-medium text-[#05152D]">
            Centralized inventory. Connected distribution.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ChannelDistributionNetwork;

