import { useEffect, useState } from 'react';
import { EXTRACT_STEP_LABELS } from '../../data/constants';
import { BrandDescriptionCard, BrandLogoCard } from './BrandPreviewCards';

const STEP_INTERVAL_MS = 1100;
const HANDOFF_DELAY_MS = 700;
const SECONDS_PER_STEP = 6;

/** Progress checklist shown while the brand is "extracted". */
export function ExtractingStep({
  input,
  onComplete,
}: {
  input: string;
  onComplete: () => void;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const done = tick >= EXTRACT_STEP_LABELS.length;
    const timer = window.setTimeout(
      () => (done ? onComplete() : setTick((current) => current + 1)),
      done ? HANDOFF_DELAY_MS : STEP_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [tick, onComplete]);

  const remaining = (EXTRACT_STEP_LABELS.length - 1 - tick) * SECONDS_PER_STEP;

  return (
    <div className="extract-wrap" style={{ marginTop: '60px' }}>
      <div className="extract-left">
        <h1>
          Extracting brand
          <br />
          identity
        </h1>
        <div className="sub">This is a one-time setup for your brand</div>

        <div className="step-list">
          {EXTRACT_STEP_LABELS.map((label, index) => {
            const state =
              index < tick ? ' done' : index === tick ? ' active' : '';
            return (
              <div className={'step-item' + state} key={label}>
                <div className="step-dot" />
                <div className="step-label">{label}</div>
              </div>
            );
          })}
        </div>

        <div className="time-remaining">
          {remaining > 0 ? `About ${remaining} seconds remaining` : 'Almost done…'}
        </div>
      </div>

      <BrandLogoCard input={input} style={{ gridColumn: 2, gridRow: 1 }} />
      <BrandDescriptionCard input={input} style={{ gridColumn: 3, gridRow: 1 }} />
    </div>
  );
}
