import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, ChevronRight, Filter } from 'lucide-react';
import { articles } from '../data/articles';
import { FromTheBlog } from '../components/blog/FromTheBlog';
import { PhotoCreditBadge } from '../components/common/PhotoCreditBadge';
import { LocationImage } from '../components/common/LocationImage';
import { SEO } from '../components/common/SEO';

interface HistoryCulturePageProps {
  onNavigate: (path: string) => void;
}

export const HistoryCulturePage: React.FC<HistoryCulturePageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const historyArticles = articles.filter(a => a.type === 'history' || a.type === 'culture');

  const filtered = selectedCategory === 'all' 
    ? historyArticles 
    : historyArticles.filter(a => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const categoriesList = [
    { id: 'all', label: 'All Topics' },
    { id: 'history', label: 'Medieval & Modern History' },
    { id: 'architecture', label: 'Architecture & Fortified Churches' },
    { id: 'food', label: 'Gastronomy & Traditions' },
    { id: 'myths', label: 'Legends & Folklore' }
  ];

  const activeCategoryLabel = categoriesList.find(c => c.id === selectedCategory)?.label;
  const pageTitle = selectedCategory === 'all'
    ? 'History & Culture of Transylvania | Fortified Churches, Saxons & Heritage'
    : `${activeCategoryLabel} — History & Culture of Transylvania`;
  const pageDescription = 'In-depth historical and cultural essays on Transylvania: 800 years of German Saxon settlements, UNESCO fortified church defensive rings, Vlad the Impaler historical reality, and traditional Romanian gastronomy.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/history-culture"
      />
      {/* Header */}
      <div className="border-b border-[#E3DDD2] pb-8 space-y-3">
        <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
          Historical Context & Heritage
        </span>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] break-words">
          History & Culture of Transylvania
        </h1>
        <p className="text-sm sm:text-base text-[#5D665B] max-w-3xl font-editorial leading-relaxed">
          Essays and references exploring 800 years of Saxon autonomous communities, the strategic role of fortified church defence networks, genuine Romanian folklore, and culinary traditions.
        </p>

        {/* Category Filter */}
        <div className="pt-6 flex flex-wrap gap-2">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colours cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1B3322] text-white shadow-xs'
                  : 'bg-[#EFECE6] text-[#495248] hover:bg-[#E2DDD3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Essay Banner */}
      {filtered.length > 0 && (
        <section 
          onClick={() => {
            onNavigate(`/articles/${filtered[0].slug}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 hover:-translate-y-0.5 transition-all group cursor-pointer grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <LocationImage
              src={filtered[0].heroImage}
              alt={filtered[0].heroImageAlt || filtered[0].title}
              locationName={filtered[0].title}
              credit={filtered[0].heroImageCredit}
              creditPosition="top-right"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              aspectRatioClassName="aspect-[16/10] lg:aspect-auto lg:h-full"
              placeholderSubtitle={filtered[0].category}
            >
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs z-10 pointer-events-none">
                {filtered[0].category}
              </span>
            </LocationImage>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs text-[#869187] flex items-center gap-2">
                <span>{filtered[0].publishedDate}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {filtered[0].readTime}
                </span>
              </div>

              <h2 className="font-brand text-xl min-[380px]:text-2xl sm:text-3xl font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-snug break-words">
                {filtered[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-[#495248] leading-relaxed font-sans">
                {filtered[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EBE3] flex items-center justify-between">
              <span className="text-xs text-[#717A70] font-editorial italic">
                By {filtered[0].author.name}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.slice(1).map(article => (
          <div
            key={article.id}
            onClick={() => {
              onNavigate(`/articles/${article.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 hover:-translate-y-0.5 transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <LocationImage
                src={article.heroImage}
                alt={article.heroImageAlt || article.title}
                locationName={article.title}
                credit={article.heroImageCredit}
                creditPosition="top-right"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                aspectRatioClassName="aspect-[16/10]"
                placeholderSubtitle={article.category}
              >
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold z-10 pointer-events-none">
                  {article.category}
                </span>
              </LocationImage>

              <div className="p-6 space-y-3">
                <div className="text-[11px] text-[#869187] flex items-center gap-2">
                  <span>{article.publishedDate}</span>
                  <span>&bull;</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-brand text-xl font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#F2EEE8] mt-4 flex items-center justify-between">
              <span className="text-xs text-[#717A70] font-editorial italic">
                {article.author.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* WordPress Blog Posts connected to History & Culture */}
      <FromTheBlog
        filterHistoryCulture={true}
        categoryFilter={selectedCategory}
        onNavigate={onNavigate}
        title={
          selectedCategory !== 'all' 
            ? `From the Blog: ${categoriesList.find(c => c.id === selectedCategory)?.label || 'History & Culture'}` 
            : 'Dispatches from the Blog: History & Cultural Heritage'
        }
        subtitle="Independent field notes, folklore investigations, and architectural dispatches cross-linked by history and culture tags."
      />
    </div>
  );
};
