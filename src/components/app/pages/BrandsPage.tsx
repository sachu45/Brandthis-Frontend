import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { NikeLogo } from '../../NikeLogo';
import { ImageIcon, PlusIcon, SearchIcon } from '../../icons';
import type { Brand } from '../../../types';

function BrandBadge({ brand }: { brand: Brand }) {
  const background =
    brand.kind === 'placeholder'
      ? `radial-gradient(circle at 35% 30%, ${brand.color1}, ${brand.color2})`
      : '#fff';

  return (
    <div className="brand-badge" style={{ background }}>
      {brand.kind === 'real' && brand.logoUrl ? (
        <NikeLogo />
      ) : (
        <span style={{ color: brand.textColor ?? '#fff' }}>
          {brand.initials ?? brand.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export function BrandsPage() {
  const { brands, openBrandWorkspace, openOnboarding } = useApp();
  const [search, setSearch] = useState('');

  const visible = brands.filter(
    (brand) => !search || brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <div className="page-head">
        <h1 className="page-title" style={{ margin: 0 }}>
          Brands
        </h1>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flex: 1,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <div className="search-wrap" style={{ flex: '0 1 340px' }}>
            <SearchIcon className="icon-sm" />
            <input
              type="text"
              placeholder="Search your brands..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <button className="btn-purple" onClick={() => openOnboarding()}>
            <PlusIcon className="icon-sm" /> New Brand
          </button>
        </div>
      </div>

      <div className="brand-grid">
        {visible.map((brand) => (
          <div
            className="brand-card"
            key={brand.id}
            onClick={() => openBrandWorkspace(brand)}
          >
            <div className="brand-card-img">
              <BrandBadge brand={brand} />
            </div>
            <div className="brand-card-body">
              <div>
                <div className="brand-card-name">{brand.name}</div>
                <div className="brand-card-domain">{brand.domain}</div>
              </div>
              <div className="brand-card-count">
                {brand.count} <ImageIcon className="icon-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
