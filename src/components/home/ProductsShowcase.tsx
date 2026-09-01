import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { platformProducts } from '@/data/siteData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DashboardMockup } from '@/components/ui/DashboardMockup';
import { AnchorButton } from '@/components/ui/Button';

export function ProductsShowcase() {
  const [active, setActive] = useState(0);
  const product = platformProducts[active];

  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Products"
          title="One platform. Four connected products."
          subtitle="Explore each part of the RateBotAI ecosystem. Select a product to see what it does and how it looks."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {platformProducts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? 'bg-navy-900 text-white shadow-soft dark:bg-white dark:text-navy-900'
                  : 'border border-canvas-line text-navy-600 hover:border-navy-300 hover:text-navy-900 dark:border-navy-700 dark:text-navy-200 dark:hover:border-navy-500 dark:hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="eyebrow text-navy-400 dark:text-navy-300">{product.tagline}</p>
                <h3 className="mt-3 text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">{product.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-secondary">{product.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-navy-100">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <AnchorButton href="#contact" variant="secondary" iconRight={<ArrowRight size={16} />}>
                    Learn More
                  </AnchorButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <DashboardMockup active={product.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
