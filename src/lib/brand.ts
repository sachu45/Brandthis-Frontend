/** Strips protocol, `www.`, a leading `@`, and any path from a raw brand input. */
export function cleanDomain(raw: string): string {
  const domain = raw
    .trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];
  return domain || raw;
}

/** Turns `https://acme.com/about` into `Acme`. */
export function brandNameFromInput(raw: string): string {
  const root = cleanDomain(raw).split('.')[0];
  return root.charAt(0).toUpperCase() + root.slice(1);
}

/**
 * The prototype ships a hand-authored Nike result so the onboarding flow has
 * something realistic to show; any other input falls back to generated copy.
 */
export function isNikeInput(raw: string): boolean {
  return /nike/i.test(raw);
}

/** Derives up to two uppercase initials from a free-text name. */
export function initialsFromName(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'P'
  );
}

/** Team profiles are named "<Person>'s Team"; members show just the person. */
export function memberNameFromProfile(name: string): string {
  return name.replace(/'s Team$/, '');
}
