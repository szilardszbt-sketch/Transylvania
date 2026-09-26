import { marked } from 'marked';
import { WordPressPost } from '../types';

export interface MarkdownBlogPost extends WordPressPost {
  source: 'markdown';
  contentMarkdown: string;
  shortSlug: string;
}

/**
 * Destination reference interface for cross-linking
 */
export interface DestinationRef {
  slug: string;
  name?: string;
  romanianName?: string;
  hungarianName?: string;
  regionId?: string;
  regionName?: string;
  gatewayCityId?: string;
  nearbyDestinationIds?: string[];
  categoryIds?: string[];
}

/**
 * Parses simple YAML-like frontmatter from a markdown string.
 * Safe against syntax errors and empty strings.
 */
function parseFrontmatterAndBody(raw: string): {
  frontmatter: Record<string, string | string[]>;
  body: string;
} {
  const frontmatter: Record<string, string | string[]> = {};
  let body = raw || '';

  try {
    // Check for --- ... --- block
    const match = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (match) {
      const rawYaml = match[1];
      body = match[2].trim();

      const lines = rawYaml.split(/\r?\n/);
      let currentKey = '';
      let currentList: string[] | null = null;

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;

        // Check for array item under a key (- tag)
        if (line.startsWith('- ') && currentKey && currentList) {
          const item = line.substring(2).trim().replace(/^["']|["']$/g, '');
          if (item) currentList.push(item);
          continue;
        }

        // Check for key: value
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();

          currentKey = key;
          currentList = null;

          // If it starts with [ and ends with ], parse inline array
          if (value.startsWith('[') && value.endsWith(']')) {
            const items = value
              .slice(1, -1)
              .split(',')
              .map(s => s.trim().replace(/^["']|["']$/g, ''))
              .filter(Boolean);
            frontmatter[key] = items;
          } else if (value === '' || value === '>-' || value === '|') {
            currentList = [];
            frontmatter[key] = currentList;
          } else {
            // Strip quotes
            value = value.replace(/^["']|["']$/g, '');
            frontmatter[key] = value;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Safe catch: Error parsing markdown frontmatter:', err);
  }

  return { frontmatter, body };
}

/**
 * Formats an ISO or date string into standard human-readable display.
 */
function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return 'Field Dispatch';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d);
    }
  } catch {
    // fallback
  }
  return dateStr;
}

/**
 * Estimates reading time from text content.
 */
function calculateReadingTime(text: string): string {
  if (!text) return '3 min read';
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Normalizes text to lowercase alphanumeric without diacritics for flexible matching.
 */
export function normalizeKeyword(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Eagerly imports all Markdown files in content/blog via Vite.
 * In a static build, these are bundled at compile time.
 */
const rawMarkdownModules = import.meta.glob('/content/blog/**/*.{md,markdown}', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

let cachedPosts: MarkdownBlogPost[] | null = null;

/**
 * Parses and returns all Markdown blog posts from content/blog/
 * Safely handles any single corrupted markdown file without breaking the list.
 */
export function getMarkdownBlogPosts(): MarkdownBlogPost[] {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: MarkdownBlogPost[] = [];

  for (const [filePath, rawContent] of Object.entries(rawMarkdownModules)) {
    try {
      if (!rawContent || typeof rawContent !== 'string') continue;

      // Derive file slug from path (e.g. /content/blog/2026-09-17-welcome-to-transylvania.md -> 2026-09-17-welcome-to-transylvania)
      const filename = filePath.split('/').pop()?.replace(/\.(md|markdown)$/i, '') || 'dispatch';
      const shortSlug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

      const { frontmatter, body } = parseFrontmatterAndBody(rawContent);

      const title = (frontmatter.title as string) || shortSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const rawDate = (frontmatter.date as string) || '';
      const formattedDate = formatBlogDate(rawDate);
      const heroImage = (frontmatter.image as string) || '';
      const excerpt = (frontmatter.description as string) || (frontmatter.excerpt as string) || body.slice(0, 160).replace(/[#*`_\[\]]/g, '') + '...';
      
      // Parse tags
      let tags: string[] = [];
      if (Array.isArray(frontmatter.tags)) {
        tags = frontmatter.tags.map(t => normalizeKeyword(String(t))).filter(Boolean);
      } else if (typeof frontmatter.tags === 'string') {
        tags = frontmatter.tags.split(',').map(t => normalizeKeyword(t.trim())).filter(Boolean);
      }
      if (tags.length === 0) {
        tags = ['field-notes', 'transylvania'];
      }

      // Parse markdown body to HTML using marked
      let contentHtml = '';
      try {
        contentHtml = marked.parse(body, { async: false }) as string;
      } catch (e) {
        contentHtml = `<p>${body}</p>`;
      }

      const authorName = (frontmatter.author as string) || 'The Traveller';
      const categoryName = (frontmatter.category as string) || 'Field Journal';
      const readTime = calculateReadingTime(body);

      posts.push({
        id: `git-${filename}`,
        slug: filename,
        shortSlug,
        title,
        excerpt,
        contentMarkdown: body,
        contentHtml,
        date: rawDate || new Date().toISOString(),
        formattedDate,
        link: `/blog/${filename}`,
        heroImage,
        heroImageAlt: title,
        heroImageCredit: `Photo: ${authorName}`,
        authorName,
        categoryName,
        tags,
        readTime,
        source: 'markdown'
      });
    } catch (postErr) {
      console.error(`Safe catch: Error parsing markdown post file at ${filePath}:`, postErr);
      // Skip this broken file to keep the application running
    }
  }

  // Sort posts in descending order by date (newest first)
  posts.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });

  cachedPosts = posts;
  return posts;
}

/**
 * Finds a Markdown blog post by full slug, short slug, or sanitized title.
 * Safe against missing/unmatched slugs.
 */
export function getMarkdownPostBySlug(slug: string): MarkdownBlogPost | undefined {
  if (!slug) return undefined;
  try {
    const posts = getMarkdownBlogPosts();
    const normalized = normalizeKeyword(slug);
    return posts.find(p => 
      normalizeKeyword(p.slug) === normalized || 
      normalizeKeyword(p.shortSlug) === normalized ||
      normalizeKeyword(p.title) === normalized
    );
  } catch (err) {
    console.error('Safe catch: getMarkdownPostBySlug failed:', err);
    return undefined;
  }
}

/**
 * ISSUE 3 HELPER:
 * Filters and ranks blog posts by matching tags, destination location slugs, or keywords.
 * 
 * Examples:
 * - Matching Praid: matches posts tagged 'praid', 'salina-praid', 'salt-mine', 'harghita'
 * - Matching Târgu Mureș: matches posts for Târgu Mureș or its regional hubs (Praid, Sovata)
 * - Matching Turda: matches posts for 'turda', 'salina-turda', 'salt-mines'
 * 
 * Returns matching blog posts ordered by relevance score, then by newest date.
 */
export function getBlogPostsForDestination(
  destinationOrSlug: DestinationRef | string,
  limit: number = 6
): MarkdownBlogPost[] {
  try {
    const allPosts = getMarkdownBlogPosts();
    if (!allPosts || allPosts.length === 0) return [];

    let targetSlug = '';
    let targetKeywords: string[] = [];

    if (typeof destinationOrSlug === 'string') {
      targetSlug = normalizeKeyword(destinationOrSlug);
      // Generate keywords from slug pieces (e.g. 'praid-salt-mine' -> ['praid-salt-mine', 'praid', 'salt', 'mine'])
      targetKeywords = [
        targetSlug,
        ...targetSlug.split('-').filter(w => w.length > 2)
      ];
    } else if (destinationOrSlug && typeof destinationOrSlug === 'object') {
      targetSlug = normalizeKeyword(destinationOrSlug.slug || '');
      const slugWords = targetSlug.split('-').filter(w => w.length > 2);
      
      const nameKeywords = [
        destinationOrSlug.name,
        destinationOrSlug.romanianName,
        destinationOrSlug.hungarianName
      ]
        .filter(Boolean)
        .map(n => normalizeKeyword(n as string));

      const nearbyKeywords = (destinationOrSlug.nearbyDestinationIds || []).map(normalizeKeyword);
      const gatewayKeywords = destinationOrSlug.gatewayCityId ? [normalizeKeyword(destinationOrSlug.gatewayCityId)] : [];

      targetKeywords = Array.from(new Set([
        targetSlug,
        ...slugWords,
        ...nameKeywords,
        ...nearbyKeywords,
        ...gatewayKeywords
      ]));
    }

    if (targetKeywords.length === 0) return [];

    // Score posts based on match strength
    const scoredPosts: { post: MarkdownBlogPost; score: number }[] = [];

    for (const post of allPosts) {
      let score = 0;
      const postTagsNormalized = post.tags.map(normalizeKeyword);
      const postTitleNormalized = normalizeKeyword(post.title);
      const postSlugNormalized = normalizeKeyword(post.slug);
      const postExcerptNormalized = normalizeKeyword(post.excerpt);

      for (const kw of targetKeywords) {
        if (!kw || kw.length < 3) continue;

        // 1. Direct tag match (highest weight)
        if (postTagsNormalized.includes(kw)) {
          score += 10;
        } else if (postTagsNormalized.some(t => t.includes(kw) || kw.includes(t))) {
          score += 5;
        }

        // 2. Slug or shortSlug match
        if (postSlugNormalized.includes(kw)) {
          score += 8;
        }

        // 3. Title match
        if (postTitleNormalized.includes(kw)) {
          score += 6;
        }

        // 4. Excerpt match
        if (postExcerptNormalized.includes(kw)) {
          score += 2;
        }
      }

      if (score > 0) {
        scoredPosts.push({ post, score });
      }
    }

    // Sort by highest score first, then newest date
    scoredPosts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

    return scoredPosts.slice(0, limit).map(item => item.post);
  } catch (err) {
    console.error('Safe catch: getBlogPostsForDestination failed:', err);
    return [];
  }
}

/**
 * Filter blog posts by freeform keywords or tag arrays
 */
export function filterBlogPostsByKeywords(
  keywords: string[] | string,
  limit: number = 6
): MarkdownBlogPost[] {
  const kwList = Array.isArray(keywords)
    ? keywords.map(normalizeKeyword)
    : [normalizeKeyword(keywords)];

  const allPosts = getMarkdownBlogPosts();
  return allPosts
    .filter(post => {
      const postTags = post.tags.map(normalizeKeyword);
      const postText = normalizeKeyword(`${post.title} ${post.excerpt}`);
      return kwList.some(kw => postTags.includes(kw) || postText.includes(kw));
    })
    .slice(0, limit);
}
