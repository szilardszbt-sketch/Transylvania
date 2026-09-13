import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X, Settings2, ExternalLink } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean; // Always true
  functional: boolean;
  advertising: boolean;
  consentTimestamp: string;
}

const STORAGE_KEY = 'transylvania_atlas_cookie_consent';

export const getStoredCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch (err) {
    console.error('Error reading cookie preferences:', err);
    return null;
  }
};

export const saveCookiePreferences = (prefs: { functional: boolean; advertising: boolean }) => {
  if (typeof window === 'undefined') return;
  try {
    const fullPrefs: CookiePreferences = {
      necessary: true,
      functional: prefs.functional,
      advertising: prefs.advertising,
      consentTimestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPrefs));
    
    // Dispatch custom event so other components (like CookiePolicyPage) can react
    window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: fullPrefs }));
  } catch (err) {
    console.error('Error saving cookie preferences:', err);
  }
};

interface CookieConsentBannerProps {
  onNavigate: (path: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [functionalChecked, setFunctionalChecked] = useState(false);
  const [advertisingChecked, setAdvertisingChecked] = useState(false);

  useEffect(() => {
    const existing = getStoredCookiePreferences();
    if (!existing) {
      // Small delay for smooth entry
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    } else {
      setFunctionalChecked(existing.functional);
      setAdvertisingChecked(existing.advertising);
    }
  }, []);

  // Listen for open request from other parts of the site (e.g. footer / cookie policy page)
  useEffect(() => {
    const handleOpenBanner = () => {
      const existing = getStoredCookiePreferences();
      if (existing) {
        setFunctionalChecked(existing.functional);
        setAdvertisingChecked(existing.advertising);
      }
      setIsVisible(true);
      setShowSettingsModal(true);
    };

    window.addEventListener('open_cookie_preferences', handleOpenBanner);
    return () => window.removeEventListener('open_cookie_preferences', handleOpenBanner);
  }, []);

  const handleAcceptAll = () => {
    saveCookiePreferences({ functional: true, advertising: true });
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({ functional: false, advertising: false });
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({ functional: functionalChecked, advertising: advertisingChecked });
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Main Minimal Floating Consent Banner */}
      {!showSettingsModal && (
        <div 
          id="cookie-consent-banner"
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#162018]/95 backdrop-blur-md border-t border-[#2F3B32] shadow-2xl text-[#EAE5DC] transition-all animate-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            {/* Description & Transparency */}
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="w-10 h-10 rounded-lg bg-[#243527] border border-[#3E5242] flex items-center justify-center text-[#A3CCA8] shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-[#B7C2B8] leading-relaxed">
                <div className="font-brand font-bold text-base text-[#F4F1EA] flex items-center gap-2">
                  <span>Privacy & Cookie Choices on Transylvania Atlas</span>
                </div>
                <p>
                  We use strictly necessary cookies to keep this independent travel resource operational. Under UK PECR and EU ePrivacy rules, optional cookies (such as future advertising personalization through Google AdSense) are only enabled with your explicit consent. You can accept all, reject non-essential cookies with equal ease, or customize your preferences anytime.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('/cookie-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#A3CCA8] underline hover:text-[#C4E2C8] transition-colors cursor-pointer text-xs"
                  >
                    Read our full Cookie Policy &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Equal Prominence Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                type="button"
                id="cookie-btn-reject-all"
                onClick={handleRejectNonEssential}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#253227] hover:bg-[#2F4032] active:bg-[#1E281F] text-[#E0D9CE] border border-[#3E5242] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                id="cookie-btn-settings"
                onClick={() => setShowSettingsModal(true)}
                className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-transparent hover:bg-white/5 text-[#A8B5AA] border border-white/15 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              <button
                type="button"
                id="cookie-btn-accept-all"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#2E5F3B] hover:bg-[#387247] active:bg-[#254F31] text-[#FFFFFF] font-bold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Granular Settings Modal */}
      {showSettingsModal && (
        <div 
          id="cookie-settings-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-xl bg-[#1C261F] border border-[#354839] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#2F3E32] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#2B3B2E] text-[#A3CCA8] flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="cookie-settings-title" className="font-brand font-bold text-lg text-[#F4F1EA]">
                    Cookie Preferences
                  </h3>
                  <p className="text-xs text-[#9EAAA0]">Transylvania Atlas &bull; transylvaniaatlas.com</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 text-[#9EAAA0] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Categories */}
            <div className="p-6 space-y-5 overflow-y-auto text-xs text-[#C5CEC6] leading-relaxed">
              <p>
                Manage which categories of cookies and local storage items you allow on Transylvania Atlas. Essential cookies cannot be disabled as the site cannot function securely without them.
              </p>

              {/* Category 1: Strictly Necessary */}
              <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-brand font-bold text-sm text-[#F4F1EA]">
                    Strictly Necessary & Functional
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#2D5A38]/40 border border-[#487F55] text-[10px] uppercase font-bold text-[#A3CCA8]">
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-[#97A399]">
                  Required for core platform security, page routing, local storage of cookie choices, and responsive interface display. Does not store personally identifiable advertising information.
                </p>
              </div>

              {/* Category 2: Functional / User Preferences */}
              <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-brand font-bold text-sm text-[#F4F1EA] block">
                      Functional &amp; User Preferences
                    </span>
                    <span className="text-[10px] text-[#869488]">Remembers reader settings &amp; filters</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={functionalChecked}
                      onChange={(e) => setFunctionalChecked(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#314234] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D5A38]" />
                  </label>
                </div>
                <p className="text-[11px] text-[#97A399]">
                  Remembers your selected destination filters, search preferences, and reading settings across browser sessions for an optimized experience.
                </p>
              </div>

              {/* Category 3: Advertising & Personalization (Google AdSense) */}
              <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-brand font-bold text-sm text-[#F4F1EA] block">
                      Advertising & Personalization (Google AdSense)
                    </span>
                    <span className="text-[10px] text-[#869488]">Personalized ad delivery by Google</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advertisingChecked}
                      onChange={(e) => setAdvertisingChecked(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#314234] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D5A38]" />
                  </label>
                </div>
                <p className="text-[11px] text-[#97A399]">
                  Allows Google AdSense and certified ad partners to deliver relevant, personalized travel-related advertisements and measure campaign efficiency. If disabled, non-personalized contextual ads may still be shown.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#2F3E32] bg-[#172019] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-[#8C988E]">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettingsModal(false);
                    onNavigate('/cookie-policy');
                  }}
                  className="hover:text-[#A3CCA8] underline cursor-pointer"
                >
                  View full policy details
                </button>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#253227] hover:bg-[#2E3D2F] text-[#E0D9CE] rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#3E5242]"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-initial px-5 py-2 bg-[#2E5F3B] hover:bg-[#387247] text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
