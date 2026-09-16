import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  Share2, 
  Building2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { articles } from '../data/articles';
import { GoodToKnowCard } from '../components/common/GoodToKnowCard';
import { ShareButtons } from '../components/common/ShareButtons';
import { FromTheBlog } from '../components/blog/FromTheBlog';
import { PhotoCreditBadge } from '../components/common/PhotoCreditBadge';
import { LocationImage } from '../components/common/LocationImage';
import { formatPhotoCredit } from '../types';
import { SEO } from '../components/common/SEO';
import { generateDestinationSchema } from '../utils/seo';

interface DestinationDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ 
  slug, 
  onNavigate 
}) => {
  const destination = destinations.find(d => d.slug === slug) || destinations[0];
  const metaTitle = `${destination.name} — Travel Guide, History & Visiting Info`;
  const metaDescription = `${destination.shortDescription || destination.tagline} Plan your visit with visiting advice, points of interest, photography viewpoints, and historical context.`;
  const destinationSchema = generateDestinationSchema(destination);

  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({
    'q1': true,
    'q2': true,
    'q3': true,
    'bq1': true,
    'sq1': true,
    'bran-q1': true,
    'vq1': true,
    'sin-q1': true
  });
  const [heroImageLoaded, setHeroImageLoaded] = useState<boolean>(false);
  const [heroImageError, setHeroImageError] = useState<boolean>(false);

  useEffect(() => {
    setHeroImageLoaded(false);
    setHeroImageError(false);
  }, [destination.heroImage]);

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const nearbyDestinations = destinations.filter(d => 
    destination.nearbyDestinationIds.includes(d.slug) || destination.nearbyDestinationIds.includes(d.id)
  );

  const relatedArticles = articles.filter(a =>
    destination.relatedArticleIds.includes(a.slug) || destination.relatedArticleIds.includes(a.id)
  );

  return (
    <div className="space-y-16 sm:space-y-24">
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonicalPath={`/destinations/${destination.slug}`}
        image={destination.heroImage}
        imageAlt={destination.heroImageAlt || destination.name}
        type="website"
        schema={destinationSchema}
      />

      {/* 1. HERO BANNER & HEADER */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#162018]">
        <div className="relative w-full h-[60vh] sm:h-[70vh] min-h-[440px]">
          {!heroImageError && destination.heroImage && (
            <img
              src={destination.heroImage}
              alt={destination.heroImageAlt || destination.name}
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

          {/* Top-right Photo Credit Overlay: ONLY rendered if image has loaded */}
          {heroImageLoaded && !heroImageError && (
            <PhotoCreditBadge credit={destination.heroImageCredit} position="top-right" />
          )}

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full text-white space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-[#D8D2C7]">
                <button onClick={() => onNavigate('/')} className="hover:underline hover:text-white cursor-pointer">Home</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <button onClick={() => onNavigate('/explore')} className="hover:underline hover:text-white cursor-pointer">Destinations</button>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-semibold">{destination.name}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[#F4EFE6]">
                  {destination.regionName}
                </span>
                {destination.goodToKnow.unescoStatus && (
                  <span className="px-3 py-1 bg-[#8C4B30] rounded-md text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-white">
                    UNESCO World Heritage
                  </span>
                )}
              </div>

              {/* Title & Multi-language names */}
              <div>
                <h1 className="font-brand text-[clamp(2rem,7.5vw,4.5rem)] sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF8F5] break-words leading-none sm:leading-tight">
                  {destination.name}
                </h1>
                <div className="text-xs sm:text-sm font-editorial italic text-[#DCD5C9] mt-2 flex flex-wrap gap-x-4">
                  {destination.romanianName && destination.romanianName !== destination.name && (
                    <span>Romanian: {destination.romanianName}</span>
                  )}
                  {destination.germanName && (
                    <span>German: {destination.germanName}</span>
                  )}
                  {destination.hungarianName && (
                    <span>Hungarian: {destination.hungarianName}</span>
                  )}
                </div>
              </div>

              <p className="max-w-3xl text-sm sm:text-base text-[#EFEAE1] font-editorial italic leading-relaxed">
                &ldquo;{destination.tagline}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Photo credit note (Only shown if hero image successfully loaded) */}
        {heroImageLoaded && !heroImageError && destination.heroImageCredit && (
          <div className="bg-[#1C241E] px-4 py-2 text-right text-[10px] text-[#869187] max-w-7xl mx-auto flex items-center justify-end gap-2">
            <span>Photography Reference:</span>
            <span className="text-[#A3CCA8] font-medium">{formatPhotoCredit(destination.heroImageCredit)}</span>
          </div>
        )}
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* Social Sharing Bar & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DDD2] pb-4">
          <button
            onClick={() => onNavigate('/explore')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B3322] hover:text-[#2D5A38] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </button>

          <ShareButtons title={`${destination.name} Travel Guide | Transylvania`} />
        </div>

        {/* 2 & 3. INTRODUCTION SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Overview & Context
              </span>
              <h2 className="font-brand text-3xl font-bold text-[#1B3322]">
                Introduction to {destination.name}
              </h2>
            </div>

            <p className="text-base text-[#2C332D] leading-relaxed font-editorial">
              {destination.fullIntroduction}
            </p>

            <div className="bg-[#F8F6F1] border-l-4 border-[#2D5A38] p-4 text-xs sm:text-sm text-[#495248] italic font-editorial">
              &ldquo;{destination.shortDescription}&rdquo;
            </div>
          </div>

          {/* Quick facts sidebar box */}
          <div className="lg:col-span-4 bg-white border border-[#E3DDD2] rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="font-brand text-base font-bold text-[#1B3322] border-b border-[#EAE5DC] pb-3">
              Essential Snapshot
            </h3>
            <div className="space-y-3 text-xs text-[#333934]">
              <div>
                <span className="text-[#869187] block text-[10px] uppercase font-semibold">Location</span>
                <span className="font-medium text-[#1B3322]">{destination.goodToKnow.location}</span>
              </div>
              <div>
                <span className="text-[#869187] block text-[10px] uppercase font-semibold">Nearest Hub</span>
                <span className="font-medium text-[#1B3322]">{destination.gatewayCityName}</span>
              </div>
              <div>
                <span className="text-[#869187] block text-[10px] uppercase font-semibold">Recommended Duration</span>
                <span className="font-medium text-[#1B3322]">{destination.goodToKnow.recommendedTime}</span>
              </div>
              <div>
                <span className="text-[#869187] block text-[10px] uppercase font-semibold">Local Currency</span>
                <span className="font-medium text-[#1B3322]">{destination.goodToKnow.currency}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. "GOOD TO KNOW" PANEL COMPONENT */}
        <section>
          <GoodToKnowCard data={destination.goodToKnow} destinationName={destination.name} />
        </section>

        {/* 5. MAIN QUESTION & ANSWER GUIDE */}
        <section id="qa-guide-section" className="space-y-8">
          <div className="border-b border-[#E3DDD2] pb-6">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
              Visitor Reference
            </span>
            <h2 className="font-brand text-3xl font-bold text-[#1B3322] mt-1">
              Frequently Asked Questions & Practical Answers
            </h2>
            <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed mt-1">
              Structured questions and comprehensive guidance for foreign visitors planning their stay.
            </p>
          </div>

          <div className="space-y-4">
            {destination.questions.map((q, idx) => {
              const isOpen = !!openQuestions[q.id];
              return (
                <div
                  key={q.id}
                  id={`faq-item-${q.id}`}
                  className="bg-white border border-[#E3DDD2] rounded-xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F4] transition-colours cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#EFECE6] text-[#1B3322] font-semibold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-brand text-base sm:text-lg font-bold text-[#1B3322]">
                        {q.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#869187] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#2D5A38]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 space-y-4 border-t border-[#F2EEE8] bg-[#FCFBF9]">
                      <p className="text-xs sm:text-sm text-[#333934] leading-relaxed font-sans">
                        {q.answer}
                      </p>

                      {q.tips && q.tips.length > 0 && (
                        <div className="bg-[#F4F1EA] border border-[#E5DFD4] rounded-lg p-3.5 space-y-1.5">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#1B3322] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#2D5A38]" />
                            <span>Practical Insider Tip</span>
                          </div>
                          {q.tips.map((tip, tipIdx) => (
                            <p key={tipIdx} className="text-xs text-[#525B51] font-editorial italic leading-relaxed">
                              {tip}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. DESTINATION PHOTO GALLERY */}
        {destination.gallery && destination.gallery.length > 0 && (
          <section id="gallery-section" className="space-y-6">
            <div className="border-b border-[#E3DDD2] pb-4 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                  Visual Architecture
                </span>
                <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#1B3322]">
                  {destination.name} Photo Gallery
                </h2>
              </div>
              <span className="text-xs text-[#869187] hidden sm:inline">
                {destination.gallery.length} Archival Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {destination.gallery.map((photo, pIdx) => (
                <div 
                  key={pIdx}
                  className="bg-white border border-[#E3DDD2] rounded-xl overflow-hidden shadow-xs group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE5DC]">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-[#525B51] font-editorial italic leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. NEARBY DESTINATIONS */}
        {nearbyDestinations.length > 0 && (
          <section id="nearby-destinations-section" className="space-y-6">
            <div className="border-b border-[#E3DDD2] pb-4">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Itinerary Connections
              </span>
              <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#1B3322]">
                Nearby Destinations to Combine
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyDestinations.map((nearDest) => (
                <div
                  key={nearDest.id}
                  onClick={() => {
                    onNavigate(`/destinations/${nearDest.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 hover:-translate-y-0.5 transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <LocationImage
                      src={nearDest.heroImage}
                      alt={nearDest.heroImageAlt || nearDest.name}
                      locationName={nearDest.name}
                      credit={nearDest.heroImageCredit}
                      creditPosition="top-right"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      aspectRatioClassName="aspect-[16/10]"
                      placeholderSubtitle={nearDest.regionName}
                    >
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold z-10 pointer-events-none">
                        {nearDest.regionName}
                      </span>
                    </LocationImage>

                    <div className="p-5 space-y-2">
                      <h3 className="font-brand text-lg font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours">
                        {nearDest.name}
                      </h3>
                      <p className="text-xs text-[#525B51] leading-relaxed line-clamp-2">
                        {nearDest.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#F2EEE8] mt-3 flex items-center justify-between text-xs text-[#717A70]">
                    <span>Regional Destination Guide</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. RELATED HISTORY & CULTURE ARTICLES */}
        {relatedArticles.length > 0 && (
          <section id="related-articles-section" className="space-y-6">
            <div className="border-b border-[#E3DDD2] pb-4">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Historical Context
              </span>
              <h2 className="font-brand text-2xl sm:text-3xl font-bold text-[#1B3322]">
                Related History & Culture Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onNavigate(`/articles/${article.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E5E0D8] rounded-xl p-6 hover:border-[#2D5A38]/50 hover:bg-[#FAF8F4] hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#869187]">
                      <span className="uppercase tracking-wider font-semibold text-[#2D5A38]">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-brand text-xl font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#525B51] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F0EBE3] mt-4 flex items-center justify-between text-xs text-[#717A70]">
                    <span className="font-editorial italic">Historical Analysis & Context</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 11. HEADLESS WORDPRESS BLOG POSTS (Hidden if no matching posts exist) */}
        <FromTheBlog
          tagSlug={destination.slug}
          title={`From the Blog: Stories & Guides for ${destination.name}`}
          subtitle={`Dispatches, tested routes, and practical impressions connected to ${destination.name}.`}
          onNavigate={onNavigate}
        />

      </div>
    </div>
  );
};
