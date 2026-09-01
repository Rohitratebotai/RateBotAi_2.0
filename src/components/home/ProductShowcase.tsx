import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ImageOff } from 'lucide-react';
import { productShowcaseData, type ProductShowcaseItem } from '@/data/productShowcaseData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnchorButton } from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

function ProductTabs({
  products,
  activeId,
  onSelect,
}: {
  products: ProductShowcaseItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {products.map((p) => {
        const active = p.id === activeId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`group flex flex-col items-center rounded-2xl border px-5 py-3 text-center transition-all duration-300 ${
              active
                ? 'border-navy-900 bg-navy-900 text-white shadow-soft dark:border-white dark:bg-white dark:text-navy-900'
                : 'border-canvas-line bg-canvas text-navy-600 hover:border-navy-300 hover:text-navy-900 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200 dark:hover:border-navy-500 dark:hover:text-white'
            }`}
          >
            <span className="text-sm font-bold tracking-tight">{p.shortName}</span>
            <span
              className={`mt-0.5 text-2xs font-medium ${
                active
                  ? 'text-navy-200 dark:text-navy-700'
                  : 'text-tertiary'
              }`}
            >
              {p.name.split(' ').slice(0, -1).join(' ')}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DashboardImage({ product }: { product: ProductShowcaseItem }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-canvas-line bg-canvas-subtle shadow-card dark:border-navy-700 dark:bg-navy-800">
      {/* Browser frame */}
      <div className="flex items-center gap-2 border-b border-canvas-line bg-canvas px-4 py-3 dark:border-navy-700 dark:bg-navy-800/80">
        <span className="h-2.5 w-2.5 rounded-full bg-navy-200 dark:bg-navy-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-200 dark:bg-navy-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-200 dark:bg-navy-600" />
        <span className="ml-3 hidden truncate rounded-md bg-canvas-subtle px-3 py-1 text-2xs text-tertiary sm:block dark:bg-navy-700/50">
          app.ratebotai.com/{product.id}
        </span>
      </div>
      {/* Image / placeholder */}
      <div className="relative aspect-[16/10] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-0"
          >
            {!errored ? (
              <img
                src={product.image}
                alt={`${product.name} dashboard`}
                loading="lazy"
                onError={() => setErrored(true)}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-tertiary">
                <ImageOff size={32} />
                <p className="text-sm font-medium">Dashboard screenshot coming soon</p>
                <p className="text-2xs text-tertiary">{product.image}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [activeId, setActiveId] = useState(productShowcaseData[0].id);
  const product = productShowcaseData.find((p) => p.id === activeId) ?? productShowcaseData[0];

  return (
    <section id="product-showcase" className="bg-canvas-subtle py-20 dark:bg-navy-950/50 lg:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our Hospitality Platform"
          title="Powerful Tools. One Connected Platform."
          subtitle="Everything your property needs to manage operations, bookings, and business workflows from one connected hospitality platform."
        />

        <div className="mt-12">
          <ProductTabs
            products={productShowcaseData}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Left: product info */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease }}
              >
                <h3 className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white sm:text-3xl">
                  {product.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-secondary">
                  {product.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-navy-700 dark:text-navy-100">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-900">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <AnchorButton href={product.ctaLink} variant="secondary" iconRight={<ArrowRight size={16} />}>
                    {product.ctaText}
                  </AnchorButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: dashboard image */}
          <div className="order-1 lg:order-2">
            <DashboardImage product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
