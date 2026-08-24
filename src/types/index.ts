export type ViewName = 'landing' | 'howto' | 'teams' | 'pricing' | 'onboarding' | 'app';

export type PageName = 'brands' | 'brand-workspace' | 'team' | 'billing' | 'account';

export type ModalId =
  | 'modal-feedback'
  | 'modal-signin'
  | 'modal-credits'
  | 'modal-image-picker';

export type BrandSection = 'images' | 'ad-library' | 'uploads' | 'brand';

export interface BrandDNA {
  domain: string;
  description: string;
  tagline: string;
  headline: string;
  typography: string;
  language: string;
  tone: string;
}

export interface Brand {
  id: string;
  name: string;
  domain: string;
  count: number;
  kind: 'placeholder' | 'real';
  initials?: string;
  color1?: string;
  color2?: string;
  textColor?: string;
  logoUrl?: string;
  /** Per-brand copy of the DNA, created lazily when the workspace first opens. */
  dna?: BrandDNA;
}

export interface Profile {
  name: string;
  email: string;
  initials: string;
  role: string;
  /** Overrides the derived member name once the account form is saved. */
  memberName?: string;
}

export interface UploadedImage {
  name: string;
  src: string;
  /** True for files the user added this session, as opposed to seeded demo assets. */
  userAdded?: boolean;
}

export interface QuestionnaireQuestion {
  eyebrow: string;
  title: string;
  help: string;
  options: string[];
}

/** Steps of the onboarding state machine, in the order they run. */
export type OnboardStep =
  | 'input'
  | 'loading'
  | 'questionnaire'
  | 'confirm'
  | 'extracting'
  | 'generated';
