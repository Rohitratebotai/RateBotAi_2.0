export interface RoomPricingRange {
  minRooms: number;
  maxRooms: number;
  percentageIncrease: number;
}

export const ROOM_PRICING_RANGES: RoomPricingRange[] = [
  { minRooms: 1, maxRooms: 15, percentageIncrease: 0 },
  { minRooms: 16, maxRooms: 30, percentageIncrease: 10 },
  { minRooms: 31, maxRooms: 50, percentageIncrease: 20 },
  { minRooms: 51, maxRooms: 75, percentageIncrease: 30 },
  { minRooms: 76, maxRooms: 100, percentageIncrease: 40 },
  { minRooms: 101, maxRooms: 150, percentageIncrease: 50 },
  { minRooms: 151, maxRooms: 200, percentageIncrease: 60 },
];

export const MIN_ROOMS = 1;
export const MAX_ROOMS = 200;
export const DEFAULT_ROOMS = 15;

export function getRoomPricingRange(roomCount: number): RoomPricingRange | undefined {
  return ROOM_PRICING_RANGES.find((r) => roomCount >= r.minRooms && roomCount <= r.maxRooms);
}

export function getRoomPricingPercentage(roomCount: number): number {
  return getRoomPricingRange(roomCount)?.percentageIncrease ?? 0;
}

export function calculateRoomBasedPrice(basePrice: number, roomCount: number): number {
  const percentage = getRoomPricingPercentage(roomCount);
  return Math.round(basePrice * (1 + percentage / 100));
}

export function clampRoomCount(value: number): number {
  if (Number.isNaN(value)) return DEFAULT_ROOMS;
  return Math.max(MIN_ROOMS, Math.min(MAX_ROOMS, Math.floor(value)));
}

export function isValidRoomCount(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_ROOMS && value <= MAX_ROOMS;
}
