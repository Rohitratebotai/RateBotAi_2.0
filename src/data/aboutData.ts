export interface AboutProduct {
  id: string;
  name: string;
  shortName: string;
  description: string;
  position: { row: number; col: number };
}

export interface AboutPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface TechStage {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface MissionVisionItem {
  id: string;
  label: string;
  title: string;
  description: string;
}

export const aboutProducts: AboutProduct[] = [
  {
    id: 'pms',
    name: 'Property Management System',
    shortName: 'PMS',
    description: 'Centralized hotel operations — reservations, rooms, billing, and reporting.',
    position: { row: 0, col: 1 },
  },
  {
    id: 'bms',
    name: 'Booking Management System',
    shortName: 'BMS',
    description: 'Connected booking workflows with real-time availability and reservations.',
    position: { row: 1, col: 0 },
  },
  {
    id: 'cms',
    name: 'Centralized Management System',
    shortName: 'CMS',
    description: 'Operational visibility and connected workflows across your properties.',
    position: { row: 1, col: 2 },
  },
  {
    id: 'booking-engine',
    name: 'Booking Engine',
    shortName: 'Booking Engine',
    description: 'Direct bookings through a mobile-optimized, commission-free channel.',
    position: { row: 2, col: 1 },
  },
  {
    id: 'channel-manager',
    name: 'Channel Manager',
    shortName: 'Channel Manager',
    description: 'Real-time rate and inventory sync across OTAs and booking platforms.',
    position: { row: 1, col: 1 },
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    id: 'connected-operations',
    title: 'Connected Operations',
    description:
      'Bring important hospitality workflows into a connected technology ecosystem so every part of your operation stays in sync.',
  },
  {
    id: 'real-time-visibility',
    title: 'Real-Time Visibility',
    description:
      'Help teams understand bookings, operations, availability, revenue, and performance through a single source of truth.',
  },
  {
    id: 'smarter-workflows',
    title: 'Smarter Workflows',
    description:
      'Reduce manual processes and make everyday hotel operations more structured, automated, and reliable.',
  },
  {
    id: 'built-for-hospitality',
    title: 'Built for Hospitality',
    description:
      'Design software around the real workflows and requirements of hospitality businesses — not generic templates.',
  },
];

export const techStages: TechStage[] = [
  {
    id: 'connect',
    number: '01',
    title: 'Connect',
    description:
      'Bring bookings, channels, operations, and guest data into one connected platform — eliminating silos and manual sync.',
  },
  {
    id: 'operate',
    number: '02',
    title: 'Operate',
    description:
      'Run reservations, rooms, billing, and housekeeping through a centralized system designed for real hotel workflows.',
  },
  {
    id: 'understand',
    number: '03',
    title: 'Understand',
    description:
      'See occupancy, revenue, and performance in real time — so decisions are based on live data, not guesswork.',
  },
  {
    id: 'grow',
    number: '04',
    title: 'Grow',
    description:
      'Optimize pricing, increase direct bookings, and scale across properties with a platform built to grow with you.',
  },
];

export const missionVision: MissionVisionItem[] = [
  {
    id: 'mission',
    label: 'Mission',
    title: 'Make hospitality technology simpler, smarter, and more connected.',
    description:
      'We build technology that simplifies hospitality operations and enables better digital experiences for hotels, homestays, villas, and hospitality businesses.',
  },
  {
    id: 'vision',
    label: 'Vision',
    title: 'Build technology that helps hospitality operate with greater clarity and control.',
    description:
      'Create a connected hospitality technology ecosystem where every booking, operation, and decision works together through one intelligent platform.',
  },
];

export const techFlow = {
  top: 'Bookings',
  center: 'RateBotAI',
  modules: [
    { id: 'pms', label: 'PMS', sublabel: 'Operations' },
    { id: 'bms', label: 'BMS', sublabel: 'Bookings' },
    { id: 'cms', label: 'CMS', sublabel: 'Management' },
  ],
  bottom: ['Operations', 'Experience', 'Insights'],
};

export const innovationFlow = [
  { id: 'data', label: 'Data', description: 'Live signals from bookings, operations, and channels.' },
  { id: 'intelligence', label: 'Intelligence', description: 'Analysis that turns data into actionable insight.' },
  { id: 'action', label: 'Action', description: 'Automated decisions that optimize revenue and operations.' },
];
