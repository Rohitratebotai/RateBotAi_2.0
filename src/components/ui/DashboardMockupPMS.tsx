import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import {
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DashboardMockupPMSProps {
  className?: string;
}

type ViewMode = "month" | "day";

interface Room {
  id: number;
  number: string;
  category: string;
  status: "occupied" | "available" | "maintenance";
}

interface RoomGroup {
  name: string;
  rooms: Room[];
}

interface Reservation {
  id: string;
  guest: string;
  room: string;
  roomCategory: string;
  start: number;
  end: number;
  color: "blue" | "red" | "green" | "purple";
  status: "confirmed" | "checked-in" | "pending";
}

/* -------------------------------------------------------------------------- */
/*                                  Icons                                     */
/* -------------------------------------------------------------------------- */

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M7 3V7M17 3V7M3 10H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M5 7L10 12L15 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M3.5 19C4.1 15.8 6 14 9 14C12 14 13.9 15.8 14.5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M16 5.5C18.2 5.7 19.5 7 19.5 9C19.5 10.8 18.3 12 16.5 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Demo Data                                    */
/* -------------------------------------------------------------------------- */

const roomGroups: RoomGroup[] = [
  {
    name: "Standard",
    rooms: [
      {
        id: 101,
        number: "101",
        category: "Standard",
        status: "occupied",
      },
      {
        id: 102,
        number: "102",
        category: "Standard",
        status: "occupied",
      },
      {
        id: 103,
        number: "103",
        category: "Standard",
        status: "available",
      },
      {
        id: 104,
        number: "104",
        category: "Standard",
        status: "available",
      },
      {
        id: 105,
        number: "105",
        category: "Standard",
        status: "occupied",
      },
      {
        id: 106,
        number: "106",
        category: "Standard",
        status: "available",
      },
      {
        id: 107,
        number: "107",
        category: "Standard",
        status: "available",
      },
      {
        id: 108,
        number: "108",
        category: "Standard",
        status: "available",
      },
    ],
  },
];

const reservations: Reservation[] = [
  {
    id: "RB-67365",
    guest: "Alex Morgan",
    room: "101",
    roomCategory: "Standard",
    start: 7,
    end: 8,
    color: "red",
    status: "checked-in",
  },
  {
    id: "RB-66535",
    guest: "Sophia Williams",
    room: "103",
    roomCategory: "Standard",
    start: 2,
    end: 3,
    color: "blue",
    status: "confirmed",
  },
  {
    id: "RB-67646",
    guest: "Daniel Carter",
    room: "101",
    roomCategory: "Standard",
    start: 12,
    end: 13,
    color: "blue",
    status: "confirmed",
  },
  {
    id: "RB-67645",
    guest: "Emma Wilson",
    room: "201",
    roomCategory: "Deluxe",
    start: 12,
    end: 13,
    color: "blue",
    status: "confirmed",
  },
  {
    id: "RB-68112",
    guest: "Oliver Smith",
    room: "105",
    roomCategory: "Standard",
    start: 17,
    end: 19,
    color: "green",
    status: "pending",
  },
  {
    id: "RB-68423",
    guest: "Mia Johnson",
    room: "301",
    roomCategory: "Suite",
    start: 9,
    end: 12,
    color: "purple",
    status: "confirmed",
  },
];

/* -------------------------------------------------------------------------- */
/*                             Date Generator                                 */
/* -------------------------------------------------------------------------- */

function createDates(offset: number) {
  const base = new Date(2026, 7, 18);

  base.setDate(base.getDate() + offset);

  return Array.from({ length: 20 }, (_, index) => {
    const date = new Date(base);

    date.setDate(base.getDate() + index);

    return date;
  });
}

/* -------------------------------------------------------------------------- */
/*                           Reservation Color                                */
/* -------------------------------------------------------------------------- */

function reservationClasses(
  color: Reservation["color"]
) {
  switch (color) {
    case "red":
      return "bg-red-500 text-white";

    case "green":
      return "bg-lime-500 text-[#13220a]";

    case "purple":
      return "bg-violet-500 text-white";

    default:
      return "bg-blue-500 text-white";
  }
}

/* -------------------------------------------------------------------------- */
/*                           Sidebar                                           */
/* -------------------------------------------------------------------------- */

function PMSidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (value: string) => void;
}) {
  const menu = [
    "Management Dashboard",
    "Allowance Report",
    "Cancelled Bill Report",
    "Cancelled Reservations",
    "Cashier Report",
    "Check In Report",
    "Check Out Report",
    "Discount Report",
    "Expected Arrival Report",
    "Expected Departure Report",
    "History & Forecast Report",
    "Journal Reports",
    "Manager Flash Report",
    "Night Audit Report",
    "No Show Report",
  ];

  return (
    <aside className="hidden w-[190px] shrink-0 bg-[#09234a] lg:block">
      <div className="sticky top-0 h-full">
        {/* Logo */}
        <div className="flex h-[120px] flex-col items-center justify-center border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101c3b] text-lg font-bold text-cyan-300 shadow-lg">
            RB
          </div>

          <div className="mt-2 text-[16px] font-semibold tracking-tight text-white">
            RateBot<span className="text-cyan-400">Ai</span>
          </div>

          <div className="text-[6px] tracking-[0.45em] text-white/70">
            RATE ROBOT
          </div>
        </div>

        {/* Date */}
        <div className="p-3">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md border border-white/70 px-3 py-3 text-left text-[11px] font-medium text-white"
          >
            <span>2026/06/20</span>

            <CalendarIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 pb-5">
          {menu.map((item) => {
            const active = activeItem === item;

            return (
              <button
                type="button"
                key={item}
                onClick={() => setActiveItem(item)}
                className={`flex w-full items-center gap-2 py-2 text-left text-[10px] transition ${
                  active
                    ? "font-semibold text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    active ? "bg-cyan-300" : "bg-red-500"
                  }`}
                />

                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Top Header                                    */
/* -------------------------------------------------------------------------- */

function PMSTopbar({
  activeModule,
  setActiveModule,
}: {
  activeModule: string;
  setActiveModule: (value: string) => void;
}) {
  const modules = [
    "FRONTDESK",
    "HOUSEKEEPING",
    "NIGHTAUDIT / DAYEND",
    "ADMIN CONSOLE",
  ];

  return (
    <div className="flex min-h-[58px] flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4">
      <div className="flex flex-wrap gap-2">
        {modules.map((module) => (
          <button
            type="button"
            key={module}
            onClick={() => setActiveModule(module)}
            className={`rounded-md px-5 py-2.5 text-[9px] font-bold tracking-wide transition ${
              activeModule === module
                ? "bg-[#071b3d] text-white shadow-sm"
                : "bg-[#0b2348] text-white hover:bg-[#17345e]"
            }`}
          >
            {module}
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-3 sm:flex">
        <div className="text-right">
          <p className="text-[10px] font-semibold text-blue-500">
            Hotel Name 
          </p>

          <p className="text-[9px] font-semibold text-blue-500">
            (102165)
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-xs">
          👤
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Calendar Header                                 */
/* -------------------------------------------------------------------------- */

function CalendarControls({
  dates,
  viewMode,
  setViewMode,
  onPrevious,
  onNext,
}: {
  dates: Date[];
  viewMode: ViewMode;
  setViewMode: (value: ViewMode) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const first = dates[0];
  const last = dates[dates.length - 1];

  const range = `${first.toLocaleDateString("en-US", {
    month: "short",
  })} ${first.getDate()} – ${last.toLocaleDateString("en-US", {
    month: "short",
  })} ${last.getDate()}, ${last.getFullYear()}`;

  return (
    <div className="px-3 pt-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex overflow-hidden rounded-md border border-slate-300 bg-[#243a52] text-white">
          <button
            type="button"
            onClick={onPrevious}
            className="flex h-10 w-10 items-center justify-center border-r border-white/20 transition hover:bg-white/10"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="flex h-10 w-10 items-center justify-center transition hover:bg-white/10"
          >
            <ChevronRight />
          </button>
        </div>

        <motion.h1
          key={range}
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-[20px] font-medium tracking-tight text-slate-900 sm:text-[26px]"
        >
          {range}
        </motion.h1>

        <div className="flex overflow-hidden rounded-md bg-[#172b42] text-white">
          <button
            type="button"
            onClick={() => setViewMode("month")}
            className={`px-4 py-2 text-[10px] font-semibold ${
              viewMode === "month"
                ? "bg-[#172b42]"
                : "bg-slate-400"
            }`}
          >
            Month
          </button>

          <button
            type="button"
            onClick={() => setViewMode("day")}
            className={`px-4 py-2 text-[10px] font-semibold ${
              viewMode === "day"
                ? "bg-[#314a63]"
                : "bg-slate-400"
            }`}
          >
            Day
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Reservation Block                               */
/* -------------------------------------------------------------------------- */

function ReservationBlock({
  reservation,
  index,
  totalDays,
  onClick,
}: {
  reservation: Reservation;
  index: number;
  totalDays: number;
  onClick: () => void;
}) {
  const left = `${(reservation.start / totalDays) * 100}%`;

  const width = `${Math.max(
    ((reservation.end - reservation.start) / totalDays) * 100,
    4
  )}%`;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        scaleX: 0,
      }}
      animate={{
        opacity: 1,
        scaleX: 1,
      }}
      transition={{
        delay: 0.35 + index * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scaleY: 1.12,
        zIndex: 20,
      }}
      style={{
        left,
        width,
      }}
      className={`absolute top-2 h-7 origin-left rounded-sm px-2 text-left text-[9px] font-semibold shadow-sm ${reservationClasses(
        reservation.color
      )}`}
    >
      <span className="block truncate">
        {reservation.id}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PMS Calendar                                    */
/* -------------------------------------------------------------------------- */

function PMSCalendar({
  dates,
  collapsedGroups,
  setCollapsedGroups,
  onReservationClick,
}: {
  dates: Date[];
  collapsedGroups: Record<string, boolean>;
  setCollapsedGroups: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  onReservationClick: (reservation: Reservation) => void;
}) {
  const totalDays = dates.length;

  return (
    <div className="overflow-x-auto rounded-sm border border-slate-200">
      <div className="min-w-[1050px]">
        {/* Date Header */}
        <div className="grid grid-cols-[190px_1fr]">
          <div className="flex items-center border-b border-r border-slate-300 bg-[#30475d] px-4 text-[11px] font-semibold text-white">
            Rooms
          </div>

          <div className="grid grid-flow-col auto-cols-[1fr] border-b border-slate-300 bg-[#70757a]">
            {dates.map((date, index) => {
              const day = date.toLocaleDateString("en-US", {
                weekday: "short",
              });

              const isToday = index === 0;

              return (
                <div
                  key={date.toISOString()}
                  className={`flex h-11 min-w-[43px] flex-col items-center justify-center border-r border-white/20 text-[9px] font-semibold text-white ${
                    isToday ? "bg-[#263f58]" : ""
                  }`}
                >
                  <span>{date.getDate()}</span>
                  <span className="opacity-80">
                    {day.charAt(0)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room Groups */}
        {roomGroups.map((group) => {
          const collapsed = collapsedGroups[group.name];

          return (
            <div key={group.name}>
              {/* Group Header */}
              <button
                type="button"
                onClick={() =>
                  setCollapsedGroups((previous) => ({
                    ...previous,
                    [group.name]: !previous[group.name],
                  }))
                }
                className="grid w-full grid-cols-[190px_1fr] text-left"
              >
                <div className="flex h-10 items-center gap-2 border-b border-r border-white/30 bg-[#30475d] px-3 text-[11px] font-medium text-white">
                  <span
                    className={`transition-transform ${
                      collapsed ? "-rotate-90" : ""
                    }`}
                  >
                    <ChevronDown />
                  </span>

                  {group.name}
                </div>

                <div className="border-b border-slate-300 bg-[#e4e4e4]" />
              </button>

              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="overflow-hidden"
                  >
                    {group.rooms.map((room, roomIndex) => (
                      <div
                        key={room.id}
                        className="grid grid-cols-[190px_1fr]"
                      >
                        {/* Room Name */}
                        <div
                          className={`flex h-11 items-center justify-center border-b border-r border-slate-300 text-[11px] font-medium ${
                            room.status === "occupied"
                              ? "bg-yellow-300 text-slate-900"
                              : room.status === "maintenance"
                              ? "bg-red-300 text-slate-900"
                              : "bg-lime-400 text-slate-900"
                          }`}
                        >
                          {group.name} Room {room.number}
                        </div>

                        {/* Timeline */}
                        <div className="relative h-11 border-b border-slate-300 bg-[#f3f3f3]">
                          {/* Grid */}
                          <div className="absolute inset-0 grid grid-flow-col auto-cols-[1fr]">
                            {dates.map((date) => (
                              <div
                                key={date.toISOString()}
                                className="border-r border-slate-200"
                              />
                            ))}
                          </div>

                          {/* Reservations */}
                          {reservations
                            .filter(
                              (reservation) =>
                                reservation.room === room.number
                            )
                            .map((reservation) => (
                              <ReservationBlock
                                key={reservation.id}
                                reservation={reservation}
                                index={roomIndex}
                                totalDays={totalDays}
                                onClick={() =>
                                  onReservationClick(
                                    reservation
                                  )
                                }
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Reservation Modal                               */
/* -------------------------------------------------------------------------- */

function ReservationPopup({
  reservation,
  onClose,
}: {
  reservation: Reservation;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 8,
        scale: 0.95,
      }}
      className="absolute right-5 top-20 z-50 w-[250px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="flex items-center justify-between bg-[#071b3d] px-4 py-3 text-white">
        <span className="text-[11px] font-semibold">
          Reservation Details
        </span>

        <button
          type="button"
          onClick={onClose}
          className="text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-slate-400">
            Guest
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {reservation.guest}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400">
              Room
            </p>

            <p className="mt-1 text-xs font-semibold">
              {reservation.room}
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400">
              Booking ID
            </p>

            <p className="mt-1 text-xs font-semibold">
              {reservation.id}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-wider text-slate-400">
            Status
          </p>

          <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-semibold capitalize text-blue-600">
            {reservation.status}
          </span>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-[#071b3d] py-2.5 text-[10px] font-semibold text-white"
        >
          View Reservation
        </button>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Main PMS Component                                 */
/* -------------------------------------------------------------------------- */

export function DashboardMockupPMS({
  className = "",
}: DashboardMockupPMSProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  const [dateOffset, setDateOffset] = useState(0);

  const [viewMode, setViewMode] =
    useState<ViewMode>("month");

  const [activeModule, setActiveModule] =
    useState("FRONTDESK");

  const [activeItem, setActiveItem] =
    useState("Management Dashboard");

  const [collapsedGroups, setCollapsedGroups] =
    useState<Record<string, boolean>>({});

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const dates = useMemo(
    () => createDates(dateOffset),
    [dateOffset]
  );

  const occupiedRooms = roomGroups
    .flatMap((group) => group.rooms)
    .filter((room) => room.status === "occupied").length;

  const totalRooms = roomGroups.flatMap(
    (group) => group.rooms
  ).length;

  const occupancy = Math.round(
    (occupiedRooms / totalRooms) * 100
  );

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
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
        className="relative overflow-hidden rounded-[24px] bg-[#f7f7f7] shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
      >
        <div className="flex min-h-[600px]">
          {/* =============================================================== */}
          {/*                             Sidebar                              */}
          {/* =============================================================== */}

          <PMSidebar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          {/* =============================================================== */}
          {/*                          Main Content                            */}
          {/* =============================================================== */}

          <main className="min-w-0 flex-1">
            <PMSTopbar
              activeModule={activeModule}
              setActiveModule={setActiveModule}
            />

            {/* Stats */}
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
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
                delay: 0.2,
              }}
              className="flex flex-wrap items-center justify-end gap-2 px-4 pt-3"
            >
              <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-[8px] text-slate-400">
                  OCCUPANCY
                </span>

                <span className="ml-2 text-[11px] font-bold text-[#071b3d]">
                  {occupancy}%
                </span>
              </div>

              <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-[8px] text-slate-400">
                  ROOMS
                </span>

                <span className="ml-2 text-[11px] font-bold text-[#071b3d]">
                  {totalRooms}
                </span>
              </div>

              <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-[8px] text-slate-400">
                  BOOKINGS
                </span>

                <span className="ml-2 text-[11px] font-bold text-[#071b3d]">
                  {reservations.length}
                </span>
              </div>
            </motion.div>

            {/* Calendar Controls */}
            <CalendarControls
              dates={dates}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onPrevious={() =>
                setDateOffset((value) => value - 7)
              }
              onNext={() =>
                setDateOffset((value) => value + 7)
              }
            />

            {/* Calendar */}
            <div className="relative px-3 pb-5">
              <PMSCalendar
                dates={
                  viewMode === "day"
                    ? dates.slice(0, 8)
                    : dates
                }
                collapsedGroups={collapsedGroups}
                setCollapsedGroups={setCollapsedGroups}
                onReservationClick={
                  setSelectedReservation
                }
              />

              {/* Reservation Popup */}
              <AnimatePresence>
                {selectedReservation && (
                  <ReservationPopup
                    reservation={selectedReservation}
                    onClose={() =>
                      setSelectedReservation(null)
                    }
                  />
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardMockupPMS;