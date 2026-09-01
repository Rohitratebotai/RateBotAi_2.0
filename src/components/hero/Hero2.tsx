import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  LayoutGrid,
  Radio,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AnchorButton } from '@/components/ui/Button';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const float: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease } },
};

type MetricCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: string;
  className?: string;
  delay?: number;
};

function MetricCard({ icon, label, value, prefix, suffix, trend, className = '', delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      variants={float}
      transition={{ delay }}
      className={`surface rounded-2xl p-4 shadow-soft ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-white dark:bg-white dark:text-navy-900">
          {icon}
        </span>
        <span className="text-2xs font-semibold uppercase tracking-[0.14em] text-tertiary">
          {label}
        </span>
      </div>
      <div className="mt-2.5 flex items-end justify-between">
        <span className="text-2xl font-extrabold tracking-tight text-navy-900 dark:text-white">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} duration={1600} />
        </span>
        {trend && (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={13} />
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}

type FloatingBadgeProps = {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  className?: string;
  delay?: number;
};

function FloatingBadge({ icon, label, sublabel, className = '', delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      variants={float}
      transition={{ delay }}
      className={`surface absolute flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-card ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-700 dark:text-navy-100">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-xs font-bold text-navy-900 dark:text-white">{label}</p>
        <p className="text-2xs text-tertiary">{sublabel}</p>
      </div>
    </motion.div>
  );
}

function DashboardVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-navy-200/30 via-transparent to-transparent blur-2xl dark:from-navy-500/20" />

      {/* Main dashboard card */}
      <div className="surface rounded-4xl p-6 shadow-card sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-sm font-extrabold text-white dark:bg-white dark:text-navy-900">
              R
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-navy-900 dark:text-white">RateBotAI</p>
              <p className="text-2xs text-tertiary">Hotel Performance</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-2xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        {/* Revenue bar chart */}
        <div className="mt-6 rounded-2xl border border-canvas-line bg-canvas-subtle p-4 dark:border-navy-700 dark:bg-navy-800/50">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-semibold uppercase tracking-[0.14em] text-tertiary">
              Revenue
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={13} />
              +18.2%
            </span>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {[42, 58, 45, 68, 52, 74, 61, 82, 70, 90, 78, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.05, ease }}
                className="flex-1 rounded-t bg-navy-900 dark:bg-white"
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
        </div>

        {/* Metric cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard
            icon={<BedDouble size={15} />}
            label="Occupancy"
            value={84}
            suffix="%"
            trend="+5.4%"
            delay={0.7}
          />
          <MetricCard
            icon={<CalendarCheck size={15} />}
            label="Bookings"
            value={24}
            trend="+24.8%"
            delay={0.78}
          />
          <MetricCard
            icon={<Users size={15} />}
            label="Availability"
            value={92}
            suffix=" rooms"
            delay={0.86}
          />
          <MetricCard
            icon={<TrendingUp size={15} />}
            label="ADR"
            value={4280}
            prefix="₹"
            delay={0.94}
          />
        </div>
      </div>

      {/* Floating module badges */}
      <FloatingBadge
        icon={<LayoutGrid size={15} />}
        label="PMS"
        sublabel="Operations"
        className="-left-6 top-8 sm:-left-10"
        delay={1}
      />
      <FloatingBadge
        icon={<Radio size={15} />}
        label="Channel Manager"
        sublabel="Distribution"
        className="-right-4 top-24 sm:-right-8"
        delay={1.1}
      />
      <FloatingBadge
        icon={<CalendarCheck size={15} />}
        label="Booking Engine"
        sublabel="Direct Bookings"
        className="-left-4 bottom-20 sm:-left-8"
        delay={1.2}
      />
      <FloatingBadge
        icon={<TrendingUp size={15} />}
        label="Dynamic Pricing"
        sublabel="Revenue"
        className="-right-2 bottom-6 sm:-right-6"
        delay={1.3}
      />
    </motion.div>
  );
}

export function Hero2() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-dots mask-fade-b" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-canvas-subtle/60 to-transparent dark:from-navy-800/40" />

      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl lg:max-w-none"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-canvas-line bg-canvas px-4 py-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-navy-500 shadow-soft dark:border-navy-700 dark:bg-navy-800 dark:text-navy-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-navy-400" />
              Hospitality Technology Platform
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 dark:text-white sm:text-5xl lg:text-[3.5rem]"
            >
              One Platform.
              <br />
              <span className="gradient-text">Smarter Hotel Operations.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-lg leading-relaxed text-secondary"
            >
              Power your hotel&rsquo;s booking, property, and business operations with intelligent
              hospitality technology built for modern hoteliers.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <AnchorButton href="#platform" size="lg" iconRight={<ArrowRight size={18} />}>
                Explore Our Platform
              </AnchorButton>
              <AnchorButton href="#contact" size="lg" variant="secondary">
                Book a Demo
              </AnchorButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex items-center gap-6 border-t border-canvas-line pt-6 text-sm dark:border-navy-700"
            >
              <div>
                <p className="text-2xl font-extrabold text-navy-900 dark:text-white">4</p>
                <p className="text-tertiary">Connected Modules</p>
              </div>
              <div className="h-8 w-px bg-canvas-line dark:bg-navy-700" />
              <div>
                <p className="text-2xl font-extrabold text-navy-900 dark:text-white">24/7</p>
                <p className="text-tertiary">Real-Time Sync</p>
              </div>
              <div className="h-8 w-px bg-canvas-line dark:bg-navy-700" />
              <div>
                <p className="text-2xl font-extrabold text-navy-900 dark:text-white">100%</p>
                <p className="text-tertiary">Cloud Platform</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: product visual */}
          <div className="relative">
            <DashboardVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
