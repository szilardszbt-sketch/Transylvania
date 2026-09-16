import React from 'react';
import { ShieldCheck, Mail, HeartHandshake, Eye, BookOpen, FileText, Cookie, Scale, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      <SEO
        title="About Us & Editorial Standards — Transylvania & Romania"
        description="Learn about our independent, non-commercial cultural travel reference for Transylvania and Romania. Editorial ethics, verified facts, and photo credits."
        canonicalPath="/about"
      />
      {/* Header */}
      <div className="border-b border-[#E3DDD2] pb-8 space-y-3">
        <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
          Independent Reference
        </span>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] break-words">
          About Transylvania: The Heart of Romania
        </h1>
        <p className="text-sm sm:text-base text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
          An open, non-commercial cultural and travel reference designed to help English-speaking visitors discover the authentic heritage, landscapes, and architecture of Romania.
        </p>
      </div>

      {/* Core Philosophy Section */}
      <section className="space-y-6">
        <h2 className="font-brand text-2xl font-bold text-[#1B3322]">
          Our Editorial Philosophy
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E3DDD2] rounded-xl p-6 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#2D5A38] mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#1B3322]">Non-Commercial & Independent</h3>
            <p className="text-xs text-[#525B51] leading-relaxed">
              We are not a travel agency, tour operator, or booking platform. We do not accept sponsored affiliate placements or promote artificial travel packages.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD2] rounded-xl p-6 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#2D5A38] mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#1B3322]">Cultural Authenticity</h3>
            <p className="text-xs text-[#525B51] leading-relaxed">
              We look beyond tourist clichés to present genuine historical contexts: the 800-year Saxon heritage, Dacian and Roman antiquities, and living village traditions.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD2] rounded-xl p-6 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#2D5A38] mb-2">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#1B3322]">Quiet, Clear Design</h3>
            <p className="text-xs text-[#525B51] leading-relaxed">
              No disruptive popups, countdown banners, or flash sales. We prioritize spacious typography, archival photography, and intuitive spatial discovery.
            </p>
          </div>

          <div className="bg-white border border-[#E3DDD2] rounded-xl p-6 space-y-2.5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#EFECE6] flex items-center justify-center text-[#2D5A38] mb-2">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#1B3322]">Accurate Practical Advice</h3>
            <p className="text-xs text-[#525B51] leading-relaxed">
              Verified details regarding road tolls, railway connections, opening hours, contactless payments, and respectful behavior in historical sites.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy, Cookie, and Terms Policy Section */}
      <section className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="font-brand text-xl font-bold text-[#1B3322]">
            Legal, Privacy &amp; Data Transparency
          </h3>
          <p className="text-xs text-[#525B51] leading-relaxed mt-1">
            Transylvania Atlas is committed to clear data protection standards under UK PECR, UK GDPR, and EU GDPR. Explore our dedicated legal policies:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <button
            type="button"
            onClick={() => handleNav('/privacy-policy')}
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl text-left space-y-2 group transition-all cursor-pointer shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center group-hover:bg-[#2D5A38] group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
              Privacy Policy &rarr;
            </h4>
            <p className="text-[11px] text-[#6E786D] leading-relaxed">
              How personal data from community submissions and inquiries is securely processed and retained.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleNav('/cookie-policy')}
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl text-left space-y-2 group transition-all cursor-pointer shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center group-hover:bg-[#2D5A38] group-hover:text-white transition-colors">
              <Cookie className="w-4 h-4" />
            </div>
            <h4 className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
              Cookie Policy &rarr;
            </h4>
            <p className="text-[11px] text-[#6E786D] leading-relaxed">
              Details on strictly necessary and advertising cookies, with interactive preference controls.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleNav('/terms-and-conditions')}
            className="p-4 bg-white border border-[#E5E0D8] hover:border-[#2D5A38] rounded-xl text-left space-y-2 group transition-all cursor-pointer shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center group-hover:bg-[#2D5A38] group-hover:text-white transition-colors">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="font-brand font-bold text-sm text-[#1B3322] group-hover:text-[#2D5A38]">
              Terms &amp; Conditions &rarr;
            </h4>
            <p className="text-[11px] text-[#6E786D] leading-relaxed">
              Disclaimers for third-party transport, accommodations, currency rates, and user submissions.
            </p>
          </button>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="border-t border-[#E3DDD2] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h2 className="font-brand text-xl font-bold text-[#1B3322]">
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-[#5D665B] leading-relaxed">
            Have a question, feedback, or a correction to share? We welcome your correspondence and inquiries.
          </p>
        </div>
        <button
          onClick={() => handleNav('/contact')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B3322] hover:bg-[#284B32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Mail className="w-4 h-4" />
          <span>Contact &amp; Inquiries</span>
        </button>
      </section>
    </div>
  );
};
