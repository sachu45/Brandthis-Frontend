import { useState, type CSSProperties } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

interface AssetImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * An `<img>` that degrades to a neutral block instead of a broken-image glyph.
 *
 * The prototype's demo imagery lives outside this project, so several paths
 * resolve to nothing until real files are dropped into `public/`. Keeping the
 * element an `<img>` on failure means the surrounding CSS still applies and the
 * layout holds its shape.
 */
export function AssetImage({ src, alt, className, style }: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? TRANSPARENT_PIXEL : src}
      alt={alt}
      className={[className, failed ? 'asset-image--missing' : null]
        .filter(Boolean)
        .join(' ')}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
