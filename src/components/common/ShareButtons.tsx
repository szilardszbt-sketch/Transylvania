import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const sharePinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2 text-xs text-[#6B726A]">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C928B] mr-1">
        Share Reference:
      </span>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-2.5 py-1 bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#2C332D] rounded text-[11px] font-medium transition-colours cursor-pointer"
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[#2D5A38]" /> : <LinkIcon className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Copy Link'}</span>
      </button>
      <button
        onClick={sharePinterest}
        className="px-2.5 py-1 bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#2C332D] rounded text-[11px] font-medium transition-colours cursor-pointer"
      >
        Pinterest
      </button>
      <button
        onClick={shareFacebook}
        className="px-2.5 py-1 bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#2C332D] rounded text-[11px] font-medium transition-colours cursor-pointer"
      >
        Facebook
      </button>
    </div>
  );
};
