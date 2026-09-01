export type NavItem = { label: string; href: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  accent: string;
};

export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const company = {
  name: 'RateBotAI',
  tagline: 'Smarter Technology for Modern Hospitality.',
  description:
    'RateBotAI is an all-in-one hospitality technology platform that brings hotel operations, distribution, direct bookings, and revenue optimization together in one connected system.',
  email: 'support@ratebotai.com',
  salesEmail: 'sales@ratebotai.com',
  phone: '+91 9326293409',
  address: 'A-007 Boomerang Building, Mumbai, Maharashtra 400072, India',
  url: 'https://ratebotai.com',
};

export const nav: { main: NavItem[]; actions: NavItem[] } = {
  main: [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#platform' },
    { label: 'Resources', href: '#why' },
    { label: 'Company', href: '#footer' },
  ],
  actions: [
    { label: 'Book a Demo', href: '#contact' },
  ],
};

export const hero = {
  eyebrow: 'Hospitality Technology',
  title: 'Smarter Technology for Modern Hospitality.',
  subtitle:
    'RateBotAI brings hotel operations, distribution, direct bookings, and revenue optimization together — so your team can run smarter, sell everywhere, and price with confidence.',
  primaryCta: { label: 'Book a Demo', href: '#contact' },
  secondaryCta: { label: 'Explore Platform', href: '#platform' },
};

export const metrics: Metric[] = [
  { label: 'Products', value: 4, suffix: '' },
  { label: 'Connected Channels', value: 1, suffix: '+' },
  { label: 'Real-Time Sync', value: 24, suffix: '/7' },
  { label: 'Cloud Platform', value: 100, suffix: '%' },
];

export const problems: { title: string; description: string }[] = [
  {
    title: 'Scattered distribution',
    description: 'Juggling multiple OTAs means manual inventory updates, rate mismatches, and constant risk of overbooking.',
  },
  {
    title: 'Rate inconsistency',
    description: 'Different rates across channels erode trust and revenue. Keeping parity by hand is slow and error-prone.',
  },
  {
    title: 'Limited visibility',
    description: 'Without a single source of truth, teams operate on gut feel instead of real-time performance data.',
  },
  {
    title: 'OTA dependency',
    description: 'High commissions and little guest ownership leave hotels paying to give away their customer relationship.',
  },
  {
    title: 'Manual pricing',
    description: 'Static rates miss demand. Reactive adjustments lag the market and leave revenue on the table.',
  },
  {
    title: 'Operational complexity',
    description: 'Reservations, housekeeping, billing, and reporting spread across tools create busywork and errors.',
  },
];

export const platformProducts: Product[] = [
  {
    id: 'pms',
    name: 'Property Management System',
    tagline: 'Run your hotel from one place',
    description:
      'Manage reservations, guests, rooms, check-in and check-out, billing, housekeeping, and reporting in a single system — saving time and reducing errors.',
    features: [
      'Reservations & guest management',
      'Room management & availability',
      'Check-in / check-out',
      'Billing & invoicing',
      'Housekeeping coordination',
      'Operations reporting',
    ],
    accent: 'from-navy-500 to-navy-700',
  },
  {
    id: 'channel-manager',
    name: 'Channel Manager',
    tagline: 'Sell everywhere, stay in sync',
    description:
      'Automate distribution with real-time rate and inventory synchronization across OTAs and booking platforms — preventing overbooking and optimizing revenue.',
    features: [
      'Real-time rate & inventory sync',
      'OTA connectivity',
      'Reservation synchronization',
      'Inventory management',
      'Rate management',
      'Multi-property support & analytics',
    ],
    accent: 'from-navy-400 to-navy-600',
  },
  {
    id: 'booking-engine',
    name: 'Booking Engine',
    tagline: 'Own your direct bookings',
    description:
      'A mobile-optimized, AI-driven direct booking solution that converts more website visitors into guests with real-time availability and secure payments.',
    features: [
      'Direct bookings',
      'Real-time availability',
      'Mobile-optimized experience',
      'Secure payments',
      'Discount & rate plan management',
      'Guest preferences',
    ],
    accent: 'from-navy-600 to-navy-800',
  },
  {
    id: 'dynamic-pricing',
    name: 'Dynamic Pricing',
    tagline: 'Price with intelligence',
    description:
      'AI-powered pricing that adjusts room rates in real time based on occupancy, demand, and market conditions to help optimize revenue.',
    features: [
      'AI-powered rate optimization',
      'Real-time rate adjustments',
      'Demand-based pricing',
      'Occupancy-aware rates',
      'Market-condition analysis',
      'Revenue optimization',
    ],
    accent: 'from-navy-300 to-navy-600',
  },
];

