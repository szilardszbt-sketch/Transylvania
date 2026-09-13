import React, { useEffect } from 'react';
import {
  DEFAULT_SITE_TITLE,
  DEFAULT_SITE_DESCRIPTION,
  formatMetaTitle,
  getCanonicalOrigin
} from '../../utils/seo';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

function updateOrCreateMeta(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateOrCreateCanonical(url: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function updateOrCreateJsonLd(schemaData?: Record<string, any> | Array<Record<string, any>>) {
  if (typeof document === 'undefined') return;
  const SCRIPT_ID = 'seo-structured-data';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!schemaData) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaData);
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  authorName = 'The Traveller',
  schema
}) => {
  const origin = getCanonicalOrigin();
  const fullTitle = formatMetaTitle(title);
  const fullDescription = description?.trim() || DEFAULT_SITE_DESCRIPTION;

  const fullCanonicalUrl = canonicalPath
    ? canonicalPath.startsWith('http')
      ? canonicalPath
      : `${origin}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`
    : typeof window !== 'undefined'
      ? `${origin}${window.location.pathname}`
      : `${origin}/`;

  const rawImage = image || '/images/bucin_peak_winter_hero_1787137385478.jpg';
  const fullImageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${origin}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // 2. Primary meta description
    updateOrCreateMeta('name', 'description', fullDescription);

    // 3. Open Graph
    updateOrCreateMeta('property', 'og:title', fullTitle);
    updateOrCreateMeta('property', 'og:description', fullDescription);
    updateOrCreateMeta('property', 'og:type', type);
    updateOrCreateMeta('property', 'og:url', fullCanonicalUrl);
    updateOrCreateMeta('property', 'og:image', fullImageUrl);
    updateOrCreateMeta('property', 'og:site_name', DEFAULT_SITE_TITLE);
    updateOrCreateMeta('property', 'og:locale', 'en_US');
    if (imageAlt) {
      updateOrCreateMeta('property', 'og:image:alt', imageAlt);
    }

    if (type === 'article') {
      if (publishedTime) {
        updateOrCreateMeta('property', 'article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateOrCreateMeta('property', 'article:modified_time', modifiedTime);
      }
      if (authorName) {
        updateOrCreateMeta('property', 'article:author', authorName);
      }
    }

    // 4. Twitter Card
    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', fullTitle);
    updateOrCreateMeta('name', 'twitter:description', fullDescription);
    updateOrCreateMeta('name', 'twitter:image', fullImageUrl);
    if (imageAlt) {
      updateOrCreateMeta('name', 'twitter:image:alt', imageAlt);
    }

    // 5. Canonical Link
    updateOrCreateCanonical(fullCanonicalUrl);

    // 6. Schema.org JSON-LD
    updateOrCreateJsonLd(schema);
  }, [
    fullTitle,
    fullDescription,
    fullCanonicalUrl,
    fullImageUrl,
    type,
    imageAlt,
    publishedTime,
    modifiedTime,
    authorName,
    schema
  ]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={DEFAULT_SITE_TITLE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
};
