import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, ExternalLink, ArrowLeft, RefreshCw, CheckCircle2, Sliders, Info } from 'lucide-react';
import { getStoredCookiePreferences, saveCookiePreferences, CookiePreferences } from '../components/common/CookieConsentBanner';
import { SEO } from '../components/common/SEO';

interface CookiePolicyPageProps {
  onNavigate: (path: string) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 6, 2026';
  
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const loadCurrentPreferences = () => {
    const current = getStoredCookiePreferences();
    if (current) {
      setPreferences(current);
    } else {
      // Default initial state
      setPreferences({
        necessary: true,
        functional: false,
        advertising: false,
        consentTimestamp: 'Not yet recorded',
      });
    }
  };

  useEffect(() => {
    loadCurrentPreferences();

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CookiePreferences>;
      if (customEvt.detail) {
        setPreferences(customEvt.detail);
      }
    };

    window.addEventListener('cookie_consent_updated', handleUpdate);
    return () => window.removeEventListener('cookie_consent_updated', handleUpdate);
  }, []);

  const handleToggle = (key: 'functional' | 'advertising') => {
    if (!preferences) return;
    const updated = {
      functional: key === 'functional' ? !preferences.functional : preferences.functional,
      advertising: key === 'advertising' ? !preferences.advertising : preferences.advertising,
    };
    saveCookiePreferences(updated);
    setSaveMessage('Your preferences have been saved and applied immediately.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleAcceptAll = () => {
    saveCookiePreferences({ functional: true, advertising: true });
    setSaveMessage('All cookie categories accepted.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleRejectAll = () => {
    saveCookiePreferences({ functional: false, advertising: false });
    setSaveMessage('All optional cookies rejected. Only strictly necessary cookies remain active.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleOpenBannerModal = () => {
    window.dispatchEvent(new CustomEvent('open_cookie_preferences'));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Cookie Policy — Transylvania & Romania"
        description="Learn how Transylvania Atlas uses local storage and cookies in compliance with PECR and EU ePrivacy regulations."
        canonicalPath="/cookie-policy"
      />
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
        <button
          onClick={() => {
            onNavigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A38] hover:text-[#1B3322] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Transylvania Atlas</span>
        </button>

        <span className="text-xs text-[#7A857B] font-mono">
          Last Updated: {lastUpdated}
        </span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAE5DC] text-[#1B3322] rounded text-xs font-semibold uppercase tracking-wider">
          <Cookie className="w-4 h-4 text-[#2D5A38]" />
          <span>PECR & ePrivacy Transparency</span>
        </div>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] leading-tight break-words">
          Cookie Policy
        </h1>
        <p className="text-sm sm:text-base text-[#525B51] font-editorial leading-relaxed max-w-3xl">
          This Cookie Policy describes how <strong>Transylvania Atlas</strong> (<span className="font-mono text-xs">transylvaniaatlas.com</span>) utilizes cookies, browser local storage, and related web technologies in compliance with UK Privacy and Electronic Communications Regulations (PECR) and the European Union ePrivacy Directive.
        </p>
      </div>

      {/* 1. Site Status & Declaration */}
      <section className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#EAE5DC] text-[#2D5A38] shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h2 className="font-brand font-bold text-xl text-[#1B3322]">
              1. Independent Informational Notice
            </h2>
            <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
              <strong>Transylvania Atlas</strong> is written, published, and maintained by an individual travel author under the pseudonym <strong>&ldquo;The Traveller.&rdquo;</strong>
            </p>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg text-xs text-[#2C352E] font-medium leading-relaxed">
              <strong>Independent Resource:</strong> Transylvania Atlas is strictly an educational and cultural travel guide. The site does not sell products, services, or tours, does not process bookings, payments, or reservations of any kind, and is not a travel agency, booking portal, or tour operator.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Cookie Settings Panel */}
      <section id="cookie-settings" className="bg-[#1C261F] border border-[#354839] rounded-2xl p-6 sm:p-8 text-[#EAE5DC] space-y-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2F3E32] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-[#A3CCA8]" />
              <h2 className="font-brand font-bold text-xl text-[#F4F1EA]">
                Your Active Cookie Preferences
              </h2>
            </div>
            <p className="text-xs text-[#A8B5AA] mt-1">
              You can adjust, grant, or revoke your consent at any time directly below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRejectAll}
              className="px-3.5 py-1.5 bg-[#253227] hover:bg-[#2E3D2F] border border-[#3E5242] text-[#E0D9CE] rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Reject Optional
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-1.5 bg-[#2E5F3B] hover:bg-[#387247] text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className="p-3 bg-[#233827] border border-[#3E6E48] rounded-lg flex items-center gap-2 text-xs text-[#A3CCA8] animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Item 1: Necessary */}
          <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-brand font-bold text-sm text-[#F4F1EA]">Strictly Necessary & Functional</span>
                <span className="px-2 py-0.5 rounded bg-[#2D5A38]/40 border border-[#487F55] text-[9px] uppercase font-bold text-[#A3CCA8]">
                  Always Enabled
                </span>
              </div>
              <p className="text-[11px] text-[#97A399]">
                Stores your consent status, secure token verification, and UI layout preferences. Essential for the website to function.
              </p>
            </div>
          </div>

          {/* Item 2: Functional */}
          <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#F4F1EA] block">Functional Preferences &amp; Reader Choices</span>
              <p className="text-[11px] text-[#97A399]">
                Remembers user-selected filters, search queries, and reading preferences across browser sessions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={preferences?.functional ?? false}
                onChange={() => handleToggle('functional')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#314234] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5A38]" />
            </label>
          </div>

          {/* Item 3: Advertising */}
          <div className="p-4 bg-[#141C16] border border-[#2A392D] rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#F4F1EA] block">Advertising & Personalization (Google AdSense)</span>
              <p className="text-[11px] text-[#97A399]">
                Allows Google AdSense and certified advertising networks to deliver relevant advertisements and prevent repeat ad impressions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={preferences?.advertising ?? false}
                onChange={() => handleToggle('advertising')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#314234] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5A38]" />
            </label>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-[#869488] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-[#2A392D]">
          <span>Recorded Consent Timestamp: <strong className="text-[#A8B5AA] font-mono">{preferences?.consentTimestamp || 'Not yet recorded'}</strong></span>
          <button
            onClick={handleOpenBannerModal}
            className="text-[#A3CCA8] hover:underline cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Launch Quick Banner Modal</span>
          </button>
        </div>
      </section>

      {/* 3. What Are Cookies and Legal Requirements */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          2. What Are Cookies and How We Comply (UK PECR & EU ePrivacy)
        </h2>
        <p>
          Cookies are small text files placed on your computer, tablet, or mobile phone by websites that you visit. They are widely used to make websites work properly, provide basic navigational memory, and deliver reporting or advertising telemetry.
        </p>
        <div className="p-4 bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl space-y-2">
          <h3 className="font-brand font-bold text-sm text-[#1B3322]">
            UK PECR & EU ePrivacy Compliance Rules
          </h3>
          <p className="text-xs text-[#525B51]">
            Under the UK Privacy and Electronic Communications Regulations (PECR) and EU ePrivacy legislation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#525B51]">
            <li>
              <strong>Prior Explicit Consent:</strong> Non-essential cookies (including Google AdSense ad personalization and analytics) are <strong>never loaded or set</strong> before you make your choice.
            </li>
            <li>
              <strong>Equal Prominence:</strong> Our initial consent banner presents &ldquo;Accept All&rdquo; and &ldquo;Reject Non-Essential&rdquo; with equal visual weight and simplicity, without coercive dark patterns or pre-ticked optional boxes.
            </li>
            <li>
              <strong>Persistent Freedom to Change:</strong> You may change or revoke your cookie choices at any point using the interactive panel on this page or through the &ldquo;Cookie Preferences&rdquo; link found in our site footer.
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Detailed Breakdown of Cookie Categories */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          3. Detailed Categories of Cookies Used
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="font-brand font-bold text-base text-[#1B3322] flex items-center justify-between">
              <span>A. Strictly Necessary / Essential Cookies</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#EAE5DC] text-[#1B3322] rounded font-semibold">Exempt from Consent</span>
            </h3>
            <p className="text-xs text-[#525B51]">
              These items are vital for technical site operation, routing requests, security verification, and remembering your cookie consent status so we do not prompt you on every single page load.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#EAE5DC] rounded">
                <thead className="bg-[#FAF8F5] text-[#1B3322] border-b border-[#EAE5DC]">
                  <tr>
                    <th className="p-2 font-semibold">Key / Cookie Name</th>
                    <th className="p-2 font-semibold">Provider</th>
                    <th className="p-2 font-semibold">Purpose</th>
                    <th className="p-2 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5DC] text-[#525B51]">
                  <tr>
                    <td className="p-2 font-mono text-[11px] text-[#1B3322]">transylvania_atlas_cookie_consent</td>
                    <td className="p-2">Transylvania Atlas (First-Party)</td>
                    <td className="p-2">Stores your cookie consent preferences across sessions.</td>
                    <td className="p-2">12 months</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono text-[11px] text-[#1B3322]">session_state</td>
                    <td className="p-2">Transylvania Atlas (First-Party)</td>
                    <td className="p-2">Maintains client-side view state during navigation.</td>
                    <td className="p-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="font-brand font-bold text-base text-[#1B3322] flex items-center justify-between">
              <span>B. Advertising & Personalization Cookies (Google AdSense)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F2EDE4] text-[#2D5A38] rounded font-semibold">Requires Explicit Consent</span>
            </h3>
            <p className="text-xs text-[#525B51]">
              Once Google AdSense is activated, Google LLC and its certified ad partners use cookies (such as <code className="bg-[#FAF8F5] px-1 py-0.5 rounded text-[11px]">__gads</code>, <code className="bg-[#FAF8F5] px-1 py-0.5 rounded text-[11px]">__gpi</code>, and related tokens) to serve advertisements on Transylvania Atlas.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#525B51]">
              <li>
                <strong>Personalized Advertising:</strong> When consent is granted, Google delivers advertisements tailored to your past browsing habits and travel interests across the web.
              </li>
              <li>
                <strong>Non-Personalized Advertising:</strong> If you reject advertising cookies, you will still see advertisements, but they will be contextual (e.g. general travel topics) and will not use profiling cookies.
              </li>
              <li>
                <strong>Ad Measurement & Frequency Capping:</strong> Used to prevent the same ad from showing repeatedly and to detect click fraud.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Google Advertising Links & External Opt-Out Tools */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          4. Google Ad Policies & Opt-Out Resources
        </h2>
        <p>
          We believe in total transparency regarding third-party advertising cookies. We encourage you to review Google&apos;s policies and use independent opt-out mechanisms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl flex items-start justify-between gap-3 group transition-colors shadow-xs"
          >
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
                Google Advertising Technologies Policy
              </span>
              <p className="text-xs text-[#6B756A]">
                Read how Google manages cookies in advertising products and partners.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A857B] group-hover:text-[#2D5A38] shrink-0 mt-1" />
          </a>

          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl flex items-start justify-between gap-3 group transition-colors shadow-xs"
          >
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
                Google Ad Settings (Personalization Opt-Out)
              </span>
              <p className="text-xs text-[#6B756A]">
                Directly turn off personalized Google ads for your Google account or browser.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A857B] group-hover:text-[#2D5A38] shrink-0 mt-1" />
          </a>

          <a
            href="https://optout.networkadvertising.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl flex items-start justify-between gap-3 group transition-colors shadow-xs"
          >
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
                Network Advertising Initiative (NAI)
              </span>
              <p className="text-xs text-[#6B756A]">
                Opt out of interest-based advertising from multiple certified ad networks.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A857B] group-hover:text-[#2D5A38] shrink-0 mt-1" />
          </a>

          <a
            href="https://www.youronlinechoices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl flex items-start justify-between gap-3 group transition-colors shadow-xs"
          >
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
                Your Online Choices (EU/UK)
              </span>
              <p className="text-xs text-[#6B756A]">
                European Interactive Digital Advertising Alliance (EDAA) consumer choice portal.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A857B] group-hover:text-[#2D5A38] shrink-0 mt-1" />
          </a>
        </div>
      </section>

      {/* 6. How to Manage Cookies in Your Browser */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          5. Managing Cookies in Your Browser
        </h2>
        <p>
          Most web browsers automatically accept cookies by default, but allow you to modify your browser settings to block or delete cookies entirely. Note that blocking strictly necessary cookies may affect site navigation.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white border border-[#E5E0D8] rounded-lg">
            <strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies.
          </div>
          <div className="p-3 bg-white border border-[#E5E0D8] rounded-lg">
            <strong>Apple Safari:</strong> Settings &rarr; Safari &rarr; Advanced &rarr; Block All Cookies.
          </div>
          <div className="p-3 bg-white border border-[#E5E0D8] rounded-lg">
            <strong>Mozilla Firefox:</strong> Settings &rarr; Privacy & Security &rarr; Enhanced Tracking Protection.
          </div>
          <div className="p-3 bg-white border border-[#E5E0D8] rounded-lg">
            <strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage cookies.
          </div>
        </div>
      </section>

      {/* 7. Contact Info */}
      <section className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-brand font-bold text-xl text-[#1B3322]">
          6. Questions Concerning Our Cookie Policy
        </h2>
        <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
          If you have any questions or feedback regarding our implementation of cookies or data privacy, please contact the site operator:
        </p>
        <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs space-y-1 font-mono text-[#2C352E]">
          <div><strong>Site:</strong> Transylvania Atlas (transylvaniaatlas.com)</div>
          <div><strong>Author & Operator:</strong> The Traveller</div>
          <div><strong>Email:</strong> <a href="mailto:info@transylvaniaatlas.com" className="text-[#2D5A38] underline">info@transylvaniaatlas.com</a></div>
        </div>
      </section>
    </div>
  );
};
