import { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { memberNameFromProfile } from '../../lib/brand';
import { ChatIcon, HelpIcon, SettingsIcon, SignOutIcon } from '../icons';

/** Account menu anchored to the top-right avatar, shared by every signed-in view. */
export function AvatarDropdown() {
  const {
    dropdownOpen,
    closeDropdown,
    activeProfile,
    showView,
    showPage,
    toggleChat,
  } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownOpen, [ref], closeDropdown);

  if (!dropdownOpen) return null;

  const displayName =
    activeProfile.memberName ?? memberNameFromProfile(activeProfile.name);

  return (
    <div className="dropdown" ref={ref}>
      <div className="user-info">
        <div className="avatar" style={{ cursor: 'default' }}>
          {activeProfile.initials}
        </div>
        <div>
          <div className="name">{displayName}</div>
          <div className="email">{activeProfile.email}</div>
        </div>
      </div>

      <button
        className="dropdown-item"
        onClick={() => {
          showView('app');
          showPage('account');
          closeDropdown();
        }}
      >
        <SettingsIcon className="icon-sm" /> Settings
      </button>

      <button className="dropdown-item">
        <HelpIcon className="icon-sm" /> Help
      </button>

      <button
        className="dropdown-item"
        onClick={() => {
          toggleChat();
          closeDropdown();
        }}
      >
        <ChatIcon className="icon-sm" /> Support
      </button>

      <div style={{ height: '1px', background: 'var(--border)', margin: '6px 4px' }} />

      <button
        className="dropdown-item danger"
        onClick={() => {
          showView('landing');
          closeDropdown();
        }}
      >
        <SignOutIcon className="icon-sm" /> Sign out
      </button>
    </div>
  );
}
