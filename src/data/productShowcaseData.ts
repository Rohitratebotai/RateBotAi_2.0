export interface ProductShowcaseItem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const productShowcaseData: ProductShowcaseItem[] = [
  {
    id: 'pms',
    name: 'Property Management System',
    shortName: 'PMS',
    description:
      'Simplify property operations with a centralized system designed to manage reservations, guests, rooms, billing, and day-to-day hotel workflows.',
    image: '/images/products/pms-dashboard.png',
    features: ['Reservation Management', 'Guest & Room Management', 'Billing & Operations'],
    ctaText: 'Explore PMS',
    ctaLink: '/products/pms',
  },
  {
    id: 'bms',
    name: 'Booking Management System',
    shortName: 'BMS',
    description:
      'Manage your booking operations through a connected platform designed to streamline availability, reservations, and booking workflows.',
    image: '/images/products/bms-dashboard.png',
    features: ['Booking Management', 'Real-Time Availability', 'Centralized Reservations'],
    ctaText: 'Explore BMS',
    ctaLink: '/products/bms',
  },
  {
    id: 'cms',
    name: 'Centralized Management System',
    shortName: 'CMS',
    description:
      'Manage your hospitality operations and business information through a centralized platform built for modern hotel teams.',
    image: '/images/products/cms-dashboard.png',
    features: ['Centralized Management', 'Operational Visibility', 'Connected Workflows'],
    ctaText: 'Explore CMS',
    ctaLink: '/products/cms',
  },
];
