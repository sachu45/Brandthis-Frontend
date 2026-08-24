import { useState, type ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingNav } from '../landing/LandingNav';

interface Step {
  number: string;
  title: string;
  copy: string;
}

function MarketingLayout({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="view marketing-view">
      <LandingNav />
      <div className="marketing-page">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </div>
  );
}

function StepsGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="steps-grid">
      {steps.map((step) => (
        <div className="step-card" key={step.number}>
          <div className="step-number">{step.number}</div>
          <h2>{step.title}</h2>
          <p>{step.copy}</p>
        </div>
      ))}
    </div>
  );
}

const HOW_TO_STEPS: Step[] = [
  {
    number: '01',
    title: 'Scan your brand',
    copy: 'Paste a website or Instagram handle. Bloom reads the visual language, voice, and positioning that make the brand recognizable.',
  },
  {
    number: '02',
    title: 'Shape your Brand DNA',
    copy: 'Review Logo, Identity, Colors, Typography, Language, Headline, Products, and Images. Rewrite any field manually and save it live.',
  },
  {
    number: '03',
    title: 'Organize your library',
    copy: 'Use the left brand sidebar to move between Images, Templates, Uploads, and Brand without losing your place.',
  },
  {
    number: '04',
    title: 'Give Bloom a brief',
    copy: 'Describe what you want, add a reference from Your Uploads or Upload New, then choose 2K or 4K output for the right level of detail.',
  },
  {
    number: '05',
    title: 'Keep creating together',
    copy: 'Share one source of truth with your team so every campaign stays consistent across channels, formats, and collaborators.',
  },
  {
    number: '06',
    title: 'Use credits intentionally',
    copy: '2K uses one credit. 4K uses two credits. Your remaining balance is always visible in the app header.',
  },
];

export function HowToPage() {
  const { enterApp } = useApp();
  return (
    <MarketingLayout
      title="How Bloom works"
      lead="A simple path from a website to a complete, reusable brand system."
    >
      <StepsGrid steps={HOW_TO_STEPS} />
      <button className="btn-primary" style={{ marginTop: '38px' }} onClick={enterApp}>
        Try it now
      </button>
    </MarketingLayout>
  );
}

const TEAM_STEPS: Step[] = [
  {
    number: '01',
    title: 'One shared identity',
    copy: 'Keep brand guidelines, references, tone, and approved assets together.',
  },
  {
    number: '02',
    title: 'Faster collaboration',
    copy: 'Move from brief to usable creative without repeating context in every handoff.',
  },
  {
    number: '03',
    title: 'Consistent output',
    copy: 'Make every image and campaign feel recognizable across the whole organization.',
  },
];

export function TeamsPage() {
  const { openModal } = useApp();
  return (
    <MarketingLayout
      title="Made for teams"
      lead="Give everyone a shared source of truth for the brand, so every campaign feels like it came from the same team."
    >
      <StepsGrid steps={TEAM_STEPS} />
      <button
        className="btn-primary"
        style={{ marginTop: '38px' }}
        onClick={() => openModal('modal-signin')}
      >
        Start with your team
      </button>
    </MarketingLayout>
  );
}

interface Plan {
  name: string;
  monthly: string;
  annual: string;
  billed: string;
  desc: string;
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Plus',
    monthly: '$16',
    annual: '$13',
    billed: 'For growing creative teams',
    desc: 'Get started.',
    features: ['50 assets/month', 'Unlimited brands', 'Shared brand library'],
  },
  {
    name: 'Pro',
    monthly: '$28',
    annual: '$23',
    billed: 'For active marketing teams',
    desc: 'Ship daily.',
    features: [
      '100 assets/month',
      'Unlimited team seats',
      'Priority support',
      '4K generation credits',
    ],
    popular: true,
  },
  {
    name: 'Max',
    monthly: '$39',
    annual: '$32',
    billed: 'For teams creating at volume',
    desc: 'Run at volume.',
    features: [
      '200 assets/month',
      'Unlimited team seats',
      'Priority support',
      'Unlimited brands',
    ],
  },
];

export function PricingPage() {
  const { openModal } = useApp();
  const [mode, setMode] = useState<'monthly' | 'annual'>('monthly');

  return (
    <MarketingLayout
      title="Simple pricing"
      lead="Choose the plan that fits the way your team creates."
    >
      <div className="pricing-toggle">
        <button
          className={mode === 'monthly' ? 'active' : undefined}
          onClick={() => setMode('monthly')}
        >
          Monthly
        </button>
        <button
          className={mode === 'annual' ? 'active' : undefined}
          onClick={() => setMode('annual')}
        >
          Annual
        </button>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            className={'pricing-card' + (plan.popular ? ' popular' : '')}
            key={plan.name}
          >
            {plan.popular && <div className="ribbon">Most popular</div>}
            <div className="pricing-card-body">
              <h2>{plan.name}</h2>
              <div className="pricing-price">
                {mode === 'monthly' ? plan.monthly : plan.annual}
                <small>/mo</small>
              </div>
              <div className="pricing-billed">{plan.billed}</div>
            </div>
            <div className="pricing-desc">{plan.desc}</div>
            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="pricing-cta"
              onClick={() => openModal('modal-signin')}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
