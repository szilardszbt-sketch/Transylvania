/**
 * SEO & Schema.org Structured Data Utilities
 */

import { Destination, WordPressPost, Article } from '../types';
import { sanitizeHtmlToText } from '../services/wordpressBlog';

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
    title: string;
    excerpt?: string;
    heroImage?: string;
    publishedDate?: string;
    date?: string;
    slug: string;
    author?: { name: string; role?: string };
  },
  siteOrigin: string = getCanonicalOrigin(),
  isWpPost: boolean = false
): Record<string, any> {
  const pageUrl = isWpPost ? `${siteOrigin}/blog/${post.slug}` : `${siteOrigin}/articles/${post.slug}`;
  const rawImage = post.heroImage || '';
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${siteOrigin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;
  const pubDate = post.publishedDate || post.date;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ? sanitizeHtmlToText(post.excerpt) : undefined,
    url: pageUrl,
    image: imageUrl || undefined,
    datePublished: pubDate,
    dateModified: pubDate,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'The Traveller',
      jobTitle: post.author?.role || 'Explorer & Field Researcher'
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
