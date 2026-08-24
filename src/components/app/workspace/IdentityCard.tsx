import { useRef, useState, type ChangeEvent } from 'react';
import { useApp } from '../../../context/AppContext';
import { BRAND_PALETTE, IDENTITY_TONES } from '../../../data/constants';

/**
 * Brand overview card with an inline edit mode.
 *
 * This markup existed in the original page but was unreachable: opening the
 * Brand section replaced the whole section with the DNA board before the card
 * could ever render. It is ported here so the work is not lost — mount it from
 * `BrandWorkspace` above `<BrandDnaSection />` if you want it back.
 */
export function IdentityCard() {
  const { showToast } = useApp();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [domain, setDomain] = useState('hylelaban.cafe');
  const [description, setDescription] = useState(
    'Hyle Laban is a dessert brand that brings authentic flavor into a fresh, approachable experience.',
  );
  const [tagline, setTagline] = useState('Taste the true essence of Laban.');
  const [tone, setTone] = useState(IDENTITY_TONES[0]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Values held while editing, so Cancel can discard them.
  const [draft, setDraft] = useState({ domain, description, tagline });

  function startEditing() {
    setDraft({ domain, description, tagline });
    setEditing(true);
  }

  function save() {
    if (!draft.domain.trim() || !draft.description.trim() || !draft.tagline.trim()) {
      showToast('Complete all overview fields');
      return;
    }
    setDomain(draft.domain.trim());
    setDescription(draft.description.trim());
    setTagline(draft.tagline.trim());
    setEditing(false);
    showToast('Brand overview saved');
  }

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLogoUrl(URL.createObjectURL(file));
    showToast('Logo preview updated');
  }

  const logo = logoUrl ? (
    <img
      src={logoUrl}
      alt="Brand logo"
      style={{ width: '72%', height: '72%', objectFit: 'contain' }}
    />
  ) : (
    <span>HL</span>
  );

  return (
    <>
      <div className={'identity-card' + (editing ? ' editing' : '')}>
        <div className="identity-view">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2px' }}>
            <button className="identity-action" onClick={startEditing}>
              Edit overview
            </button>
          </div>
          <div className="identity-top">
            <div className="identity-logo">{logo}</div>
            <div>
              <h2>{domain}</h2>
              <div className="muted">{description}</div>
              <strong style={{ display: 'block', marginTop: '16px', fontSize: '13px' }}>
                Tagline
              </strong>
              <div className="muted">{tagline}</div>
            </div>
          </div>
          <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Colors</h3>
          <div className="palette">
            {BRAND_PALETTE.map((color) => (
              <i key={color} style={{ background: color }} />
            ))}
          </div>
          <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Tone</h3>
          <div className="brand-subnav" style={{ border: 0, margin: 0 }}>
            {IDENTITY_TONES.map((item) => (
              <button key={item} className={tone === item ? 'active' : undefined}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="identity-edit">
          <div className="identity-edit-grid">
            <div>
              <div
                className="identity-logo"
                onClick={() => logoInputRef.current?.click()}
              >
                {logo}
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleLogoChange}
              />
            </div>
            <div>
              <label htmlFor="identity-domain-input">Website or handle</label>
              <input
                id="identity-domain-input"
                value={draft.domain}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, domain: event.target.value }))
                }
              />
              <label htmlFor="identity-description-input">Description</label>
              <textarea
                id="identity-description-input"
                value={draft.description}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
              />
              <label htmlFor="identity-tagline-input">Tagline</label>
              <input
                id="identity-tagline-input"
                value={draft.tagline}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, tagline: event.target.value }))
                }
              />
            </div>
          </div>

          <label style={{ display: 'block', marginTop: '15px' }}>Tone</label>
          <div className="brand-subnav" style={{ border: 0, margin: 0 }}>
            {IDENTITY_TONES.map((item) => (
              <button
                key={item}
                type="button"
                className={tone === item ? 'active' : undefined}
                onClick={() => setTone(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="identity-actions">
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button className="save" type="button" onClick={save}>
              Save changes
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '14px', maxWidth: '720px' }}>
        <div className="card-header">
          <h2>Design Language</h2>
          <button className="identity-action" onClick={startEditing}>
            Edit manually
          </button>
        </div>
        <div className="card-body">
          <div style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: 1.6 }}>
            Keep colors, fonts, tone, and aesthetic notes aligned with the brand. Use
            Edit manually to rewrite the overview above.
          </div>
        </div>
      </div>
    </>
  );
}
