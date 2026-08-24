import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { memberNameFromProfile } from '../../../lib/brand';

export function TeamPage() {
  const { activeProfile, activeProfileIndex, updateActiveProfile, showToast } = useApp();
  const [teamName, setTeamName] = useState(activeProfile.name);

  // Re-seed the form whenever the user switches to another profile.
  useEffect(() => {
    setTeamName(activeProfile.name);
  }, [activeProfileIndex, activeProfile.name]);

  function saveTeamSettings() {
    const name = teamName.trim();
    if (!name) {
      showToast('Enter a team name');
      return;
    }
    updateActiveProfile({ name });
    showToast('Team settings saved');
  }

  const memberName =
    activeProfile.memberName ?? memberNameFromProfile(activeProfile.name);

  return (
    <section>
      <h1 className="page-title">Team</h1>

      <div className="settings-section">
        <h2>General</h2>
        <div className="desc">
          Your team name, workspace preferences, and creation details.
        </div>
        <div className="settings-grid">
          <div className="field">
            <label htmlFor="team-name-input">Team name</label>
            <input
              id="team-name-input"
              type="text"
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="team-default-brand">Default brand</label>
            <select id="team-default-brand" defaultValue="Hyle Laban">
              <option>Hyle Laban</option>
              <option>Ask me each time</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Created on</label>
          <div className="field-static">Aug 17, 2026</div>
        </div>
        <div className="section-footer">
          <button className="btn-purple" onClick={saveTeamSettings}>
            Save changes
          </button>
        </div>
      </div>

      <div className="divider-full" />

      <div className="settings-section">
        <h2>Members</h2>
        <div className="desc">
          Invite teammates to this team and manage their roles.
        </div>
        <div className="invite-row">
          <input type="text" placeholder="Invite by email" />
          <select defaultValue="Member">
            <option>Member</option>
            <option>Admin</option>
          </select>
          <button className="btn-purple">Invite</button>
        </div>
        <div className="member-row">
          <div className="avatar" style={{ cursor: 'default' }}>
            {activeProfile.initials}
          </div>
          <div className="member-info">
            <div className="name">{memberName}</div>
            <div className="email">{activeProfile.email}</div>
          </div>
          <div className="owner-badge">Owner</div>
        </div>
      </div>
    </section>
  );
}
