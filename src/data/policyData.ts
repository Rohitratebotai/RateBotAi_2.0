export interface PolicySubsection {
  id: string;
  title: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  numberedPoints?: string[];
}

export interface PolicySection {
  id: string;
  title: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  numberedPoints?: string[];
  subsections?: PolicySubsection[];
}

export interface PolicyDocument {
  title: string;
  description?: string;
  lastUpdated?: string;
  introduction?: string;
  sections: PolicySection[];
}

export const termsAndConditionsData: PolicyDocument = {
  title: 'Terms & Conditions',
  description: 'Please read these terms carefully before using RateBotAI services.',
  lastUpdated: 'August 31, 2026',
  introduction:
    'These Terms & Conditions govern your use of the RateBotAI platform. By accessing or using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.',
  sections: [
    {
      id: 'introduction',
      title: '1. Introduction',
      paragraphs: [
        'This section contains the introduction to the terms and conditions. The actual legal content will be provided here once finalized.',
      ],
    },
    {
      id: 'services',
      title: '2. Our Services',
      paragraphs: [
        'This section contains information about the services provided by RateBotAI. The actual legal content will be provided here once finalized.',
      ],
    },
    {
      id: 'user-responsibilities',
      title: '3. User Responsibilities',
      paragraphs: [
        'This section contains information about user responsibilities when using the RateBotAI platform.',
      ],
      bulletPoints: [
        'Users must provide accurate and complete information.',
        'Users must keep account credentials secure and confidential.',
        'Users must use the platform in compliance with all applicable laws.',
        'Users must not attempt to disrupt or compromise platform security.',
      ],
    },
    {
      id: 'payments',
      title: '4. Payments',
      paragraphs: [
        'Payment-related terms and billing information can be added here. This includes subscription fees, billing cycles, and accepted payment methods.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      paragraphs: [
        'Intellectual property terms covering ownership, licensing, and usage rights can be added here.',
      ],
    },
    {
      id: 'limitation-of-liability',
      title: '6. Limitation of Liability',
      paragraphs: [
        'Liability information and disclaimers can be added here. This section will outline the extent of RateBotAI\u2019s liability for damages.',
      ],
    },
    {
      id: 'termination',
      title: '7. Termination',
      paragraphs: [
        'Termination conditions describing how and when either party may end the service agreement can be added here.',
      ],
    },
    {
      id: 'contact',
      title: '8. Contact Us',
      paragraphs: [
        'If you have any questions about these Terms & Conditions, please contact us using the information below.',
      ],
      bulletPoints: [
        'Email: support@ratebotai.com',
        'Phone: +91 9326293409',
        'Address: A-007 Boomerang Building, Mumbai, Maharashtra 400072, India',
      ],
    },
  ],
};

export const policyRoutes: { path: string; data: PolicyDocument }[] = [
  { path: '/terms-and-conditions', data: termsAndConditionsData },
];
