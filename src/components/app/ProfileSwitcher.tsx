import { useRef, type RefObject } from 'react';
import { useApp } from '../../context/AppContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';

/** Popover listing every team profile, opened from the header team switcher. */
export function ProfileSwitcher({
  triggerRef,
}: {
  triggerRef: RefObject<HTMLElement>;
}) {
  const {
    profileSwitcherOpen,
    closeProfileSwitcher,
    profiles,
    activeProfileIndex,
    switchProfile,
    addProfile,
  } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(profileSwitcherOpen, [ref, triggerRef], closeProfileSwitcher);

  if (!profileSwitcherOpen) return null;

  return (
    <div
      className="profile-switcher"
      ref={ref}
      role="menu"
      aria-label="Switch profile"
    >
      <div className="profile-switcher-header">Switch profile</div>
      <div>
        {profiles.map((profile, index) => {
          const active = index === activeProfileIndex;
          return (
            <button
              key={profile.name + profile.email}
              className={'profile-option' + (active ? ' active' : '')}
              role="menuitem"
              aria-current={active}
              onClick={() => switchProfile(index)}
            >
              <span className="profile-avatar">{profile.initials}</span>
              <span className="profile-option-copy">
                <span className="profile-option-name">{profile.name}</span>
                <span className="profile-option-meta">{profile.email}</span>
              </span>
              {active && (
                <span className="profile-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="profile-switcher-divider" />
      <button className="profile-add" onClick={addProfile}>
        <span aria-hidden="true">+</span> Add profile
      </button>
    </div>
  );
}
