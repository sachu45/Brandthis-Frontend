import { useEffect, type RefObject } from 'react';

/**
 * Calls `onOutside` when a click lands outside every supplied element.
 * Used by the avatar dropdown and the profile switcher, which both dismiss on
 * an outside click but must ignore clicks on their own trigger button.
 */
export function useOutsideClick(
  active: boolean,
  refs: Array<RefObject<HTMLElement>>,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!active) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      const inside = refs.some((ref) => ref.current?.contains(target));
      if (!inside) onOutside();
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onOutside]);
}
