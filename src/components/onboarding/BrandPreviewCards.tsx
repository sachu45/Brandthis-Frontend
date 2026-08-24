import type { CSSProperties } from 'react';
import { brandNameFromInput, cleanDomain, isNikeInput } from '../../lib/brand';
import { NikeLogo } from '../NikeLogo';

const NIKE_DESCRIPTION =
  'Nike is a global athletic brand that designs, develops, manufactures, and markets a wide range of athletic footwear, apparel, and equipment. Through its official online store, Nike provides innovative products for various sports and active lifestyles to consumers in India and beyond.';

/** Square card showing either the fetched logo or the brand's first initial. */
export function BrandLogoCard({
  input,
  style,
}: {
  input: string;
  style?: CSSProperties;
}) {
  return (
    <div className="extract-logo-card" style={style}>
      {isNikeInput(input) ? (
        <NikeLogo />
      ) : (
        <span className="serif">{brandNameFromInput(input).charAt(0)}</span>
      )}
    </div>
  );
}

/** Companion card holding the generated "about this brand" paragraph. */
export function BrandDescriptionCard({
  input,
  style,
}: {
  input: string;
  style?: CSSProperties;
}) {
  const name = brandNameFromInput(input);
  const description = isNikeInput(input)
    ? NIKE_DESCRIPTION
    : `${name} is a growing brand with an online presence at ${cleanDomain(
        input,
      )}. Bloom analyzed the site to learn its voice, visuals, and positioning so every future asset stays on-brand.`;

  return (
    <div className="extract-desc-card" style={style}>
      {description}
    </div>
  );
}
