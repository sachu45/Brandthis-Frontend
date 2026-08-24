import { useApp } from '../../context/AppContext';
import { BloomIcon } from '../icons';

const LINKS = [
  { view: 'landing', label: 'Home' },
  { view: 'howto', label: 'How to use' },
  { view: 'teams', label: 'Teams' },
  { view: 'pricing', label: 'Pricing' },
] as const;

/**
 * Shared top navigation. The landing page brands itself "Brandthis" while the
 * marketing pages use "Bloom", so the wordmark is a prop.
 */
export function LandingNav({ wordmark = 'Bloom' }: { wordmark?: string }) {
  const { showView, openModal } = useApp();

  return (
    <nav className="landing-nav">
      <div className="brand-logo" onClick={() => showView('landing')}>
        <span>
          <BloomIcon />
        </span>{' '}
        {wordmark}
      </div>
      <div className="landing-links">
        {LINKS.map((link) => (
          <a
            key={link.view}
            className="marketing-nav-link"
            onClick={() => showView(link.view)}
          >
            {link.label}
          </a>
        ))}
      </div>
      <button className="btn-signin" onClick={() => openModal('modal-signin')}>
        Sign In
      </button>
    </nav>
  );
}
