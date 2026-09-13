import React from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Train, 
  Car, 
  Users, 
  Building, 
  Award, 
  Compass,
  Coins,
  Globe2
} from 'lucide-react';
import { GoodToKnow } from '../../types';

interface GoodToKnowCardProps {
  data: GoodToKnow;
  destinationName: string;
}

export const GoodToKnowCard: React.FC<GoodToKnowCardProps> = ({ data, destinationName }) => {
  return (
    <div 
      id="good-to-know-panel"
      className="bg-[#F6F4EF] border border-[#E3DDD2] rounded-xl p-6 sm:p-8 shadow-xs"
    >
      <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E3DDD2]">
        <Compass className="w-5 h-5 text-[#2D5A38]" />
        <h3 className="font-brand text-lg font-bold text-[#1B3322] tracking-wide m-0">
          Good to Know &bull; {destinationName}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#333934]">
        {/* Location & Region */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#2D5A38]" />
            Location & Region
          </div>
          <div className="font-medium text-[#1B3322] text-sm">{data.location}</div>
          <div className="text-[#646D63] text-xs">Region: {data.region}</div>
        </div>

        {/* Recommended Time */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#2D5A38]" />
            Recommended Time
          </div>
          <div className="font-medium text-[#1B3322] text-sm">{data.recommendedTime}</div>
        </div>

        {/* Best Time to Visit */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-[#2D5A38]" />
            Best Time to Visit
          </div>
          <div className="font-medium text-[#1B3322] text-xs leading-relaxed">{data.bestTime}</div>
        </div>

        {/* Getting There */}
        <div className="space-y-1 md:col-span-2">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Train className="w-3.5 h-3.5 text-[#2D5A38]" />
            Getting There
          </div>
          <div className="font-medium text-[#1B3322] text-xs leading-relaxed">{data.gettingThere}</div>
        </div>

        {/* Car Requirement */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Car className="w-3.5 h-3.5 text-[#2D5A38]" />
            Car Needed?
          </div>
          <div className="font-medium text-[#1B3322] text-xs leading-relaxed">{data.carNeeded}</div>
        </div>

        {/* Gateway City */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Building className="w-3.5 h-3.5 text-[#2D5A38]" />
            Nearest Gateway City
          </div>
          <div className="font-medium text-[#1B3322] text-xs leading-relaxed">{data.nearestGatewayCity}</div>
        </div>

        {/* Family Friendly */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
            <Users className="w-3.5 h-3.5 text-[#2D5A38]" />
            Family Friendly
          </div>
          <div className="font-medium text-[#1B3322] text-xs">
            {data.familyFriendly ? 'Yes — Suitable for all ages' : 'Moderate — Involves steep or rough steps'}
          </div>
        </div>

        {/* UNESCO Status if exists */}
        {data.unescoStatus && (
          <div className="space-y-1 md:col-span-2 lg:col-span-3 pt-2 border-t border-[#E3DDD2]">
            <div className="flex items-center gap-2 text-[#717A70] uppercase font-semibold tracking-wider text-[11px]">
              <Award className="w-3.5 h-3.5 text-[#8C4B30]" />
              Heritage Status
            </div>
            <div className="font-medium text-[#8C4B30] text-xs">{data.unescoStatus}</div>
          </div>
        )}

        {/* Best For Tags */}
        <div className="md:col-span-2 lg:col-span-3 pt-3 border-t border-[#E3DDD2]">
          <div className="text-[#717A70] uppercase font-semibold tracking-wider text-[11px] mb-2">
            Best For
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data.bestFor.map((item, idx) => (
              <span 
                key={idx}
                className="bg-white/80 border border-[#DCD5C9] text-[#2C332D] px-2.5 py-1 rounded-md text-[11px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
