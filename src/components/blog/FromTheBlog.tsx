import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ArrowRight, ExternalLink, Sparkles, Tag, Eye } from 'lucide-react';
import { WordPressPost } from '../../types';
import { 
  fetchPostsByTagSlug, 
  fetchHistoryCulturePosts, 
  isHistoryCulturePost,
  normalizeTag
} from '../../services/wordpressBlog';
import { BlogPostReaderModal } from './BlogPostReaderModal';

export interface FromTheBlogProps {
  /**
   * The slug of the location, destination, POI, or topic (e.g. 'rope-street', 'brasov', 'history', 'plan-your-visit')
   */
  tagSlug?: string;
  /**
   * If true, enables conditional cross-linking for the History & Culture page:
   * uses the existing WordPress REST API tag matching to only include posts
   * with one or more tags relevant to history or culture.
   */
  filterHistoryCulture?: boolean;
  /**
   * Optional category filter matching History & Culture tabs ('all', 'history', 'architecture', 'food', 'myths')
   */
  categoryFilter?: string;
  /**
   * Optional custom section title
   */
  title?: string;
  /**
   * Optional custom subtitle or description
   */
  subtitle?: string;
  /**
   * Maximum number of posts to display (default: 6 when filterHistoryCulture, else 3)
   */
  maxPosts?: number;
  /**
   * Visual layout style
   */
  variant?: 'grid' | 'compact' | 'drawer' | 'inline';
  /**
   * Navigation handler (optional)
   */
  onNavigate?: (path: string) => void;
  className?: string;
}

