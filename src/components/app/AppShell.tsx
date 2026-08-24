import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { BrandSection } from '../../types';
import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';
import { AccountPage } from './pages/AccountPage';
import { BillingPage } from './pages/BillingPage';
import { BrandsPage } from './pages/BrandsPage';
import { TeamPage } from './pages/TeamPage';
import { BrandWorkspace } from './workspace/BrandWorkspace';

/**
 * Signed-in application frame: header, collapsible sidebar, and the scrolling
 * content column that swaps between the four pages and the brand workspace.
 */
export function AppShell() {
  const { page, sidebarCollapsed } = useApp();
  const [brandSection, setBrandSection] = useState<BrandSection>('images');

  const brandMode = page === 'brand-workspace';
  const bodyClass = [
    'app-body',
    sidebarCollapsed ? 'sidebar-collapsed' : null,
    brandMode ? 'brand-mode' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="view" id="view-app">
      <AppHeader />

      <div className={bodyClass}>
        <Sidebar
          brandSection={brandSection}
          onSelectBrandSection={setBrandSection}
        />

        <main className="content">
          {page === 'brands' && <BrandsPage />}
          {page === 'brand-workspace' && <BrandWorkspace section={brandSection} />}
          {page === 'team' && <TeamPage />}
          {page === 'billing' && <BillingPage />}
          {page === 'account' && <AccountPage />}
        </main>
      </div>
    </div>
  );
}
