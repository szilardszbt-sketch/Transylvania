import React from 'react';
import { 
  Clock, 
  ArrowLeft, 
  ChevronRight, 
  Share2, 
  MapPin, 
  Tag, 
  ArrowRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { articles } from '../data/articles';
import { destinations } from '../data/destinations';
import { ShareButtons } from '../components/common/ShareButtons';
import { PhotoCreditBadge } from '../components/common/PhotoCreditBadge';
import { formatPhotoCredit } from '../types';
import { SEO } from '../components/common/SEO';
import { generateArticleSchema } from '../utils/seo';

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const [heroImageLoaded, setHeroImageLoaded] = React.useState<boolean>(false);
  const [heroImageError, setHeroImageError] = React.useState<boolean>(false);
  const article = articles.find(a => a.slug === slug) || articles[0];

  const articleSchema = generateArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    heroImage: article.heroImage,
    publishedDate: article.publishedDate,
    slug: article.slug,
    author: article.author
  });

  React.useEffect(() => {
    setHeroImageLoaded(false);
    setHeroImageError(false);
  }, [article.heroImage]);

  const relatedDestinations = destinations.filter(d => 
    article.relatedDestinationIds?.includes(d.slug) || article.relatedDestinationIds?.includes(d.id)
  );

  const otherArticles = articles.filter(a => a.id !== article.id).slice(0, 2);

  // Render basic markdown / structured text
  const paragraphs = article.content.trim().split('\n\n');

  return (
    <div className="space-y-12 sm:space-y-16">
      <SEO
        title={`${article.title} — Transylvania & Romania`}
        description={article.excerpt}
        canonicalPath={`/articles/${article.slug}`}
        image={article.heroImage}
        imageAlt={article.heroImageAlt || article.title}
        type="article"
        schema={articleSchema}
      />

      {/* Hero Header */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#162018]">
        <div className="relative w-full h-[50vh] sm:h-[60vh] min-h-[380px]">
          {!heroImageError && article.heroImage && (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              onLoad={() => setHeroImageLoaded(true)}
              onError={() => setHeroImageError(true)}
              className={`w-full h-full object-cover brightness-65 transition-opacity duration-300 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {heroImageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C281F] via-[#213125] to-[#162018] flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A3CCA8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C241E] via-black/30 to-black/40 pointer-events-none" />

          {/* Photo Credit Overlay: only rendered if hero loaded */}
          {heroImageLoaded && !heroImageError && (
            <PhotoCreditBadge credit={article.heroImageCredit} position="top-right" />
          )}

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 w-full text-white space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-[#D8D2C7]">
                <button onClick={() => onNavigate('/')} className="hover:underline hover:text-white cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <button onClick={() => onNavigate(article.type === 'blog' || article.type === 'itinerary' ? '/blog' : '/history-culture')} className="hover:underline hover:text-white cursor-pointer">
                  {article.type === 'blog' || article.type === 'itinerary' ? 'Blog' : 'History & Culture'}
                </button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-semibold line-clamp-1">{article.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[#F4EFE6]">
                  {article.category}
                </span>
                <span className="text-xs text-[#D2CBC1] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF8F5] leading-tight break-words">
                {article.title}
              </h1>

              <div className="text-xs text-[#DCD5C9] font-editorial italic pt-1">
                Published on {article.publishedDate} &bull; By {article.author.name} ({article.author.role})
              </div>
            </div>
          </div>
        </div>

        {/* Photo credit note (Only shown if hero loaded) */}
        {heroImageLoaded && !heroImageError && article.heroImageCredit && (
          <div className="bg-[#1C241E] px-4 py-2.5 text-right text-[10px] sm:text-[11px] text-[#869187] max-w-4xl mx-auto flex flex-wrap items-center justify-end gap-x-3 gap-y-1 border-t border-white/10">
            <span className="text-[#869187] font-medium">
              {typeof article.heroImageCredit === 'object' && article.heroImageCredit?.items ? 'Photography References:' : 'Photography Reference:'}
            </span>
            {typeof article.heroImageCredit === 'object' && article.heroImageCredit?.items && article.heroImageCredit.items.length > 0 ? (
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                {article.heroImageCredit.items.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1">
                    <span className="text-white/90 font-medium">{item.label}:</span>
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A3CCA8] hover:text-white hover:underline transition-colors"
                      >
                        {item.author} ({item.license})
                      </a>
                    ) : (
                      <span className="text-[#A3CCA8]">{item.author} ({item.license})</span>
                    )}
                    {idx < (article.heroImageCredit as { items: unknown[] }).items.length - 1 && (
                      <span className="text-white/30 ml-2">&bull;</span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[#A3CCA8] font-medium">{formatPhotoCredit(article.heroImageCredit)}</span>
            )}
          </div>
        )}
      </section>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Control bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DDD2] pb-4">
          <button
            onClick={() => onNavigate(article.type === 'blog' || article.type === 'itinerary' ? '/blog' : '/history-culture')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322] hover:text-[#2D5A38] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <ShareButtons title={article.title} />
        </div>

        {/* Lead Excerpt */}
        <div className="text-lg sm:text-xl font-editorial italic text-[#2C332D] leading-relaxed border-l-4 border-[#2D5A38] pl-5 py-1">
          {article.excerpt}
        </div>

        {/* Article Body Content */}
        <div className="space-y-6 text-[#2E342F] text-base leading-relaxed font-sans">
          {paragraphs.map((para, pIdx) => {
            const trimmed = para.trim();
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="font-brand text-2xl font-bold text-[#1B3322] pt-6 pb-2 border-b border-[#EAE5DC]">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ')) {
              const lines = trimmed.split('\n');
              return (
                <ol key={pIdx} className="space-y-3 pl-5 list-decimal text-sm sm:text-base text-[#384039]">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">
                      {line.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
                </ol>
              );
            }
            if (trimmed.startsWith('- ')) {
              const lines = trimmed.split('\n');
              return (
                <ul key={pIdx} className="space-y-2 pl-5 list-disc text-sm sm:text-base text-[#384039]">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="leading-relaxed">
                      {line.replace(/^-\s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="text-sm sm:text-base text-[#333934] leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-[#E3DDD2] flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-semibold text-[#869187] mr-2">Referenced Topics:</span>
          {article.tags.map((tag, tIdx) => (
            <span key={tIdx} className="text-xs bg-[#EFECE6] text-[#2C332D] px-3 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Box */}
        <div className="bg-[#F8F6F1] border border-[#E3DDD2] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1B3322] text-[#F9F8F5] flex items-center justify-center font-bold font-brand text-lg shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-brand font-bold text-sm text-[#1B3322]">{article.author.name}</span>
              <span className="text-[11px] text-[#717A70]">&bull; {article.author.role}</span>
            </div>
            <p className="text-xs text-[#525B51] leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <section className="space-y-4 pt-6">
            <h3 className="font-brand text-xl font-bold text-[#1B3322]">
              Related Destination Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedDestinations.map(d => (
                <div
                  key={d.id}
                  onClick={() => {
                    onNavigate(`/destinations/${d.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E5E0D8] rounded-lg p-4 flex items-center justify-between hover:border-[#2D5A38]/50 hover:bg-[#FAF8F4] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={d.heroImage} alt={d.heroImageAlt || d.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <div className="font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">{d.name}</div>
                      <div className="text-[11px] text-[#717A70] line-clamp-1">{d.tagline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Read Next Section */}
        <section className="space-y-4 pt-6 border-t border-[#E3DDD2]">
          <h3 className="font-brand text-xl font-bold text-[#1B3322]">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map(a => (
              <div
                key={a.id}
                onClick={() => {
                  onNavigate(`/articles/${a.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-[#E5E0D8] rounded-xl p-5 hover:border-[#2D5A38]/50 hover:bg-[#FAF8F4] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#2D5A38]">{a.category}</span>
                  <h4 className="font-brand text-base font-bold text-[#1B3322] group-hover:text-[#2D5A38] mt-1 leading-snug">
                    {a.title}
                  </h4>
                  <p className="text-xs text-[#525B51] line-clamp-2 mt-2">{a.excerpt}</p>
                </div>
                <div className="text-xs text-[#717A70] pt-3 flex items-center justify-between border-t border-[#F2EEE8] mt-3">
                  <span className="font-editorial italic">By {a.author.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
