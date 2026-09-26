import React from 'react';
import { Compass, Map, BookOpen, Calendar, BookMarked, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="bg-[#1C241E] text-[#D4CDC3] border-t border-[#2F3B32] mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-brand text-2xl font-bold tracking-[0.08em] text-[#F3EFEA] block leading-none">
                TRANSYLVANIA
              </span>
              <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#9EA89F] block mt-1.5">
                The Heart of Romania
              </span>
            </div>
            <p className="text-xs text-[#A8B2A9] leading-relaxed max-w-md font-sans">
              An independent, authentic travel and cultural reference guide dedicated to helping English-speaking visitors discover the fortified towns, living Saxon villages, Carpathian landscapes, and cultural heritage of Romania.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#869187]">
              <ShieldCheck className="w-4 h-4 text-[#7AA884]" />
              <span>Independent editorial content &bull; No commercial tour sales</span>
            </div>
          </div>

          {/* Navigation Col 1: Discovery */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F0EBE3]">
              Discover
            </div>
            <ul className="space-y-2 text-xs text-[#B2BCB3]">
              <li>
                <button onClick={() => handleNav('/explore')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Explore Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/destinations/sighisoara')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Sighișoara Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/destinations/brasov')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Brașov & Tâmpa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/destinations/sibiu')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Sibiu & Historic Squares
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/destinations/bran')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Bran Castle
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 2: Context & Planning */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F0EBE3]">
              Guides & Culture
            </div>
            <ul className="space-y-2 text-xs text-[#B2BCB3]">
              <li>
                <button onClick={() => handleNav('/history-culture')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  History & Culture
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plan-your-visit')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Plan Your Visit
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plan-your-visit/driving-in-romania')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Driving & Vignettes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/plan-your-visit/getting-around-romania')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Trains & Transit
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/blog')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Editorial Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 3: About & Legal */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F0EBE3]">
              Reference &amp; Legal
            </div>
            <ul className="space-y-2 text-xs text-[#B2BCB3]">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  About the Project
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Contact &amp; Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/cookie-policy')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms-and-conditions')} className="hover:text-[#F3EFEA] transition-colours cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open_cookie_preferences'))} 
                  className="hover:text-[#A3CCA8] transition-colours cursor-pointer text-[11px] text-[#8EA091]"
                >
                  Manage Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2B382F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A968B]">
          <div>
            &copy; {new Date().getFullYear()} TRANSYLVANIA &mdash; The Heart of Romania. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-[11px]">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#EAE5DC] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button onClick={() => handleNav('/cookie-policy')} className="hover:text-[#EAE5DC] transition-colors cursor-pointer">
              Cookie Policy
            </button>
            <span>&bull;</span>
            <button onClick={() => handleNav('/terms-and-conditions')} className="hover:text-[#EAE5DC] transition-colors cursor-pointer">
              Terms &amp; Conditions
            </button>
            <span>&bull;</span>
            <button 
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open_cookie_preferences'))}
              className="text-[#9DBCA2] hover:text-[#CBE2CE] transition-colors cursor-pointer"
            >
              Cookie Choices
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
