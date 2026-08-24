import { useEffect } from 'react';

/**
 * Replays the `.button-lift` keyframe on whichever button was clicked.
 *
 * This stays a document-level listener, as it was in the original page: it is
 * purely presentational and applies to every button in the app, so threading a
 * handler through each component would add noise for no behavioural gain.
 */
export function useButtonLift() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest('button');
      if (!button || button.disabled || button.classList.contains('modal-close')) {
        return;
      }
      button.classList.remove('button-lift');
      // Force a reflow so the animation restarts on repeated clicks.
      void button.offsetWidth;
      button.classList.add('button-lift');
      button.addEventListener(
        'animationend',
        () => button.classList.remove('button-lift'),
        { once: true },
      );
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
