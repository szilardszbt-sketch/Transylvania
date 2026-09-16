import React from 'react';
import { 
  Calendar, 
  Car, 
  Train, 
  Hotel, 
  Utensils, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  CreditCard,
  Mountain,
  Compass,
  Check
} from 'lucide-react';
import { practicalGuides } from '../data/practicalGuides';
import { FromTheBlog } from '../components/blog/FromTheBlog';
import { SEO } from '../components/common/SEO';

interface PlanYourVisitPageProps {
  onNavigate: (path: string) => void;
}

export const PlanYourVisitPage: React.FC<PlanYourVisitPageProps> = ({ onNavigate }) => {
  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Train':
        return <Train className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'Hotel':
        return <Hotel className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Mountain':
        return <Mountain className="w-5 h-5" />;
      case 'BookOpen':
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 py-8">
      <SEO
        title="Plan Your Visit to Transylvania & Romania | Logistics, Transport & Practical Advice"
        description="Essential travel logistics for Transylvania: trains, car rental, vignette road rules, best seasons to visit, mountain hiking safety, and currency guidance."
        canonicalPath="/plan-your-visit"
      />
      {/* Header Banner */}
      <div className="border-b border-[#E3DDD2] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A38] bg-[#E8F0EA] px-3 py-1 rounded-full border border-[#D5E5D8]">
          <Compass className="w-3.5 h-3.5" />
          <span>Travel Essentials & Advice</span>
        </div>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] break-words">
          Plan Your Visit to Romania
        </h1>
        <p className="text-base sm:text-lg text-[#525B51] max-w-3xl font-editorial leading-relaxed">
          Clear, practical, and non-commercial travel references: railway systems, car rentals and road vignettes, seasonal climate, heritage guesthouses, local dining etiquette, and outdoor safety.
        </p>
      </div>

      {/* High-Level Overview Notice Box */}
      <div className="bg-[#FAF8F4] border-2 border-[#DCD5C9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#1B3322]">
          <Info className="w-5 h-5 text-[#2D5A38]" />
          <h2 className="font-brand text-xl font-bold">Key Travel Advice at a Glance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs sm:text-sm text-[#3E4740]">
          <div className="space-y-1.5 bg-white border border-[#E5DFD4] p-4 rounded-xl shadow-2xs">
            <strong className="text-[#1B3322] block font-bold text-sm font-brand">1. Currency & Contactless Cards</strong>
            <p className="leading-relaxed text-[#4A544C]">The Romanian Leu (RON) is the national currency. Contactless card payments (Apple Pay / Google Pay / Visa / Mastercard) work in 95%+ of shops, metros, and cafes.</p>
          </div>
          <div className="space-y-1.5 bg-white border border-[#E5DFD4] p-4 rounded-xl shadow-2xs">
            <strong className="text-[#1B3322] block font-bold text-sm font-brand">2. Safety & Medical (112)</strong>
            <p className="leading-relaxed text-[#4A544C]">Romania is one of the safest travel destinations in the EU. Standard European emergency number is 112. Mountain rescue is reached via Salvamont.</p>
          </div>
          <div className="space-y-1.5 bg-white border border-[#E5DFD4] p-4 rounded-xl shadow-2xs">
            <strong className="text-[#1B3322] block font-bold text-sm font-brand">3. Electronic Vignette (Rovinieta)</strong>
            <p className="leading-relaxed text-[#4A544C]">Mandatory electronic toll for driving on all national roads and motorways. Confirm rental car inclusion or purchase visitor passes online at erovinieta.ro.</p>
          </div>
        </div>
      </div>

      {/* Practical Guide Topics Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
          <h2 className="font-brand text-2xl font-bold text-[#1B3322]">
            Detailed Travel Guides
          </h2>
          <span className="text-xs text-[#717A70] font-sans">
            {practicalGuides.length} practical references available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {practicalGuides.map(guide => (
            <div
              key={guide.id}
              id={`guide-card-${guide.slug}`}
              onClick={() => {
                onNavigate(`/plan-your-visit/${guide.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-[#E3DDD2] hover:border-[#2D5A38] rounded-2xl p-6 hover:bg-[#FAF9F6] hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#EFECE6] flex items-center justify-center text-[#1B3322] group-hover:bg-[#1B3322] group-hover:text-white transition-colours shadow-2xs">
                    {getGuideIcon(guide.iconName)}
                  </div>
                  <span className="text-xs text-[#7C877B] font-medium bg-[#F5F2EC] px-2.5 py-1 rounded-full border border-[#E7E1D7]">
                    {guide.readTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-brand text-xl font-bold text-[#1B3322] group-hover:text-[#2D5A38] transition-colours leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E574E] leading-relaxed mt-2.5 line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                {/* Key Takeaways snippet */}
                <div className="bg-[#FAF8F5] rounded-xl p-3.5 space-y-2 border border-[#E7E1D6]">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#1B3322] block">
                    Key Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#404941]">
                    {guide.keyTakeaways.slice(0, 2).map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-2 line-clamp-2">
                        <div className="w-4 h-4 rounded-full bg-[#EBF3ED] flex items-center justify-center shrink-0 mt-0.5 border border-[#CFE2D3]">
                          <Check className="w-2.5 h-2.5 text-[#2D5A38] stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EBE3] mt-5 flex items-center justify-between text-xs text-[#717A70]">
                <span className="font-medium">Practical Reference & Logistics</span>
              </div>
            </div>
          ))}
        </div>

        {/* WordPress Blog Posts for Travel Planning */}
        <FromTheBlog
          tagSlug="plan-your-visit"
          title="From the Blog: Travel Tips & Field Guides"
          subtitle="Seasonal advice, packing checklists, and logistical advice from fellow travelers."
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
