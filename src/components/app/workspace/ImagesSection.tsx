import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DEMO_IMAGES } from '../../../data/constants';
import { AssetImage } from '../../AssetImage';
import { SearchIcon } from '../../icons';

const GENERATED_ASSETS = [
  { label: 'Weekend campaign', src: DEMO_IMAGES.frame1, tall: true },
  { label: 'Product story', src: DEMO_IMAGES.frame2 },
  { label: 'Brand moment', src: DEMO_IMAGES.frame3 },
  { label: 'Lifestyle visual', src: DEMO_IMAGES.exterior },
  { label: 'Terrace visual', src: DEMO_IMAGES.terrace },
];

/** Recent generations for the active brand. */
export function ImagesSection() {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const visible = GENERATED_ASSETS.filter((asset) =>
    asset.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="brand-section active">
      <div className="brand-kicker">Last 7 Days</div>

      <div className="brand-search">
        <SearchIcon className="icon-sm" />
        <input
          placeholder="Search images..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="brand-assets">
        {visible.map((asset) => (
          <div
            className={'brand-asset' + (asset.tall ? ' tall' : '')}
            key={asset.label}
            onClick={() => showToast('Image selected for editing')}
          >
            <AssetImage src={asset.src} alt={asset.label} />
            <span>{asset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
