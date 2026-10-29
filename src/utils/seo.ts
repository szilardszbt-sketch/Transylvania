/**
 * SEO & Schema.org Structured Data Utilities
 */

import { Destination, WordPressPost, Article } from '../types';
import { sanitizeHtmlToText } from '../services/wordpressBlog';
import { slugify } from './slug';

export const DEFAULT_SITE_TITLE = 'TRANSYLVANIA — The Heart of Romania';
export const DEFAULT_SITE_DESCRIPTION =
  'Discover the historic citadels, fortified Saxon churches, Carpathian alpine ridges, and living traditions of Transylvania and Romania. Independent travel and cultural reference.';

export function getCanonicalOrigin(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://transylvaniaatlas.com';
}

export function formatMetaTitle(pageTitle?: string): string {
  if (!pageTitle || pageTitle === DEFAULT_SITE_TITLE) {
    return `${DEFAULT_SITE_TITLE} | Independent Travel Reference`;
  }
  if (pageTitle.includes('TRANSYLVANIA') || pageTitle.includes('Transylvania')) {
    return `${pageTitle} | Independent Guide`;
  }
  return `${pageTitle} | Transylvania & Romania Guide`;
}

/**
 * Generates Place and TouristAttraction schema.org metadata for destination hub pages
 */
export function generateDestinationSchema(
  dest: Destination,
  siteOrigin: string = getCanonicalOrigin()
): Record<string, any> {
  const pageUrl = `${siteOrigin}/destinations/${dest.slug}`;
  const rawImage = dest.heroImage || '';
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${siteOrigin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Place'],
    name: dest.name,
    description: dest.shortDescription || dest.tagline,
    url: pageUrl,
    image: imageUrl,
    publicAccess: true,
    isAccessibleForFree: true,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: dest.regionName || 'Transylvania',
      containedInPlace: {
        '@type': 'Country',
        name: 'Romania',
        identifier: 'RO'
      }
    }
  };

  const alternateNames = [dest.romanianName, dest.germanName, dest.hungarianName]
    .filter((n): n is string => Boolean(n) && n !== dest.name);
  if (alternateNames.length > 0) {
    schema.alternateName = alternateNames;
  }

  if (dest.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: dest.coordinates.lat,
      longitude: dest.coordinates.lng
    };
  }

  if (dest.goodToKnow?.bestFor && dest.goodToKnow.bestFor.length > 0) {
    schema.touristType = dest.goodToKnow.bestFor;
  }

  if (dest.pois && dest.pois.length > 0) {
    schema.containsPlace = dest.pois.map((poi) => ({
      '@type': 'TouristAttraction',
      name: poi.name,
      description: poi.shortDescription,
      ...(poi.coordinates
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: poi.coordinates.lat,
              longitude: poi.coordinates.lng
            }
          }
        : {})
    }));
  }

  return schema;
}

/**
 * Generates BlogPosting / Article schema.org metadata for WordPress posts or in-depth articles
 */
export function generateArticleSchema(
  post: {
    title?: string;
    excerpt?: string;
    heroImage?: string;
    publishedDate?: string;
    date?: string;
    slug?: string;
    author?: { name?: string; role?: string } | string;
  },
  siteOrigin: string = getCanonicalOrigin(),
  isWpPost: boolean = false
): Record<string, any> {
  try {
    const slug = typeof post?.slug === 'string' && post.slug.trim().length > 0 ? slugify(post.slug.trim()) : 'journal';
    const pageUrl = isWpPost ? `${siteOrigin}/blog/${slug}` : `${siteOrigin}/articles/${slug}`;
    const rawImage = typeof post?.heroImage === 'string' ? post.heroImage.trim() : '';
    const imageUrl = rawImage
      ? rawImage.startsWith('http')
        ? rawImage
        : `${siteOrigin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`
      : undefined;
    const pubDate = post?.publishedDate || post?.date || new Date().toISOString();
    const title = typeof post?.title === 'string' && post.title.trim().length > 0 ? post.title.trim() : 'Field Journal Dispatch';

    let authorName = 'The Traveller';
    let authorRole = 'Explorer & Field Researcher';

    if (typeof post?.author === 'string' && post.author.trim().length > 0) {
      authorName = post.author.trim();
    } else if (post?.author && typeof post.author === 'object') {
      if (typeof post.author.name === 'string' && post.author.name.trim().length > 0) {
        authorName = post.author.name.trim();
      }
      if (typeof post.author.role === 'string' && post.author.role.trim().length > 0) {
        authorRole = post.author.role.trim();
      }
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: post?.excerpt && typeof post.excerpt === 'string' ? sanitizeHtmlToText(post.excerpt) : undefined,
      url: pageUrl,
      image: imageUrl,
      datePublished: pubDate,
      dateModified: pubDate,
      author: {
        '@type': 'Person',
        name: authorName,
        jobTitle: authorRole
      },
      publisher: {
        '@type': 'Organization',
        name: 'TRANSYLVANIA — The Heart of Romania',
        url: siteOrigin,
        logo: {
          '@type': 'ImageObject',
          url: `${siteOrigin}/images/bucin_peak_winter_hero_1787137385478.jpg`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    };
  } catch (err) {
    console.warn('Safe catch: generateArticleSchema failed gracefully:', err);
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Transylvania Travel Journal',
      url: `${siteOrigin}/blog`
    };
  }
}

/**
 * Generates WebSite schema for homepage
 */
export function generateWebSiteSchema(siteOrigin: string = getCanonicalOrigin()): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TRANSYLVANIA — The Heart of Romania',
    url: siteOrigin,
    description: DEFAULT_SITE_DESCRIPTION,
    inLanguage: 'en'
  };
}
