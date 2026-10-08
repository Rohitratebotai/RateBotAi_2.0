import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import CMSChatMockup from "../ui/CMSChatMockup";

interface DashboardMockupCMSNewProps {
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                              Animation timing                              */
/* -------------------------------------------------------------------------- */

const LOOP = {
  intro: 900,
  numbers: 4300,
  progress: 3000,
  donut: 3000,
  reset: 1100,
};

/* -------------------------------------------------------------------------- */
/*                               Animated Number                              */
/* -------------------------------------------------------------------------- */

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
  restartKey?: number;
  className?: string;
}

function AnimatedNumber({
  value,
  duration = 2600,
  decimals = 0,
  prefix = "",
  suffix = "",
  isInView,
  restartKey = 0,
  className = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView, restartKey]);

  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

function RevenueIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
    >
      <rect x="20" y="28" width="80" height="64" rx="12" stroke="currentColor" strokeWidth="7" />
      <circle cx="60" cy="60" r="16" stroke="currentColor" strokeWidth="7" />
      <path
        d="M60 48V72M54 54C54 50.5 57 48 60 48C63 48 66 50.5 66 54C66 58 63 60 60 60C57 60 54 62 54 66C54 69.5 57 72 60 72C63 72 66 69.5 66 66"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M31 42H37M83 42H89M31 78H37M83 78H89"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookingIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-11 w-11">
      <path d="M12 18H52V46H12V18Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 18V14M44 18V14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 27H52" stroke="currentColor" strokeWidth="4" />
      <path d="M22 36H42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-11 w-11">
      <path d="M12 50V14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 50H52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <rect x="20" y="32" width="7" height="14" rx="2" fill="currentColor" />
      <rect x="31" y="24" width="7" height="22" rx="2" fill="currentColor" />
      <rect x="42" y="16" width="7" height="30" rx="2" fill="currentColor" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-11 w-11">
      <path d="M10 46V24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M10 42H54V46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 32H54V42" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 32V25C18 23.3431 19.3431 22 21 22H28C29.6569 22 31 23.3431 31 25V32" stroke="currentColor" strokeWidth="4" />
      <path d="M54 32V46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function StopwatchIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-11 w-11">
      <circle cx="32" cy="36" r="18" stroke="currentColor" strokeWidth="4" />
      <path d="M32 18V10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 10H37" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 36V26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 36L39 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M47 21L51 17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-5 w-5">
      <path d="M20 7V31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 23L20 32L29 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UpArrowIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-5 w-5">
      <path d="M20 33V9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M11 17L20 8L29 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Metric Card                                     */
/* -------------------------------------------------------------------------- */

interface MetricCardProps {
  title: string;
  value: number;
  decimals?: number;
  prefix?: string;
  icon: ReactNode;
  iconClassName?: string;
  delay?: number;
  isInView: boolean;
  restartKey: number;
  accent?: boolean;
}

