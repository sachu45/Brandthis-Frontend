import { useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';

const SUGGESTIONS = [
  { label: 'Surprise me', brief: 'Surprise me with a campaign idea' },
  { label: 'Give me ideas', brief: 'Give me ideas for a new post' },
  { label: 'Use my library', brief: 'Use my library' },
];

/** Right-hand generation panel: suggestions, brief composer, and credit spend. */
export function AiRail({ onCollapse }: { onCollapse: () => void }) {
  const {
    brief,
    setBrief,
    fillBrief,
    briefFocusToken,
    credits,
    spendCredits,
    resolution,
    setResolution,
    openModal,
    setImagePickerTab,
    showToast,
  } = useApp();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the composer whenever something else fills it in for the user.
  useEffect(() => {
    if (briefFocusToken > 0) textareaRef.current?.focus();
  }, [briefFocusToken]);

  function submitBrief() {
    if (!brief.trim()) {
      showToast('Write a brief to get started');
      return;
    }
    const cost = resolution === 4 ? 2 : 1;
    if (credits < cost) {
      showToast(`Not enough credits for ${resolution}K`);
      return;
    }
    spendCredits(cost);
    showToast('Your on-brand brief is ready');
    setBrief('');
  }

  function changeResolution(value: string) {
    const requested = Number(value);
    if (requested === 4 && credits < 2) {
      showToast('4K requires 2 credits');
      return;
    }
    setResolution(requested);
    showToast(
      `${requested}K selected · ${requested === 4 ? 2 : 1} credit${
        requested === 4 ? 's' : ''
      }`,
    );
  }

  function openPicker(tab: 'uploads' | 'new') {
    setImagePickerTab(tab);
    openModal('modal-image-picker');
  }

  return (
    <aside className="brand-rail">
      <div className="brand-rail-top">
        <button
          onClick={onCollapse}
          aria-label="Minimize AI generator"
          title="Minimize AI generator"
        >
          ›
        </button>
      </div>

      <div className="brand-rail-empty">
        <div className="mark">✿</div>
        <h2>What will you create?</h2>
        <p>Send a brief to begin creating.</p>
        <div className="suggestions">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              onClick={() => fillBrief(suggestion.brief)}
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="brand-composer">
        <textarea
          ref={textareaRef}
          placeholder="Ask Bloom to create or change an image"
          value={brief}
          onChange={(event) => setBrief(event.target.value)}
        />
        <div className="brand-composer-footer">
          <div className="brand-composer-tools">
            <button
              onClick={() => openPicker('new')}
              aria-label="Add image"
              title="Upload new image"
            >
              ▧
            </button>
            <button
              onClick={() => openPicker('uploads')}
              aria-label="Open library"
              title="Open your uploads"
            >
              ▱
            </button>
            <select
              className="resolution-picker"
              value={String(resolution)}
              onChange={(event) => changeResolution(event.target.value)}
              aria-label="Output resolution"
            >
              <option value="2">2K · 1 credit</option>
              <option value="4">4K · 2 credits</option>
            </select>
          </div>
          <button onClick={submitBrief} aria-label="Create image">
            ↑
          </button>
        </div>
      </div>
    </aside>
  );
}
