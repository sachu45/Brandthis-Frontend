import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { memberNameFromProfile } from '../../../lib/brand';
import { TrashIcon } from '../../icons';

const NOTIFICATION_SETTINGS = [
  {
    id: 'generation-updates',
    title: 'Generation updates',
    copy: 'Get notified when an image finishes generating.',
    initial: true,
  },
  {
    id: 'team-activity',
    title: 'Team activity',
    copy: 'Stay informed about shared assets and invitations.',
    initial: true,
  },
  {
    id: 'product-news',
    title: 'Product news',
    copy: 'Receive occasional updates about new Bloom features.',
    initial: false,
  },
];

export function AccountPage() {
  const { activeProfile, activeProfileIndex, updateActiveProfile, showToast } = useApp();

  const [name, setName] = useState(
    activeProfile.memberName ?? memberNameFromProfile(activeProfile.name),
  );
  const [email, setEmail] = useState(activeProfile.email);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      NOTIFICATION_SETTINGS.map((setting) => [setting.id, setting.initial]),
    ),
  );

  // Re-seed the form whenever the user switches to another profile.
  useEffect(() => {
    setName(activeProfile.memberName ?? memberNameFromProfile(activeProfile.name));
    setEmail(activeProfile.email);
  }, [activeProfileIndex, activeProfile]);

  function saveAccountSettings() {
    if (!name.trim() || !email.trim()) {
      showToast('Complete your account details');
      return;
    }
    updateActiveProfile({ memberName: name.trim(), email: email.trim() });
    showToast('Account settings saved');
  }

  function toggleNotification(id: string, title: string) {
    setNotifications((current) => {
      const next = !current[id];
      showToast((next ? 'Enabled ' : 'Disabled ') + title);
      return { ...current, [id]: next };
    });
  }

  function changePassword() {
    const password = window.prompt('Enter a new password');
    if (password === null) return;
    if (password.length < 8) {
      showToast('Password must be at least 8 characters');
      return;
    }
    showToast('Password updated successfully');
  }

  return (
    <section>
      <h1 className="page-title">Account</h1>

      <div className="settings-section">
        <h2>General</h2>
        <div className="desc">Your personal details and workspace preferences.</div>
        <div className="settings-grid">
          <div className="field">
            <label htmlFor="account-name-input">Name</label>
            <input
              id="account-name-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="account-email-input">Email</label>
            <input
              id="account-email-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="account-timezone-input">Timezone</label>
            <select id="account-timezone-input" defaultValue="Asia/Kolkata (IST)">
              <option>Asia/Kolkata (IST)</option>
              <option>Europe/London (GMT)</option>
              <option>America/New_York (ET)</option>
              <option>UTC</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="account-language-input">Language</label>
            <select id="account-language-input" defaultValue="English">
              <option>English</option>
              <option>Hindi</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
        <div className="settings-note">
          Your timezone controls timestamps for uploads, generations, and activity.
        </div>
        <div className="section-footer">
          <button className="btn-purple" onClick={saveAccountSettings}>
            Save changes
          </button>
        </div>
      </div>

      <div className="divider-full" />

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="desc">Choose which updates arrive in your inbox.</div>
        {NOTIFICATION_SETTINGS.map((setting) => (
          <div className="toggle-row" key={setting.id}>
            <div className="toggle-copy">
              <strong>{setting.title}</strong>
              <span>{setting.copy}</span>
            </div>
            <button
              className={'toggle' + (notifications[setting.id] ? ' on' : '')}
              aria-pressed={notifications[setting.id]}
              aria-label={'Toggle ' + setting.title.toLowerCase()}
              onClick={() => toggleNotification(setting.id, setting.title)}
            >
              <i />
            </button>
          </div>
        ))}
      </div>

      <div className="divider-full" />

      <div className="settings-section">
        <h2>Security</h2>
        <div className="desc">Manage how you protect access to your account.</div>
        <div className="settings-action-row">
          <div>
            <strong>Password</strong>
            <span>Last changed recently</span>
          </div>
          <button className="btn-manage" onClick={changePassword}>
            Change password
          </button>
        </div>
        <div className="settings-action-row">
          <div>
            <strong>Active sessions</strong>
            <span>1 session currently active</span>
          </div>
          <button
            className="btn-manage"
            onClick={() => showToast('All other sessions signed out')}
          >
            Sign out others
          </button>
        </div>
      </div>

      <div className="divider-full" />

      <div className="settings-section danger">
        <h2>Danger zone</h2>
        <div className="desc">
          Permanently delete your account and all associated data. This action cannot
          be undone. Any active subscriptions will be cancelled.
        </div>
        <button className="btn-outline-danger">
          <TrashIcon className="icon-sm" /> Delete account
        </button>
      </div>
    </section>
  );
}
