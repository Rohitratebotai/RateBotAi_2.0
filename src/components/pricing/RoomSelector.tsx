import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { DEFAULT_ROOMS, MAX_ROOMS, MIN_ROOMS, clampRoomCount, getRoomPricingRange } from '@/utils/pricing';

type Props = {
  roomCount: number;
  onChange: (value: number) => void;
};

export function RoomSelector({ roomCount, onChange }: Props) {
  const [inputValue, setInputValue] = useState(String(roomCount));

  const range = getRoomPricingRange(roomCount);
  const atMin = roomCount <= MIN_ROOMS;
  const atMax = roomCount >= MAX_ROOMS;

  const commit = (raw: string) => {
    const parsed = parseInt(raw, 10);
    if (raw === '' || Number.isNaN(parsed)) {
      setInputValue(String(roomCount));
      return;
    }
    const clamped = clampRoomCount(parsed);
    setInputValue(String(clamped));
    onChange(clamped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (raw !== '' && !Number.isNaN(parsed)) {
      const clamped = clampRoomCount(parsed);
      if (clamped !== parsed) {
        setInputValue(String(clamped));
      }
      onChange(clamped);
    }
  };

  const handleBlur = () => commit(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commit(inputValue);
      (e.target as HTMLInputElement).blur();
    }
  };

  const step = (delta: number) => {
    const next = clampRoomCount(roomCount + delta);
    setInputValue(String(next));
    onChange(next);
  };

  return (
    <div className="surface rounded-4xl p-6 shadow-soft sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label
            htmlFor="room-count"
            className="eyebrow text-navy-500 dark:text-navy-300"
          >
            Number of Rooms
          </label>
          <p className="mt-1.5 text-sm text-secondary">
            Pricing is based on the selected room range.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => step(-1)}
            disabled={atMin}
            aria-label="Decrease room count"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas-line text-navy-700 transition-colors hover:bg-canvas-subtle disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
          >
            <Minus size={16} />
          </button>

          <input
            id="room-count"
            type="number"
            min={MIN_ROOMS}
            max={MAX_ROOMS}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="h-12 w-20 rounded-xl border border-canvas-line bg-canvas text-center text-xl font-bold text-navy-900 shadow-soft transition-colors focus:border-navy-400 dark:border-navy-700 dark:bg-navy-800 dark:text-white dark:focus:border-navy-500"
          />

          <button
            onClick={() => step(1)}
            disabled={atMax}
            aria-label="Increase room count"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-canvas-line text-navy-700 transition-colors hover:bg-canvas-subtle disabled:cursor-not-allowed disabled:opacity-40 dark:border-navy-700 dark:text-navy-200 dark:hover:bg-navy-800"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {range && (
        <motion.div
          key={`${range.minRooms}-${range.maxRooms}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex flex-wrap items-center gap-3 border-t border-canvas-line pt-5 text-sm dark:border-navy-700"
        >
          <span className="font-semibold text-navy-900 dark:text-white">
            {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
          </span>
          <span className="text-tertiary">·</span>
          <span className="text-secondary">
            Pricing Range:{' '}
            <span className="font-medium text-navy-700 dark:text-navy-200">
              {range.minRooms}–{range.maxRooms} rooms
            </span>
          </span>
          <span className="text-tertiary">·</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              range.percentageIncrease === 0
                ? 'bg-canvas-subtle text-tertiary dark:bg-navy-800 dark:text-navy-300'
                : 'bg-navy-900 text-white dark:bg-white dark:text-navy-900'
            }`}
          >
            {range.percentageIncrease === 0
              ? 'Base price'
              : `+${range.percentageIncrease}%`}
          </span>
        </motion.div>
      )}
    </div>
  );
}
