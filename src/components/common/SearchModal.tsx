import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, BookOpen, Compass, ArrowRight, Layers, Tag, Sparkles } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { articles } from '../../data/articles';
import { practicalGuides } from '../../data/practicalGuides';
import { categories } from '../../data/categories';
import { regions } from '../../data/regions';
import { fetchAllBlogPostsForSearch, normalizeTag } from '../../services/wordpressBlog';
import { WordPressPost } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<WordPressPost[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';

      // Index all blog posts (from headless WordPress and fallback dispatches)
      if (blogPosts.length === 0) {
        setLoadingBlog(true);
        fetchAllBlogPostsForSearch()
          .then((posts) => {
            setBlogPosts(posts);
            setLoadingBlog(false);
          })
          .catch(() => {
            setLoadingBlog(false);
          });
      }
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, blogPosts.length]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const qNorm = normalizeTag(q);

    const matchedDestinations = destinations.filter(d => 
      d.name.toLowerCase().includes(q) ||
      (d.romanianName && d.romanianName.toLowerCase().includes(q)) ||
      (d.germanName && d.germanName.toLowerCase().includes(q)) ||
      d.shortDescription.toLowerCase().includes(q) ||
      d.goodToKnow.location.toLowerCase().includes(q)
    );

    // Blog posts & dispatches: matched across titles, excerpts, categories, and tags
    const matchedBlogPosts = blogPosts.filter(p => {
      const titleMatch = p.title.toLowerCase().includes(q) || (qNorm && normalizeTag(p.title).includes(qNorm));
      const excerptMatch = p.excerpt.toLowerCase().includes(q) || (qNorm && normalizeTag(p.excerpt).includes(qNorm));
      const categoryMatch = p.categoryName ? (
        p.categoryName.toLowerCase().includes(q) || (qNorm && normalizeTag(p.categoryName).includes(qNorm))
      ) : false;
      const tagMatch = p.tags && p.tags.some(tag => {
        const norm = normalizeTag(tag);
        const lower = tag.toLowerCase();
        return lower.includes(q) || (qNorm && norm.includes(qNorm)) || q.includes(lower) || (qNorm && qNorm.includes(norm));
      });

      return titleMatch || excerptMatch || categoryMatch || tagMatch;
    });

    const blogSlugs = new Set(matchedBlogPosts.map(bp => bp.slug));
    const matchedArticles = articles.filter(a => {
      if (blogSlugs.has(a.slug)) return false;
      return a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q);
    });

    const matchedGuides = practicalGuides.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q)
    );

    const matchedCategories = categories.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );

    return {
      destinations: matchedDestinations,
      blogPosts: matchedBlogPosts,
      articles: matchedArticles,
      guides: matchedGuides,
      categories: matchedCategories,
      total: matchedDestinations.length + matchedBlogPosts.length + matchedArticles.length + matchedGuides.length + matchedCategories.length
    };
  }, [query, blogPosts]);

  if (!isOpen) return null;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="search-modal-container"
        className="w-full max-w-3xl bg-[#FCFBF9] border border-[#E5E0D8] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#EBE7E0] bg-white gap-3">
          <Search className="w-5 h-5 text-[#6B726A] shrink-0" />
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Sighișoara, Bran Castle, Saxon churches, road trip, food..."
            className="w-full bg-transparent text-[#232724] text-base placeholder-[#8C928B] outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-[#8C928B] hover:text-[#232724] rounded-md transition-colours"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs uppercase tracking-wider text-[#6B726A] bg-[#F2EFE9] hover:bg-[#E7E2D8] rounded font-medium transition-colours"
          >
            ESC
          </button>
        </div>

        {/* Search Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8C928B]">
                Popular Inquiries
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Sighișoara Citadel', path: '/destinations/sighisoara' },
                  { label: 'Bran Castle (Dracula)', path: '/destinations/bran' },
                  { label: 'Sibiu & Houses with Eyes', path: '/destinations/sibiu' },
                  { label: 'Viscri Fortified Church', path: '/destinations/viscri' },
                  { label: 'Driving in Romania', path: '/plan-your-visit/driving-in-romania' },
                  { label: 'The Saxons of Transylvania', path: '/articles/saxons-of-transylvania' },
                  { label: '7-Day Road Trip', path: '/articles/a-7-day-transylvania-road-trip' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.path)}
                    className="text-xs bg-[#EFECE6] hover:bg-[#E5DFD4] text-[#2C332D] px-3 py-1.5 rounded-full transition-colours"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t border-[#EBE7E0] text-xs text-[#6B726A] leading-relaxed">
                Discover destinations, points of interest, cultural history articles, and practical travel advice across Transylvania and Romania.
              </div>
            </div>
          )}

          {searchResults && searchResults.total === 0 && (
            <div className="text-center py-12 text-[#6B726A]">
              <p className="text-base font-serif">No matches found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-[#8C928B]">Try searching for a town like Sighișoara, a landmark, or a topic like driving or food.</p>
            </div>
          )}

          {searchResults && searchResults.total > 0 && (
            <div className="space-y-6">
              {/* Destinations */}
              {searchResults.destinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322] mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2D5A38]" />
                    Destinations ({searchResults.destinations.length})
                  </div>
                  <div className="grid gap-2">
                    {searchResults.destinations.map(d => (
                      <button
                        key={d.id}
                        onClick={() => handleSelect(`/destinations/${d.slug}`)}
                        className="w-full text-left p-3 rounded-lg bg-white border border-[#EBE7E0] hover:border-[#2D5A38]/40 hover:bg-[#F8F6F1] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={d.heroImage} 
                            alt={d.name}
                            className="w-12 h-12 object-cover rounded-md shrink-0" 
                          />
                          <div>
                            <div className="font-semibold text-sm text-[#1B3322] group-hover:text-[#2D5A38] transition-colours flex items-center gap-2">
                              {d.name}
                              {d.romanianName && d.romanianName !== d.name && (
                                <span className="text-xs text-[#8C928B] font-normal font-editorial italic">({d.romanianName})</span>
                              )}
                            </div>
                            <div className="text-xs text-[#6B726A] line-clamp-1">{d.tagline}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8C928B] group-hover:text-[#2D5A38] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Posts & Dispatches (Indexed across titles, excerpts, categories, and tags) */}
              {searchResults.blogPosts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322]">
                      <BookOpen className="w-3.5 h-3.5 text-[#2D5A38]" />
                      From the Blog & Dispatches ({searchResults.blogPosts.length})
                    </div>
                    <span className="text-[10px] text-[#717A70] uppercase font-mono tracking-wider hidden sm:inline-block">
                      Indexed by title, tags & topics
                    </span>
                  </div>
                  <div className="grid gap-2">
                    {searchResults.blogPosts.map(post => (
                      <button
                        key={`blog-${post.id}-${post.slug}`}
                        onClick={() => handleSelect(`/blog?post=${post.slug}`)}
                        className="w-full text-left p-3 rounded-lg bg-white border border-[#EBE7E0] hover:border-[#2D5A38]/40 hover:bg-[#F8F6F1] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {post.heroImage ? (
                            <img
                              src={post.heroImage}
                              alt={post.heroImageAlt || post.title}
                              className="w-12 h-12 object-cover rounded-md shrink-0 bg-[#EAE5DD]"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-md bg-[#E8F0EA] flex items-center justify-center text-[#2D5A38] shrink-0">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] px-1.5 py-0.5 bg-[#E8F0EA] text-[#2D5A38] font-semibold rounded uppercase tracking-wider">
                                {post.categoryName || 'From the Blog'}
                              </span>
                              <span className="text-[10px] text-[#8C928B]">
                                {post.formattedDate || post.readTime}
                              </span>
                            </div>
                            <div className="font-medium text-xs sm:text-sm text-[#1B3322] group-hover:text-[#2D5A38] transition-colors truncate mt-0.5">
                              {post.title}
                            </div>
                            <div className="text-xs text-[#6B726A] line-clamp-1">
                              {post.excerpt}
                            </div>
                            {/* Matching tags pill display */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                                <Tag className="w-2.5 h-2.5 text-[#8C928B] shrink-0" />
                                <div className="flex items-center gap-1 overflow-hidden flex-wrap">
                                  {post.tags.slice(0, 5).map((t, idx) => {
                                    const qClean = normalizeTag(query);
                                    const tClean = normalizeTag(t);
                                    const isMatchedTag = query && (
                                      t.toLowerCase().includes(query.toLowerCase()) || 
                                      query.toLowerCase().includes(t.toLowerCase()) ||
                                      (qClean && tClean.includes(qClean)) ||
                                      (qClean && qClean.includes(tClean))
                                    );
                                    return (
                                      <span
                                        key={idx}
                                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono truncate ${
                                          isMatchedTag
                                            ? 'bg-[#2D5A38] text-white font-bold'
                                            : 'bg-[#F2EDE4] text-[#556054]'
                                        }`}
                                      >
                                        #{t}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8C928B] group-hover:text-[#2D5A38] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {searchResults.articles.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322] mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#2D5A38]" />
                    Articles & Guides ({searchResults.articles.length})
                  </div>
                  <div className="grid gap-2">
                    {searchResults.articles.map(a => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect(`/articles/${a.slug}`)}
                        className="w-full text-left p-3 rounded-lg bg-white border border-[#EBE7E0] hover:border-[#2D5A38]/40 hover:bg-[#F8F6F1] transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-xs text-[#1B3322] group-hover:text-[#2D5A38] transition-colours">
                            {a.title}
                          </div>
                          <div className="text-xs text-[#6B726A] line-clamp-1 mt-0.5">{a.excerpt}</div>
                        </div>
                        <div className="text-[11px] text-[#8C928B] shrink-0 ml-3">{a.readTime}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Guides */}
              {searchResults.guides.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322] mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-[#2D5A38]" />
                    Practical Visitor Guides ({searchResults.guides.length})
                  </div>
                  <div className="grid gap-2">
                    {searchResults.guides.map(g => (
                      <button
                        key={g.id}
                        onClick={() => handleSelect(`/plan-your-visit/${g.slug}`)}
                        className="w-full text-left p-3 rounded-lg bg-white border border-[#EBE7E0] hover:border-[#2D5A38]/40 hover:bg-[#F8F6F1] transition-all flex items-center justify-between group"
                      >
                        <div className="font-medium text-xs text-[#1B3322] group-hover:text-[#2D5A38] transition-colours">
                          {g.title}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8C928B] group-hover:text-[#2D5A38] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
