/**
 * Client-Side WordPress REST API Service
 * Fetches headless blog articles, matches locations/POIs to WordPress tags,
 * and handles graceful fallbacks when WordPress is unconfigured or unreachable.
 * Operates purely client-side with zero backend dependencies.
 */

import { WordPressPost, WordPressTag } from '../types';
import { articles } from '../data/articles';

// In-memory cache on the client for rapid UI transitions
const clientPostCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes

function getCached<T>(key: string): T | null {
  const item = clientPostCache.get(key);
  if (item && item.expiry > Date.now()) {
    return item.data as T;
  }
  return null;
}

function setCached(key: string, data: any) {
  clientPostCache.set(key, { data, expiry: Date.now() + CACHE_TTL });
}

export interface FetchPostsOptions {
  page?: number;
  perPage?: number;
  search?: string;
  tagId?: number;
}

// Strip HTML tags and decode common entities safely
export function sanitizeHtmlToText(html: string = ''): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&hellip;/g, '...')
    .replace(/\[&hellip;\]/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatWordPressDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function estimateReadTime(textOrHtml: string): string {
  const text = sanitizeHtmlToText(textOrHtml);
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

function getWpBaseUrl(): string {
  const url = (import.meta.env.VITE_WORDPRESS_API_URL || '').trim();
  return url.replace(/\/+$/, '');
}

export function transformRawWordPressPost(raw: any): WordPressPost {
  const title = sanitizeHtmlToText(raw.title?.rendered || 'Untitled Post');
  const rawExcerpt = raw.excerpt?.rendered || '';
  const cleanExcerpt = sanitizeHtmlToText(rawExcerpt);
  const contentHtml = raw.content?.rendered || '';

  // Extract featured media
  const mediaObj = raw._embedded?.['wp:featuredmedia']?.[0];
  const heroImage = mediaObj?.source_url || '';
  const heroImageAlt = mediaObj?.alt_text || title;

  // Extract author
  const rawAuthor = raw._embedded?.author?.[0]?.name;
  const authorName = (rawAuthor && rawAuthor.toLowerCase() !== 'admin' && rawAuthor.toLowerCase() !== 'transylvania editorial')
    ? rawAuthor
    : 'The Traveller';

  // Extract categories and tags
  const terms = raw._embedded?.['wp:term'] || [];
  let categoryName = 'Travel Journal';
  const tags: string[] = [];

  for (const termGroup of terms) {
    for (const term of termGroup) {
      if (term.taxonomy === 'category') {
        categoryName = sanitizeHtmlToText(term.name);
      } else if (term.taxonomy === 'post_tag') {
        if (term.slug) tags.push(term.slug.toLowerCase());
        if (term.name && term.name.toLowerCase() !== term.slug?.toLowerCase()) {
          tags.push(term.name.toLowerCase());
        }
      }
    }
  }

  const readTime = estimateReadTime(contentHtml || cleanExcerpt);

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    excerpt: cleanExcerpt,
    contentHtml,
    date: raw.date,
    formattedDate: formatWordPressDate(raw.date),
    link: raw.link,
    heroImage,
    heroImageAlt,
    authorName,
    categoryName,
    tags,
    tagIds: raw.tags || [],
    readTime
  };
}

async function fetchFromWpApi(endpoint: string): Promise<any> {
  const wpBaseUrl = getWpBaseUrl();
  if (!wpBaseUrl) return null;

  const fullUrl = `${wpBaseUrl}/wp-json/wp/v2/${endpoint.replace(/^\/+/, '')}`;
  const cacheKey = fullUrl;
  const cached = getCached<any>(cacheKey);
  if (cached) return cached;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(fullUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    setCached(cacheKey, json);
    return json;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

/**
 * Fetch all posts from the headless WordPress REST API
 */
export async function fetchWordPressPosts(options: FetchPostsOptions = {}): Promise<{
  posts: WordPressPost[];
  configured: boolean;
}> {
  const wpBaseUrl = getWpBaseUrl();
  if (!wpBaseUrl) {
    return { posts: [], configured: false };
  }

  const cacheKey = `posts-${JSON.stringify(options)}`;
  const cached = getCached<{ posts: WordPressPost[]; configured: boolean }>(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams();
    params.set('_embed', '1');
    params.set('per_page', String(options.perPage || 20));
    params.set('page', String(options.page || 1));
    if (options.search) params.set('search', options.search);
    if (options.tagId) params.set('tags', String(options.tagId));

    const data = await fetchFromWpApi(`posts?${params.toString()}`);
    if (!Array.isArray(data)) {
      return { posts: [], configured: true };
    }

    const posts = data.map(transformRawWordPressPost);
    const result = { posts, configured: true };
    setCached(cacheKey, result);
    return result;
  } catch {
    return { posts: [], configured: false };
  }
}

/**
 * Normalizes any tag string or slug for consistent diacritic-tolerant matching
 */
export function normalizeTag(tag: string): string {
  if (!tag) return '';
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');
}

/**
 * Mapping of destination hub slugs to all accepted tag variations, multi-lingual historical names, and POI slugs.
 */
export const DESTINATION_TAG_MAP: Record<string, string[]> = {
  'sighisoara': ['sighisoara', 'sighişoara', 'sighișoara', 'schassburg', 'schässburg', 'segesvar', 'segesvár', 'clock-tower', 'covered-staircase', 'church-on-the-hill'],
  'brasov': ['brasov', 'brașov', 'kronstadt', 'brasso', 'brassó', 'black-church', 'biserica-neagra', 'council-square', 'mount-tampa', 'rope-street', 'poiana-brasov'],
  'sibiu': ['sibiu', 'hermannstadt', 'nagyszeben', 'grand-square-sibiu', 'bridge-of-lies', 'brukenthal-museum', 'astra-museum'],
  'bran': ['bran', 'bran-castle', 'castelul-bran', 'castel-bran', 'queen-marie-tea-house'],
  'viscri': ['viscri', 'weisskirch', 'deutschweisskirch', 'viscri-fortified-church', 'king-charles-house-viscri'],
  'biertan': ['biertan', 'birthälm', 'birthalm', 'biertan-fortified-church'],
  'corvin-castle': ['corvin-castle', 'corvin', 'hunedoara', 'castelul-corvinilor', 'corvins-castle', 'corvin-knights-hall'],
  'transfagarasan': ['transfagarasan', 'transfăgărășan', 'balea-lake', 'balea', 'vidraru-dam', 'vidraru'],
  'cluj-napoca': ['cluj-napoca', 'cluj', 'klausenburg', 'kolozsvar', 'kolozsvár', 'st-michael-cluj'],
  'salina-turda': ['salina-turda', 'turda', 'salina-turda-lake', 'cheile-turzii', 'cheile-turzii-gorge'],
  'alba-iulia': ['alba-iulia', 'alba-carolina', 'cetatea-alba-carolina', 'karlsburg', 'coronation-cathedral-alba'],
  'sinaia': ['sinaia', 'peles', 'peles-castle', 'castelul-peles', 'pelisor', 'pelisor-castle'],
  'maramures': ['maramures', 'maramureș', 'merry-cemetery', 'merry-cemetery-sapanta', 'barsana', 'barsana-monastery', 'sapanta', 'săpânța'],
  'bucovina': ['bucovina', 'voronet', 'voronet-monastery', 'sucevita', 'sucevita-monastery', 'moldovita', 'moldovița'],
  'cazanele-dunarii': ['cazanele-dunarii', 'decebal', 'decebal-rock-sculpture', 'mraconia-monastery', 'cazanele-mari-mici', 'iron-gates', 'portile-de-fier', 'clisura-dunarii'],
  'danube-delta': ['danube-delta', 'delta-dunarii', 'delta-dunării', 'letea-forest', 'sulina-port-beach', 'sulina', 'mila-23', 'mila-23-village'],
  'timisoara': ['timisoara', 'timișoara', 'temeschwar', 'temesvar', 'temesvár', 'piata-unirii-timisoara'],
  'targu-mures': ['targu-mures', 'târgu-mureș', 'tg-mures', 'palace-of-culture-targu-mures', 'neumarkt', 'marosvasarhely', 'marosvásárhely'],
  'oradea': ['oradea', 'grosswardein', 'nagyvarad', 'nagyvárad', 'black-eagle-palace-oradea', 'oradea-fortress', 'baile-felix'],
  'bucharest': ['bucharest', 'bucuresti', 'bucurești', 'palace-of-parliament-bucharest', 'romanian-athenaeum', 'stavropoleos-monastery'],
  'iasi': ['iasi', 'iași', 'jassy', 'palace-of-culture-iasi', 'trei-ierarhi-monastery'],
  'praid-salt-mine': ['praid', 'praid-salt-mine', 'salina-praid', 'salina-praid-mine', 'praid-salt-canyon']
};

/**
 * Evaluates whether a post has at least one tag matching the target town or location slug.
 * Supports exact town slugs, aliases, multi-lingual historical names, and localized POIs.
 */
export function isPostTaggedWithTown(post: { tags?: string[] }, targetTownSlug: string): boolean {
  if (!post || !Array.isArray(post.tags) || post.tags.length === 0 || !targetTownSlug) {
    return false;
  }

  const cleanTarget = normalizeTag(targetTownSlug);
  const aliases = (DESTINATION_TAG_MAP[cleanTarget] || [cleanTarget]).map(normalizeTag);

  for (const rawTag of post.tags) {
    const norm = normalizeTag(rawTag);
    if (!norm) continue;

    // 1. Direct match with target slug or any alias
    if (norm === cleanTarget || aliases.includes(norm)) {
      return true;
    }

    // 2. Token / boundary match (e.g. tag 'brasov-romania' or 'oras-brasov' for town 'brasov')
    for (const alias of aliases) {
      if (alias.length >= 4) {
        if (norm.startsWith(`${alias}-`) || norm.endsWith(`-${alias}`)) {
          return true;
        }
        const tokens = norm.split('-');
        if (tokens.includes(alias)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Match a town / location slug against WordPress post tag slugs:
 * 1. Checks if any WordPress post tags match the destination slug / aliases
 * 2. Queries WordPress tags endpoint directly for tag ID matching
 * 3. Falls back seamlessly to static articles matching the town tags
 */
export async function fetchPostsByTagSlug(slug: string): Promise<{
  posts: WordPressPost[];
  tag: WordPressTag | null;
  configured: boolean;
}> {
  if (!slug) {
    return { posts: [], tag: null, configured: false };
  }

  const cleanSlug = normalizeTag(slug);
  const cacheKey = `tag-slug-${cleanSlug}`;
  const cached = getCached<{ posts: WordPressPost[]; tag: WordPressTag | null; configured: boolean }>(cacheKey);
  if (cached) return cached;

  const wpBaseUrl = getWpBaseUrl();
  let matchedPosts: WordPressPost[] = [];
  let matchedTag: WordPressTag | null = null;
  const isConfigured = Boolean(wpBaseUrl);

  if (wpBaseUrl) {
    try {
      // 1. Fetch up to 50 posts from WordPress REST API and match against the town slug / aliases
      const allPostsRes = await fetchWordPressPosts({ perPage: 50 });
      if (allPostsRes.posts && allPostsRes.posts.length > 0) {
        const matchingWpPosts = allPostsRes.posts.filter(p => isPostTaggedWithTown(p, cleanSlug));
        if (matchingWpPosts.length > 0) {
          matchedPosts = matchingWpPosts;
        }
      }

      // 2. If no direct post matches found yet, also query WP tags endpoint directly
      if (matchedPosts.length === 0) {
        const tagSlugsToTry = [cleanSlug, ...(DESTINATION_TAG_MAP[cleanSlug] || [])];
        for (const tSlug of tagSlugsToTry.slice(0, 3)) {
          const tags = await fetchFromWpApi(`tags?slug=${encodeURIComponent(tSlug)}`);
          if (Array.isArray(tags) && tags.length > 0) {
            matchedTag = {
              id: tags[0].id,
              name: tags[0].name,
              slug: tags[0].slug,
              count: tags[0].count,
              description: tags[0].description,
              link: tags[0].link
            };

            const postsData = await fetchFromWpApi(`posts?tags=${matchedTag.id}&_embed=1&per_page=10`);
            if (Array.isArray(postsData) && postsData.length > 0) {
              matchedPosts = postsData.map(transformRawWordPressPost);
              break;
            }
          }
        }
      }
    } catch {
      // Fall through to fallback posts
    }
  }

  // 3. Fallback mode: When WP is unreachable, unconfigured, or has no posts yet for this location,
  // check static articles that carry matching town / POI tags
  if (matchedPosts.length === 0) {
    const fallbackMatches = articles
      .filter(a => a.type === 'blog' || a.type === 'itinerary' || a.type === 'history' || a.type === 'culture')
      .map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        contentHtml: `<p>${a.excerpt}</p>${a.content ? a.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : ''}`,
        date: a.publishedDate,
        formattedDate: a.publishedDate,
        link: `/articles/${a.slug}`,
        heroImage: a.heroImage,
        heroImageAlt: a.heroImageAlt || a.title,
        authorName: a.author.name,
        categoryName: a.category,
        tags: a.tags.map(t => normalizeTag(t)),
        readTime: a.readTime
      }))
      .filter(p => isPostTaggedWithTown(p, cleanSlug));

    if (fallbackMatches.length > 0) {
      matchedPosts = fallbackMatches;
    }
  }

  const result = { posts: matchedPosts, tag: matchedTag, configured: isConfigured };
  setCached(cacheKey, result);
  return result;
}

/**
 * Fetches and indexes all blog posts (from WordPress or fallback static dispatches)
 * for the global site search bar, providing comprehensive access to post titles,
 * tags, categories, and excerpts from anywhere on the site.
 */
export async function fetchAllBlogPostsForSearch(): Promise<WordPressPost[]> {
  const cacheKey = 'all-blog-posts-for-search';
  const cached = getCached<WordPressPost[]>(cacheKey);
  if (cached) return cached;

  const wpBaseUrl = getWpBaseUrl();
  let wpPosts: WordPressPost[] = [];

  if (wpBaseUrl) {
    try {
      const res = await fetchWordPressPosts({ perPage: 50 });
      if (res.posts && res.posts.length > 0) {
        wpPosts = res.posts;
      }
    } catch {
      // ignore
    }
  }

  // Convert static blog and travel articles so fallback blog content is always indexed in search
  const fallbackBlogPosts: WordPressPost[] = articles
    .filter(a => a.type === 'blog' || a.type === 'itinerary' || a.type === 'history' || a.type === 'culture')
    .map(a => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      contentHtml: `<p>${a.excerpt}</p>`,
      date: a.publishedDate,
      formattedDate: a.publishedDate,
      link: `/articles/${a.slug}`,
      heroImage: a.heroImage,
      heroImageAlt: a.heroImageAlt || a.title,
      authorName: a.author.name,
      categoryName: a.category,
      tags: a.tags,
      readTime: a.readTime
    }));

  if (wpPosts.length === 0) {
    setCached(cacheKey, fallbackBlogPosts);
    return fallbackBlogPosts;
  }

  // If WordPress is active, merge any unique static blog articles not already present in WP posts
  const wpSlugs = new Set(wpPosts.map(p => p.slug));
  const combined = [...wpPosts];
  for (const fb of fallbackBlogPosts) {
    if (!wpSlugs.has(fb.slug)) {
      combined.push(fb);
    }
  }

  setCached(cacheKey, combined);
  return combined;
}

/**
 * Fetch a single WordPress post by its slug for full-detail reading
 */
export async function fetchWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  const wpBaseUrl = getWpBaseUrl();
  if (!wpBaseUrl || !slug) return null;

  const cacheKey = `post-slug-${slug}`;
  const cached = getCached<WordPressPost>(cacheKey);
  if (cached) return cached;

  try {
    const data = await fetchFromWpApi(`posts?slug=${encodeURIComponent(slug)}&_embed=1`);
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const post = transformRawWordPressPost(data[0]);
    setCached(cacheKey, post);
    return post;
  } catch {
    return null;
  }
}

/**
 * Canonical history, culture, and heritage keywords and roots for Transylvania & Romania.
 * Used for tag matching between WordPress REST API posts and the History & Culture section.
 */
export const HISTORY_CULTURE_KEYWORDS: string[] = [
  'history',
  'historical',
  'historic',
  'historian',
  'istorie',
  'istoric',
  'culture',
  'cultural',
  'cultura',
  'heritage',
  'patrimoniu',
  'medieval',
  'middle-ages',
  'feudal',
  'castle',
  'castles',
  'castel',
  'cetate',
  'cetati',
  'citadel',
  'citadels',
  'fortress',
  'fortresses',
  'architecture',
  'architectural',
  'arhitectura',
  'church',
  'churches',
  'biserica',
  'biserici',
  'fortified-church',
  'fortified-churches',
  'monastery',
  'monasteries',
  'manastire',
  'manastiri',
  'cathedral',
  'catedrala',
  'wooden-churches',
  'folklore',
  'folclor',
  'legend',
  'legends',
  'legenda',
  'legende',
  'myth',
  'myths',
  'mythology',
  'mitologie',
  'tradition',
  'traditions',
  'traditie',
  'traditii',
  'crafts',
  'artisan',
  'gastronomy',
  'gastronomie',
  'culinary-heritage',
  'traditional-food',
  'saxon',
  'saxons',
  'sasi',
  'siebenburgen',
  'siebenbürgen',
  'dacian',
  'dacians',
  'daci',
  'dacia',
  'roman',
  'romans',
  'romani',
  'szekler',
  'szekely',
  'maghiar',
  'habsburg',
  'ottoman',
  'vlad-tepes',
  'dracula',
  'corvin',
  'unesco',
  'world-heritage'
];

/**
 * Historical destination & heritage location slugs in Transylvania & Romania.
 * Posts tagged with these specific historical topics/locations qualify for the History & Culture page.
 */
export const HISTORICAL_LOCATION_SLUGS: string[] = [
  'sighisoara',
  'brasov',
  'sibiu',
  'bran',
  'bran-castle',
  'viscri',
  'biertan',
  'corvin',
  'corvin-castle',
  'hunedoara',
  'transfagarasan',
  'cluj',
  'cluj-napoca',
  'turda',
  'salina-turda',
  'cheile-turzii',
  'alba-iulia',
  'alba-carolina',
  'sinaia',
  'peles',
  'peles-castle',
  'pelisor',
  'maramures',
  'barsana',
  'sapanta',
  'merry-cemetery',
  'bucovina',
  'voronet',
  'sucevita',
  'moldovita',
  'cazanele-dunarii',
  'decebal',
  'danube-delta',
  'delta-dunarii',
  'timisoara',
  'targu-mures',
  'oradea',
  'bucharest',
  'bucuresti',
  'iasi',
  'praid',
  'prejmer',
  'rasnov',
  'saschiz',
  'calnic',
  'fagaras',
  'deva',
  'sarmizegetusa',
  'rosia-montana',
  'curtea-de-arges',
  'targoviste'
];

/**
 * Evaluates whether an individual tag is relevant to history or culture.
 * Specifically checks for:
 * 1. Direct or token match against history/culture keywords (e.g. 'history', 'culture', 'heritage', 'medieval', 'castles', 'traditions')
 * 2. Key morphological stems (e.g. 'histor', 'cultur', 'mediev', 'castl', 'citadel', 'fortress', 'folklor', 'legend', 'myth', 'architect', 'church', 'monaster', 'saxon', 'dacian')
 * 3. Specific historical topics or locations (e.g. 'sighisoara', 'bran-castle', 'viscri', 'biertan')
 * 
 * Note: Generic top-level regions like 'transylvania' or 'romania' are excluded from auto-qualifying
 * as history/culture so general travel advice (e.g. 'packing tips for transylvania') remains strictly on the Blog page.
 */
export function isHistoryCultureTag(rawTag: string): boolean {
  if (!rawTag) return false;
  const tag = rawTag.toLowerCase().trim().replace(/^#/, '');

  // Exclude broad non-differentiating regions and general travel utility tags
  if (
    tag === 'transylvania' || 
    tag === 'romania' || 
    tag === 'travel' || 
    tag === 'travel-tips' || 
    tag === 'travel tips' ||
    tag === 'reflections' ||
    tag === 'packing' ||
    tag === 'first-time visitors' ||
    tag === 'first-time-visitors'
  ) {
    return false;
  }

  // 1. Direct match with keyword or location slug
  if (HISTORY_CULTURE_KEYWORDS.includes(tag) || HISTORICAL_LOCATION_SLUGS.includes(tag)) {
    return true;
  }

  // 2. Tokenized match (split by hyphen, underscore, or space)
  const tokens = tag.split(/[-_\s]+/);
  if (tokens.some(t => HISTORY_CULTURE_KEYWORDS.includes(t) || HISTORICAL_LOCATION_SLUGS.includes(t))) {
    return true;
  }

  // 3. Morphological stems for history & culture concepts
  const historyStems = [
    'histor', 'istor', 'cultur', 'heritag', 'patrimoni', 'mediev', 'feudal',
    'castl', 'citadel', 'fortress', 'cetate', 'cetati', 'monument',
    'architect', 'arhitect', 'folklor', 'folclor', 'legend', 'myth', 'mitolog',
    'tradit', 'saxon', 'siebenburg', 'dacian', 'habsburg', 'monaster', 'manastir',
    'church', 'biseric', 'gastronom', 'dracula', 'unesco'
  ];

  return historyStems.some(stem => tag.includes(stem));
}

/**
 * Determines whether a blog post qualifies for the History & Culture page:
 * Returns true if the post has ONE OR MORE tags relevant to history or culture.
 * If a blog post has NO history/culture-relevant tags, returns false so it is strictly
 * restricted to appearing on the main Blog page only.
 */
export function isHistoryCulturePost(post: { tags?: string[] }): boolean {
  if (!post || !Array.isArray(post.tags) || post.tags.length === 0) {
    return false;
  }
  return post.tags.some(tag => isHistoryCultureTag(tag));
}

/**
 * Category-specific tag filter matching the category tabs on the History & Culture page:
 * - 'history': Medieval & Modern History
 * - 'architecture': Architecture & Fortified Churches
 * - 'food': Gastronomy & Traditions
 * - 'myths': Legends & Folklore
 */
export function matchesHistoryCategory(post: { tags?: string[] }, categoryId: string): boolean {
  if (!isHistoryCulturePost(post)) return false;
  if (!categoryId || categoryId === 'all') return true;

  const tags = (post.tags || []).map(t => t.toLowerCase());

  switch (categoryId) {
    case 'history':
      return tags.some(t => 
        t.includes('histor') || t.includes('istor') || t.includes('mediev') || 
        t.includes('middle-ages') || t.includes('feudal') || t.includes('saxon') || 
        t.includes('dacian') || t.includes('roman') || t.includes('habsburg') ||
        HISTORICAL_LOCATION_SLUGS.some(loc => t.includes(loc))
      );
    case 'architecture':
      return tags.some(t => 
        t.includes('architect') || t.includes('arhitect') || t.includes('church') || 
        t.includes('biseric') || t.includes('castle') || t.includes('castel') || 
        t.includes('citadel') || t.includes('cetate') || t.includes('fortress') || 
        t.includes('monaster') || t.includes('manastir') || t.includes('cathedral')
      );
    case 'food':
      return tags.some(t => 
        t.includes('food') || t.includes('gastronom') || t.includes('culinar') || 
        t.includes('wine') || t.includes('vin') || t.includes('tuica') || 
        t.includes('palinca') || t.includes('tradit') || t.includes('cuisine')
      );
    case 'myths':
      return tags.some(t => 
        t.includes('myth') || t.includes('mitolog') || t.includes('legend') || 
        t.includes('folklor') || t.includes('folclor') || t.includes('dracula') || 
        t.includes('vlad')
      );
    default:
      return true;
  }
}

/**
 * Fetches blog posts from the WordPress REST API and applies the conditional cross-linking rules:
 * 1. Fetches all posts via the existing REST API endpoint (/wp-json/wp/v2/posts?_embed=1).
 * 2. Filters posts so only those with one or more history/culture-relevant tags are returned.
 * 3. Posts with no history/culture-relevant tags are excluded.
 * 4. Falls back gracefully to static editorial articles matching history/culture tags if WP is unconfigured.
 */
export async function fetchHistoryCulturePosts(categoryId: string = 'all'): Promise<{
  posts: WordPressPost[];
  configured: boolean;
}> {
  const wpBaseUrl = getWpBaseUrl();
  
  if (wpBaseUrl) {
    const res = await fetchWordPressPosts({ perPage: 50 });
    if (res.posts.length > 0) {
      // Filter only posts that have history/culture-relevant tags
      const historyPosts = res.posts.filter(isHistoryCulturePost);
      
      if (categoryId && categoryId !== 'all') {
        const categoryMatches = historyPosts.filter(p => matchesHistoryCategory(p, categoryId));
        return {
          posts: categoryMatches.length > 0 ? categoryMatches : historyPosts,
          configured: true
        };
      }
      
      return { posts: historyPosts, configured: true };
    }
  }

  // Fallback mode: Convert static blog articles and apply tag-matching
  const fallbackPosts: WordPressPost[] = articles
    .filter(a => a.type === 'blog' || a.type === 'itinerary')
    .map(a => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      contentHtml: `<p>${a.excerpt}</p>${a.content ? a.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : ''}`,
      date: a.publishedDate,
      formattedDate: a.publishedDate,
      link: `/articles/${a.slug}`,
      heroImage: a.heroImage,
      heroImageAlt: a.heroImageAlt || a.title,
      authorName: a.author.name,
      categoryName: a.category,
      tags: a.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')),
      readTime: a.readTime
    }))
    .filter(isHistoryCulturePost); // strictly apply the history/culture tag filter!

  if (categoryId && categoryId !== 'all') {
    const categoryMatches = fallbackPosts.filter(p => matchesHistoryCategory(p, categoryId));
    return {
      posts: categoryMatches.length > 0 ? categoryMatches : fallbackPosts,
      configured: false
    };
  }

  return { posts: fallbackPosts, configured: false };
}