function MetricCard({
  title,
  value,
  decimals = 0,
  prefix = "",
  icon,
  iconClassName = "",
  delay = 0,
  isInView,
  restartKey,
  accent = false,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative overflow-hidden rounded-[28px] bg-white",
        "min-h-[165px] p-6 sm:p-7",
        "shadow-[0_10px_35px_rgba(15,23,42,0.05)]",
        accent ? "before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-[#101a35]" : "",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-400">{title}</p>
          <AnimatedNumber
            value={value}
            decimals={decimals}
            prefix={prefix}
            isInView={isInView}
            restartKey={restartKey}
            className="mt-3 block text-[27px] font-semibold tracking-tight text-[#111a33] sm:text-[30px]"
          />
        </div>
        <div className={`self-end ${iconClassName}`}>{icon}</div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Revenue Card                                  */
/* -------------------------------------------------------------------------- */

function RevenueCard({
  isInView,
  restartKey,
}: {
  isInView: boolean;
  restartKey: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -35 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[350px] overflow-hidden rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-8 lg:min-h-[350px] lg:p-9"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400">TOTAL REVENUE</p>
          <AnimatedNumber
            value={2875070.89}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            restartKey={restartKey}
            duration={3000}
            className="mt-4 block text-[35px] font-semibold tracking-[-0.04em] text-[#111a33] sm:text-[40px] lg:text-[43px]"
          />
        </div>

        <motion.div
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-slate-200"
        >
          <RevenueIcon />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-slate-100">
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">PAY AT HOTEL</p>
          <AnimatedNumber
            value={0}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            restartKey={restartKey}
            duration={2200}
            className="mt-2 block text-[17px] font-semibold text-[#111a33]"
          />
        </div>

        <div className="border-l border-slate-100 p-6 sm:p-7">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">PREPAID</p>
          <AnimatedNumber
            value={2875070.89}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            restartKey={restartKey}
            duration={3000}
            className="mt-2 block text-[17px] font-semibold text-[#111a33]"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Guest Summary Card                                 */
/* -------------------------------------------------------------------------- */

interface GuestSummaryCardProps {
  title: string;
  value: number;
  label: string;
  status: string;
  direction: "up" | "down";
  delay: number;
  isInView: boolean;
  restartKey: number;
}

function GuestSummaryCard({
  title,
  value,
  label,
  status,
  direction,
  delay,
  isInView,
  restartKey,
}: GuestSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[140px] items-center justify-between overflow-hidden rounded-[28px] bg-white px-6 py-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:px-8"
    >
      <div className="absolute left-0 top-0 h-full w-[5px] bg-[#101a35]" />

      <div className="flex items-center gap-5">
        <motion.div
          animate={isInView ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] text-[#77a8dc]"
        >
          {direction === "down" ? <DownArrowIcon /> : <UpArrowIcon />}
        </motion.div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.13em] text-slate-400">{title}</p>
          <AnimatedNumber
            value={value}
            isInView={isInView}
            restartKey={restartKey}
            className="mt-1 block text-[29px] font-semibold tracking-tight text-[#111a33]"
          />
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">{status}</p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Animated analytics charts                          */
/* -------------------------------------------------------------------------- */

const progressData = [
  { label: "Direct", value: 82 },
  { label: "OTA", value: 64 },
  { label: "Corporate", value: 48 },
  { label: "Other", value: 31 },
];

function ProgressBars({ active }: { active: boolean }) {
  return (
    <div className="mt-5 space-y-4">
      {progressData.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between text-[9px] font-semibold tracking-[0.08em] text-slate-400">
            <span>{item.label}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.08 + 0.25 }}
            >
              {item.value}%
            </motion.span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: `${item.value}%` } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full bg-[#101a35]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ active }: { active: boolean }) {
  const circumference = 2 * Math.PI * 42;
  const segments = [
    { value: 43, label: "Direct" },
    { value: 31, label: "OTA" },
    { value: 16, label: "Corporate" },
    { value: 10, label: "Other" },
  ];

  let accumulated = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[145px] w-[145px] shrink-0">
        <svg viewBox="0 0 110 110" className="-rotate-90 h-full w-full">
          <circle cx="55" cy="55" r="42" fill="none" stroke="#eef1f5" strokeWidth="11" />

          {segments.map((segment, index) => {
            const length = (segment.value / 100) * circumference;
            const dashOffset = -(accumulated / 100) * circumference;
            accumulated += segment.value;

            return (
              <motion.circle
                key={segment.label}
                cx="55"
                cy="55"
                r="42"
                fill="none"
                stroke={["#101a35", "#79a9df", "#72b38a", "#9a7bd1"][index]}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${length} ${circumference - length}`}
                initial={{ strokeDashoffset: circumference }}
                animate={
                  active
                    ? { strokeDashoffset: dashOffset }
                    : { strokeDashoffset: circumference }
                }
                transition={{
                  duration: 1,
                  delay: index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[9px] font-semibold tracking-[0.12em] text-slate-400">BOOKINGS</span>
          <span className="mt-1 text-xl font-semibold text-[#111a33]">2.4K</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.label}
            initial={{ opacity: 0, x: 8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ delay: index * 0.12 + 0.2 }}
            className="flex items-center gap-2"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: ["#101a35", "#79a9df", "#72b38a", "#9a7bd1"][index],
              }}
            />
            <span className="text-[10px] font-medium text-slate-500">{segment.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       Floating surrounding elements                        */
/* -------------------------------------------------------------------------- */

function FloatingActivityCard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -45, y: 20, scale: 0.88 }}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: -45, y: 20, scale: 0.88 }
      }
      transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-[16%] z-20 hidden w-[185px] -translate-x-[18%] overflow-hidden rounded-[22px] border border-white/80 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] lg:block xl:w-[210px]"
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-[0.13em] text-slate-400">RECENT ACTIVITY</p>
        <span className="h-2 w-2 rounded-full bg-[#72b38a]" />
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eef3fa] text-[10px] font-bold text-[#101a35]">
          RB
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#111a33]">New booking received</p>
          <p className="mt-1 text-[9px] leading-4 text-slate-400">Suite 204 · Direct booking</p>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          animate={visible ? { width: ["15%", "78%", "78%"] } : { width: "15%" }}
          transition={{ duration: 2.1, delay: 0.55, times: [0, 0.65, 1], ease: "easeOut" }}
          className="h-full rounded-full bg-[#101a35]"
        />
      </div>
    </motion.div>
  );
}

function FloatingInsightCard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 45, y: 20, scale: 0.88 }}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: 45, y: 20, scale: 0.88 }
      }
      transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-[12%] z-20 hidden w-[185px] translate-x-[18%] overflow-hidden rounded-[22px] border border-white/80 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.12)] lg:block xl:w-[210px]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.13em] text-slate-400">PROPERTY INSIGHT</p>
          <p className="mt-1 text-sm font-semibold text-[#111a33]">Revenue +18.4%</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef6f1] text-[#72b38a]">
          <UpArrowIcon />
        </div>
      </div>

      <div className="mt-5 flex h-14 items-end gap-1.5">
        {[30, 42, 35, 55, 48, 72, 64, 88].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={visible ? { height: `${height}%` } : { height: 0 }}
            transition={{ duration: 0.55, delay: 0.35 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-md bg-[#dce8f5]"
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between text-[8px] font-medium text-slate-400">
        <span>LAST 7 DAYS</span>
        <span>LIVE</span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export function DashboardMockupCMSNew({
  className = "",
}: DashboardMockupCMSNewProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(dashboardRef, {
    once: true,
    amount: 0.2,
  });

  const reduceMotion = useReducedMotion();

  const [compositionReady, setCompositionReady] = useState(false);
  const [phase, setPhase] = useState<"numbers" | "progress" | "donut">("numbers");
  const [restartKey, setRestartKey] = useState(0);

  /*
   * This is deliberately NOT a scroll-scrubbed animation.
   *
   * ScrollTrigger/useScroll is not used here. Entering the viewport starts
   * one short composition transition, then the dashboard animation loops
   * independently of scrolling.
   */
  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setCompositionReady(true);
      setPhase("numbers");
      return;
    }

    const introTimer = window.setTimeout(() => {
      setCompositionReady(true);
    }, 520);

    return () => window.clearTimeout(introTimer);
  }, [isInView, reduceMotion]);

  /*
   * Autonomous dashboard loop:
   * numbers → progress → donut → numbers → ...
   *
   * The loop starts only after the component has entered the viewport and
   * the surrounding composition has finished entering.
   */
  useEffect(() => {
    if (!isInView || !compositionReady || reduceMotion) return;

    let timer = 0;

    const run = () => {
      setPhase("numbers");

      timer = window.setTimeout(() => {
        setPhase("progress");

        timer = window.setTimeout(() => {
          setPhase("donut");

          timer = window.setTimeout(() => {
            setPhase("numbers");
            setRestartKey((key) => key + 1);

            timer = window.setTimeout(run, LOOP.reset);
          }, LOOP.donut);
        }, LOOP.progress);
      }, LOOP.numbers);
    };

    run();

    return () => window.clearTimeout(timer);
  }, [isInView, compositionReady, reduceMotion]);

  return (
    <div
      ref={dashboardRef}
      className={`relative w-full bg-black overflow-visible ${className}`}
    >
      {/* <FloatingActivityCard visible={compositionReady} />
      <FloatingInsightCard visible={compositionReady} /> */}
      <CMSChatMockup />

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
              opacity: 0,
              y: 35,
              scale: 0.985,
            }
        }
        animate={
          isInView
            ? {
              opacity: 1,
              y: 0,
              /*
               * The dashboard is intentionally reduced to 0.8x once its
               * composition becomes active, leaving room for the two
               * surrounding cards.
               */
              scale: compositionReady && !reduceMotion ? 0.6 : 1,
            }
            : {}
        }
        transition={{
          opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          scale: {
            duration: 0.9,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        style={{
          transformOrigin: "center center",
        }}
        className="relative z-10 w-full"
      >
        <div className="w-full rounded-[36px] bg-[#f4f6f9] p-3 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-4 lg:p-5">
          {/* ---------------------------------------------------------------- */}
          {/*                              Filters                             */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-4 flex min-h-[65px] flex-wrap items-center justify-between gap-3 rounded-[25px] bg-white px-3 py-3 shadow-[0_6px_25px_rgba(15,23,42,0.035)] sm:px-4"
          >
            <div className="flex items-center rounded-[18px] bg-[#f5f7fa] p-1">
              <button type="button" className="rounded-[14px] px-4 py-2 text-[11px] font-medium text-slate-400 transition">
                Today
              </button>
              <button type="button" className="rounded-[14px] px-4 py-2 text-[11px] font-medium text-slate-400 transition">
                MTD
              </button>
              <button type="button" className="rounded-[14px] bg-white px-4 py-2 text-[11px] font-semibold text-[#111a33] shadow-sm">
                YTD
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[15px] border border-slate-100 bg-white px-4 py-2.5 text-[11px] font-medium text-slate-500"
            >
              <span>Status: All</span>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* ---------------------------------------------------------------- */}
          {/*                         Main Dashboard                           */}
          {/* ---------------------------------------------------------------- */}

          <div className="relative min-h-[735px]">
            {/* COUNTER STATE */}
            <motion.div
              animate={{
                opacity: phase === "numbers" ? 1 : 0,
                scale: phase === "numbers" ? 1 : 0.985,
                y: phase === "numbers" ? 0 : -8,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: phase === "numbers" ? "auto" : "none" }}
            >
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <RevenueCard isInView={isInView} restartKey={restartKey} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <MetricCard
                    title="BOOKINGS"
                    value={200}
                    icon={<div className="text-[#79a9df]"><BookingIcon /></div>}
                    delay={0.1}
                    isInView={isInView}
                    restartKey={restartKey}
                  />
                  <MetricCard
                    title="ADR"
                    value={10195.29}
                    decimals={2}
                    prefix="₹"
                    icon={<div className="text-[#72b38a]"><ChartIcon /></div>}
                    delay={0.18}
                    isInView={isInView}
                    restartKey={restartKey}
                  />
                  <MetricCard
                    title="ROOM NIGHTS"
                    value={282}
                    icon={<div className="text-[#172039]"><BedIcon /></div>}
                    delay={0.26}
                    isInView={isInView}
                    restartKey={restartKey}
                  />
                  <MetricCard
                    title="LOS (AVG)"
                    value={1.41}
                    decimals={2}
                    icon={<div className="text-[#9a7bd1]"><StopwatchIcon /></div>}
                    delay={0.34}
                    isInView={isInView}
                    restartKey={restartKey}
                    accent
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <GuestSummaryCard
                  title="YEARLY ARRIVALS"
                  value={200}
                  label="GUESTS"
                  status="Expected"
                  direction="down"
                  delay={0.4}
                  isInView={isInView}
                  restartKey={restartKey}
                />
                <GuestSummaryCard
                  title="YEARLY DEPARTURES"
                  value={203}
                  label="GUESTS"
                  status="Scheduled"
                  direction="up"
                  delay={0.48}
                  isInView={isInView}
                  restartKey={restartKey}
                />
              </div>
            </motion.div>

            {/* GRAPH STATE — occupies exactly the same visual area */}
            <motion.div
              animate={{
                opacity: phase === "numbers" ? 0 : 1,
                scale: phase === "numbers" ? 0.985 : 1,
                y: phase === "numbers" ? 8 : 0,
              }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: phase === "numbers" ? "none" : "auto" }}
            >
              <div className="grid h-full grid-cols-1 gap-4 xl:grid-cols-2">
                {/* Progress chart */}
                <motion.div
                  animate={{
                    opacity: phase === "progress" ? 1 : 0.16,
                    scale: phase === "progress" ? 1 : 0.985,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400">
                        CHANNEL PERFORMANCE
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-tight text-[#111a33]">
                        Booking progress
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f2f5f9] px-3 py-1.5 text-[9px] font-semibold tracking-[0.08em] text-slate-500">
                      LIVE
                    </span>
                  </div>

                  {/* <div className="mt-9 space-y-7">
                    {progressData.map((item, index) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between">
                          <span className="text-[11px] font-semibold text-slate-500">{item.label}</span>
                          <motion.span
                            animate={{ opacity: phase === "progress" ? 1 : 0.35 }}
                            transition={{ duration: 0.4 }}
                            className="text-[11px] font-semibold text-[#111a33]"
                          >
                            {item.value}%
                          </motion.span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-[#eef1f5]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: phase === "progress" || phase === "donut"
                                ? `${item.value}%`
                                : "0%",
                            }}
                            transition={{
                              duration: 1.2,
                              delay: index * 0.14,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full rounded-full bg-[#101a35]"
                          />
                        </div>
                      </div>
                    ))}
                  </div> */}

                  {/* <div className="mt-9 flex items-center justify-between rounded-2xl bg-[#f7f8fa] px-5 py-4">
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.12em] text-slate-400">
                        TOTAL CONVERSION
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-[#111a33]">68.4%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-white p-2 shadow-sm">
                      <div className="h-full w-full rotate-45 rounded-full border-[5px] border-[#dce8f5] border-r-[#101a35] border-t-[#101a35]" />
                    </div>
                  </div> */}
                </motion.div>

                {/* Donut / pie chart */}
                <motion.div
                  animate={{
                    opacity: phase === "donut" ? 1 : 0.16,
                    scale: phase === "donut" ? 1 : 0.985,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-8"
                >
                  {/* <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400">
                        BOOKING MIX
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-tight text-[#111a33]">
                        Distribution by channel
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f2f5f9] px-3 py-1.5 text-[9px] font-semibold tracking-[0.08em] text-slate-500">
                      2026
                    </span>
                  </div> */}

                  {/* <div className="mt-7 flex items-center justify-center">
                    <DonutChart active={phase === "donut"} />
                  </div> */}

                  {/* <div className="mt-7 grid grid-cols-2 gap-3">
                    {[
                      ["Direct", "43%"],
                      ["OTA", "31%"],
                      ["Corporate", "16%"],
                      ["Other", "10%"],
                    ].map(([label, value], index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                          opacity: phase === "donut" ? 1 : 0,
                          y: phase === "donut" ? 0 : 8,
                        }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.45 }}
                        className="rounded-xl bg-[#f7f8fa] px-3 py-2.5"
                      >
                        <p className="text-[9px] font-medium text-slate-400">{label}</p>
                        <p className="mt-0.5 text-sm font-semibold text-[#111a33]">{value}</p>
                      </motion.div>
                    ))}
                  </div> */}
                </motion.div>
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default DashboardMockupCMSNew;