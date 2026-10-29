/**
 * Shared slugification utility for blog post URLs and routing.
 * Ensures all blog post URLs are strictly ASCII-only and handles
 * Romanian diacritics (both comma-below and cedilla variants) consistently.
 */

const ROMANIAN_DIACRITICS_MAP: Record<string, string> = {
  'ă': 'a', 'Ă': 'a',
  'â': 'a', 'Â': 'a',
  'î': 'i', 'Î': 'i',
  'ș': 's', 'Ș': 's', // U+0219, U+0218 (comma-below)
  'ş': 's', 'Ş': 's', // U+015F, U+015E (cedilla)
  'ț': 't', 'Ț': 't', // U+021B, U+021A (comma-below)
  'ţ': 't', 'Ţ': 't', // U+0163, U+0162 (cedilla)
};

/**
 * Normalises an input string into a URL-safe ASCII slug.
 * 
 * Rules:
 * 1. Safely decodes any percent-encoded characters (decodeURIComponent).
 * 2. Preserves existing date prefix format (YYYY-MM-DD-) if present.
 * 3. Explicitly maps Romanian diacritics (ă/Ă→a, â/Â→a, î/Î→i, ș/Ș/ş/Ş→s, ț/Ț/ţ/Ţ→t).
 * 4. Normalises to NFD and strips any other combining diacritical marks.
 * 5. Lowercases all characters.
 * 6. Replaces any run of non-alphanumeric characters with a single hyphen.
 * 7. Trims leading and trailing hyphens.
 *
 * Example:
 *   "Why Is Târgu Mureş Airport Called Transilvania?" -> "why-is-targu-mures-airport-called-transilvania"
 *   "2026-10-23-why-is-târgu-mureș-airport-called-transilvania" -> "2026-10-23-why-is-targu-mures-airport-called-transilvania"
 */
export function slugify(input: string): string {
  if (!input || typeof input !== 'string') return '';

  // 1. Safely decode percent-encoded characters
  let decoded = input;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    decoded = input;
  }

  const clean = decoded.trim();
  if (!clean) return '';

  // 2. Check for date prefix format (YYYY-MM-DD-)
  const datePrefixMatch = clean.match(/^(\d{4}-\d{2}-\d{2}-)(.*)$/);
  let datePrefix = '';
  let contentToSlugify = clean;

  if (datePrefixMatch) {
    datePrefix = datePrefixMatch[1];
    contentToSlugify = datePrefixMatch[2];
  }

  // 3. Explicitly map Romanian diacritics (both comma-below and cedilla variants)
  let result = contentToSlugify.replace(
    /[ăĂâÂîÎșȘşŞțȚţŢ]/g,
    (ch) => ROMANIAN_DIACRITICS_MAP[ch] || ch
  );

  // 4. Normalise to NFD and strip remaining combining marks
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 5. Lowercase
  result = result.toLowerCase();

  // 6. Replace any run of non-alphanumeric characters with a single hyphen
  result = result.replace(/[^a-z0-9]+/g, '-');

  // 7. Trim leading and trailing hyphens
  result = result.replace(/^-+|-+$/g, '');

  if (!result && datePrefix) {
    return datePrefix.replace(/-$/, '');
  }

  return `${datePrefix}${result}`;
}

/**
 * Alias for slugify to normalize slugs when comparing or looking up posts.
 */
export function normalizeSlug(input: string): string {
  return slugify(input);
}

/**
 * Returns true if the given slug matches the canonical ASCII format produced by slugify.
 */
export function isCanonicalSlug(slug: string): boolean {
  if (!slug) return false;
  return slug === slugify(slug);
}
