import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type ComponentType,
} from "framer-motion";

import { useRef, useState, useEffect } from "react";

import DashboardMockupCMS from "../ui/DashboardMockupCMS";
import DashboardMockupBMS from "../ui/DashboardMockupBMS";
import DashboardMockupPMS from "../ui/DashboardMockupPMS";

/* ============================================================================
   TYPES
============================================================================ */

interface MockupProps {
  className?: string;
}

interface Product {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  component: ComponentType<MockupProps>;
}

interface ProductShowcaseProps {
  products?: Product[];
  className?: string;
}

/* ============================================================================
   PRODUCTS
============================================================================ */

const defaultProducts: Product[] = [
  {
    id: "cms",

    eyebrow: "CMS",

    title: "Revenue intelligence, simplified.",

    description:
      "Monitor revenue, bookings, ADR, room nights and hotel performance from one intelligent dashboard.",

    features: [
      "Revenue analytics",
      "Booking insights",
      "ADR & LOS tracking",
      "Arrival & departure monitoring",
    ],

    component: DashboardMockupCMS,
  },

  {
    id: "bms",

    eyebrow: "BMS",

    title: "A better booking experience.",

    description:
      "Give guests a seamless journey from availability and room selection to checkout and confirmation.",

    features: [
      "Real-time availability",
      "Room selection",
      "Rate plans",
      "Secure checkout",
    ],

    component: DashboardMockupBMS,
  },

  {
    id: "pms",

    eyebrow: "PMS",

    title: "Complete hotel operations.",

    description:
      "Manage rooms, reservations, frontdesk operations and daily hotel workflows from one powerful platform.",

    features: [
      "Room management",
      "Reservation calendar",
      "Frontdesk operations",
      "Housekeeping workflows",
    ],

    component: DashboardMockupPMS,
  },
];

/* ============================================================================
   CHECK ICON
============================================================================ */

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#071b3d]">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-3 w-3 text-white"
      >
        <path
          d="M5 10L8.5 13.5L15 6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ============================================================================
   PRODUCT CONTENT
============================================================================ */

