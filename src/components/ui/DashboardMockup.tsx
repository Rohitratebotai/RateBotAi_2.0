import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

type Props = {
  active: string;
  className?: string;
};

function MiniStat({ label, value, trend, trendUp = true }: { label: string; value: string; trend: string; trendUp?: boolean }) {
  return (
    <div className="rounded-xl border border-canvas-line bg-canvas px-4 py-3 dark:border-navy-700 dark:bg-navy-800">
      <p className="text-2xs font-medium uppercase tracking-wider text-tertiary">{label}</p>
      <p className="mt-1 text-lg font-bold text-navy-900 dark:text-white">{value}</p>
      <p className={`mt-0.5 text-2xs font-semibold ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
        {trend}
      </p>
    </div>
  );
}

function Bar({ height, delay, active }: { height: number; delay: number; active: boolean }) {
  return (
    <motion.div
      initial={active ? { height: 0, opacity: 0 } : {}}
      animate={active ? { height: `${height}%`, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-t-md bg-gradient-to-t from-navy-700 to-navy-400 dark:from-navy-300 dark:to-navy-500"
    />
  );
}

function LineChart({ active, variant = 'revenue' }: { active: boolean; variant?: string }) {
  const paths: Record<string, string> = {
    revenue: 'M0,140 C40,120 80,60 120,80 C160,100 200,40 240,50 C280,60 320,20 360,30',
    occupancy: 'M0,120 C40,130 80,90 120,100 C160,110 200,70 240,80 C280,90 320,50 360,60',
    bookings: 'M0,100 C40,80 80,110 120,90 C160,70 200,100 240,60 C280,40 320,70 360,40',
    pricing: 'M0,80 C40,100 80,60 120,70 C160,80 200,40 240,50 C280,60 320,30 360,20',
  };
  return (
    <svg viewBox="0 0 360 160" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${paths[variant]} L360,160 L0,160 Z`}
        fill={`url(#grad-${variant})`}
        className="text-navy-500 dark:text-navy-300"
        initial={active ? { opacity: 0 } : {}}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={paths[variant]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-navy-700 dark:text-white"
        initial={active ? { pathLength: 0 } : {}}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

const views: Record<string, { title: string; stats: { label: string; value: string; trend: string; up?: boolean }[]; chart: string; bars: number[] }> = {
  pms: {
    title: 'Operations Overview',
    stats: [
      { label: 'Occupancy', value: '87%', trend: '+4.2% wk', up: true },
      { label: 'Arrivals', value: '42', trend: 'Today' },
      { label: 'Departures', value: '38', trend: 'Today' },
      { label: 'Housekeeping', value: '21', trend: 'In progress' },
    ],
    chart: 'occupancy',
    bars: [40, 65, 50, 80, 60, 90, 70],
  },
  'channel-manager': {
    title: 'Channel Distribution',
    stats: [
      { label: 'Active OTAs', value: '12', trend: 'All synced' },
      { label: 'Rate Parity', value: '99%', trend: 'Healthy' },
      { label: 'Reservations', value: '156', trend: '+12 today', up: true },
      { label: 'Overbooking', value: '0', trend: 'Prevented' },
    ],
    chart: 'revenue',
    bars: [55, 70, 45, 85, 75, 95, 80],
  },
  'booking-engine': {
    title: 'Direct Bookings',
    stats: [
      { label: 'Direct Revenue', value: '₹4.2L', trend: '+18% mo', up: true },
      { label: 'Conversion', value: '3.8%', trend: '+0.6%', up: true },
      { label: 'Mobile', value: '64%', trend: 'Of bookings' },
      { label: 'Avg. Value', value: '₹6,200', trend: 'Per stay' },
    ],
    chart: 'bookings',
    bars: [30, 50, 65, 55, 80, 70, 95],
  },
  'dynamic-pricing': {
    title: 'Revenue Optimization',
    stats: [
      { label: 'Avg. Rate', value: '₹4,850', trend: '+9.4%', up: true },
      { label: 'ADR Lift', value: '+12%', trend: 'vs static', up: true },
      { label: 'Demand', value: 'High', trend: 'Weekend' },
      { label: 'RevPAR', value: '₹4,220', trend: '+15%', up: true },
    ],
    chart: 'pricing',
    bars: [60, 75, 50, 90, 65, 100, 85],
  },
};

export function DashboardMockup({ active, className = '' }: Props) {
  const view = views[active] ?? views.pms;

  return (
    <div className={`surface relative overflow-hidden rounded-4xl shadow-glow ${className}`}>
      <div className="flex items-center justify-between border-b border-canvas-line px-5 py-3.5 dark:border-navy-700">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-2xs font-medium uppercase tracking-wider text-tertiary">
          ratebotai.com/dashboard
        </span>
        <span className="h-2.5 w-12" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <motion.p
              key={view.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold text-navy-900 dark:text-white"
            >
              {view.title}
            </motion.p>
            <p className="mt-0.5 text-2xs text-tertiary">Last 7 days</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-canvas-line px-3 py-1 text-2xs font-medium text-secondary dark:border-navy-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {view.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            >
              <MiniStat label={s.label} value={s.value} trend={s.trend} trendUp={s.up} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-canvas-line bg-canvas p-4 dark:border-navy-700 dark:bg-navy-800">
            <div className="flex items-center justify-between">
              <p className="text-2xs font-semibold uppercase tracking-wider text-tertiary">Performance</p>
              <span className="text-2xs text-tertiary">₹ thousands</span>
            </div>
            <div className="mt-3 h-32">
              <LineChart active variant={view.chart} />
            </div>
          </div>
          <div className="rounded-xl border border-canvas-line bg-canvas p-4 dark:border-navy-700 dark:bg-navy-800">
            <p className="text-2xs font-semibold uppercase tracking-wider text-tertiary">Weekly trend</p>
            <div className="mt-3 flex h-32 items-end gap-2">
              {view.bars.map((h, i) => (
                <div key={i} className="flex h-full flex-1 items-end">
                  <Bar height={h} delay={0.1 + i * 0.08} active />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
