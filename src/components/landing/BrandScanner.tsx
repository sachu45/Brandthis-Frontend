import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';

const IDLE_STATUS = 'Start with a website or handle to build your brand system.';
const STEP_INTERVAL_MS = 700;
const HANDOFF_DELAY_MS = 500;

/**
 * Hero input that fakes a brand scan, then hands the entered value to the
 * onboarding flow so the user does not have to type it twice.
 */
export function BrandScanner() {
  const { openOnboarding } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(IDLE_STATUS);
  const [scanning, setScanning] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  // Walks the scan messages, then opens onboarding pre-filled with the input.
  useEffect(() => {
    if (!scanning) return;

    if (stepIndex < steps.length) {
      setStatus(steps[stepIndex]);
      const timer = window.setTimeout(
        () => setStepIndex((index) => index + 1),
        STEP_INTERVAL_MS,
      );
      return () => window.clearTimeout(timer);
    }

    setScanning(false);
    setStatus('Brand scan complete. Continue setup below.');
    const timer = window.setTimeout(
      () => openOnboarding(value.trim()),
      HANDOFF_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [scanning, stepIndex, steps, value, openOnboarding]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setStatus('Add a website or handle to begin.');
      inputRef.current?.focus();
      return;
    }
    setSteps([
      'Fetching ' + trimmed,
      'Reading visual patterns',
      'Learning brand language',
      'Preparing your brand system',
    ]);
    setStepIndex(0);
    setScanning(true);
  }

  return (
    <>
      <form className="brand-scanner" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Paste your website or Instagram handle"
          autoComplete="off"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">
          <span>✦</span> Scan brand
        </button>
      </form>
      <div
        className={'scanner-status' + (scanning ? ' scanning' : '')}
        aria-live="polite"
      >
        {status}
      </div>
    </>
  );
}