function ProductContent({
  product,
  index,
  active,
}: {
  product: Product;
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 35,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-0 flex items-center"
      style={{
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="w-full max-w-xl">
        {/* --------------------------------------------------------------- */}
        {/* NUMBER / EYEBROW                                                */}
        {/* --------------------------------------------------------------- */}

        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-10 bg-slate-300" />

          <span className="text-xs font-bold tracking-[0.22em] text-[#071b3d]">
            {product.eyebrow}
          </span>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* TITLE                                                            */}
        {/* --------------------------------------------------------------- */}

        <h2
          className="
            text-4xl
            font-semibold
            leading-[1.05]
            tracking-tight
            text-[#071b3d]

            sm:text-5xl

            lg:text-6xl
          "
        >
          {product.title}
        </h2>

        {/* --------------------------------------------------------------- */}
        {/* DESCRIPTION                                                      */}
        {/* --------------------------------------------------------------- */}

        <p
          className="
            mt-6
            max-w-lg
            text-base
            leading-7
            text-slate-500

            sm:text-lg
          "
        >
          {product.description}
        </p>

        {/* --------------------------------------------------------------- */}
        {/* FEATURES                                                         */}
        {/* --------------------------------------------------------------- */}

        <div className="mt-8 grid gap-3">
          {product.features.map((feature, featureIndex) => (
            <motion.div
              key={feature}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: active ? 1 : 0,
                x: active ? 0 : -15,
              }}
              transition={{
                duration: 0.4,
                delay: active ? featureIndex * 0.07 : 0,
              }}
              className="flex items-center gap-3"
            >
              <CheckIcon />

              <span className="text-sm leading-6 text-slate-600">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* --------------------------------------------------------------- */}
        {/* CTA                                                              */}
        {/* --------------------------------------------------------------- */}

        <motion.button
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 15,
          }}
          transition={{
            duration: 0.45,
            delay: active ? 0.25 : 0,
          }}
          className="
            mt-9
            rounded-full
            bg-[#071b3d]
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-slate-900/10
            transition-all
            hover:scale-[1.03]
            hover:shadow-xl
          "
        >
          Explore {product.eyebrow}

          <span className="ml-2">
            →
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   PROGRESS INDICATOR
============================================================================ */

function ProgressIndicator({
  products,
  activeIndex,
  onSelect,
}: {
  products: Product[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="
        fixed
        right-6
        top-1/2
        z-50
        hidden
        -translate-y-1/2

        lg:block
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-1
          rounded-full
          border
          border-slate-200
          bg-white/80
          p-2
          shadow-xl
          backdrop-blur-xl
        "
      >
        {products.map((product, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Go to ${product.eyebrow}`}
              className="
                group
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
              "
            >
              <motion.span
                animate={{
                  scale: active ? 1 : 0.65,
                  opacity: active ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#071b3d]
                "
              />

              {/* Tooltip */}
              <span
                className="
                  pointer-events-none
                  absolute
                  right-11
                  whitespace-nowrap
                  rounded-md
                  bg-[#071b3d]
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-white
                  opacity-0
                  shadow-lg
                  transition-opacity
                  group-hover:opacity-100
                "
              >
                {product.eyebrow}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN PRODUCT SHOWCASE
============================================================================ */

export default function ProductShowcase({
  products = defaultProducts,
  className = "",
}: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ========================================================================
     SCROLL PROGRESS

     IMPORTANT:
     The entire showcase is 3 viewport heights.
     
     CMS = 0 → 33%
     BMS = 33 → 66%
     PMS = 66 → 100%
  ======================================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
  });

  /* ========================================================================
     DETERMINE ACTIVE PRODUCT FROM SCROLL POSITION
  ======================================================================== */

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      const totalProducts = products.length;

      const index = Math.min(
        totalProducts - 1,
        Math.floor(value * totalProducts)
      );

      setActiveIndex(index);
    });

    return () => unsubscribe();
  }, [smoothProgress, products.length]);

  /* ========================================================================
     MOCKUP PARALLAX
  ======================================================================== */

  const mockupY = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [20, 0, -10, -20]
  );

  /* ========================================================================
     MOCKUP SCALE
  ======================================================================== */

  const mockupScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.96, 1, 1, 1, 0.96]
  );

  /* ========================================================================
     BACKGROUND MOVEMENT
  ======================================================================== */

  const backgroundY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "15%"]
  );

  /* ========================================================================
     SCROLL TO PRODUCT
  ======================================================================== */

  const scrollToProduct = (index: number) => {
    if (!sectionRef.current) {
      return;
    }

    const sectionTop =
      sectionRef.current.getBoundingClientRect().top +
      window.scrollY;

    const viewportHeight = window.innerHeight;

    const targetPosition =
      sectionTop + viewportHeight * index;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative
        bg-[#f8f8f6]

        ${className}
      `}
    >
      {/* ================================================================== */}
      {/*                                                                     */}
      {/* BACKGROUND                                                          */}
      {/*                                                                     */}
      {/* ================================================================== */}

      <motion.div
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[-10%]
            top-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-100/40
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            top-[40%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-indigo-100/30
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-10%]
            left-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-cyan-100/20
            blur-[130px]
          "
        />
      </motion.div>

      {/* ================================================================== */}
      {/*                                                                     */}
      {/* MAIN SCROLL AREA                                                    */}
      {/*                                                                     */}
      {/* IMPORTANT:                                                         */}
      {/*                                                                     */}
      {/* 3 PRODUCTS × 100vh = 300vh                                         */}
      {/*                                                                     */}
      {/* This is what prevents the empty space problem.                    */}
      {/*                                                                     */}
      {/* ================================================================== */}

      <div className="relative h-[300vh]">
        <div
          className="
            sticky
            top-0
            h-screen
            overflow-hidden
          "
        >
          {/* ================================================================ */}
          {/* MAIN CONTAINER                                                   */}
          {/* ================================================================ */}

          <div
            className="
              mx-auto
              flex
              h-full
              max-w-7xl
              flex-col
              px-6

              sm:px-8

              lg:px-12
            "
          >
            {/* ============================================================ */}
            {/* TOP INTRO                                                     */}
            {/* ============================================================ */}

            <div
              className="
                shrink-0
                pt-16

                sm:pt-20

                lg:pt-20
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <span
                  className="
                    text-xs
                    font-bold
                    tracking-[0.3em]
                    text-slate-400
                  "
                >
                  ONE PLATFORM
                </span>

                <h2
                  className="
                    mt-3
                    max-w-3xl
                    text-3xl
                    font-semibold
                    leading-tight
                    tracking-tight
                    text-[#071b3d]

                    sm:text-4xl

                    lg:text-5xl
                  "
                >
                  Everything your hotel
                  <br />

                  <span className="text-slate-400">
                    needs to run smarter.
                  </span>
                </h2>
              </motion.div>
            </div>

            {/* ============================================================ */}
            {/* SHOWCASE GRID                                                  */}
            {/* ============================================================ */}

            <div
              className="
                relative
                flex
                min-h-0
                flex-1
                items-center
              "
            >
              {/* ========================================================== */}
              {/* LEFT CONTENT                                                 */}
              {/* ========================================================== */}

              <div
                className="
                  relative
                  flex
                  h-full
                  w-full
                  items-center

                  lg:w-[42%]
                "
              >
                {products.map((product, index) => (
                  <ProductContent
                    key={product.id}
                    product={product}
                    index={index}
                    active={activeIndex === index}
                  />
                ))}
              </div>

              {/* ========================================================== */}
              {/* RIGHT MOCKUP                                                 */}
              {/* ========================================================== */}

              <div
                className="
                  relative
                  hidden
                  h-full
                  flex-1
                  items-center
                  justify-center

                  lg:flex
                "
              >
                <motion.div
                  style={{
                    y: mockupY,
                    scale: mockupScale,
                  }}
                  className="
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                  "
                >
                  {/* ------------------------------------------------------ */}
                  {/* GLOW                                                     */}
                  {/* ------------------------------------------------------ */}

                  <motion.div
                    className="
                      pointer-events-none
                      absolute
                      inset-10
                      -z-10
                      rounded-[50px]
                      bg-blue-100/40
                      blur-[90px]
                    "
                    animate={{
                      opacity: activeIndex >= 0 ? 1 : 0,
                    }}
                  />

                  {/* ------------------------------------------------------ */}
                  {/* MOCKUP                                                    */}
                  {/* ------------------------------------------------------ */}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={products[activeIndex].id}
                      initial={{
                        opacity: 0,
                        x: 70,
                        scale: 0.94,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: -70,
                        scale: 0.94,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                      "
                    >
                      {(() => {
                        const ActiveMockup =
                          products[activeIndex].component;

                        return (
                          <div
                            className="
                              flex
                              w-full
                              max-w-[900px]
                              items-center
                              justify-center
                            "
                          >
                            <ActiveMockup
                              className="
                                w-full
                                max-h-[70vh]
                              "
                            />
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* PROGRESS                                                         */}
          {/* ================================================================ */}

          <ProgressIndicator
            products={products}
            activeIndex={activeIndex}
            onSelect={scrollToProduct}
          />

          {/* ================================================================ */}
          {/* MOBILE MOCKUP                                                    */}
          {/* ================================================================ */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              px-6
              pb-8

              lg:hidden
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={products[activeIndex].id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  mx-auto
                  max-h-[35vh]
                  max-w-xl
                  overflow-hidden
                  rounded-2xl
                "
              >
                {(() => {
                  const ActiveMockup =
                    products[activeIndex].component;

                  return (
                    <ActiveMockup className="w-full" />
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}