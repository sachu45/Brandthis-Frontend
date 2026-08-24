import { useApp } from '../../context/AppContext';
import { LinkIcon } from '../icons';
import { BrandScanner } from './BrandScanner';
import { HeroBlob } from './HeroBlob';
import { LandingNav } from './LandingNav';
import { VideoMock } from './VideoMock';

const FEATURES = [
  {
    mark: '✦',
    title: 'One source of truth',
    copy: 'Your identity, assets, tone, and visual language stay together in one living brand space.',
  },
  {
    mark: '◫',
    title: 'From brief to asset',
    copy: 'Start with a simple idea, add a reference, and shape polished creative in a few focused steps.',
  },
  {
    mark: '↗',
    title: 'Ready for your tools',
    copy: 'Connect your workflow with MCP, share a team library, and keep every output recognizable.',
  },
];

const HOW_TO_STEPS = [
  {
    number: '01',
    title: 'Scan your brand',
    copy: 'Paste your website or handle and let Brandthis read the visual patterns that make your business distinct.',
  },
  {
    number: '02',
    title: 'Answer two quick questions',
    copy: 'Tell Brandthis what your business is and what role you play so the workspace starts with useful context.',
  },
  {
    number: '03',
    title: 'Review Brand DNA',
    copy: 'Check your logo, identity, colors, typography, language, headline, products, and images.',
  },
  {
    number: '04',
    title: 'Organize your assets',
    copy: 'Keep generations, templates, and assets close at hand from the brand sidebar.',
  },
  {
    number: '05',
    title: 'Write a brief',
    copy: 'Describe the next piece of creative, add an upload or library reference, and shape the direction.',
  },
  {
    number: '06',
    title: 'Generate and refine',
    copy: 'Choose 2K or 4K, use credits intentionally, and keep every output aligned to the brand.',
  },
];

const CONNECTORS = [
  { label: 'Claude', mark: 'C', background: '#d97757' },
  { label: 'Cursor', mark: '▢', background: '#18181b' },
  { label: 'OpenClaw', mark: 'O', background: '#dc2626' },
];

export function LandingPage() {
  const { showView, enterApp } = useApp();

  return (
    <div className="view" id="view-landing">
      <div className="promo-bar">
        20% off with <b>BRANDTHIS20</b>{' '}
        <button className="btn-plans" onClick={() => showView('pricing')}>
          View plans
        </button>
      </div>

      <LandingNav wordmark="Brandthis" />

      <div className="hero">
        <div className="hero-left">
          <h1>
            The <em>brand</em> layer
            <br />
            for marketing
          </h1>
          <p>
            Brandthis turns your brand into a working system that powers everything
            you create.
          </p>

          <BrandScanner />

          <div className="hero-buttons">
            <button className="btn-primary" onClick={enterApp}>
              Get Started
            </button>
            <button className="btn-outline">
              <LinkIcon className="icon-sm" /> Connect MCP
            </button>
          </div>

          <div className="connect-label">Connect Brandthis with</div>
          <div className="connect-logos">
            {CONNECTORS.map((connector) => (
              <div className="item" key={connector.label}>
                <span
                  className="swatch"
                  style={{ background: connector.background }}
                >
                  {connector.mark}
                </span>
                {connector.label}
              </div>
            ))}
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              style={{
                fontSize: '14px',
                color: 'var(--gray-500)',
                textDecoration: 'none',
              }}
            >
              More →
            </a>
          </div>
        </div>

        <div className="hero-right">
          <HeroBlob />
        </div>
      </div>

      <VideoMock />

      <div className="feature-strip">
        {FEATURES.map((feature) => (
          <div className="feature-item" key={feature.title}>
            <div className="feature-mark">{feature.mark}</div>
            <h2>{feature.title}</h2>
            <p>{feature.copy}</p>
          </div>
        ))}
      </div>

      <section className="landing-howto">
        <div className="landing-howto-header">
          <div className="eyebrow">How to use Brandthis</div>
          <h2>From brand context to usable creative</h2>
          <p>
            A focused workflow for building your identity, organizing references,
            and creating on-brand assets.
          </p>
        </div>
        <div className="landing-howto-grid">
          {HOW_TO_STEPS.map((step) => (
            <article className="landing-howto-card" key={step.number}>
              <div className="number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        <button className="btn-primary landing-howto-action" onClick={enterApp}>
          Try it now
        </button>
      </section>
    </div>
  );
}
