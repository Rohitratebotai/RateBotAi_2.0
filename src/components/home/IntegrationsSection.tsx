import { motion } from "framer-motion";
import { integrations } from "@/data/siteData";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntegrationsSection() {
  const nodes = integrations.nodes;
  const center = nodes[0];
  const ring = nodes.slice(1);

  const centerX = 200;
  const centerY = 180;
  const radius = 145;

  return (
    <section className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={integrations.eyebrow}
          title={integrations.title}
          subtitle={integrations.subtitle}
        />

        {/* Integration Diagram */}
        <div
          className="
            mx-auto
            mt-14
            w-full
            max-w-4xl
            lg:mt-20
          "
        >
          <div
            className="
              relative
              mx-auto
              aspect-[400/380]
              w-full
              max-w-2xl
            "
          >
            {/* Connection Lines */}
            <svg
              viewBox="0 0 400 380"
              className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                overflow-visible
              "
              aria-hidden="true"
            >
              {ring.map((node, i) => {
                const angle =
                  (i / ring.length) * 2 * Math.PI - Math.PI / 2;

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                return (
                  <motion.line
                    key={node}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    className="text-navy-300 dark:text-navy-600"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                      opacity: 1,
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Center Node */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="
                absolute
                left-[42%]
                top-[40%]
                z-20
                flex
                h-24
                w-24
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-2xl
                bg-navy-900
                px-2
                text-center
                text-sm
                font-bold
                text-white
                shadow-card
                dark:bg-white
                dark:text-navy-900
                sm:h-28
                sm:w-28
              "
            >
              {center}
            </motion.div>

            {/* Outer Nodes */}
            {ring.map((node, i) => {
              const angle =
                (i / ring.length) * 2 * Math.PI - Math.PI / 2;

              const x = 43 + (radius / 4) * Math.cos(angle);
              const y = 43 + (radius / 3.8) * Math.sin(angle);

              return (
                <motion.div
                  key={node}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  className="
                    surface
                    absolute
                    z-10
                    flex
                    min-h-10
                    min-w-[100px]
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-xl
                    px-3
                    py-2
                    text-center
                    text-2xs
                    font-semibold
                    text-navy-900
                    shadow-soft
                    dark:text-white
                    sm:min-h-11
                    sm:min-w-[100px]
                    sm:px-4
                    sm:text-xs
                  "
                >
                  {node}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}