export interface DocumentationSection {
  id: string;
  title: string;
  description?: string;
  content?: string[];
  image?: string;
}

export interface DocumentationModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  sections: DocumentationSection[];
}

const PLACEHOLDER = 'Detailed documentation for this section will be added soon.';

export const documentationModules: DocumentationModule[] = [
  {
    id: 'dashboard',
    slug: 'dashboard',
    title: 'Dashboard',
    description: "Get a clear overview of your hotel's operations and performance.",
    longDescription:
      'The Dashboard gives you a real-time snapshot of your property — occupancy, revenue, arrivals, departures, and key operational metrics in one view.',
    icon: 'LayoutDashboard',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        description: 'A high-level summary of your property performance at a glance.',
        content: [PLACEHOLDER],
      },
      {
        id: 'dashboard-metrics',
        title: 'Dashboard Metrics',
        description: 'Understand each metric displayed on the dashboard and how it is calculated.',
        content: [PLACEHOLDER],
      },
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        description: 'Access common tasks directly from the dashboard.',
        content: [PLACEHOLDER],
      },
    ],
  },
  {
    id: 'pms',
    slug: 'pms',
    title: 'PMS',
    description: 'Manage reservations, guests, rooms, billing, and housekeeping from one system.',
    longDescription:
      'The Property Management System is the operational core of RateBotAI — handling reservations, guest management, room status, billing, and reporting in a single place.',
    icon: 'Building2',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        description: 'An introduction to the PMS module and its core capabilities.',
        content: [PLACEHOLDER],
      },
      {
        id: 'reservations',
        title: 'Reservations',
        description: 'Create, edit, and manage guest reservations.',
        content: [PLACEHOLDER],
      },
      {
        id: 'guest-management',
        title: 'Guest Management',
        description: 'Manage guest profiles, preferences, and history.',
        content: [PLACEHOLDER],
      },
      {
        id: 'room-management',
        title: 'Room Management',
        description: 'Track room status, availability, and assignments.',
        content: [PLACEHOLDER],
      },
      {
        id: 'billing',
        title: 'Billing',
        description: 'Handle invoicing, payments, and billing configurations.',
        content: [PLACEHOLDER],
      },
    ],
  },
  {
    id: 'bms',
    slug: 'bms',
    title: 'BMS',
    description: 'Manage your direct booking engine, availability, and rate plans.',
    longDescription:
      'The Booking Management System powers your direct booking channel — managing availability, rate plans, reservations, and the guest booking experience on your website.',
    icon: 'CalendarCheck',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        description: 'An introduction to the BMS module.',
        content: [PLACEHOLDER],
      },
      {
        id: 'booking-engine',
        title: 'Booking Engine',
        description: 'Configure and manage your direct booking engine.',
        content: [PLACEHOLDER],
      },
      {
        id: 'availability',
        title: 'Availability',
        description: 'Control room availability shown to guests booking directly.',
        content: [PLACEHOLDER],
      },
      {
        id: 'rate-plans',
        title: 'Rate Plans',
        description: 'Create and manage rate plans for your booking engine.',
        content: [PLACEHOLDER],
      },
      {
        id: 'reservations',
        title: 'Reservations',
        description: 'View and manage direct bookings received through your booking engine.',
        content: [PLACEHOLDER],
      },
    ],
  },
  {
    id: 'rates-inventory',
    slug: 'rates-inventory',
    title: 'Rates & Inventory',
    description: 'Manage pricing, availability, restrictions, and channel distribution.',
    longDescription:
      'Manage pricing, availability, restrictions, and channel distribution across your property.',
    icon: 'Tags',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        description: 'An introduction to the Rates & Inventory module.',
        content: [PLACEHOLDER],
      },
      {
        id: 'filters',
        title: 'Filters',
        description: 'Narrow down the rates and inventory view by room type, channel, date, and more.',
        content: [PLACEHOLDER],
      },
      {
        id: 'view-rules',
        title: 'View Rules',
        description: 'Configure how rates and availability are displayed in the grid.',
        content: [PLACEHOLDER],
      },
      {
        id: 'channel-comparison',
        title: 'Channel Comparison',
        description: 'Compare rates and availability across connected distribution channels.',
        content: [PLACEHOLDER],
      },
      {
        id: 'channel-mapping',
        title: 'Channel Mapping',
        description: 'Map your room types and rate plans to external distribution channels.',
        content: [PLACEHOLDER],
      },
      {
        id: 'bulk-update',
        title: 'Bulk Update',
        description: 'Update rates and availability across multiple dates and channels at once.',
        content: [PLACEHOLDER],
      },
      {
        id: 'date-range-selector',
        title: 'Date Range Selector',
        description: 'Select date ranges to view and edit rates and inventory.',
        content: [PLACEHOLDER],
      },
    ],
  },
];

export function getModuleBySlug(slug: string): DocumentationModule | undefined {
  return documentationModules.find((m) => m.slug === slug);
}
