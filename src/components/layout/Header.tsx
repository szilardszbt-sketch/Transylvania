import React, { useState } from 'react';
import { Search, Menu, X, Compass, BookOpen, Calendar, BookMarked } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  activePath?: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', activePath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeRoute = activePath || currentPath || '/';

  const navLinks = [
    { label: 'EXPLORE', path: '/explore', icon: Compass },
    { label: 'HISTORY & CULTURE', path: '/history-culture', icon: BookOpen },
    { label: 'PLAN YOUR VISIT', path: '/plan-your-visit', icon: Calendar },
    { label: 'BLOG', path: '/blog', icon: BookMarked },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header"
      className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E3DA] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
            aria-label="Transylvania - The Heart of Romania Home"
          >
            <span className="font-brand text-2xl sm:text-3xl font-bold tracking-[0.08em] text-[#1B3322] group-hover:text-[#284B32] transition-colours leading-none">
              TRANSYLVANIA
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#737C72] group-hover:text-[#525B51] transition-colours mt-1">
              The Heart of Romania
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.path || (link.path !== '/' && typeof activeRoute === 'string' && activeRoute.startsWith(link.path));
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs font-semibold tracking-[0.14em] uppercase transition-all py-1 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-[#1B3322] border-[#2D5A38]'
                      : 'text-[#565E55] border-transparent hover:text-[#1B3322] hover:border-[#A89E90]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search & Mobile Burger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-[#495248] bg-[#EFECE6] hover:bg-[#E5DFD4] hover:text-[#1B3322] rounded-md transition-colours cursor-pointer border border-[#E3DDD2]"
              aria-label="Search destinations, articles, and guides"
            >
              <Search className="w-4 h-4 text-[#5A6359]" />
              <span className="hidden md:inline font-sans text-xs tracking-wider">SEARCH</span>
              <kbd className="hidden md:inline text-[10px] text-[#7A8379] bg-white/70 px-1.5 py-0.5 rounded border border-[#D5CEC2]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2A3129] hover:bg-[#EFECE6] rounded-md transition-colours"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#FAF8F4] border-b border-[#E5E0D8] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#8A9289] font-medium px-3 pt-2">
            Navigation
          </div>
          <div className="grid gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeRoute === link.path || (link.path !== '/' && typeof activeRoute === 'string' && activeRoute.startsWith(link.path));
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider text-left transition-colours ${
                    isActive
                      ? 'bg-[#EAE5DC] text-[#1B3322]'
                      : 'text-[#495248] hover:bg-[#EFECE6] hover:text-[#1B3322]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#6A7369]" />
                    {link.label}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A38]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between px-3 text-[11px] text-[#7A8379]">
            <span>Independent Travel Guide</span>
            <span>Romania</span>
          </div>
        </div>
      )}
    </header>
  );
};
