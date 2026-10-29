import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  Tag, 
  Share2, 
  BookOpen, 
  MapPin, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { WordPressPost } from '../types';
import { getMarkdownBlogPosts, getMarkdownPostBySlug, MarkdownBlogPost } from '../services/markdownBlog';
import { fetchWordPressPosts } from '../services/wordpressBlog';
import { articles } from '../data/articles';
import { destinations } from '../data/destinations';
import { SEO } from '../components/common/SEO';
import { generateArticleSchema } from '../utils/seo';
import { ShareButtons } from '../components/common/ShareButtons';
import { PhotoCreditBadge } from '../components/common/PhotoCreditBadge';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { slugify } from '../utils/slug';

interface BlogPostDetailPageProps {
  slug: string;
  onNavigate: (path: string, replace?: boolean) => void;
}

export const BlogPostDetailPage: React.FC<BlogPostDetailPageProps> = ({ slug, onNavigate }) => {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState<boolean>(false);
  const [heroImageError, setHeroImageError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setHeroImageLoaded(false);
    setHeroImageError(false);

    try {
      // 1. Safely decode URI components (handles %C3%A2, %C8%99, %C5%9F, etc.)
      let decodedSlug = slug;
      try {
        decodedSlug = decodeURIComponent(slug);
      } catch {
        decodedSlug = slug;
      }
      const normalizedQuerySlug = slugify(decodedSlug);

      // Helper to check and trigger canonical redirect if needed
      const ensureCanonicalRedirect = (canonicalSlug: string, prefix: string = '/blog/') => {
        if (typeof window !== 'undefined') {
          const canonicalPath = `${prefix}${canonicalSlug}`;
          let currentDecodedPath = '';
          try {
            currentDecodedPath = decodeURIComponent(window.location.pathname);
          } catch {
            currentDecodedPath = window.location.pathname;
          }

          if (currentDecodedPath !== canonicalPath || slug !== canonicalSlug) {
            onNavigate(canonicalPath, true);
          }
        }
      };

      // 2. Search local Decap CMS Markdown posts
      const mdPost = getMarkdownPostBySlug(decodedSlug) || getMarkdownPostBySlug(normalizedQuerySlug);
      if (mdPost) {
        if (isMounted) {
          setPost(mdPost);
          setLoading(false);
          ensureCanonicalRedirect(mdPost.slug, '/blog/');
        }
        return;
      }

      // 3. Second, check curated static articles
      const staticMatch = articles.find(a => 
        slugify(a.slug) === normalizedQuerySlug ||
        slugify(a.title) === normalizedQuerySlug
      );
      if (staticMatch) {
        if (isMounted) {
          const canonicalArticleSlug = slugify(staticMatch.slug);
          setPost({
            id: staticMatch.id,
            slug: canonicalArticleSlug,
            title: staticMatch.title,
            excerpt: staticMatch.excerpt,
            contentHtml: `<p>${staticMatch.excerpt}</p>${staticMatch.content ? staticMatch.content.split('\n\n').map(p => `<p>${p}</p>`).join('') : ''}`,
            date: staticMatch.publishedDate,
            formattedDate: staticMatch.publishedDate,
            link: `/articles/${canonicalArticleSlug}`,
            heroImage: staticMatch.heroImage,
            heroImageAlt: staticMatch.heroImageAlt || staticMatch.title,
            heroImageCredit: staticMatch.heroImageCredit,
            authorName: staticMatch.author.name,
            categoryName: staticMatch.category,
            tags: staticMatch.tags.map(t => slugify(t)),
            readTime: staticMatch.readTime,
            source: 'curated'
          });
          setLoading(false);
          ensureCanonicalRedirect(canonicalArticleSlug, '/articles/');
        }
        return;
      }

      // 4. Third, try fetching from WordPress if available
      fetchWordPressPosts({ perPage: 100 })
        .then((res) => {
          if (!isMounted) return;
          const wpMatch = (res.posts || []).find(p => 
            slugify(p.slug) === normalizedQuerySlug ||
            slugify(p.title) === normalizedQuerySlug
          );
          if (wpMatch) {
            setPost(wpMatch);
            ensureCanonicalRedirect(wpMatch.slug, '/blog/');
          } else {
            setPost(null);
          }
          setLoading(false);
        })
        .catch(() => {
          if (isMounted) {
            setPost(null);
            setLoading(false);
          }
        });
    } catch (err) {
      console.error('Safe catch: Error locating blog post:', err);
      if (isMounted) {
        setPost(null);
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [slug, onNavigate]);

  // Find related posts (excluding current one)
  const allMdPosts = getMarkdownBlogPosts();
  const relatedPosts = (Array.isArray(allMdPosts) ? allMdPosts : [])
    .filter(p => p && p.slug !== slug)
    .slice(0, 3);

  // Find any mentioned destinations matching post tags
  const matchedDestinations = destinations.filter(d => {
    if (!post || !Array.isArray(post.tags)) return false;
    const normSlug = (d.slug || '').toLowerCase();
    return post.tags.some(t => {
      if (typeof t !== 'string') return false;
      const normTag = t.toLowerCase();
      return normTag === normSlug || normTag.includes(normSlug) || normSlug.includes(normTag);
    });
  }).slice(0, 2);

  // Render Fallback if loading or post not found
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-8 h-8 mx-auto border-3 border-[#2D5A38] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#5D665B] font-editorial italic">Retrieving dispatch from archive...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <SEO 
          title="Dispatch Not Found — Transylvania Travel Journal"
          description="The requested blog post or field dispatch could not be found."
        />
        <div className="w-14 h-14 mx-auto rounded-full bg-[#F3EFE8] flex items-center justify-center text-[#7A583A]">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="font-brand text-3xl font-bold text-[#1B3322]">
            Dispatch Not Found
          </h1>
          <p className="text-sm text-[#5D665B] leading-relaxed max-w-md mx-auto">
            The journal entry you are looking for may have been moved, renamed, or is currently in draft.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              onNavigate('/blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-[#1B3322] text-[#F3EFE8] text-xs font-semibold rounded-xl hover:bg-[#2D5A38] transition-colors cursor-pointer"
          >
            Return to Travel Journal
          </button>
          <button
            onClick={() => {
              onNavigate('/explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-[#EAE5DD] text-[#1B3322] text-xs font-semibold rounded-xl hover:bg-[#DDD6CB] transition-colors cursor-pointer"
          >
            Explore Destinations
          </button>
        </div>
      </div>
    );
  }

  // Defensive sanitization of all post fields
  const safeTitle = typeof post.title === 'string' && post.title.trim() ? post.title.trim() : 'Field Journal Dispatch';
  const safeExcerpt = typeof post.excerpt === 'string' ? post.excerpt : '';
  const safeAuthor = typeof post.authorName === 'string' && post.authorName.trim() ? post.authorName.trim() : 'The Traveller';
  const authorInitial = safeAuthor.length > 0 ? safeAuthor[0] : 'T';
  const safeDate = typeof post.formattedDate === 'string' && post.formattedDate.trim() ? post.formattedDate : 'Field Dispatch';
  const safeCategory = typeof post.categoryName === 'string' && post.categoryName.trim() ? post.categoryName.trim() : 'Field Journal';
  const safeReadTime = typeof post.readTime === 'string' && post.readTime.trim() ? post.readTime : '3 min read';
  const safeHeroImage = typeof post.heroImage === 'string' ? post.heroImage.trim() : '';
  const safeHeroImageAlt = typeof post.heroImageAlt === 'string' && post.heroImageAlt.trim() ? post.heroImageAlt.trim() : safeTitle;
  const safeTags = Array.isArray(post.tags) ? post.tags.filter((t): t is string => typeof t === 'string' && Boolean(t.trim())) : [];
  const safeContentHtml = typeof post.contentHtml === 'string' ? post.contentHtml : '';

  let postSchema: Record<string, any> = {};
  try {
    postSchema = generateArticleSchema({
      title: safeTitle,
      excerpt: safeExcerpt,
      heroImage: safeHeroImage,
      publishedDate: post.date,
      slug: post.slug,
      author: { name: safeAuthor }
    }, undefined, true);
  } catch (schemaErr) {
    console.warn('Safe catch: Error generating schema in detail page:', schemaErr);
  }

  return (
    <article className="space-y-12 sm:space-y-16 pb-16">
      <SEO
        title={`${safeTitle} — Transylvania Travel Journal`}
        description={safeExcerpt || safeTitle}
        canonicalPath={`/blog/${post.slug}`}
        image={safeHeroImage}
        imageAlt={safeHeroImageAlt}
        type="article"
        schema={postSchema}
      />

      {/* 1. HERO BANNER & HEADER */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#162018]">
        <div className="relative w-full h-[52vh] sm:h-[62vh] min-h-[400px]">
          {!heroImageError && safeHeroImage && (
            <img
              src={safeHeroImage}
              alt={safeHeroImageAlt}
              loading="eager"
              decoding="async"
              onLoad={() => setHeroImageLoaded(true)}
              onError={() => setHeroImageError(true)}
              className={`w-full h-full object-cover brightness-65 transition-opacity duration-300 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {(heroImageError || !safeHeroImage) && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C281F] via-[#213125] to-[#162018] flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A3CCA8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C241E] via-black/35 to-black/45 pointer-events-none" />

          {/* Photo Credit Overlay */}
          {heroImageLoaded && !heroImageError && post.heroImageCredit && (
            <PhotoCreditBadge credit={post.heroImageCredit} position="top-right" />
          )}

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full text-white space-y-4">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs text-[#D8D2C7]">
                <button onClick={() => onNavigate('/')} className="hover:underline hover:text-white cursor-pointer">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
                <button onClick={() => onNavigate('/blog')} className="hover:underline hover:text-white cursor-pointer">
                  Journal & Dispatches
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/80 truncate max-w-[200px] sm:max-w-xs">{safeTitle}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#2D5A38] text-white rounded text-[10px] uppercase tracking-wider font-bold">
                  {safeCategory}
                </span>
                {post.source === 'markdown' && (
                  <span className="px-2 py-0.5 bg-white/20 backdrop-blur-xs text-[#F2EDE4] rounded text-[10px] uppercase tracking-wider font-semibold border border-white/20">
                    Decap CMS & Git
                  </span>
                )}
                <span className="text-xs text-[#D8D2C7] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {safeReadTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-brand text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {safeTitle}
              </h1>

              {/* Author & Date metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#D8D2C7] pt-1">
                <div className="flex items-center gap-2 font-medium text-white">
                  <div className="w-6 h-6 rounded-full bg-[#2D5A38] text-[#F3EFE8] flex items-center justify-center font-brand font-bold text-xs">
                    {authorInitial}
                  </div>
                  <span>{safeAuthor}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A3CCA8]" />
                  <span>{safeDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN POST CONTENT AREA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3DDD2] pb-4">
          <button
            onClick={() => {
              onNavigate('/blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D5A38] hover:text-[#1B3322] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Journal Dispatches
          </button>

          <ShareButtons
            url={typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://transylvaniaatlas.com/blog/${post.slug}`}
            title={post.title}
          />
        </div>

        {/* Lead Excerpt */}
        {post.excerpt && (
          <div className="bg-[#FAF8F5] border-l-4 border-[#2D5A38] p-5 sm:p-6 rounded-r-xl shadow-2xs">
            <p className="font-editorial italic text-base sm:text-lg text-[#1B3322] leading-relaxed">
              &ldquo;{post.excerpt}&rdquo;
            </p>
          </div>
        )}

        {/* Main Body HTML / Markdown */}
        <div 
          className="prose prose-stone max-w-none text-[#2C332D] text-base sm:text-lg leading-relaxed font-sans space-y-5
            [&>p]:leading-relaxed [&>p]:text-[#384238]
            [&>h2]:font-brand [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#1B3322] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:border-[#E8E2D8] [&>h2]:pb-2
            [&>h3]:font-brand [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#1B3322] [&>h3]:mt-8 [&>h3]:mb-3
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2
            [&>li]:text-[#384238]
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#2D5A38] [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:italic [&>blockquote]:text-[#495449] [&>blockquote]:bg-[#FAF8F5] [&>blockquote]:rounded-r-md
            [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-6 [&>img]:w-full [&>img]:max-h-[500px] [&>img]:object-cover
            [&>a]:text-[#2D5A38] [&>a]:underline [&>a]:font-medium hover:[&>a]:text-[#1B3322]
            [&>pre]:bg-[#1C241E] [&>pre]:text-[#E8F0EA] [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: safeContentHtml }}
        />

        {/* Tags */}
        {safeTags.length > 0 && (
          <div className="pt-6 border-t border-[#E3DDD2] space-y-2">
            <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[#869187] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#2D5A38]" />
              Tags & Field Classifications:
            </span>
            <div className="flex flex-wrap gap-2">
              {safeTags.map((t, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    onNavigate(`/blog`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1 bg-[#F2EDE4] hover:bg-[#E2DDD3] text-[#3E493E] text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connected Destination Guides Section */}
        {matchedDestinations.length > 0 && (
          <section className="bg-[#F8F6F2] border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Featured Regional Destination Hub
              </span>
              <h3 className="font-brand text-xl sm:text-2xl font-bold text-[#1B3322]">
                Explore Locations Featured in this Dispatch
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {matchedDestinations.map(dest => (
                <div
                  key={dest.id}
                  onClick={() => {
                    onNavigate(`/destinations/${dest.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E5DFD4] rounded-xl p-4 hover:border-[#2D5A38] hover:shadow-md transition-all group cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-brand text-base font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colors">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-[#5D665B] line-clamp-1">{dest.tagline}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#869187] group-hover:text-[#2D5A38] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Editorial Sign-off Box */}
        <div className="bg-[#FAF8F5] border border-[#EAE5DD] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-14 h-14 rounded-full bg-[#1B3322] text-[#F3EFE8] flex items-center justify-center font-brand font-bold text-xl shrink-0">
            {authorInitial}
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="font-brand text-base font-bold text-[#1B3322]">
              Written by {safeAuthor}
            </h4>
            <p className="text-xs text-[#5D665B] leading-relaxed">
              Field observations, verified notes, and historical essays published directly via our Decap CMS static publishing pipeline.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('/blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-[#1B3322] text-[#F3EFE8] text-xs font-semibold rounded-xl hover:bg-[#2D5A38] transition-colors cursor-pointer shrink-0"
          >
            All Journal Posts
          </button>
        </div>

        {/* Related Dispatches */}
        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-[#E3DDD2] space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                More from the Field
              </span>
              <h3 className="font-brand text-2xl font-bold text-[#1B3322]">
                Related Journal Dispatches
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relPost => (
                <ErrorBoundary key={relPost.id} variant="card">
                  <BlogPostCard
                    post={relPost}
                    onClick={() => {
                      onNavigate(`/blog/${relPost.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </ErrorBoundary>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