export const ecosystem = {
  title: 'One Connected Platform for Hospitality.',
  subtitle:
    'PMS, Channel Manager, Booking Engine, and Dynamic Pricing — designed to work together. Data flows between products so every part of your operation stays in sync.',
  nodes: [
    { id: 'pms', label: 'PMS', sublabel: 'Operations' },
    { id: 'channel-manager', label: 'Channel Manager', sublabel: 'Distribution' },
    { id: 'booking-engine', label: 'Booking Engine', sublabel: 'Direct Bookings' },
    { id: 'dynamic-pricing', label: 'Dynamic Pricing', sublabel: 'Revenue' },
  ],
};

export const dynamicPricing = {
  eyebrow: 'AI-Powered Pricing',
  title: 'Turn Data Into Better Pricing Decisions.',
  subtitle:
    'Dynamic Pricing analyzes occupancy, demand, and market conditions to adjust room rates in real time — helping you capture more revenue without constant manual oversight.',
  points: [
    {
      title: 'Demand-aware rates',
      description: 'Rates respond to changing demand signals so you are priced for the moment, not yesterday.',
    },
    {
      title: 'Occupancy-driven',
      description: 'Pricing adapts to your occupancy levels to help fill rooms when demand is soft and maximize when it is strong.',
    },
    {
      title: 'Market-aware',
      description: 'External market conditions inform rate decisions, keeping you competitive across channels.',
    },
  ],
};

export const directBooking = {
  eyebrow: 'Direct Bookings',
  title: 'Own More of Your Guest Relationship.',
  subtitle:
    'The RateBotAI Booking Engine turns your hotel website into a direct booking channel — with real-time availability, secure payments, and a mobile-optimized flow that reduces OTA dependency.',
  steps: [
    { title: 'Hotel Website', description: 'Guests arrive on your branded site.' },
    { title: 'Booking Engine', description: 'Real-time availability and rates, no redirects.' },
    { title: 'Direct Reservation', description: 'Secure payment and guest details captured directly.' },
  ],
  benefits: [
    'Reduce OTA commissions',
    'Own the guest relationship',
    'Real-time availability and rates',
    'Mobile-optimized booking flow',
  ],
};

export const integrations = {
  eyebrow: 'Integrations',
  title: 'A Connected Hospitality Ecosystem.',
  subtitle:
    'RateBotAI connects the pieces of your operation — PMS, Channel Manager, Booking Engine, OTAs, and revenue management — so data flows where it needs to without manual effort.',
  nodes: [
    'Hotel',
    'PMS',
    'Channel Manager',
    'Booking Engine',
    'OTAs',
    'Revenue Management',
    'Third-party APIs',
  ],
};

export const whyRateBotAI: { title: string; description: string }[] = [
  {
    title: 'Easy Integration',
    description: 'Connect your PMS, Channel Manager, and Booking Engine with a streamlined onboarding process completed within days.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'A single source of truth across operations, distribution, and revenue — so decisions are based on live data, not guesswork.',
  },
  {
    title: 'Automation',
    description: 'Real-time synchronization of rates, inventory, and reservations across every channel, automatically.',
  },
  {
    title: 'Scalability',
    description: 'Cloud-based architecture that scales from a single independent hotel to multi-property chains without compromising performance.',
  },
  {
    title: 'Dedicated Support',
    description: 'Comprehensive training and continuous support help your team master the system from day one.',
  },
  {
    title: 'Secure & Reliable',
    description: 'A cloud platform built for consistent, real-time synchronization and control across all your properties.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Their team is always there to help and quick to customize things. RateBotAI has made managing our distribution far simpler.',
    author: 'Hotel Partner',
    role: 'Client Spotlight',
  },
];

export const finalCta = {
  title: 'Ready to Make Your Hotel Smarter?',
  subtitle:
    'See how RateBotAI can simplify operations, improve distribution, and help you optimize revenue.',
  primaryCta: { label: 'Book a Demo', href: '#contact' },
  secondaryCta: { label: 'Explore Products', href: '#products' },
};

export const footer = {
  products: [
    { label: 'Property Management System', href: '#products' },
    { label: 'Channel Manager', href: '#products' },
    { label: 'Booking Engine', href: '#products' },
    { label: 'Dynamic Pricing', href: '#products' },
  ],
  company: [
    { label: 'About', href: '#footer' },
    { label: 'Contact', href: '#footer' },
  ],
  resources: [
    { label: 'User Guide', href: '#footer' },
    { label: 'Documentation', href: '#footer' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#footer' },
    { label: 'Terms & Conditions', href: '#footer' },
    { label: 'Refund Policy', href: '#footer' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://in.linkedin.com/company/ratebotai' },
    { label: 'Facebook', href: 'https://www.facebook.com/ratebotaiofficial' },
  ],
};
