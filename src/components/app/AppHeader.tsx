import { useRef, type MouseEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { BloomIcon, ChevronDownIcon, ClockIcon, PanelIcon, UserPlusIcon } from '../icons';
import { AvatarButton } from './AvatarButton';
import { ProfileSwitcher } from './ProfileSwitcher';

export function AppHeader() {
  const {
    activeProfile,
    toggleProfileSwitcher,
    profileSwitcherOpen,
    toggleSidebar,
    credits,
    openModal,
  } = useApp();
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleSwitcherClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toggleProfileSwitcher();
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-left">
          <span>
            <BloomIcon />
          </span>
          <span className="sep">/</span>
          <button
            ref={triggerRef}
            className="team-switch"
            onClick={handleSwitcherClick}
            aria-expanded={profileSwitcherOpen}
          >
            <span>{activeProfile.name}</span> <ChevronDownIcon className="icon-sm" />
          </button>
          <button className="collapse-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <PanelIcon className="icon-sm" />
          </button>
        </div>

        <div className="app-header-right">
          <button className="credits-pill" onClick={() => openModal('modal-credits')}>
            <ClockIcon className="icon-sm" /> <span>{credits}</span>
          </button>
          <button className="btn-invite">
            <UserPlusIcon className="icon-sm" /> Invite team
          </button>
          <AvatarButton />
        </div>
      </header>

      <ProfileSwitcher triggerRef={triggerRef} />
    </>
  );
}
