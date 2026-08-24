import type { MouseEvent } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Circular profile button that opens the account dropdown.
 *
 * The click stops propagating so the dropdown's own outside-click listener does
 * not immediately close what this button just opened.
 */
export function AvatarButton() {
  const { activeProfile, toggleDropdown } = useApp();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toggleDropdown();
  }

  return (
    <button className="avatar" onClick={handleClick} aria-label="Account menu">
      {activeProfile.initials}
    </button>
  );
}
