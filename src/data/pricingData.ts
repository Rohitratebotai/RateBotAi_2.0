export interface PricingFeature {
  feature: string;
  isAvailable: boolean;
}

export interface PricingPlan {
  id: string;
  primaryTitle: string;
  secondaryTitle: string;
  yearlyPrice: number;
  monthlyPrice: number;
  currency: string;
  featureTitle: string;
  features: PricingFeature[];
}

export type BillingCycle = 'monthly' | 'yearly';

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Conversion rate from INR (base) to this currency. */
  rate: number;
  /** Locale for number formatting. */
  locale: string;
  /** Minimum digits after the decimal point. */
  minDigits: number;
}

/**
 * Base prices in pricingPlans are in INR. These rates convert INR to the
 * target currency. Update them when exchange rates change.
 */
export const currencies: Record<CurrencyCode, CurrencyOption> = {
  INR: { code: 'INR', symbol: '₹', label: 'INR', rate: 1, locale: 'en-IN', minDigits: 0 },
  USD: { code: 'USD', symbol: '$', label: 'USD', rate: 0.012, locale: 'en-US', minDigits: 0 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR', rate: 0.011, locale: 'de-DE', minDigits: 0 },
};

export const currencyList: CurrencyOption[] = [currencies.INR, currencies.USD, currencies.EUR];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'booking-engine',
    primaryTitle: 'Booking Engine',
    secondaryTitle: 'Only Booking Engine',
    yearlyPrice: 35000,
    monthlyPrice: 2999,
    currency: '₹',
    featureTitle: 'SOFTWARE FEATURES',
    features: [
      { feature: 'Real Time Availability', isAvailable: true },
      { feature: 'Mobile-Friendly Interface', isAvailable: true },
      { feature: 'Channel Manager Integration', isAvailable: true },
      { feature: 'Discount', isAvailable: true },
      { feature: 'Occupancy-Based Pricing', isAvailable: true },
      { feature: 'Guest Preference', isAvailable: true },
      { feature: 'Email Notifications', isAvailable: true },
      { feature: 'Multiple Rate Plans', isAvailable: true },
      { feature: 'Direct Bookings', isAvailable: true },
      { feature: 'Secure Payments', isAvailable: true },
      { feature: 'Partial Payments', isAvailable: true },
      { feature: 'Easy Room Photo updates', isAvailable: true },
      { feature: 'Tax Management', isAvailable: true },
    ],
  },
  {
    id: 'channel-manager',
    primaryTitle: 'Channel Manager',
    secondaryTitle: 'Only Channel Manager',
    yearlyPrice: 45000,
    monthlyPrice: 3799,
    currency: '₹',
    featureTitle: 'SOFTWARE FEATURES',
    features: [
      { feature: 'Multi-Channel Integration', isAvailable: true },
      { feature: 'Reservation and order Syncing', isAvailable: true },
      { feature: 'Property Management System (PMS) Integration', isAvailable: true },
      { feature: 'Inventory Management', isAvailable: true },
      { feature: 'Seamless Api Integration', isAvailable: true },
      { feature: 'Booking Engine Integration', isAvailable: true },
      { feature: 'Role-Based Access Control', isAvailable: true },
      { feature: 'Rate Management', isAvailable: true },
      { feature: 'Channel Manager Integration', isAvailable: true },
      { feature: 'Support for Multi-Property Support', isAvailable: true },
      { feature: 'Automated Rules and Restrictions', isAvailable: true },
      { feature: 'Performance Analytics', isAvailable: true },
      { feature: 'Revenue and Financial Reporting', isAvailable: true },
    ],
  },
  {
    id: 'pms',
    primaryTitle: 'PMS',
    secondaryTitle: '(Property Management System)',
    yearlyPrice: 25000,
    monthlyPrice: 1999,
    currency: '₹',
    featureTitle: 'SOFTWARE FEATURES',
    features: [
      { feature: 'Reservation Management', isAvailable: true },
      { feature: 'Guest Check-In and Check-Out', isAvailable: true },
      { feature: 'Room Management', isAvailable: true },
      { feature: 'Billing and Invoicing', isAvailable: true },
      { feature: 'Channel Manager Integration', isAvailable: true },
      { feature: 'Direct Booking Engine', isAvailable: true },
      { feature: 'Housekeeping Management', isAvailable: true },
      { feature: 'Advanced Reporting and Insights', isAvailable: true },
      { feature: 'PCI and GDPR Compliance', isAvailable: true },
      { feature: 'Aadhar based Guest Validation', isAvailable: true },
      { feature: 'Split Billing', isAvailable: true },
      { feature: 'Enhanced Data Security', isAvailable: true },
      { feature: 'Billing and Invoicing', isAvailable: true },
    ],
  },
];

/** Convert an INR price to the target currency and format it with grouping. */
export function formatPrice(inrPrice: number, currency: CurrencyOption): string {
  const converted = Math.round(inrPrice * currency.rate);
  return converted.toLocaleString(currency.locale, {
    minimumFractionDigits: currency.minDigits,
    maximumFractionDigits: currency.minDigits,
  });
}
