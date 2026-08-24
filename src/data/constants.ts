import type {
  Brand,
  BrandDNA,
  Profile,
  QuestionnaireQuestion,
  UploadedImage,
} from '../types';

export const NIKE_LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';

export const NIKE_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><path d="M4 30 C 25 6, 55 10, 70 20 C 82 27, 92 15, 96 8 C 88 30, 65 36, 40 34 C 22 33, 10 32, 4 30 Z" fill="black"/></svg>',
  );

/**
 * Demo imagery paths carried over from the original prototype. They point at a
 * sibling `site/` project, so drop real files into `public/` and update these
 * paths to wire the app up to your own assets.
 */
export const DEMO_IMAGES = {
  frame1: '../site/public/frames/frame_0001.jpg',
  frame2: '../site/public/frames/frame_0002.jpg',
  frame3: '../site/public/frames/frame_0003.jpg',
  frame4: '../site/public/frames/frame_0004.jpg',
  frame5: '../site/public/frames/frame_0005.jpg',
  frame6: '../site/public/frames/frame_0006.jpg',
  frame7: '../site/public/frames/frame_0007.jpg',
  frame8: '../site/public/frames/frame_0008.jpg',
  frame9: '../site/public/frames/frame_0009.jpg',
  frame10: '../site/public/frames/frame_0010.jpg',
  exterior: '../site/public/images/portfolio/hillside-residence/01-exterior.jpg',
  livingDining:
    '../site/public/images/portfolio/hillside-residence/02-living-dining.jpg',
  kitchen: '../site/public/images/portfolio/hillside-residence/03-kitchen.jpg',
  terrace:
    '../site/public/images/portfolio/sunset-terrace-residence/01-terrace.jpg',
} as const;

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'hyle-laban',
    name: 'Hyle Laban',
    domain: 'hylelaban.cafe',
    count: 2,
    kind: 'placeholder',
    color1: '#3b7dd8',
    color2: '#1e4fa3',
    initials: 'HL',
  },
];

export const INITIAL_PROFILES: Profile[] = [
  {
    name: "SARRVESH's Team",
    email: 'sarrvesh450@gmail.com',
    initials: 'S',
    role: 'Owner',
  },
  {
    name: 'Hyle Laban Studio',
    email: 'studio@hylelaban.cafe',
    initials: 'HL',
    role: 'Member',
  },
];

export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    eyebrow: '01 / Business profile',
    title: 'What best describes your business?',
    help: 'Pick the option that best fits your business today.',
    options: ['E-commerce', 'Service', 'Software', 'Agency', 'Creator', 'Other'],
  },
  {
    eyebrow: '02 / Your role',
    title: "What's your role?",
    help: 'So Bloom knows who it is working with.',
    options: [
      'Founder / CEO',
      'Business owner',
      'Marketer',
      'Agency owner',
      'Freelancer',
      'Manager',
      'Engineer / Developer',
      'Sales',
      'Other',
    ],
  },
];

export const INITIAL_UPLOADS: UploadedImage[] = [
  { name: 'Mascot portrait', src: DEMO_IMAGES.frame7 },
  { name: 'Dessert product', src: DEMO_IMAGES.frame8 },
  { name: 'Storefront', src: DEMO_IMAGES.frame9 },
  { name: 'Brand campaign', src: DEMO_IMAGES.frame10 },
];

export const DEFAULT_BRAND_DNA: BrandDNA = {
  domain: 'hylelaban.cafe',
  description:
    'Hyle Laban is a dessert brand that specializes in authentic Middle Eastern laban-based desserts.',
  tagline: 'Taste the true essence of Laban.',
  headline: 'Taste the true essence of Laban.',
  typography: 'Outfit',
  language: 'English',
  tone: 'Playful',
};

export const INITIAL_CREDITS = 9;

export const BRAND_PALETTE = ['#08a7e3', '#103c5d', '#fff', '#f4ad06', '#d9eef7'];

export const IDENTITY_TONES = ['Playful', 'Fresh', 'Approachable', 'Modern'];

/** Labels shown while the onboarding flow pretends to extract a brand. */
export const EXTRACT_STEP_LABELS = [
  'Understanding the brand',
  'Mapping visual patterns',
  'Capturing the color palette',
  'Learning the aesthetics',
  'Putting everything together',
];

export const VIDEO_DURATION_SECONDS = 42;
