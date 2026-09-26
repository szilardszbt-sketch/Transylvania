import React, { useEffect } from 'react';
import { X, Clock, Calendar, User, ExternalLink, Share2, Tag, BookOpen } from 'lucide-react';
import { WordPressPost } from '../../types';

interface BlogPostReaderModalProps {
  post: WordPressPost | null;
  onClose: () => void;
}

export const BlogPostReaderModal: React.FC<BlogPostReaderModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E3DDD2] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#1B3322] text-white text-[10px] uppercase font-bold tracking-wider">
              {post.categoryName || (post.source === 'markdown' ? 'Field Journal' : 'Journal Dispatch')}
            </span>
            <span className="text-xs text-[#717A70] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#5D665B] hover:text-[#1B3322] hover:bg-[#EFECE6] rounded-full transition-colours cursor-pointer"
                title="View original post"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#5D665B] hover:text-[#1B3322] hover:bg-[#EFECE6] rounded-full transition-colours cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Post Header */}
          <div className="space-y-4 border-b border-[#E8E2D8] pb-6">
            <h1 className="font-brand text-2xl sm:text-4xl font-bold text-[#1B3322] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#717A70] font-sans">
              <div className="flex items-center gap-1.5 font-medium text-[#1B3322]">
                <User className="w-3.5 h-3.5 text-[#2D5A38]" />
                <span>{post.authorName}</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#717A70]" />
                <span>{post.formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.heroImage && (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#EAE5DC] border border-[#E0D9CD]">
              <img
                src={post.heroImage}
                alt={post.heroImageAlt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Lead Excerpt */}
          {post.excerpt && (
            <div className="bg-[#F3EFE8] border-l-4 border-[#2D5A38] p-4 rounded-r-lg">
              <p className="text-sm sm:text-base font-editorial italic text-[#2C332D] leading-relaxed">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>
          )}

          {/* Article HTML Content / Markdown */}
          {post.contentHtml ? (
            <div 
              className="prose prose-stone max-w-none text-[#2C332D] text-sm sm:text-base leading-relaxed font-sans space-y-4 [&>p]:leading-relaxed [&>h2]:font-brand [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#1B3322] [&>h3]:font-brand [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1B3322] [&>img]:rounded-xl [&>img]:my-4 [&>blockquote]:border-l-2 [&>blockquote]:border-[#2D5A38] [&>blockquote]:pl-4 [&>blockquote]:italic [&>a]:text-[#2D5A38] [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <p className="text-sm text-[#4E574E] leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-[#E8E2D8] flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#869187] font-semibold text-[11px] uppercase mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {post.tags.map((t, idx) => (
                <span key={idx} className="bg-[#EFECE6] text-[#495248] px-2.5 py-1 rounded-full text-xs font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 bg-[#F5F2EC] border-t border-[#E8E2D8] flex items-center justify-between">
          <span className="text-xs text-[#717A70] font-editorial italic">
            {post.source === 'markdown' ? 'Published via Decap CMS & Git' : 'Transylvania Travel Journal'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1B3322] text-white text-xs font-semibold rounded-lg hover:bg-[#2D5A38] transition-colours cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
