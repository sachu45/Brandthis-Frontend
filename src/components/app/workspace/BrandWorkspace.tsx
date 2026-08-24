import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DEFAULT_BRAND_DNA } from '../../../data/constants';
import type { BrandSection } from '../../../types';
import { AdLibrarySection } from './AdLibrarySection';
import { AiRail } from './AiRail';
import { BrandDnaSection } from './BrandDnaSection';
import { ImagesSection } from './ImagesSection';
import { UploadsSection } from './UploadsSection';

/**
 * Single-brand workspace: a scrolling content column plus a collapsible AI
 * generation rail. Which section is showing is owned by `AppShell`, because the
 * left sidebar swaps to brand navigation while this page is open.
 */
export function BrandWorkspace({ section }: { section: BrandSection }) {
  const { activeBrand, closeBrandWorkspace, showToast } = useApp();
  const [aiCollapsed, setAiCollapsed] = useState(false);
  const [displayName, setDisplayName] = useState(activeBrand?.name ?? 'Brand');

  useEffect(() => {
    setDisplayName(activeBrand?.name ?? 'Brand');
    setAiCollapsed(false);
  }, [activeBrand?.id, activeBrand?.name]);

  if (!activeBrand) return null;

  return (
    <section>
      <div className={'brand-workspace' + (aiCollapsed ? ' ai-collapsed' : '')}>
        <div className="brand-workspace-main">
          <div className="brand-workspace-head">
            <button
              className="workspace-control"
              onClick={closeBrandWorkspace}
              aria-label="Back to brands"
            >
              ←
            </button>
            <h1>{displayName}</h1>
            <button
              className="ai-restore"
              onClick={() => setAiCollapsed(false)}
              aria-label="Show AI generator"
              title="Show AI generator"
            >
              ◧
            </button>
            <select className="brand-picker" defaultValue={activeBrand.name}>
              <option>{activeBrand.name}</option>
            </select>
            <button
              className="workspace-control"
              onClick={() => showToast('Brand settings opened')}
            >
              •••
            </button>
          </div>

          {section === 'images' && <ImagesSection />}
          {section === 'ad-library' && <AdLibrarySection />}
          {section === 'uploads' && <UploadsSection brandName={displayName} />}
          {section === 'brand' && (
            <BrandDnaSection
              brandId={activeBrand.id}
              dna={activeBrand.dna ?? DEFAULT_BRAND_DNA}
              onRename={setDisplayName}
            />
          )}
        </div>

        <AiRail onCollapse={() => setAiCollapsed(true)} />
      </div>
    </section>
  );
}
