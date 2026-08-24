import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { NIKE_LOGO_URL } from '../../data/constants';
import { brandNameFromInput, cleanDomain, isNikeInput } from '../../lib/brand';
import { NikeLogo } from '../NikeLogo';
import { AvatarButton } from '../app/AvatarButton';
import {
  ArrowUpIcon,
  BloomIcon,
  BuildingIcon,
  ChecklistIcon,
  ChevronLeftIcon,
  GlobeIcon,
  SearchIcon,
} from '../icons';
import type { OnboardStep } from '../../types';
import { ExtractingStep } from './ExtractingStep';
import { GeneratedStep } from './GeneratedStep';
import { Questionnaire } from './Questionnaire';

const PILL_INTERVAL_MS = 1250;
const PILL_HANDOFF_MS = 700;

/** Steps in the "fetching your brand" pill, in display order. */
const PILL_STEPS = [
  { text: (domain: string) => 'Fetching ' + domain, Icon: GlobeIcon },
  { text: () => 'Looking for the logo', Icon: SearchIcon },
  { text: () => 'Understanding the company', Icon: BuildingIcon },
  { text: () => 'Almost done…', Icon: ChecklistIcon },
];

export function OnboardingView() {
  const {
    onboardingSeed,
    showView,
    showPage,
    addBrand,
  } = useApp();

  // A seeded entry (from the landing scanner) skips straight to the fetch.
  const [step, setStep] = useState<OnboardStep>(onboardingSeed ? 'loading' : 'input');
  const [brandInput, setBrandInput] = useState(onboardingSeed);
  const [draft, setDraft] = useState(onboardingSeed);
  const [pillIndex, setPillIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'input') inputRef.current?.focus();
  }, [step]);

  // Advances the loading pill, then hands off to the questionnaire.
  useEffect(() => {
    if (step !== 'loading') return;
    const last = pillIndex >= PILL_STEPS.length - 1;
    const timer = window.setTimeout(
      () => (last ? setStep('questionnaire') : setPillIndex((index) => index + 1)),
      last ? PILL_HANDOFF_MS : PILL_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [step, pillIndex]);

  function submitInput() {
    const value = draft.trim();
    if (!value) return;
    setBrandInput(value);
    setPillIndex(0);
    setStep('loading');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitInput();
    }
  }

  const finishOnboarding = useCallback(() => {
    const nike = isNikeInput(brandInput);
    const name = nike ? 'Nike' : brandNameFromInput(brandInput);
    const domain = cleanDomain(brandInput);

    addBrand(
      nike
        ? {
            id: `${domain}-${Date.now()}`,
            name: 'Nike',
            domain,
            count: 3,
            kind: 'real',
            logoUrl: NIKE_LOGO_URL,
          }
        : {
            id: `${domain}-${Date.now()}`,
            name,
            domain,
            count: 1,
            kind: 'placeholder',
            color1: '#a78bfa',
            color2: '#6d28d9',
            initials: name.charAt(0),
            textColor: '#fff',
          },
    );

    showView('app');
    showPage('brands');
  }, [addBrand, brandInput, showPage, showView]);

  const showBackHeader =
    step === 'input' || step === 'loading' || step === 'questionnaire';

  const PillIcon = PILL_STEPS[pillIndex].Icon;

  return (
    <div className="view" id="view-onboarding">
      <div className="dot-bg" />
      <div className="onboard-content">
        {showBackHeader ? (
          <div className="onboard-header">
            <button
              className="back-link"
              onClick={() => {
                showView('app');
                showPage('brands');
              }}
            >
              <ChevronLeftIcon className="icon-sm" /> Back
            </button>
            <AvatarButton />
          </div>
        ) : (
          <div className="onboard-header">
            <div className="serif" style={{ fontSize: '24px' }}>
              Bloom
            </div>
            <AvatarButton />
          </div>
        )}

        {step === 'input' && (
          <div className="onboard-center">
            <div className="onboard-icon-wrap">
              <BloomIcon size={40} />
            </div>
            <h1>Add your brand</h1>
            <p>
              Paste a website or Instagram handle,
              <br />
              and Bloom sets it up from there.
            </p>
            <div className="onboard-input-wrap">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="onboard-submit"
                onClick={submitInput}
                aria-label="Add brand"
              >
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="onboard-center">
            <div className="onboard-icon-wrap">
              <BloomIcon size={40} />
            </div>
            <h1>Add your brand</h1>
            <p>
              Paste a website or Instagram handle,
              <br />
              and Bloom sets it up from there.
            </p>
            <div className="onboard-input-wrap">
              <input type="text" value={brandInput} disabled readOnly />
            </div>
            <div className="loading-pill">
              <span>{PILL_STEPS[pillIndex].text(cleanDomain(brandInput))}</span>
              <div className="icon-box">
                <PillIcon className="icon-sm" />
              </div>
            </div>
          </div>
        )}

        {step === 'questionnaire' && (
          <Questionnaire onComplete={() => setStep('confirm')} />
        )}

        {step === 'confirm' && (
          <div className="confirm-wrap">
            <div className="confirm-card">
              <div className="confirm-logo-box">
                {isNikeInput(brandInput) ? (
                  <NikeLogo />
                ) : (
                  <span>{brandNameFromInput(brandInput).charAt(0)}</span>
                )}
              </div>
              <h2>Does the logo look accurate?</h2>
              <p>If not, you can upload a new one.</p>
              <div className="confirm-actions">
                <button
                  className="btn-outline-gray"
                  onClick={() =>
                    window.alert(
                      "Choose an image from your device to use as this brand's logo.",
                    )
                  }
                >
                  Upload Another
                </button>
                <button
                  className="btn-purple"
                  style={{ justifyContent: 'center' }}
                  onClick={() => setStep('extracting')}
                >
                  Looks Good
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'extracting' && (
          <ExtractingStep
            input={brandInput}
            onComplete={() => setStep('generated')}
          />
        )}

        {step === 'generated' && (
          <GeneratedStep input={brandInput} onFinish={finishOnboarding} />
        )}
      </div>
    </div>
  );
}
