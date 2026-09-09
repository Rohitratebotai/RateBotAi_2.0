import { motion, useInView } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DashboardMockupCMSProps {
  className?: string;
}

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
  className?: string;
}

function AnimatedNumber({
  value,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  isInView,
  className = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

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
      <rect
        x="20"
        y="28"
        width="80"
        height="64"
        rx="12"
        stroke="currentColor"
        strokeWidth="7"
      />

      <circle
        cx="60"
        cy="60"
        r="16"
        stroke="currentColor"
        strokeWidth="7"
      />

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
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-11 w-11"
    >
      <path
        d="M12 18H52V46H12V18Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <path
        d="M20 18V14M44 18V14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M12 27H52"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        d="M22 36H42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-11 w-11"
    >
      <path
        d="M12 50V14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M12 50H52"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <rect
        x="20"
        y="32"
        width="7"
        height="14"
        rx="2"
        fill="currentColor"
      />

      <rect
        x="31"
        y="24"
        width="7"
        height="22"
        rx="2"
        fill="currentColor"
      />

      <rect
        x="42"
        y="16"
        width="7"
        height="30"
        rx="2"
        fill="currentColor"
      />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-11 w-11"
    >
      <path
        d="M10 46V24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M10 42H54V46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 32H54V42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <path
        d="M18 32V25C18 23.3431 19.3431 22 21 22H28C29.6569 22 31 23.3431 31 25V32"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        d="M54 32V46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StopwatchIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-11 w-11"
    >
      <circle
        cx="32"
        cy="36"
        r="18"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        d="M32 18V10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M27 10H37"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M32 36V26"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M32 36L39 40"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M47 21L51 17"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M20 7V31"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M11 23L20 32L29 23"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpArrowIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M20 33V9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M11 17L20 8L29 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Metric Card                                   */
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
  accent = false,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "relative overflow-hidden rounded-[28px] bg-white",
        "min-h-[165px] p-6 sm:p-7",
        "shadow-[0_10px_35px_rgba(15,23,42,0.05)]",
        accent
          ? "before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-[#101a35]"
          : "",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-400">
            {title}
          </p>

          <AnimatedNumber
            value={value}
            decimals={decimals}
            prefix={prefix}
            isInView={isInView}
            className="mt-3 block text-[27px] font-semibold tracking-tight text-[#111a33] sm:text-[30px]"
          />
        </div>

        <div className={`self-end ${iconClassName}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Revenue Card                                    */
/* -------------------------------------------------------------------------- */

function RevenueCard({
  isInView,
}: {
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -35 }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[350px] overflow-hidden rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:p-8 lg:min-h-[350px] lg:p-9"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400">
            TOTAL REVENUE
          </p>

          <AnimatedNumber
            value={2875070.89}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            duration={1500}
            className="mt-4 block text-[35px] font-semibold tracking-[-0.04em] text-[#111a33] sm:text-[40px] lg:text-[43px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
              : {}
          }
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="text-slate-200"
        >
          <RevenueIcon />
        </motion.div>
      </div>

      {/* Bottom Revenue Split */}
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-slate-100">
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">
            PAY AT HOTEL
          </p>

          <AnimatedNumber
            value={0}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            duration={900}
            className="mt-2 block text-[17px] font-semibold text-[#111a33]"
          />
        </div>

        <div className="border-l border-slate-100 p-6 sm:p-7">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400">
            PREPAID
          </p>

          <AnimatedNumber
            value={2875070.89}
            decimals={2}
            prefix="₹"
            isInView={isInView}
            duration={1500}
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
}

function GuestSummaryCard({
  title,
  value,
  label,
  status,
  direction,
  delay,
  isInView,
}: GuestSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex min-h-[140px] items-center justify-between overflow-hidden rounded-[28px] bg-white px-6 py-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:px-8"
    >
      {/* Left accent */}
      <div className="absolute left-0 top-0 h-full w-[5px] bg-[#101a35]" />

      <div className="flex items-center gap-5">
        <motion.div
          animate={
            isInView
              ? {
                  y: [0, -4, 0],
                }
              : {}
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] text-[#77a8dc]"
        >
          {direction === "down" ? (
            <DownArrowIcon />
          ) : (
            <UpArrowIcon />
          )}
        </motion.div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.13em] text-slate-400">
            {title}
          </p>

          <AnimatedNumber
            value={value}
            isInView={isInView}
            className="mt-1 block text-[29px] font-semibold tracking-tight text-[#111a33]"
          />
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {status}
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */

export function DashboardMockupCMS({
  className = "",
}: DashboardMockupCMSProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(dashboardRef, {
    once: true,
    amount: 0.18,
  });

  return (
    <div
      ref={dashboardRef}
      className={`w-full ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.985,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full rounded-[36px] bg-[#f4f6f9] p-3 sm:p-4 lg:p-5"
      >
        {/* ---------------------------------------------------------------- */}
        {/*                              Filters                             */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="mb-4 flex min-h-[65px] flex-wrap items-center justify-between gap-3 rounded-[25px] bg-white px-3 py-3 shadow-[0_6px_25px_rgba(15,23,42,0.035)] sm:px-4"
        >
          {/* Period Selector */}
          <div className="flex items-center rounded-[18px] bg-[#f5f7fa] p-1">
            <button
              type="button"
              className="rounded-[14px] px-4 py-2 text-[11px] font-medium text-slate-400 transition"
            >
              Today
            </button>

            <button
              type="button"
              className="rounded-[14px] px-4 py-2 text-[11px] font-medium text-slate-400 transition"
            >
              MTD
            </button>

            <button
              type="button"
              className="rounded-[14px] bg-white px-4 py-2 text-[11px] font-semibold text-[#111a33] shadow-sm"
            >
              YTD
            </button>
          </div>

          {/* Status */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-[15px] border border-slate-100 bg-white px-4 py-2.5 text-[11px] font-medium text-slate-500"
          >
            <span>Status: All</span>

            <svg
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5"
              fill="none"
            >
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
        {/*                         Main Dashboard                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {/* Revenue */}
          <RevenueCard isInView={isInView} />

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricCard
              title="BOOKINGS"
              value={200}
              icon={
                <div className="text-[#79a9df]">
                  <BookingIcon />
                </div>
              }
              delay={0.1}
              isInView={isInView}
            />

            <MetricCard
              title="ADR"
              value={10195.29}
              decimals={2}
              prefix="₹"
              icon={
                <div className="text-[#72b38a]">
                  <ChartIcon />
                </div>
              }
              delay={0.18}
              isInView={isInView}
            />

            <MetricCard
              title="ROOM NIGHTS"
              value={282}
              icon={
                <div className="text-[#172039]">
                  <BedIcon />
                </div>
              }
              delay={0.26}
              isInView={isInView}
            />

            <MetricCard
              title="LOS (AVG)"
              value={1.41}
              decimals={2}
              icon={
                <div className="text-[#9a7bd1]">
                  <StopwatchIcon />
                </div>
              }
              delay={0.34}
              isInView={isInView}
              accent
            />
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*                       Arrivals / Departures                      */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GuestSummaryCard
            title="YEARLY ARRIVALS"
            value={200}
            label="GUESTS"
            status="Expected"
            direction="down"
            delay={0.4}
            isInView={isInView}
          />

          <GuestSummaryCard
            title="YEARLY DEPARTURES"
            value={203}
            label="GUESTS"
            status="Scheduled"
            direction="up"
            delay={0.48}
            isInView={isInView}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardMockupCMS;