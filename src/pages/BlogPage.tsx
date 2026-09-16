import React, { useState, useEffect } from 'react';
import { Tag, Search, Sparkles, RefreshCw } from 'lucide-react';
import { articles } from '../data/articles';
import { fetchWordPressPosts, normalizeTag } from '../services/wordpressBlog';
import { WordPressPost } from '../types';
import { BlogPostReaderModal } from '../components/blog/BlogPostReaderModal';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { SEO } from '../components/common/SEO';
import { generateArticleSchema } from '../utils/seo';

interface BlogPageProps {
  onNavigate: (path: string) => void;
  initialPostSlug?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, initialPostSlug }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wpPosts, setWpPosts] = useState<WordPressPost[]>([]);
  const [isWpConfigured, setIsWpConfigured] = useState<boolean>(false);
  const [loadingWp, setLoadingWp] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);

  // Fetch WordPress posts on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingWp(true);

    fetchWordPressPosts({ perPage: 100 })
      .then((res) => {
        if (isMounted) {
          const posts = res.posts || [];
          setWpPosts(posts);
          setIsWpConfigured(res.configured);
          setLoadingWp(false);

          if (initialPostSlug) {
            const matched = posts.find(p => p.slug === initialPostSlug);
            if (matched) {
              setSelectedPost(matched);
            }
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setWpPosts([]);
          setLoadingWp(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [initialPostSlug]);

  // Handle fallback initialPostSlug from static articles if WP has no data
  useEffect(() => {
    if (initialPostSlug && wpPosts.length === 0 && !loadingWp) {
      const staticMatch = articles.find(a => a.slug === initialPostSlug);
      if (staticMatch) {
        setSelectedPost({
          id: staticMatch.id,
          slug: staticMatch.slug,
          title: staticMatch.title,
          excerpt: staticMatch.excerpt,
          contentHtml: `<p>${staticMatch.excerpt}</p>${staticMatch.content ? staticMatch.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : ''}`,
          date: staticMatch.publishedDate,
          formattedDate: staticMatch.publishedDate,
          link: `/articles/${staticMatch.slug}`,
          heroImage: staticMatch.heroImage,
          heroImageAlt: staticMatch.heroImageAlt || staticMatch.title,
          authorName: staticMatch.author.name,
          categoryName: staticMatch.category,
          tags: staticMatch.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')),
          readTime: staticMatch.readTime
        });
      }
    }
  }, [initialPostSlug, wpPosts, loadingWp]);

  // Curated static fallback articles
  const staticArticles = articles.filter(a => a.type === 'blog' || a.type === 'itinerary');

  // Determine if we are rendering WordPress posts or static articles
  const hasWpData = wpPosts.length > 0;

  // Extract all tags for filtering
  const allTags = hasWpData
    ? Array.from(new Set(wpPosts.flatMap(p => p.tags)))
    : Array.from(new Set(staticArticles.flatMap(a => a.tags)));

  // Filter WordPress posts
  const qNorm = normalizeTag(searchQuery);
  const qLower = searchQuery.toLowerCase().trim();

  const filteredWpPosts = wpPosts.filter(p => {
    const matchesTag = selectedTag === 'all' || p.tags.includes(selectedTag);
    const matchesSearch = !qLower || 
      p.title.toLowerCase().includes(qLower) || 
      p.excerpt.toLowerCase().includes(qLower) ||
      (qNorm && normalizeTag(p.title).includes(qNorm)) ||
      (qNorm && normalizeTag(p.excerpt).includes(qNorm)) ||
      (p.categoryName && (p.categoryName.toLowerCase().includes(qLower) || (qNorm && normalizeTag(p.categoryName).includes(qNorm)))) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(qLower) || (qNorm && normalizeTag(t).includes(qNorm)) || qLower.includes(t.toLowerCase())));
    return matchesTag && matchesSearch;
  });

  // Filter static articles
  const filteredStaticArticles = staticArticles.filter(a => {
    const matchesTag = selectedTag === 'all' || a.tags.includes(selectedTag);
    const matchesSearch = !qLower || 
      a.title.toLowerCase().includes(qLower) || 
      a.excerpt.toLowerCase().includes(qLower) ||
      (qNorm && normalizeTag(a.title).includes(qNorm)) ||
      (qNorm && normalizeTag(a.excerpt).includes(qNorm)) ||
      (a.category && (a.category.toLowerCase().includes(qLower) || (qNorm && normalizeTag(a.category).includes(qNorm)))) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(qLower) || (qNorm && normalizeTag(t).includes(qNorm)) || qLower.includes(t.toLowerCase())));
    return matchesTag && matchesSearch;
  });

  const staticArticlesAsPosts: WordPressPost[] = filteredStaticArticles.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    contentHtml: `<p>${article.excerpt}</p>${article.content ? article.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : ''}`,
    date: article.publishedDate,
    formattedDate: article.publishedDate,
    link: `/articles/${article.slug}`,
    heroImage: article.heroImage,
    heroImageAlt: article.heroImageAlt || article.title,
    heroImageCredit: article.heroImageCredit,
    authorName: article.author.name,
    categoryName: article.category,
    tags: article.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')),
    readTime: article.readTime
  }));

  const selectedPostSchema = selectedPost ? generateArticleSchema({
    title: selectedPost.title,
    excerpt: selectedPost.excerpt,
    heroImage: selectedPost.heroImage || selectedPost.featuredImage,
    publishedDate: selectedPost.date,
    slug: selectedPost.slug,
    author: { name: selectedPost.authorName }
  }, undefined, true) : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
      <SEO
        title={selectedPost ? `${selectedPost.title} — Transylvania Travel Journal` : "Transylvania Travel Journal & Dispatches | Independent Travel Blog"}
        description={selectedPost ? (selectedPost.excerpt || selectedPost.title) : "Field dispatches, cultural essays, road trip itineraries, and photography notes from Transylvania and Romania."}
        canonicalPath={selectedPost ? `/blog?post=${selectedPost.slug}` : "/blog"}
        image={selectedPost ? (selectedPost.heroImage || selectedPost.featuredImage) : undefined}
        imageAlt={selectedPost ? (selectedPost.heroImageAlt || selectedPost.title) : undefined}
        type={selectedPost ? "article" : "website"}
        schema={selectedPostSchema}
      />
      {/* Header */}
      <div className="border-b border-[#E3DDD2] pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38] flex items-center gap-1.5">
              <span>Editorial & Field Notes</span>
              {hasWpData && (
                <span className="px-2 py-0.5 bg-[#E8F0EA] text-[#2D5A38] text-[9px] font-bold rounded uppercase tracking-wider border border-[#D5E5D8]">
                  Headless REST Connected
                </span>
              )}
            </span>
            <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] break-words">
              Travel Journal & Dispatches
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#869187] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & guides..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B3322] focus:outline-hidden focus:border-[#2D5A38] placeholder:text-[#8E978C] shadow-2xs"
            />
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#5D665B] max-w-3xl font-editorial leading-relaxed">
          First-hand travel insights, tested road trip routes, honest reflections, and cultural perspectives from independent writers across Romania.
        </p>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] text-[#869187] uppercase font-semibold mr-1">Topics:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colours cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-[#1B3322] text-white'
                  : 'bg-[#EFECE6] text-[#495248] hover:bg-[#E2DDD3]'
              }`}
            >
              All Articles ({hasWpData ? wpPosts.length : staticArticles.length})
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colours cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#1B3322] text-white'
                    : 'bg-[#EFECE6] text-[#495248] hover:bg-[#E2DDD3]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Primary Content Grid */}
      {hasWpData ? (
        filteredWpPosts.length > 0 ? (
          /* Render Live WordPress Articles with Standardized Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWpPosts.map(post => (
              <BlogPostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E0D8] p-8 space-y-4">
            <p className="font-brand text-xl text-[#1B3322]">No dispatches found</p>
            <p className="text-xs text-[#717A70] max-w-md mx-auto">
              No articles match your current topic filter or search term. Try resetting your filters to explore all journal entries.
            </p>
            <button
              onClick={() => {
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3322] text-[#F3EFE8] text-xs font-semibold rounded-lg hover:bg-[#2D5A38] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )
      ) : (
        staticArticlesAsPosts.length > 0 ? (
          /* Fallback Curated Articles (Styled consistently) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticArticlesAsPosts.map(post => (
              <BlogPostCard
                key={post.id}
                post={post}
                onClick={() => {
                  onNavigate(`/articles/${post.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E0D8] p-8 space-y-4">
            <p className="font-brand text-xl text-[#1B3322]">No dispatches found</p>
            <p className="text-xs text-[#717A70] max-w-md mx-auto">
              No articles match your current topic filter or search term.
            </p>
            <button
              onClick={() => {
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3322] text-[#F3EFE8] text-xs font-semibold rounded-lg hover:bg-[#2D5A38] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        )
      )}

      {/* Reader Modal for WordPress Posts */}
      <BlogPostReaderModal
        post={selectedPost}
        onClose={() => {
          setSelectedPost(null);
          if (window.location.search.includes('post=')) {
            window.history.replaceState({}, '', '/blog');
          }
        }}
      />
    </div>
  );
};
