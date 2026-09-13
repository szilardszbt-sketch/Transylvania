import React, { useState, useEffect } from 'react';
import { Camera, ImageOff } from 'lucide-react';
import { PhotoCredit } from '../../types';
import { PhotoCreditBadge } from './PhotoCreditBadge';

export interface LocationImageProps {
  src?: string | null;
  alt: string;
  locationName: string;
  credit?: PhotoCredit | string | null;
  creditPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  containerClassName?: string;
  aspectRatioClassName?: string;
  overlayGradient?: boolean;
  children?: React.ReactNode;
  placeholderSubtitle?: string;
}

/**
 * Robust Location & Landmark Image Component
 * 
 * Guarantees:
 * 1. Never renders photo credits/citations unless an authentic image has successfully loaded.
 * 2. If an image is missing or fails to load, gracefully shows a clean, branded "Photo Coming Soon" placeholder
 *    using the site's authentic forest/earth palette and typography.
 * 3. Never produces broken visual cards or orphaned attribution badges.
 */
export const LocationImage: React.FC<LocationImageProps> = ({
  src,
  alt,
  locationName,
  credit,
  creditPosition = 'top-right',
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatioClassName = 'aspect-[16/10]',
  overlayGradient = true,
  children,
  placeholderSubtitle
}) => {
  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>(() => {
    return src && src.trim().length > 0 ? 'loading' : 'error';
  });

  useEffect(() => {
    if (!src || src.trim().length === 0) {
      setLoadStatus('error');
    } else {
      setLoadStatus('loading');
    }
  }, [src]);

  const hasLoaded = loadStatus === 'loaded';
  const hasError = loadStatus === 'error';

  return (
    <div className={`relative overflow-hidden ${aspectRatioClassName} ${containerClassName}`}>
      {/* 1. Real Image Element (Only active if src exists and not in error state) */}
      {!hasError && src && (
        <img
          src={src}
          alt={alt || locationName}
          onLoad={() => setLoadStatus('loaded')}
          onError={() => setLoadStatus('error')}
          className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
      )}

      {/* 2. Loading State Placeholder */}
      {loadStatus === 'loading' && (
        <div className="absolute inset-0 bg-[#EAE5DC] animate-pulse flex items-center justify-center">
          <span className="sr-only">Loading photo for {locationName}...</span>
        </div>
      )}

      {/* 3. Branded "Photo Coming Soon" Placeholder (Clean, solid earthy palette, NO photo credit) */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C281F] via-[#213125] to-[#162018] flex flex-col items-center justify-center p-6 text-center select-none border border-white/5">
          {/* Subtle decorative background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A3CCA8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-2.5 max-w-[85%]">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A3CCA8] shadow-inner">
              <Camera className="w-5 h-5" strokeWidth={1.75} />
            </div>

            <div className="space-y-1">
              <div className="font-brand font-bold text-sm sm:text-base text-[#F4F1EA] line-clamp-1">
                {locationName}
              </div>
              {placeholderSubtitle && (
                <div className="text-[11px] text-[#A8B2A7] line-clamp-1 font-editorial">
                  {placeholderSubtitle}
                </div>
              )}
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/40 border border-[#A3CCA8]/20 text-[10px] uppercase font-semibold tracking-wider text-[#A3CCA8]">
                Photo Coming Soon
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Optional dark gradient for text legibility (applied when photo loaded or loading) */}
      {overlayGradient && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      )}

      {/* 5. Photo Credit Badge (STRICT RULE: ONLY render when image has successfully loaded) */}
      {hasLoaded && credit && (
        <PhotoCreditBadge credit={credit} position={creditPosition} />
      )}

      {/* 6. Children overlays (e.g. region badges, titles, action buttons) */}
      {children}
    </div>
  );
};
