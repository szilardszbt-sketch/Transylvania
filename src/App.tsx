/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HistoryCulturePage } from './pages/HistoryCulturePage';
import { PlanYourVisitPage } from './pages/PlanYourVisitPage';
import { BlogPage } from './pages/BlogPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { PracticalGuideDetailPage } from './pages/PracticalGuideDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';

export default function App() {
  // Current route pathname + query search state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard shortcut (Cmd/Ctrl + K) to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse route, query params, and hash
  const [pathWithoutSearch = '/', searchStr = ''] = (currentPath || '/').split('?');
  const [pathname = '/', hash = ''] = pathWithoutSearch.split('#');
  const searchParams = new URLSearchParams(searchStr || '');

  // Route matching
  let pageContent: React.ReactNode = null;

  if (pathname === '/' || pathname === '') {
    pageContent = <HomePage onNavigate={navigate} />;
  } else if (pathname === '/explore') {
    pageContent = (
      <ExplorePage
        initialCategory={searchParams.get('category')}
        initialGateway={searchParams.get('gateway')}
        initialRegion={searchParams.get('region')}
        onNavigate={navigate}
      />
    );
  } else if (pathname === '/history-culture') {
    pageContent = <HistoryCulturePage onNavigate={navigate} />;
  } else if (pathname === '/plan-your-visit') {
    pageContent = <PlanYourVisitPage onNavigate={navigate} />;
  } else if (pathname.startsWith('/plan-your-visit/')) {
    const guideSlug = pathname.replace('/plan-your-visit/', '');
    pageContent = <PracticalGuideDetailPage slug={guideSlug} onNavigate={navigate} />;
  } else if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    const postSlug = pathname.startsWith('/blog/')
      ? pathname.replace('/blog/', '')
      : searchParams.get('post');
    pageContent = <BlogPage onNavigate={navigate} initialPostSlug={postSlug} />;
  } else if (pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin')) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/index.html';
    }
    return null;
  } else if (pathname.startsWith('/destinations/')) {
    const destSlug = pathname.replace('/destinations/', '');
    pageContent = (
      <DestinationDetailPage
        slug={destSlug}
        onNavigate={navigate}
      />
    );
  } else if (pathname.startsWith('/articles/')) {
    const articleSlug = pathname.replace('/articles/', '');
    pageContent = <ArticleDetailPage slug={articleSlug} onNavigate={navigate} />;
  } else if (pathname === '/about') {
    if (hash === 'contact') {
      pageContent = <ContactPage onNavigate={navigate} />;
    } else {
      pageContent = <AboutPage onNavigate={navigate} />;
    }
  } else if (pathname === '/contact' || pathname === '/contact-us' || pathname === '/contact-inquiries') {
    pageContent = <ContactPage onNavigate={navigate} />;
  } else if (pathname === '/privacy-policy' || pathname === '/privacy') {
    pageContent = <PrivacyPolicyPage onNavigate={navigate} />;
  } else if (pathname === '/cookie-policy' || pathname === '/cookies') {
    pageContent = <CookiePolicyPage onNavigate={navigate} />;
  } else if (pathname === '/terms-and-conditions' || pathname === '/terms') {
    pageContent = <TermsPage onNavigate={navigate} />;
  } else {
    // Fallback 404
    pageContent = (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-brand text-4xl font-bold text-[#1B3322]">Page Not Found</h1>
        <p className="text-sm text-[#5D665B]">The page or guide you requested could not be located.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-[#1B3322] text-white text-xs font-semibold uppercase tracking-wider rounded-md cursor-pointer"
        >
          Return to Transylvania Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#2C332D] font-sans antialiased selection:bg-[#2D5A38]/20 selection:text-[#1B3322] overflow-x-hidden">
      {/* Global Brand Navigation Bar */}
      <Header
        currentPath={pathname}
        activePath={pathname}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full pt-20">
        {pageContent}
      </main>

      {/* Global Non-Commercial Footer */}
      <Footer onNavigate={navigate} />

      {/* Cookie Consent Banner (UK PECR & EU ePrivacy compliant) */}
      <CookieConsentBanner onNavigate={navigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}
