import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DEMO_IMAGES } from '../../../data/constants';
import { AssetImage } from '../../AssetImage';
import { SearchIcon } from '../../icons';

const CATEGORIES = ['All', 'Food', 'Beverage', 'Hospitality'];

const LIBRARY_ADS = [
  {
    title: 'Bold campaign',
    category: 'Food',
    src: DEMO_IMAGES.frame4,
    brief: 'Recreate this bold campaign for Hyle Laban',
  },
  {
    title: 'Product story',
    category: 'Hospitality',
    src: DEMO_IMAGES.frame5,
    brief: 'Create a fresh product story inspired by this ad',
  },
  {
    title: 'Playful social',
    category: 'Food',
    src: DEMO_IMAGES.frame6,
    brief: 'Make a playful social ad in this style',
  },
];

/** Inspiration gallery whose cards seed the AI brief. */
export function AdLibrarySection() {
  const { showToast, fillBrief } = useApp();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const visible = LIBRARY_ADS.filter(
    (ad) =>
      (category === 'All' || ad.category === category) &&
      ad.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="brand-section active">
      <div className="brand-kicker">
        Browse ads from top brands and recreate them for your own
      </div>

      <div className="brand-subnav" style={{ border: 0, marginBottom: '15px' }}>
        {CATEGORIES.map((item) => (
          <button
            key={item}
            className={category === item ? 'active' : undefined}
            onClick={() => {
              setCategory(item);
              showToast(
                item === 'All'
                  ? 'Showing all ads'
                  : `Showing ${item.toLowerCase()} ads`,
              );
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="brand-search">
        <SearchIcon className="icon-sm" />
        <input
          placeholder="Search ads..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="brand-library">
        {visible.map((ad) => (
          <div
            className="brand-library-card"
            key={ad.title}
            onClick={() => fillBrief(ad.brief)}
          >
            <AssetImage src={ad.src} alt={ad.title} />
            <div>
              {ad.title}
              <small>{ad.category}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