export const FromTheBlog: React.FC<FromTheBlogProps> = ({
  tagSlug,
  filterHistoryCulture = false,
  categoryFilter = 'all',
  title = 'From the Blog',
  subtitle,
  maxPosts = 6,
  variant = 'grid',
  onNavigate,
  className = ''
}) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (filterHistoryCulture) {
      setLoading(true);
      fetchHistoryCulturePosts(categoryFilter)
        .then((res) => {
          if (isMounted) {
            // Strictly enforce: post must have at least one history/culture-relevant tag!
            // "If a blog post has no history/culture-relevant tags, it must not appear anywhere except the Blog page."
            const qualifiedPosts = (res.posts || []).filter(isHistoryCulturePost);
            setPosts(qualifiedPosts);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setPosts([]);
            setLoading(false);
          }
        });
      return () => {
        isMounted = false;
      };
    }

    if (!tagSlug) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchPostsByTagSlug(tagSlug)
      .then((res) => {
        if (isMounted) {
          setPosts(res.posts || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPosts([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [tagSlug, filterHistoryCulture, categoryFilter]);

  // If no matching posts exist or API is offline/empty, hide component entirely as requested
  if (loading || posts.length === 0) {
    return null;
  }

  const displayedPosts = posts.slice(0, maxPosts);

  // Compact variant for POI modal or small sidebar cards
  if (variant === 'compact' || variant === 'drawer') {
    return (
      <>
        <div className={`bg-[#F9F7F4] border border-[#E5DFD4] rounded-xl p-4 space-y-3 ${className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2D5A38]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{title}</span>
            </div>
            <span className="text-[10px] text-[#717A70]">
              {posts.length} {posts.length === 1 ? 'dispatch' : 'dispatches'}
            </span>
          </div>

          <div className="space-y-2">
            {displayedPosts.map((post) => (
              <a
                key={post.id}
                id={`compact-blog-preview-${post.slug}`}
                href={`/blog?post=${post.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate(`/blog?post=${post.slug}`);
                    } else {
                      setSelectedPost(post);
                    }
                  }
                }}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white border border-[#EAE5DD] hover:border-[#2D5A38] hover:shadow-xs transition-all group text-left cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-[#1B3322] group-hover:text-[#2D5A38] truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#717A70] mt-0.5">
                    <span>{post.formattedDate}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#869187] group-hover:text-[#2D5A38] group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <BlogPostReaderModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      </>
    );
  }

  // Standard responsive Grid layout for Explore, History, Plan Your Visit & Destination pages
  return (
    <>
      <section className={`space-y-6 pt-6 border-t border-[#E3DDD2] ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                {filterHistoryCulture ? 'Cross-Linked Heritage Insights' : 'Location-Linked Dispatches'}
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-[#E8F0EA] text-[#2D5A38] rounded-md font-bold uppercase tracking-wider border border-[#D5E5D8]">
                From the Blog
              </span>
              {tagSlug && (
                <span className="text-[9px] px-2 py-0.5 bg-[#F2EDE4] text-[#556054] rounded-md font-mono uppercase tracking-wider hidden sm:inline-block">
                  #{tagSlug}
                </span>
              )}
              {filterHistoryCulture && (
                <span className="text-[9px] px-2 py-0.5 bg-[#F2EDE4] text-[#556054] rounded-md font-medium uppercase tracking-wider hidden sm:inline-block">
                  Heritage-Linked
                </span>
              )}
            </div>
            <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#1B3322] mt-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5D665B] mt-1 font-editorial">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-xs text-[#717A70] font-sans self-start sm:self-auto">
            {posts.length} {posts.length === 1 ? 'article connected' : 'articles connected'}
          </span>
        </div>

        <div className={`grid grid-cols-1 ${displayedPosts.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-1 max-w-xl'} gap-6`}>
          {displayedPosts.map((post) => (
            <a
              key={post.id}
              id={`history-blog-preview-${post.slug}`}
              href={`/blog?post=${post.slug}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate(`/blog?post=${post.slug}`);
                  } else {
                    setSelectedPost(post);
                  }
                }
              }}
              className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 transition-all group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE5DC]">
                  {post.heroImage ? (
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#E5DFD4] text-[#717A70]">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-1 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
                      {post.categoryName || 'Blog'}
                    </span>
                    {filterHistoryCulture && (
                      <span className="px-2 py-0.5 bg-[#2D5A38]/90 text-[#F5F2EC] rounded text-[9px] uppercase tracking-wider font-bold backdrop-blur-xs">
                        Heritage Tag
                      </span>
                    )}
                    {tagSlug && (
                      <span className="px-2 py-0.5 bg-[#2D5A38]/90 text-[#F5F2EC] rounded text-[9px] uppercase tracking-wider font-bold backdrop-blur-xs">
                        Location Tag
                      </span>
                    )}
                  </div>

                  {/* Quick Reader Action Button */}
                  <button
                    type="button"
                    title="Quick preview in reader modal"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] backdrop-blur-xs cursor-pointer z-10"
                  >
                    <Eye className="w-3 h-3" />
                    <span className="text-[10px] font-medium pr-0.5">Quick View</span>
                  </button>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] text-[#869187] flex items-center gap-2">
                    <span>{post.formattedDate}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-brand text-lg font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3 font-sans">
                    {post.excerpt}
                  </p>

                  {/* Tag Pills */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {post.tags.slice(0, 4).map((tag, idx) => {
                        const cleanTag = normalizeTag(tag);
                        const cleanTarget = tagSlug ? normalizeTag(tagSlug) : '';
                        const isMatchingTag = cleanTarget && (
                          cleanTag === cleanTarget || 
                          cleanTag.includes(cleanTarget) || 
                          cleanTarget.includes(cleanTag)
                        );
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                              isMatchingTag
                                ? 'bg-[#2D5A38] text-white font-bold'
                                : 'bg-[#F2EDE4] text-[#4A554A]'
                            }`}
                          >
                            #{tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[#F2EEE8] mt-1 flex items-center justify-between text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38]">
                <span className="text-xs text-[#717A70] font-editorial italic font-normal">
                  By {post.authorName}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A38] group-hover:translate-x-0.5 transition-transform">
                  <span>Read on Blog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Reader Modal */}
      <BlogPostReaderModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};
