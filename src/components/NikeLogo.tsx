import { useState, type CSSProperties } from 'react';
import { NIKE_FALLBACK, NIKE_LOGO_URL } from '../data/constants';

/**
 * Remote Nike wordmark with the inline SVG fallback the original page used when
 * Wikimedia is unreachable.
 */
export function NikeLogo({ style }: { style?: CSSProperties }) {
  const [src, setSrc] = useState(NIKE_LOGO_URL);

  return (
    <img
      src={src}
      alt="Nike logo"
      style={style}
      onError={() => setSrc(NIKE_FALLBACK)}
    />
  );
}
