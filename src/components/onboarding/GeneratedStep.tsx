import { brandNameFromInput, cleanDomain, isNikeInput } from '../../lib/brand';
import { CheckIcon, CommunityIcon, ImageIcon, LockIcon, SparkleIcon } from '../icons';
import { BrandDescriptionCard, BrandLogoCard } from './BrandPreviewCards';

/** Final onboarding screen summarising everything Bloom "learned". */
export function GeneratedStep({
  input,
  onFinish,
}: {
  input: string;
  onFinish: () => void;
}) {
  const nike = isNikeInput(input);
  const name = nike ? 'Nike' : brandNameFromInput(input);

  const tagline = nike
    ? 'Empowering every athlete to achieve their peak performance.'
    : `Bringing ${name} closer to the people who love it.`;

  return (
    <div className="extract-wrap" style={{ marginTop: '60px' }}>
      <div className="gen-left" style={{ gridColumn: 1, gridRow: '1/4' }}>
        <div className="orbit-wrap">
          <div className="orbit-circle" />
          <div className="orbit-icon" style={{ top: '-4px', left: '18px' }}>
            <ImageIcon className="icon-sm" />
          </div>
          <div className="orbit-icon" style={{ top: '-4px', right: '18px' }}>
            <SparkleIcon className="icon-sm" />
          </div>
          <div
            className="orbit-icon"
            style={{
              bottom: '-4px',
              left: '18px',
              fontFamily: 'var(--serif)',
              fontSize: '13px',
            }}
          >
            Aa
          </div>
          <div className="orbit-icon" style={{ bottom: '-4px', right: '18px' }}>
            <CommunityIcon className="icon-sm" />
          </div>
          <div className="orbit-check">
            <CheckIcon />
          </div>
        </div>

        <h1>
          Brand identity
          <br />
          generated
        </h1>
        <p>Now everything you create is on-brand.</p>
        <button
          className="btn-purple btn-full"
          style={{ justifyContent: 'center' }}
          onClick={onFinish}
        >
          Let&apos;s Begin
        </button>
      </div>

      <BrandLogoCard input={input} style={{ gridColumn: 2, gridRow: 1 }} />
      <BrandDescriptionCard input={input} style={{ gridColumn: 3, gridRow: 1 }} />

      <div className="tagline-card" style={{ gridColumn: 2, gridRow: 2 }}>
        <div className="lbl">Tagline</div>
        <q>{tagline}</q>
      </div>

      <div className="fonts-card" style={{ gridColumn: 3, gridRow: 2 }}>
        <div className="lbl">Fonts</div>
        <div className="fonts-row">
          <div className="fonts-col">
            <div className="cap">Heading</div>
            <div className="sample serif">Aa Bb Cc</div>
            <div className="fname">{nike ? 'Nike Futura ND' : 'Instrument Serif'}</div>
          </div>
          <div className="fonts-col">
            <div className="cap">Body</div>
            <div className="sample">Aa Bb Cc</div>
            <div className="fname">{nike ? 'Helvetica Now Text' : 'Inter'}</div>
          </div>
        </div>
      </div>

      <div className="meta-preview" style={{ gridColumn: '2/4', gridRow: 3 }}>
        <div className="meta-row">
          <span style={{ fontSize: '14px' }}>{nike ? '⎯' : '●'}</span>{' '}
          <span>{nike ? 'Nike. Just Do It. Nike IN' : `${name}. Official Site.`}</span>
        </div>
        <div className="meta-row">
          <LockIcon className="icon-sm" /> <span>{cleanDomain(input)}</span>
        </div>
      </div>
    </div>
  );
}
