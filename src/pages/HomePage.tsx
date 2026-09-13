import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  Plane, 
  Building2, 
  Calendar, 
  Car, 
  Utensils, 
  BookOpen, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { gatewayCities } from '../data/gatewayCities';
import { categories } from '../data/categories';
import { articles } from '../data/articles';
import { practicalGuides } from '../data/practicalGuides';
import { localImages } from '../assets/images';
import { PhotoCreditBadge } from '../components/common/PhotoCreditBadge';
import { LocationImage } from '../components/common/LocationImage';
import { SEO } from '../components/common/SEO';
import { generateWebSiteSchema } from '../utils/seo';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredDestinations = destinations.slice(0, 4); // Sighisoara, Brasov, Sibiu, Bran
  const historyArticles = articles.filter(a => a.type === 'history' || a.type === 'culture').slice(0, 4);
  const latestGuides = practicalGuides.slice(0, 3);

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      <SEO
        title="TRANSYLVANIA — The Heart of Romania"
        description="Discover the historic citadels, fortified Saxon churches, Carpathian alpine ridges, and living traditions of Transylvania and Romania. Independent travel and cultural reference."
        canonicalPath="/"
        image="/images/bucin_peak_winter_hero_1787137385478.jpg"
        imageAlt="Bucin Peak in winter, Harghita mountains, Transylvania"
        schema={generateWebSiteSchema()}
      />
      {/* =========================================================================
          SECTION 1: HERO
          Large cinematic photograph representing Carpathian Mountains / Transylvania
          "TRANSYLVANIA" (visually dominant) + "The Heart of Romania"
          Buttons: EXPLORE TRANSYLVANIA & EXPLORE THE MAP
          ========================================================================= */}
      <section 
        id="hero-section"
        className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center -mt-20 overflow-hidden bg-[#162018]"
      >
        {/* Background Authentic Natural Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={localImages.bucinPeakWinter}
            alt="Bucin Peak in winter, Harghita mountains, Transylvania"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-100 transition-all duration-700"
          />
          {/* Gentle, balanced natural overlay for legible typography while preserving original colors */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#162018]/90" />
        </div>

        {/* Small attribution label for the photo */}
        <div className="absolute bottom-4 right-4 z-20 hidden sm:block px-3 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-[11px] text-white/80 font-sans tracking-wider">
          Bucin Peak in winter
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 sm:py-32">
          {/* Independent Reference Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E2DDD3] text-[11px] font-sans tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3CCA8]" />
            Independent Travel & Cultural Reference
          </div>

          {/* Main Title: TRANSYLVANIA (Visually Dominant) */}
          <h1 className="font-brand text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-[0.12em] text-[#FAF8F5] leading-none drop-shadow-md">
            TRANSYLVANIA
          </h1>

          {/* Subtitle: The Heart of Romania (Much Smaller) */}
          <div className="font-sans text-xs sm:text-sm lg:text-base font-semibold tracking-[0.32em] uppercase text-[#D2CBC1] mt-3 sm:mt-4">
            The Heart of Romania
          </div>

          {/* Short Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#EAE5DC] font-editorial italic leading-relaxed mt-6 sm:mt-8">
            &ldquo;Discover the places, stories, culture and landscapes that make Romania worth exploring.&rdquo;
          </p>

          {/* Call to Actions */}
          <div className="flex items-center justify-center mt-10 sm:mt-12">
            <button
              id="hero-explore-btn"
              onClick={() => handleNav('/explore')}
              className="w-full sm:w-auto px-8 py-4 bg-[#F5F2EC] hover:bg-[#EBE5DA] text-[#1B3322] font-brand font-bold text-xs sm:text-sm tracking-[0.18em] uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              EXPLORE TRANSYLVANIA
            </button>
          </div>
        </div>

        {/* Bottom subtle edge */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F8F7F4] to-transparent z-10" />
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">

        {/* =========================================================================
            SECTION 2: START YOUR JOURNEY (Gateway Cities)
            Heading: "Where will you begin?"
            Concept of gateway cities providing access & transport
            Cluj-Napoca, Sibiu, Brașov, Bucharest
            ========================================================================= */}
        <section id="gateway-cities-section" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DDD2] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Start Your Journey
              </span>
              <h2 className="font-brand text-3xl sm:text-4xl font-bold text-[#1B3322]">
                Where will you begin?
              </h2>
              <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
                Transylvania is reached primarily through gateway cities with regional airports and direct rail lines. Choose your arrival hub based on your travel itinerary.
              </p>
            </div>
            <button
              onClick={() => handleNav('/plan-your-visit/getting-around-romania')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1B3322] hover:text-[#2D5A38] uppercase group cursor-pointer"
            >
              <span>Transit & Arrival Advice</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Gateway City Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gatewayCities.map((city) => (
              <div
                key={city.id}
                id={`gateway-card-${city.slug}`}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <LocationImage
                    src={city.heroImage}
                    alt={city.heroImageAlt || `${city.name} - Gateway city to Transylvania`}
                    locationName={city.name}
                    credit={city.heroImageCredit}
                    creditPosition="top-left"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    aspectRatioClassName="aspect-[16/11]"
                    placeholderSubtitle="Gateway City"
                  >
                    {city.hasAirport && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#1C241E]/90 text-white rounded-md text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs flex items-center gap-1.5 z-10 pointer-events-none">
                        <Plane className="w-3 h-3 text-[#A3CCA8]" />
                        <span>{city.airportCode || 'Airport'}</span>
                      </div>
                    )}
                  </LocationImage>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-brand text-xl font-bold text-[#1B3322]">
                      {city.name}
                    </h3>
                    <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3">
                      {city.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F2EEE8] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#788177] font-medium">
                    {city.distanceToCore}
                  </span>
                  <button
                    onClick={() => handleNav(`/explore?gateway=${city.slug}`)}
                    className="text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38] inline-flex items-center gap-1 transition-colours cursor-pointer"
                  >
                    <span>View Hub</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 3: EXPLORE BY INTEREST
            Category cards: Historic Cities, Medieval Villages, Castles, Mountains, etc.
            ========================================================================= */}
        <section id="categories-section" className="space-y-8">
          <div className="border-b border-[#E3DDD2] pb-6">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
              Interests & Architecture
            </span>
            <h2 className="font-brand text-3xl sm:text-4xl font-bold text-[#1B3322] mt-1">
              Explore by Interest
            </h2>
            <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed mt-1.5">
              From fortified Saxon churches and high alpine passes to living medieval citadels and regional gastronomy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-btn-${cat.slug}`}
                onClick={() => handleNav(`/explore?category=${cat.slug}`)}
                className="bg-white border border-[#E5E0D8] rounded-xl p-4 sm:p-5 text-left hover:border-[#2D5A38]/50 hover:bg-[#FAF8F4] transition-all group flex flex-col justify-between min-h-[170px] shadow-xs cursor-pointer"
              >
                <div className="relative aspect-square w-10 sm:w-12 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#1B3322] group-hover:bg-[#1B3322] group-hover:text-white transition-colours mb-3">
                  <Building2 className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-brand text-sm sm:text-base font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#6A7369] line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 4: FEATURED DESTINATIONS
            Photographic grid: Sighișoara, Brașov, Sibiu, Bran
            ========================================================================= */}
        <section id="featured-destinations-section" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DDD2] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Essential Destinations
              </span>
              <h2 className="font-brand text-3xl sm:text-4xl font-bold text-[#1B3322]">
                Featured Destination Guides
              </h2>
              <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
                Detailed independent references with structured Q&A, historical contexts, points of interest, and practical visiting advice.
              </p>
            </div>

            <button
              onClick={() => handleNav('/explore')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1B3322] hover:text-[#2D5A38] uppercase group cursor-pointer"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                id={`featured-dest-${dest.slug}`}
                onClick={() => handleNav(`/destinations/${dest.slug}`)}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <LocationImage
                    src={dest.heroImage}
                    alt={dest.heroImageAlt || dest.name}
                    locationName={dest.name}
                    credit={dest.heroImageCredit}
                    creditPosition="top-right"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    aspectRatioClassName="aspect-[16/10]"
                    placeholderSubtitle={dest.regionName}
                  >
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
                        {dest.regionName}
                      </span>
                      {dest.goodToKnow.unescoStatus && (
                        <span className="px-2 py-0.5 bg-[#8C4B30] text-white rounded text-[9px] uppercase tracking-wider font-semibold">
                          UNESCO
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-brand text-2xl sm:text-3xl font-bold tracking-wide">
                          {dest.name}
                        </h3>
                        {dest.romanianName && dest.romanianName !== dest.name && (
                          <span className="text-xs font-editorial italic text-[#E2DDD3]">
                            ({dest.romanianName})
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#DCD5C9] font-editorial italic line-clamp-1 mt-0.5">
                        &ldquo;{dest.tagline}&rdquo;
                      </p>
                    </div>
                  </LocationImage>

                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
                      {dest.shortDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F0EBE3] text-xs text-[#525B51]">
                      <div>
                        <span className="text-[#869187] block text-[10px] uppercase font-semibold">Recommended Time</span>
                        <span className="font-medium text-[#1B3322]">{dest.goodToKnow.recommendedTime.split('(')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[#869187] block text-[10px] uppercase font-semibold">Car Needed?</span>
                        <span className="font-medium text-[#1B3322]">{dest.goodToKnow.carNeeded}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#F9F8F5] border-t border-[#EAE5DC] flex items-center justify-between">
                  <span className="text-xs text-[#2D5A38] font-semibold">
                    Detailed Regional & Heritage Guide
                  </span>
                  <span className="text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38] inline-flex items-center gap-1 transition-colours">
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 6: HISTORY & CULTURE
            Articles: The Saxons, Fortified Churches, Dracula, Romanian Food
            ========================================================================= */}
        <section id="history-culture-section" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DDD2] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                In-Depth Context
              </span>
              <h2 className="font-brand text-3xl sm:text-4xl font-bold text-[#1B3322]">
                History & Cultural Heritage
              </h2>
              <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
                Essays and historical references explaining the unique coexistence of Saxon, Romanian, Hungarian, and Byzantine traditions across the region.
              </p>
            </div>

            <button
              onClick={() => handleNav('/history-culture')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1B3322] hover:text-[#2D5A38] uppercase group cursor-pointer"
            >
              <span>All History Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {historyArticles.map((article) => (
              <div
                key={article.id}
                id={`article-card-${article.slug}`}
                onClick={() => handleNav(`/articles/${article.slug}`)}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#EAE5DC]">
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-[#869187] flex items-center gap-2">
                      <span>{article.publishedDate}</span>
                      <span>&bull;</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-brand text-base font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F2EEE8] mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#788177] font-editorial italic">
                    By {article.author.name}
                  </span>
                  <span className="text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38] inline-flex items-center gap-1 transition-colours">
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 7 & 8: PLAN YOUR VISIT & PRACTICAL GUIDES
            Practical cards: Getting Around, When to Visit, Driving, Where to Stay, Food
            ========================================================================= */}
        <section id="plan-your-visit-section" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DDD2] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
                Practical Preparation
              </span>
              <h2 className="font-brand text-3xl sm:text-4xl font-bold text-[#1B3322]">
                Plan Your Visit
              </h2>
              <p className="text-xs sm:text-sm text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
                Objective advice on train networks, road vignettes, accommodation styles, dining etiquette, and language.
              </p>
            </div>

            <button
              onClick={() => handleNav('/plan-your-visit')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1B3322] hover:text-[#2D5A38] uppercase group cursor-pointer"
            >
              <span>View All Practical Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalGuides.map((guide) => (
              <div
                key={guide.id}
                id={`practical-card-${guide.slug}`}
                onClick={() => handleNav(`/plan-your-visit/${guide.slug}`)}
                className="bg-white border border-[#E5E0D8] rounded-xl p-6 hover:border-[#2D5A38]/50 hover:bg-[#FAF8F4] transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#1B3322] group-hover:bg-[#1B3322] group-hover:text-white transition-colours">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-[#869187] font-medium">{guide.readTime}</span>
                  </div>

                  <h3 className="font-brand text-lg font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-tight">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#525B51] leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE3] mt-4 flex items-center justify-between text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38]">
                  <span>Read Guide & FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
