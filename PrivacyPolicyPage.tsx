import React from 'react';
import { ShieldCheck, Lock, Eye, Server, UserCheck, AlertCircle, Mail, ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 6, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Privacy Policy — Transylvania & Romania"
        description="Privacy policy and data protection principles for Transylvania Atlas in accordance with EU GDPR standards."
        canonicalPath="/privacy-policy"
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
          <ShieldCheck className="w-4 h-4 text-[#2D5A38]" />
          <span>Legal & Data Transparency</span>
        </div>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] leading-tight break-words">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-[#525B51] font-editorial leading-relaxed max-w-3xl">
          This Privacy Policy explains how <strong>Transylvania Atlas</strong> collects, uses, stores, and protects personal information when you visit <strong>transylvaniaatlas.com</strong>, explore our regional guides, or reach out to our editorial team via our contact form.
        </p>
      </div>

      {/* 1. Core Operating Disclosure & Non-Commercial Status */}
      <section className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#EAE5DC] text-[#2D5A38] shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h2 className="font-brand font-bold text-xl text-[#1B3322]">
              1. Site Identity & Independent Operation
            </h2>
            <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
              <strong>Transylvania Atlas</strong> (<span className="font-mono text-xs">transylvaniaatlas.com</span>) is an independent travel blog and cultural reference resource written, managed, and operated by an individual author and researcher publishing under the public alias <strong>&ldquo;The Traveller.&rdquo;</strong>
            </p>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg text-xs text-[#2C352E] font-medium leading-relaxed">
              <strong>Important Notice:</strong> Transylvania Atlas is strictly an informational travel blog. The site does not sell products or services, does not process bookings, payments, ticket purchases, or reservations of any kind, and is not a travel agency, commercial booking platform, or tour operator.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Personal Data We Collect */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          2. Personal Data We Collect
        </h2>
        <p>
          We strictly limit the collection of personal data to what is necessary for our editorial and communication functions. We collect personal information in the following ways:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="font-brand font-bold text-base text-[#1B3322] flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center text-xs font-bold font-mono">A</span>
              <span>Contact Form &amp; Direct Inquiries (Netlify Forms)</span>
            </div>
            <p className="text-xs text-[#525B51] leading-relaxed">
              When you reach out to us via our contact form (powered securely by Netlify Forms) or direct editorial email, we collect your name, email address, inquiry subject, and message content to correspond with you and respond to your inquiry.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 space-y-2.5 shadow-xs">
            <div className="font-brand font-bold text-base text-[#1B3322] flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center text-xs font-bold font-mono">B</span>
              <span>Cookie &amp; Advertising Telemetry</span>
            </div>
            <p className="text-xs text-[#525B51] leading-relaxed">
              Technical data including truncated IP addresses, browser user-agents, device parameters, and cookie preferences. When advertising is enabled, Google AdSense and certified networks may collect advertising identifiers subject to your consent.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Purposes of Processing */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          3. How We Use Your Data (Purposes)
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Editorial Communication:</strong> To answer reader inquiries, handle factual correction requests, and correspond with travellers who submit messages through our contact form.
          </li>
          <li>
            <strong>Site Operation &amp; Security:</strong> To maintain site uptime, prevent spam in contact forms (processed via Netlify Forms spam filtering), detect malicious activity, and optimize page load speeds.
          </li>
          <li>
            <strong>Serving Contextual &amp; Personalized Advertising:</strong> Once Google AdSense is active, to deliver non-intrusive advertisements supporting the ongoing maintenance of Transylvania Atlas. If you grant consent via our Cookie Banner, ads may be personalized according to Google&apos;s ad personalization policies.
          </li>
        </ul>
      </section>

      {/* 4. Legal Bases under UK & EU GDPR */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          4. Legal Bases for Processing (UK GDPR / EU GDPR)
        </h2>
        <p>
          Under Article 6 of the General Data Protection Regulation (EU GDPR and UK GDPR), we process personal data under the following legal bases:
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1.5 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              1. Consent (Article 6(1)(a) GDPR)
            </h3>
            <p className="text-xs text-[#525B51]">
              Applies when you voluntarily send an inquiry via our contact form (Netlify Forms), send a direct email, or accept optional advertising and analytical cookies via our cookie consent banner. You may withdraw consent at any time.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-1.5 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              2. Legitimate Interests (Article 6(1)(f) GDPR)
            </h3>
            <p className="text-xs text-[#525B51]">
              Applies to core technical site operation, security logging, defending against cyber attacks, preventing abuse of the contact form, ensuring responsive rendering, and maintaining the historical integrity of our cultural travel reference.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Explicit Third-Party Sharing */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          5. Third-Party Service Providers (Processors)
        </h2>
        <p>
          We do not sell, rent, or trade your personal data. We only share specific data elements with the following trusted third-party service providers who assist in operating this website:
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] block">
                Google LLC / Google Ireland Limited (Google AdSense & Web Tools)
              </span>
              <p className="text-xs text-[#525B51]">
                Serves advertising on the site and measures aggregated site performance. Cookies and advertising IDs are shared only in accordance with your cookie consent choices.
              </p>
            </div>
            <a 
              href="https://policies.google.com/technologies/partner-sites" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#2D5A38] font-semibold underline flex items-center gap-1 shrink-0"
            >
              <span>Google Partner Policy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-1">
              <span className="font-brand font-bold text-sm text-[#1B3322] block">
                Netlify Inc. (Form Processing &amp; Web Hosting)
              </span>
              <p className="text-xs text-[#525B51]">
                Powers our serverless contact form submission workflow (Netlify Forms), safely transmitting your message to our editorial inbox while filtering automated spam.
              </p>
            </div>
            <a 
              href="https://www.netlify.com/privacy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#2D5A38] font-semibold underline flex items-center gap-1 shrink-0"
            >
              <span>Netlify Privacy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. International Data Transfers */}
      <section className="space-y-3 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          6. International Data Transfers
        </h2>
        <p>
          Some third-party technical providers (such as Google LLC or Netlify Inc.) may process or store data on secure infrastructure located outside the United Kingdom (UK) and the European Economic Area (EEA), including the United States.
        </p>
        <p>
          Where transfers outside the UK or EEA occur, we ensure appropriate safeguards are implemented in compliance with Chapter V of the UK/EU GDPR, including the use of Standard Contractual Clauses (SCCs), the UK International Data Transfer Addendum, or participation in the EU-U.S. Data Privacy Framework.
        </p>
      </section>

      {/* 7. Data Retention */}
      <section className="space-y-3 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          7. Data Retention Schedule
        </h2>
        <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 space-y-3 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-[#EAE5DC] pb-3 font-semibold text-xs text-[#1B3322]">
            <div>Data Category</div>
            <div className="sm:col-span-2">Retention Period &amp; Rationale</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#525B51] border-b border-[#F0EBE3] pb-2">
            <div className="font-medium text-[#1B3322]">Contact Form Communications (Netlify Forms / Email)</div>
            <div className="sm:col-span-2">Retained for up to 12 months from resolution of the query to preserve correspondence context, then securely deleted.</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#525B51]">
            <div className="font-medium text-[#1B3322]">Cookie Consent Choices</div>
            <div className="sm:col-span-2">Stored locally in your browser storage for up to 12 months, after which your consent preferences are re-requested.</div>
          </div>
        </div>
      </section>

      {/* 8. Your Data Protection Rights under UK/EU GDPR */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          8. Your Rights Under GDPR &amp; UK GDPR
        </h2>
        <p>
          If you reside in the United Kingdom, European Union, or European Economic Area, you possess statutory rights regarding your personal data:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right of Access (Art. 15)</span>
            <span className="text-[11px] text-[#5D665C]">Request a copy of the personal data we hold about you.</span>
          </div>
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right to Rectification (Art. 16)</span>
            <span className="text-[11px] text-[#5D665C]">Request corrections to any inaccurate or incomplete records.</span>
          </div>
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right to Erasure (Art. 17)</span>
            <span className="text-[11px] text-[#5D665C]">Request that we delete your contact messages or personal records (&ldquo;Right to be Forgotten&rdquo;).</span>
          </div>
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right to Restrict Processing (Art. 18)</span>
            <span className="text-[11px] text-[#5D665C]">Request that we restrict the handling of your data under specific conditions.</span>
          </div>
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right to Data Portability (Art. 20)</span>
            <span className="text-[11px] text-[#5D665C]">Receive your personal data in a structured, commonly used machine-readable format.</span>
          </div>
          <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-lg">
            <span className="font-bold text-xs text-[#1B3322] block">Right to Object &amp; Withdraw Consent (Art. 21)</span>
            <span className="text-[11px] text-[#5D665C]">Object to processing based on legitimate interests or withdraw consent at any time.</span>
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl space-y-2 mt-2">
          <h3 className="font-brand font-bold text-sm text-[#1B3322]">
            How to Exercise Your Rights
          </h3>
          <p className="text-xs text-[#495248]">
            To exercise any of these rights, please email our privacy desk at{' '}
            <a href="mailto:info@transylvaniaatlas.com" className="text-[#2D5A38] font-semibold underline">
              info@transylvaniaatlas.com
            </a>{' '}
            or use our{' '}
            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#2D5A38] font-semibold underline hover:text-[#1B3322] cursor-pointer"
            >
              contact page
            </button>
            . We will respond without undue delay and within 30 calendar days. We will never charge a fee for standard requests.
          </p>
          <p className="text-xs text-[#717A70]">
            You also have the right to lodge a complaint with your relevant supervisory authority, such as the UK Information Commissioner&apos;s Office (ICO) or your national European Data Protection Authority (e.g., ANSPDCP in Romania).
          </p>
        </div>
      </section>

      {/* 9. Children's Privacy */}
      <section className="space-y-3 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          9. Children&apos;s Privacy
        </h2>
        <p>
          Transylvania Atlas is an adult informational travel reference and is not directed at children under the age of 16. We do not knowingly collect, solicit, or maintain personal information from individuals under 16 years of age.
        </p>
        <p>
          If you are a parent or legal guardian and believe your child has submitted personal details to Transylvania Atlas without your consent, please contact us immediately at{' '}
          <a href="mailto:info@transylvaniaatlas.com" className="text-[#2D5A38] font-semibold underline">
            info@transylvaniaatlas.com
          </a>
          , and we will promptly remove the information from our records.
        </p>
      </section>

      {/* 10. Contact & Privacy Inquiries */}
      <section className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-brand font-bold text-xl text-[#1B3322]">
              10. Privacy Questions &amp; Contact
            </h2>
            <p className="text-xs text-[#717A70]">Transylvania Atlas &bull; Editorial &amp; Data Desk</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
          If you have any questions about this Privacy Policy, your personal data, or our data handling practices, please write to us:
        </p>

        <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs space-y-1 font-mono text-[#2C352E]">
          <div><strong>Operator:</strong> The Traveller (Transylvania Atlas)</div>
          <div><strong>Website:</strong> transylvaniaatlas.com</div>
          <div><strong>Contact Email:</strong> <a href="mailto:info@transylvaniaatlas.com" className="text-[#2D5A38] underline">info@transylvaniaatlas.com</a></div>
        </div>
      </section>
    </div>
  );
};
