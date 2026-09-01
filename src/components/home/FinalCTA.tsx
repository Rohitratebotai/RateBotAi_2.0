import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { finalCta } from '@/data/siteData';
import { AnchorButton } from '@/components/ui/Button';
import { useInView } from '@/hooks/useInView';

export function FinalCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container-px">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-4xl bg-navy-900 px-6 py-16 text-center shadow-glow sm:px-12 lg:py-24"
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-navy-200">
              {finalCta.subtitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AnchorButton
                href={finalCta.primaryCta.href}
                size="lg"
                className="!bg-white !text-navy-900 hover:!bg-navy-100"
                iconRight={<ArrowRight size={18} />}
              >
                {finalCta.primaryCta.label}
              </AnchorButton>
              <AnchorButton
                href={finalCta.secondaryCta.href}
                size="lg"
                variant="secondary"
                className="!border-white/30 !text-white hover:!bg-white/10 hover:!border-white/50"
              >
                {finalCta.secondaryCta.label}
              </AnchorButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
