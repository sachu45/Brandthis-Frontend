import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { BRAND_PALETTE, DEMO_IMAGES } from '../../../data/constants';
import { AssetImage } from '../../AssetImage';
import type { BrandDNA } from '../../../types';

const LANGUAGES = ['English', 'Arabic', 'Hindi'];
const TYPEFACES = ['Outfit', 'Inter', 'Instrument Serif', 'Roboto'];
const TONES = ['Playful', 'Fresh', 'Approachable', 'Modern', 'Energetic'];

/** Two-letter flag-ish badge shown on the Language card. */
function languageBadge(language: string): string {
  return language === 'English' ? 'GB' : language.slice(0, 2).toUpperCase();
}

interface BrandDnaSectionProps {
  brandId: string;
  dna: BrandDNA;
  onRename: (name: string) => void;
}

/**
 * The Brand DNA board. Editing happens in a panel below the cards, and every
 * keystroke previews live in the cards above before being committed on save.
 */
export function BrandDnaSection({ brandId, dna, onRename }: BrandDnaSectionProps) {
  const { updateBrandDNA, showToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<BrandDNA>(dna);

  // Discard any in-flight preview when the workspace switches brands.
  useEffect(() => {
    setDraft(dna);
    setEditing(false);
  }, [brandId, dna]);

  function update<K extends keyof BrandDNA>(field: K, value: BrandDNA[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function save() {
    updateBrandDNA(brandId, draft);
    setEditing(false);
    onRename(draft.domain.split('.')[0] || 'Brand');
    showToast('Brand DNA saved');
  }

  function cancel() {
    setDraft(dna);
    setEditing(false);
  }

  return (
    <div className="brand-section active">
      <div className={'brand-dna' + (editing ? ' editing' : '')}>
        <div className="dna-card logo-card">
          <button className="dna-edit-toggle" onClick={() => setEditing((on) => !on)}>
            Edit
          </button>
          <h3>Logo</h3>
          <div className="dna-logo-preview">HL</div>
        </div>

        <div className="dna-card identity-card-dna">
          <h3>Identity</h3>
          <div className="dna-identity-title">{draft.domain}</div>
          <div className="dna-meta">{draft.description}</div>
          <span className="dna-label">Tagline</span>
          <div className="dna-meta">{draft.tagline}</div>
        </div>

        <div className="dna-card">
          <h3>Colors</h3>
          <div className="palette">
            {BRAND_PALETTE.map((color) => (
              <i key={color} style={{ background: color }} />
            ))}
          </div>
        </div>

        <div className="dna-card">
          <h3>Typography</h3>
          <div className="dna-font-sample">Aa</div>
          <div className="dna-meta">{draft.typography}</div>
        </div>

        <div className="dna-card">
          <h3>Language</h3>
          <div className="dna-font-sample">{languageBadge(draft.language)}</div>
          <div className="dna-meta">{draft.language}</div>
        </div>

        <div className="dna-card">
          <h3>Headline</h3>
          <div className="dna-headline">{draft.headline}</div>
        </div>

        <div className="dna-card">
          <h3>Products</h3>
          <div className="dna-product-row">
            <AssetImage src={DEMO_IMAGES.frame8} alt="Laban dessert" />
            <AssetImage src={DEMO_IMAGES.frame7} alt="Brand mascot" />
            <div className="dna-meta">2 products</div>
          </div>
        </div>

        <div className="dna-card">
          <h3>Images</h3>
          <div className="dna-image-row">
            <AssetImage src={DEMO_IMAGES.frame1} alt="Campaign image" />
            <AssetImage src={DEMO_IMAGES.frame2} alt="Campaign image" />
            <div className="dna-meta">25 imported</div>
          </div>
        </div>

        <div className="dna-editor">
          <div className="dna-editor-grid">
            <label>
              Website or handle
              <input
                value={draft.domain}
                onChange={(event) => update('domain', event.target.value)}
              />
            </label>
            <label>
              Language
              <select
                value={draft.language}
                onChange={(event) => update('language', event.target.value)}
              >
                {LANGUAGES.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea
                value={draft.description}
                onChange={(event) => update('description', event.target.value)}
              />
            </label>
            <label>
              Tagline
              <input
                value={draft.tagline}
                onChange={(event) => update('tagline', event.target.value)}
              />
            </label>
            <label>
              Headline
              <input
                value={draft.headline}
                onChange={(event) => update('headline', event.target.value)}
              />
            </label>
            <label>
              Typography
              <select
                value={draft.typography}
                onChange={(event) => update('typography', event.target.value)}
              >
                {TYPEFACES.map((face) => (
                  <option key={face}>{face}</option>
                ))}
              </select>
            </label>
            <label>
              Tone
              <select
                value={draft.tone}
                onChange={(event) => update('tone', event.target.value)}
              >
                {TONES.map((tone) => (
                  <option key={tone}>{tone}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="dna-editor-actions">
            <button onClick={cancel}>Cancel</button>
            <button className="save" onClick={save}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
