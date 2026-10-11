import React from 'react';
import { WordPressPost, PhotoCredit } from '../../types';
import { LocationImage } from '../common/LocationImage';
import { extractFirstImageFromHtml } from '../../services/wordpressBlog';

export interface BlogPostCardProps {
  post: WordPressPost;
  onClick: () => void;
  idPrefix?: string;
}

/**
 * Standardized Blog Post Card
 * 
 * Reuses the exact visual design and styling of the Explore page's
 * "Matching Destinations" card:
 * - 16:10 photograph aspect ratio with smooth zoom on hover
 * - Photo credit overlay at top-right
 * - Category badge at top-left
 * - Brand heading typography positioned over bottom of image
 * - Standardized body spacing (p-5 space-y-3) and 3-line description clamp
 * - 2-column metadata row (Date & Read time)
 * - Muted footer bar with author attribution
 * 
 * Thumbnail logic:
 * 1. Post's WordPress Featured Image if set
 * 2. Fallback to first <img> found in post body content
 * 3. Existing photo credit overlay applied to whichever image is used
 */
export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  onClick,
  idPrefix = 'blog-card'
}) => {
  if (!post) return null;

  const safeTitle = typeof post.title === 'string' && post.title.trim() ? post.title.trim() : 'Field Dispatch';
  const safeExcerpt = typeof post.excerpt === 'string' ? post.excerpt : '';
  const safeAuthor = typeof post.authorName === 'string' && post.authorName.trim() ? post.authorName.trim() : 'The Traveller';
  const safeTags = Array.isArray(post.tags) ? post.tags.filter((t): t is string => typeof t === 'string' && Boolean(t.trim())) : [];
  const safeCategory = typeof post.categoryName === 'string' && post.categoryName.trim() ? post.categoryName.trim() : 'Travel Journal';
  const safeDate = typeof post.formattedDate === 'string' && post.formattedDate.trim() ? post.formattedDate : 'Field Dispatch';
  const safeReadTime = typeof post.readTime === 'string' && post.readTime.trim() ? post.readTime : '3 min read';

  // 1. Resolve thumbnail image (WordPress Featured Image -> fallback to first <img> in body content)
  let thumbnailSrc = typeof post.heroImage === 'string' ? post.heroImage : '';
  let thumbnailAlt = typeof post.heroImageAlt === 'string' ? post.heroImageAlt : safeTitle;
  let thumbnailCredit: PhotoCredit | string | undefined = post.heroImageCredit;

  if (!thumbnailSrc && post.contentHtml && typeof post.contentHtml === 'string') {
    const extracted = extractFirstImageFromHtml(post.contentHtml);
    if (extracted && extracted.src) {
      thumbnailSrc = extracted.src;
      if (!thumbnailAlt || thumbnailAlt === safeTitle) {
        thumbnailAlt = extracted.alt || safeTitle;
      }
      if (!thumbnailCredit && extracted.credit) {
        thumbnailCredit = extracted.credit;
      }
    }
  }

  // 2. Apply photo credit overlay to whichever image is used
  if (!thumbnailCredit && thumbnailSrc) {
    thumbnailCredit = safeAuthor ? `Photo: ${safeAuthor}` : 'Transylvania Travel Journal';
  }

  return (
    <div
      id={`${idPrefix}-${post.slug || 'item'}`}
      onClick={onClick}
      className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 hover:-translate-y-0.5 transition-all group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <LocationImage
          src={thumbnailSrc}
          alt={thumbnailAlt}
          locationName={safeTitle}
          credit={thumbnailCredit}
          creditPosition="top-right"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          aspectRatioClassName="aspect-[16/10]"
          placeholderSubtitle={safeCategory}
        >
          {/* Category Badge matching Explore page region badge */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
              {safeCategory}
            </span>
          </div>

          {/* Title Overlay matching Explore page destination typography */}
          <div className="absolute bottom-3 left-3 right-3 text-white z-10 pointer-events-none">
            <h3 className="font-brand text-xl min-[380px]:text-2xl font-bold tracking-wide break-words">
              {safeTitle}
            </h3>
          </div>
        </LocationImage>

        {/* Card Body Spacing and Content */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3 font-sans">
            {safeExcerpt}
          </p>

          {/* 2-Column Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2EEE8] text-[11px] text-[#717A70]">
            <div>
              <span className="block font-semibold uppercase text-[9px] text-[#869187]">Date</span>
              <span className="text-[#1B3322] font-medium truncate block">{safeDate}</span>
            </div>
            <div>
              <span className="block font-semibold uppercase text-[9px] text-[#869187]">Read</span>
              <span className="text-[#1B3322] font-medium truncate block">{safeReadTime}</span>
            </div>
          </div>

          {/* Tags */}
          {safeTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {safeTags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-[10px] bg-[#F2EFE9] text-[#5A6359] px-2 py-0.5 rounded font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Bar matching Explore card's bottom bar */}
      <div className="px-5 py-3 bg-[#F9F8F5] border-t border-[#EAE5DC] flex items-center justify-between text-xs font-medium text-[#717A70]">
        <span>By {safeAuthor}</span>
        <span className="font-editorial italic">Travel Journal</span>
      </div>
    </div>
  );
};
