/** Decorative six-lobe blob that floats beside the hero copy. */
const LOBES = [
  { cx: 200, cy: 95, r: 92 },
  { cx: 295, cy: 150, r: 92 },
  { cx: 295, cy: 255, r: 92 },
  { cx: 200, cy: 310, r: 92 },
  { cx: 105, cy: 255, r: 92 },
  { cx: 105, cy: 150, r: 92 },
  { cx: 200, cy: 203, r: 98 },
];

export function HeroBlob() {
  return (
    <svg width="360" height="360" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="blobGrad" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#001b3d" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <pattern id="blobDots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.1" fill="#ffffff" opacity="0.4" />
        </pattern>
      </defs>
      <g fill="url(#blobGrad)">
        {LOBES.map((lobe, index) => (
          <circle key={index} cx={lobe.cx} cy={lobe.cy} r={lobe.r} />
        ))}
      </g>
      <g fill="url(#blobDots)" opacity="0.7">
        {LOBES.map((lobe, index) => (
          <circle key={index} cx={lobe.cx} cy={lobe.cy} r={lobe.r} />
        ))}
      </g>
    </svg>
  );
}
