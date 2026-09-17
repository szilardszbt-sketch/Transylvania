import { marked } from 'marked';
import { WordPressPost } from '../types';

export interface MarkdownBlogPost extends WordPressPost {
  source: 'markdown';
  contentMarkdown: string;
  shortSlug: string;
}

/**
 * Parses simple YAML-like frontmatter from a markdown string.
 */
function parseFrontmatterAndBody(raw: string): {
  frontmatter: Record<string, string | string[]>;
  body: string;
} {
  const frontmatter: Record<string, string | string[]> = {};
  let body = raw;

  // Check for --- ... --- block
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    const rawYaml = match[1];
    body = match[2].trim();

    const lines = rawYaml.split('\n');
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
          // Could be multiline or list
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
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
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
 */
export function getMarkdownBlogPosts(): MarkdownBlogPost[] {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: MarkdownBlogPost[] = [];

  for (const [filePath, rawContent] of Object.entries(rawMarkdownModules)) {
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
      tags = frontmatter.tags.map(t => String(t).toLowerCase().replace(/\s+/g, '-'));
    } else if (typeof frontmatter.tags === 'string') {
      tags = frontmatter.tags.split(',').map(t => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
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
 * Finds a Markdown blog post by full slug or short slug.
 */
export function getMarkdownPostBySlug(slug: string): MarkdownBlogPost | undefined {
  const posts = getMarkdownBlogPosts();
  const normalized = slug.toLowerCase().trim();
  return posts.find(p => 
    p.slug.toLowerCase() === normalized || 
    p.shortSlug.toLowerCase() === normalized
  );
}
