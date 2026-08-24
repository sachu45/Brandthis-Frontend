import { useRef, type ChangeEvent } from 'react';
import { useApp } from '../../../context/AppContext';
import { DEMO_IMAGES } from '../../../data/constants';
import { AssetImage } from '../../AssetImage';

/** Assets that ship with the brand, shown beneath anything the user adds. */
const SEEDED_ASSETS = [
  { name: 'Living and dining', src: DEMO_IMAGES.livingDining },
  { name: 'Kitchen details', src: DEMO_IMAGES.kitchen },
];

export function UploadsSection({ brandName }: { brandName: string }) {
  const { uploads, addUpload, showToast } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    addUpload({ name: file.name, src: URL.createObjectURL(file) });
    showToast('Upload added to ' + brandName);
  }

  const userUploads = uploads.filter((upload) => upload.userAdded);

  return (
    <div className="brand-section active">
      <div className="brand-upload" onClick={() => inputRef.current?.click()}>
        <div style={{ fontSize: '25px', color: 'var(--purple)' }}>↑</div>
        <strong>Drop images here or browse</strong>
        <span>PNG, JPG, or WEBP up to 10MB</span>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} />
      </div>

      <div className="brand-assets">
        {[...userUploads, ...SEEDED_ASSETS].map((asset) => (
          <div className="brand-asset" key={asset.src}>
            <AssetImage src={asset.src} alt={asset.name} />
            <span>{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
