import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DashboardMockupBMSProps {
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type PlanType = "EP" | "CP";

interface RoomPlan {
  type: PlanType;
  name: string;
  price: string;
}

interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
  bed: string;
  available: number;
  plans: RoomPlan[];
}

/* -------------------------------------------------------------------------- */
/*                                  Data                                      */
/* -------------------------------------------------------------------------- */

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe King Room",
    description: "Spacious room with a comfortable king-size bed",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
    bed: "King Bed",
    available: 4,
    plans: [
      {
        type: "EP",
        name: "Accommodation only",
        price: " XXXX",
      },
      {
        type: "CP",
        name: "Free Breakfast",
        price: " XXXX",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M7 3V7M17 3V7M3 10H21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M12 21C12 21 19 14.7 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 14.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M3 18V8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3 15H21V18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3 11H21V15"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6 11V8.5C6 7.67 6.67 7 7.5 7H10.5C11.33 7 12 7.67 12 8.5V11"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M21 11V18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 20C5.7 16.5 8.1 14.5 12 14.5C15.9 14.5 18.3 16.5 19 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4 10.5L12 4L20 10.5V20H4V10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20V14H14.5V20"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3 w-3">
      <path
        d="M4 10H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3 w-3">
      <path
        d="M10 4V16M4 10H16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Hotel Image                                    */
/* -------------------------------------------------------------------------- */

function HotelImage({
  src,
  className = "",
  children,
}: {
  src: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200 ${className}`}
    >
      <img
        src={src}
        alt="Hotel"
        className="h-full w-full object-cover"
      />

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Quantity Selector                                 */
/* -------------------------------------------------------------------------- */

function QuantitySelector({
  value,
  onDecrease,
  onIncrease,
  disabled,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || value === 0}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MinusIcon />
      </button>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="w-4 text-center text-xs font-semibold text-[#07142f]"
        >
          {value}
        </motion.span>
      </AnimatePresence>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#07142f] text-white transition hover:bg-[#132344] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Plan Row                                      */
/* -------------------------------------------------------------------------- */

interface PlanRowProps {
  room: Room;
  plan: RoomPlan;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function PlanRow({
  room,
  plan,
  quantity,
  onIncrease,
  onDecrease,
}: PlanRowProps) {
  return (
    <div className="flex min-h-[58px] items-center justify-between gap-3 border-t border-slate-100 px-5 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <div className="text-slate-400">
          <UserIcon />
        </div>

        <span className="whitespace-nowrap text-xs text-slate-600">
          1 adult
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#07142f]">
          ₹{parseFloat(plan.price).toLocaleString("en-IN")}
        </span>

        <span className="hidden text-[9px] text-slate-400 sm:inline">
          excl. taxes & fees
        </span>
      </div>

      <QuantitySelector
        value={quantity}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        disabled={quantity >= room.available}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Room Card                                     */
/* -------------------------------------------------------------------------- */

interface RoomCardProps {
  room: Room;
  selectedPlan: string | null;
  quantities: Record<string, number>;
  onSelectPlan: (planId: string) => void;
  onIncrease: (planId: string) => void;
  onDecrease: (planId: string) => void;
  delay: number;
  isInView: boolean;
}

function RoomCard({
  room,
  selectedPlan,
  quantities,
  onSelectPlan,
  onIncrease,
  onDecrease,
  delay,
  isInView,
}: RoomCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
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
      className="overflow-hidden rounded-[18px] border border-slate-200 bg-white"
    >
      {/* Room Header */}
      <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
        <HotelImage
          src={room.image}
          className="h-[145px] sm:h-[150px]"
        >
          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-medium text-[#07142f] backdrop-blur">
            {room.available} rooms left
          </div>
        </HotelImage>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[17px] font-semibold tracking-tight text-[#07142f]">
                {room.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <BedIcon />
                <span>{room.bed}</span>
              </div>

              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                {room.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      {room.plans.map((plan) => {
        const planId = `${room.id}-${plan.type}`;
        const quantity = quantities[planId] || 0;

        return (
          <div key={plan.type}>
            <button
              type="button"
              onClick={() => onSelectPlan(planId)}
              className="flex w-full items-center justify-between border-t border-slate-200 px-5 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-wide text-[#07142f]">
                  {plan.type} PLAN
                </span>

                <span
                  className={`rounded-full border px-2 py-1 text-[9px] ${
                    plan.type === "CP"
                      ? "border-amber-200 bg-amber-50 text-amber-600"
                      : "border-orange-200 bg-orange-50 text-orange-500"
                  }`}
                >
                  {plan.name}
                </span>
              </div>

              <motion.span
                animate={{
                  rotate: selectedPlan === planId ? 180 : 0,
                }}
                className="text-slate-400"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>

            <PlanRow
              room={room}
              plan={plan}
              quantity={quantity}
              onIncrease={() => onIncrease(planId)}
              onDecrease={() => onDecrease(planId)}
            />
          </div>
        );
      })}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Booking Summary                                  */
/* -------------------------------------------------------------------------- */

interface SummaryItem {
  room: Room;
  plan: RoomPlan;
  quantity: number;
}

function BookingSummary({
  items,
  isInView,
}: {
  items: SummaryItem[] ;
  isInView: boolean;
}) {
  const originalPrice = items.reduce(
    (total, item) => total + parseFloat(item.plan.price) * item.quantity,
    0
  );

  const taxes = originalPrice * 0.05;

  const total = originalPrice + taxes;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: 0.25,
      }}
      className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] lg:sticky lg:top-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#07142f] px-5 py-4 text-white">
        <HomeIcon />

        <h2 className="text-[16px] font-medium">
          Booking Summary
        </h2>
      </div>

      {/* Selected Rooms */}
      <div className="min-h-[120px]">
        {items.length === 0 ? (
          <div className="flex min-h-[120px] items-center justify-center px-6 text-center">
            <p className="text-xs leading-5 text-slate-400">
              Select a room to see your booking summary
            </p>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <motion.div
                layout
                key={`${item.room.id}-${item.plan.type}`}
                className="flex gap-3 border-b border-slate-100 p-4"
              >
                <img
                  src={item.room.image}
                  alt=""
                  className="h-12 w-16 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[11px] font-semibold text-[#07142f]">
                        {item.room.name}
                      </h3>

                      <p className="mt-1 text-[9px] text-slate-400">
                        {item.plan.name}
                      </p>
                    </div>

                    <span className="whitespace-nowrap text-[11px] font-semibold text-[#07142f]">
                      ₹
                      {(
                        parseFloat(item.plan.price) * item.quantity
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[9px] text-slate-400">
                    <UserIcon />
                    {item.quantity} Guest
                    <span>•</span>
                    {item.quantity} Room
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-slate-100 px-5 py-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">
                  Original Price
                </span>

                <span className="text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">
                  Discounted Price
                </span>

                <span className="font-medium text-[#07142f]">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">
                  Taxes & Fees
                </span>

                <span className="text-slate-500">
                  +₹{taxes.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex items-start justify-between">
              <span className="text-[15px] font-semibold text-[#07142f]">
                Total
              </span>

              <div className="text-right">
                <motion.p
                  key={total}
                  initial={{ opacity: 0.4, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[16px] font-bold text-[#07142f]"
                >
                  ₹{total.toLocaleString("en-IN")}
                </motion.p>

                <p className="text-[9px] text-slate-400">
                  incl. all taxes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout */}
      <div className="border-t border-slate-100 p-4">
        <motion.button
          type="button"
          disabled={items.length === 0}
          whileHover={
            items.length > 0
              ? {
                  scale: 1.01,
                }
              : {}
          }
          whileTap={
            items.length > 0
              ? {
                  scale: 0.98,
                }
              : {}
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#07142f] py-3 text-sm font-semibold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Proceed to Checkout
          <ArrowRight />
        </motion.button>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-slate-400">
          <svg
            viewBox="0 0 20 20"
            className="h-3 w-3"
            fill="none"
          >
            <rect
              x="5"
              y="8"
              width="10"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M7.5 8V6.5C7.5 5.12 8.62 4 10 4C11.38 4 12.5 5.12 12.5 6.5V8"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>

          Secure encrypted booking
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           Main Component                                   */
/* -------------------------------------------------------------------------- */

export function DashboardMockupBMS({
  className = "",
}: DashboardMockupBMSProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.12,
  });

  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    null
  );

  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({});

  /* ---------------------------------------------------------------------- */
  /*                           Quantity handlers                            */
  /* ---------------------------------------------------------------------- */

  const increase = (planId: string) => {
    setQuantities((previous) => ({
      ...previous,
      [planId]: Math.min((previous[planId] || 0) + 1, 3),
    }));

    setSelectedPlan(planId);
  };

  const decrease = (planId: string) => {
    setQuantities((previous) => ({
      ...previous,
      [planId]: Math.max((previous[planId] || 0) - 1, 0),
    }));
  };

  const selectPlan = (planId: string) => {
    setSelectedPlan((current) =>
      current === planId ? null : planId
    );
  };

  /* ---------------------------------------------------------------------- */
  /*                         Summary calculation                            */
  /* ---------------------------------------------------------------------- */

  const summaryItems = useMemo<SummaryItem[]>(() => {
    const result: SummaryItem[] = [];

    rooms.forEach((room) => {
      room.plans.forEach((plan) => {
        const planId = `${room.id}-${plan.type}`;
        const quantity = quantities[planId] || 0;

        if (quantity > 0) {
          result.push({
            room,
            plan,
            quantity,
          });
        }
      });
    });

    return result;
  }, [quantities]);

  return (
    <div
      ref={containerRef}
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
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden rounded-[28px] bg-[#f7f6f2] p-3 sm:p-4 lg:p-5"
      >
        {/* ================================================================= */}
        {/*                            Search Bar                              */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
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
            delay: 0.1,
          }}
          className="mb-4 rounded-[18px] bg-[#d7dbe1] p-2.5"
        >
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {/* Check In */}
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm sm:w-[185px]">
              <div className="text-slate-400">
                <CalendarIcon />
              </div>

              <div>
                <p className="text-[8px] font-medium uppercase tracking-wide text-slate-400">
                  Check-in
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-[#07142f]">
                  Tue, Sep 8, 2026
                </p>
              </div>
            </div>

            {/* Check Out */}
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm sm:w-[185px]">
              <div className="text-slate-400">
                <CalendarIcon />
              </div>

              <div>
                <p className="text-[8px] font-medium uppercase tracking-wide text-slate-400">
                  Check-out
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-[#07142f]">
                  Wed, Sep 9, 2026
                </p>
              </div>
            </div>

            {/* Availability */}
            <motion.button
              type="button"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-[#07142f] px-5 text-xs font-semibold text-white shadow-md"
            >
              Check Availability
              <ArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/*                         Property Header                            */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
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
            delay: 0.2,
          }}
          className="mb-4 px-1 sm:px-2"
        >
          <h1 className="text-[25px] font-semibold tracking-tight text-[#07142f] sm:text-[29px]">
            Hotel Name 
          </h1>

          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
            <LocationIcon />
            <span>Luxury Hotel Collection</span>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/*                           Gallery                                  */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {}
          }
          transition={{
            duration: 0.65,
            delay: 0.25,
          }}
          className="grid grid-cols-1 gap-2 md:grid-cols-[1.05fr_1fr]"
        >
          {/* Main Image */}
          <HotelImage
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
            className="h-[220px] rounded-lg sm:h-[280px] lg:h-[315px]"
          />

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            <HotelImage
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
              className="h-[150px] rounded-lg md:h-[155px]"
            />

            <div className="grid grid-cols-2 gap-2">
              <HotelImage
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=700&q=80"
                className="h-[125px] rounded-lg md:h-[152px]"
              />

              <HotelImage
                src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=700&q=80"
                className="h-[125px] rounded-lg md:h-[152px]"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.8,
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/25"
                >
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-medium text-[#07142f]">
                    View Gallery
                  </span>
                </motion.div>
              </HotelImage>
            </div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/*                         Booking Area                              */}
        {/* ================================================================= */}

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]">
          {/* Rooms */}
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="mb-3 border-b border-slate-200 pb-3"
            >
              <h2 className="text-[22px] font-semibold tracking-tight text-[#07142f]">
                Select your Room
              </h2>
            </motion.div>

            <div className="space-y-3">
              {rooms.map((room, index) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  selectedPlan={selectedPlan}
                  quantities={quantities}
                  onSelectPlan={selectPlan}
                  onIncrease={increase}
                  onDecrease={decrease}
                  delay={0.35 + index * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Summary */}
          <BookingSummary
            items={summaryItems}
            isInView={isInView}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardMockupBMS;