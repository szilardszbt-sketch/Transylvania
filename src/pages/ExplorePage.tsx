import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Filter, 
  Building2, 
  Plane, 
  ArrowRight, 
  Layers, 
  Search,
  Check
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { regions } from '../data/regions';
import { categories } from '../data/categories';
import { gatewayCities } from '../data/gatewayCities';
import { FromTheBlog } from '../components/blog/FromTheBlog';
import { LocationImage } from '../components/common/LocationImage';
import { SEO } from '../components/common/SEO';

interface ExplorePageProps {
  initialCategory?: string | null;
  initialGateway?: string | null;
  initialRegion?: string | null;
  onNavigate: (path: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  initialCategory,
  initialGateway,
  initialRegion,
  onNavigate
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'all' | 'interests' | 'regions' | 'gateways'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedGateway, setSelectedGateway] = useState<string>(initialGateway || 'all');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion || 'all');

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);
  const activeRegionObj = regions.find(r => r.id === selectedRegion);
  const activeGatewayObj = gatewayCities.find(g => g.slug === selectedGateway);

  let pageTitle = 'Explore All Destinations in Transylvania & Romania';
  let pageDescription = 'Explore medieval Saxon citadels, UNESCO fortified churches, Carpathian alpine ridges, and gateway transport hubs across Transylvania and Romania.';

  if (selectedCategory !== 'all' && activeCategoryObj) {
    pageTitle = `Explore ${activeCategoryObj.name} in Transylvania`;
    pageDescription = `Discover ${activeCategoryObj.name.toLowerCase()} across Transylvania: ${activeCategoryObj.description}`;
  } else if (selectedRegion !== 'all' && activeRegionObj) {
    pageTitle = `Explore ${activeRegionObj.name} Region`;
    pageDescription = `Independent travel guide to ${activeRegionObj.name}, Romania: historical highlights, landscapes, and heritage.`;
  } else if (selectedGateway !== 'all' && activeGatewayObj) {
    pageTitle = `Destinations near ${activeGatewayObj.name} Gateway`;
    pageDescription = `Direct transport links and destinations accessible from ${activeGatewayObj.name} airport and rail station into Transylvania.`;
  }

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setSelectedRoute('interests');
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialGateway) {
      setSelectedGateway(initialGateway);
      setSelectedRoute('gateways');
    }
  }, [initialGateway]);

  useEffect(() => {
    if (initialRegion) {
      setSelectedRegion(initialRegion);
      setSelectedRoute('regions');
    }
  }, [initialRegion]);

  const filteredDestinations = destinations.filter(d => {
    const matchesCategory = selectedCategory === 'all' || d.categoryIds.includes(selectedCategory);
    const matchesGateway = selectedGateway === 'all' || d.gatewayCityId === selectedGateway;
    const matchesRegion = selectedRegion === 'all' || d.regionId === selectedRegion;
    return matchesCategory && matchesGateway && matchesRegion;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGateway('all');
    setSelectedRegion('all');
    setSelectedRoute('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/explore"
      />
      {/* Header */}
      <div className="border-b border-[#E3DDD2] pb-8 space-y-3">
        <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
          Discovery Hub
        </span>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] break-words">
          Explore Transylvania & Romania
        </h1>
        <p className="text-sm sm:text-base text-[#5D665B] max-w-3xl font-editorial leading-relaxed">
          Navigate locations by geographical regions, architectural interests, or convenient gateway transport hubs.
        </p>

        {/* Discovery Routes Tab Bar */}
        <div className="pt-6 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Destinations' },
            { id: 'interests', label: '1. By Interest & Architecture' },
            { id: 'regions', label: '2. By Romanian Region' },
            { id: 'gateways', label: '3. By Gateway City' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedRoute(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colours cursor-pointer ${
                selectedRoute === tab.id
                  ? 'bg-[#1B3322] text-white shadow-xs'
                  : 'bg-[#EFECE6] text-[#495248] hover:bg-[#E2DDD3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DISCOVERY ROUTE: BY INTEREST */}
      {(selectedRoute === 'all' || selectedRoute === 'interests') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-brand text-xl font-bold text-[#1B3322]">
              Explore by Interest
            </h2>
            {selectedCategory !== 'all' && (
              <button 
                onClick={() => setSelectedCategory('all')} 
                className="text-xs text-[#2D5A38] hover:underline cursor-pointer"
              >
                Clear Interest Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat.slug)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B3322] text-white border-[#1B3322]'
                      : 'bg-white text-[#2C332D] border-[#E5E0D8] hover:border-[#2D5A38]/50'
                  }`}
                >
                  <div className="text-xs font-bold font-brand">{cat.name}</div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-[#D2CBC1]' : 'text-[#717A70]'}`}>
                    {cat.description}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. DISCOVERY ROUTE: BY REGIONS */}
      {(selectedRoute === 'all' || selectedRoute === 'regions') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-brand text-xl font-bold text-[#1B3322]">
              Explore by Romanian Region
            </h2>
            {selectedRegion !== 'all' && (
              <button 
                onClick={() => setSelectedRegion('all')} 
                className="text-xs text-[#2D5A38] hover:underline cursor-pointer"
              >
                Clear Region Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {regions.map(reg => {
              const isSelected = selectedRegion === reg.slug;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(isSelected ? 'all' : reg.slug)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1B3322] text-white border-[#1B3322]'
                      : 'bg-white text-[#2C332D] border-[#E5E0D8] hover:border-[#2D5A38]/50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold font-brand">{reg.name}</div>
                    <div className={`text-[9px] uppercase tracking-wider font-semibold mt-1 ${
                      reg.status === 'active' ? (isSelected ? 'text-[#A3CCA8]' : 'text-[#2D5A38]') : 'text-[#8C928B]'
                    }`}>
                      {reg.status === 'active' ? 'Active Guides' : 'Coming Soon'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. DISCOVERY ROUTE: BY GATEWAY CITIES */}
      {(selectedRoute === 'all' || selectedRoute === 'gateways') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-brand text-xl font-bold text-[#1B3322]">
              Filter by Arrival Gateway Hub
            </h2>
            {selectedGateway !== 'all' && (
              <button 
                onClick={() => setSelectedGateway('all')} 
                className="text-xs text-[#2D5A38] hover:underline cursor-pointer"
              >
                Clear Gateway Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {gatewayCities.map(gate => {
              const isSelected = selectedGateway === gate.slug;
              return (
                <button
                  key={gate.id}
                  onClick={() => setSelectedGateway(isSelected ? 'all' : gate.slug)}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1B3322] text-white border-[#1B3322]'
                      : 'bg-white text-[#2C332D] border-[#E5E0D8] hover:border-[#2D5A38]/50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold font-brand">{gate.name}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-[#D2CBC1]' : 'text-[#717A70]'}`}>
                      {gate.airportCode ? `Airport: ${gate.airportCode}` : 'Rail Gateway'}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#A3CCA8]" />}
                </button>
              );
            })}
          </div>

          {/* Gateway City Blog Posts (Hidden if none match) */}
          {selectedGateway !== 'all' && (
            <FromTheBlog
              tagSlug={selectedGateway}
              title={`From the Blog: ${gatewayCities.find(g => g.slug === selectedGateway)?.name || 'Gateway City'}`}
              subtitle="Field notes, transfer guides, and local stories connected to this gateway hub."
              onNavigate={onNavigate}
            />
          )}
        </section>
      )}

      {/* DESTINATION LISTINGS */}
      <section className="space-y-6 pt-4 border-t border-[#E3DDD2]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-brand text-2xl font-bold text-[#1B3322]">
              Matching Destinations
            </span>
            <span className="text-xs px-2.5 py-0.5 bg-[#EFECE6] text-[#495248] rounded-full font-semibold">
              {filteredDestinations.length} Places
            </span>
          </div>

          {(selectedCategory !== 'all' || selectedGateway !== 'all' || selectedRegion !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#8C4B30] hover:underline cursor-pointer"
            >
              Reset all active filters
            </button>
          )}
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-12 text-center text-[#717A70] space-y-3">
            <Compass className="w-8 h-8 text-[#8C928B] mx-auto" />
            <p className="font-serif text-base text-[#1B3322]">No destinations found with this combination of filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#1B3322] text-white text-xs font-semibold rounded-md uppercase tracking-wider cursor-pointer"
            >
              View All Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <div
                key={dest.id}
                id={`explore-card-${dest.slug}`}
                onClick={() => {
                  onNavigate(`/destinations/${dest.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A38]/50 hover:-translate-y-0.5 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <LocationImage
                    src={dest.heroImage}
                    alt={dest.heroImageAlt || dest.name}
                    locationName={dest.name}
                    credit={dest.heroImageCredit}
                    creditPosition="top-right"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    aspectRatioClassName="aspect-[16/10]"
                    placeholderSubtitle={dest.regionName}
                  >
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 bg-[#1C241E]/90 text-white rounded text-[10px] uppercase tracking-wider font-semibold">
                        {dest.regionName}
                      </span>
                      {dest.goodToKnow.unescoStatus && (
                        <span className="px-2 py-0.5 bg-[#8C4B30] text-white rounded text-[9px] uppercase tracking-wider font-semibold">
                          UNESCO
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white z-10 pointer-events-none">
                      <h3 className="font-brand text-xl min-[380px]:text-2xl font-bold tracking-wide break-words">
                        {dest.name}
                      </h3>
                      {dest.romanianName && dest.romanianName !== dest.name && (
                        <div className="text-xs font-editorial italic text-[#DCD5C9]">
                          ({dest.romanianName})
                        </div>
                      )}
                    </div>
                  </LocationImage>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#525B51] leading-relaxed line-clamp-3">
                      {dest.shortDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2EEE8] text-[11px] text-[#717A70]">
                      <div>
                        <span className="block font-semibold uppercase text-[9px] text-[#869187]">Time</span>
                        <span className="text-[#1B3322] font-medium">{dest.goodToKnow.recommendedTime.split('(')[0]}</span>
                      </div>
                      <div>
                        <span className="block font-semibold uppercase text-[9px] text-[#869187]">Car</span>
                        <span className="text-[#1B3322] font-medium">{dest.goodToKnow.carNeeded}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-[#F9F8F5] border-t border-[#EAE5DC] flex items-center justify-between text-xs font-medium text-[#717A70]">
                  <span>Curated Regional Guide</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Blog Posts (Matched by active category or region, hidden if none match) */}
      <FromTheBlog
        tagSlug={selectedRegion !== 'all' ? selectedRegion : (selectedCategory !== 'all' ? selectedCategory : 'romania')}
        title={selectedRegion !== 'all' ? `From the Blog: ${regions.find(r => r.slug === selectedRegion)?.name || 'Regional Stories'}` : 'From the Blog: Romanian Travel Journals'}
        subtitle="Independent perspectives, photography essays, and road trip field reports."
        onNavigate={onNavigate}
      />
    </div>
  );
};
