import { useApp } from '../../context/AppContext';
import {
  BriefcaseIcon,
  CardIcon,
  FeedbackIcon,
  GridIcon,
  HelpIcon,
  ImageIcon,
  PlugIcon,
  StarIcon,
  TeamIcon,
  TemplateIcon,
  UploadIcon,
  UserIcon,
} from '../icons';
import type { BrandSection, PageName } from '../../types';

const GLOBAL_NAV: Array<{ page: PageName; label: string; Icon: typeof GridIcon }> = [
  { page: 'brands', label: 'Brands', Icon: GridIcon },
  { page: 'team', label: 'Team', Icon: TeamIcon },
  { page: 'billing', label: 'Billing', Icon: CardIcon },
  { page: 'account', label: 'Account', Icon: UserIcon },
];

const BRAND_NAV: Array<{
  section: BrandSection;
  label: string;
  Icon: typeof GridIcon;
}> = [
  { section: 'images', label: 'Generations', Icon: ImageIcon },
  { section: 'ad-library', label: 'Templates', Icon: TemplateIcon },
  { section: 'uploads', label: 'Assets', Icon: UploadIcon },
  { section: 'brand', label: 'Brand DNA', Icon: StarIcon },
];

interface SidebarProps {
  brandSection: BrandSection;
  onSelectBrandSection: (section: BrandSection) => void;
}

export function Sidebar({ brandSection, onSelectBrandSection }: SidebarProps) {
  const { page, showPage, openModal, activeBrand } = useApp();
  const brandMode = page === 'brand-workspace';

  return (
    <aside className="sidebar">
      <div>
        {brandMode ? (
          <div className="brand-sidebar-nav">
            <div className="nav-label">{activeBrand?.name ?? 'Brand'}</div>
            <div className="nav-group">
              {BRAND_NAV.map(({ section, label, Icon }) => (
                <button
                  key={section}
                  className={
                    'nav-item' + (brandSection === section ? ' active' : '')
                  }
                  onClick={() => onSelectBrandSection(section)}
                >
                  <Icon /> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="global-sidebar-nav">
            <div className="nav-group">
              {GLOBAL_NAV.map(({ page: target, label, Icon }) => (
                <button
                  key={target}
                  className={'nav-item' + (page === target ? ' active' : '')}
                  onClick={() => showPage(target)}
                >
                  <Icon /> {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-bottom">
        <button className="btn-feedback" onClick={() => openModal('modal-feedback')}>
          <FeedbackIcon className="icon-sm" /> Share feedback
        </button>
        <div className="icon-row">
          <button aria-label="Integrations">
            <PlugIcon />
          </button>
          <button aria-label="Help">
            <HelpIcon />
          </button>
          <button aria-label="Resources">
            <BriefcaseIcon />
          </button>
        </div>
      </div>
    </aside>
  );
}
