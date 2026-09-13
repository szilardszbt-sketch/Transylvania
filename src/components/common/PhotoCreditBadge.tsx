import React from 'react';
import { Camera, ExternalLink, ShieldCheck } from 'lucide-react';
import { PhotoCredit, formatPhotoCredit } from '../../types';

interface PhotoCreditBadgeProps {
  credit?: PhotoCredit | string | null;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'inline' | 'none';
  compact?: boolean;
}

export const PhotoCreditBadge: React.FC<PhotoCreditBadgeProps> = ({
  credit,
  className = '',
  position = 'bottom-right',
  compact = false
}) => {
  const displayText = formatPhotoCredit(credit);

  if (!displayText) {
    return null;
  }

  const isOwner = typeof credit === 'object' && credit?.type === 'owner';
  const isSourced = typeof credit === 'object' && credit?.type === 'sourced';
  const isVisitor = typeof credit === 'object' && credit?.type === 'visitor';
  const hasItems = typeof credit === 'object' && Array.isArray(credit?.items) && credit.items.length > 0;
  const sourceUrl = typeof credit === 'object' ? credit?.sourceUrl : undefined;

  const badgeText = compact && hasItems ? 'Collage: 4 Dishes (Wikimedia)' : displayText;

  const positionClasses = {
    'bottom-right': 'absolute bottom-2 right-2',
    'bottom-left': 'absolute bottom-2 left-2',
    'top-right': 'absolute top-2 right-2',
    'top-left': 'absolute top-2 left-2',
    'inline': 'relative inline-flex',
    'none': ''
  }[position];

  const content = (
    <span
      className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium tracking-wide text-white/90 bg-black/65 hover:bg-black/80 backdrop-blur-md px-2 py-0.5 rounded shadow-sm transition-colors border border-white/10 max-w-[92%] truncate pointer-events-auto ${className}`}
      title={displayText}
    >
      {isOwner ? (
        <ShieldCheck className="w-3 h-3 text-amber-300 flex-shrink-0" />
      ) : (
        <Camera className="w-3 h-3 text-white/70 flex-shrink-0" />
      )}
      <span className="truncate">{badgeText}</span>
      {sourceUrl && (
        <ExternalLink className="w-2.5 h-2.5 opacity-60 flex-shrink-0" />
      )}
    </span>
  );

  if (sourceUrl) {
    return (
      <div className={`z-10 pointer-events-auto ${positionClasses}`}>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block hover:opacity-100 transition-opacity"
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={`z-10 pointer-events-none ${positionClasses}`}>
      {content}
    </div>
  );
};
