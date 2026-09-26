import React from 'react';
import { Scale, ShieldAlert, AlertTriangle, Coins, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 6, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Terms of Service — Transylvania & Romania"
        description="Terms of service and conditions of use for Transylvania Atlas, independent cultural and travel reference."
        canonicalPath="/terms"
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
          <Scale className="w-4 h-4 text-[#2D5A38]" />
          <span>Terms of Use & Disclaimers</span>
        </div>
        <h1 className="font-brand text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3322] leading-tight break-words">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm sm:text-base text-[#525B51] font-editorial leading-relaxed max-w-3xl">
          Please read these Terms &amp; Conditions carefully before accessing or using <strong>Transylvania Atlas</strong> (<span className="font-mono text-xs">transylvaniaatlas.com</span>). By accessing any guide, map, or article on this website, you acknowledge and agree to be bound by these terms.
        </p>
      </div>

      {/* 1. Core Operating Identity & Non-Commercial Status */}
      <section className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#EAE5DC] text-[#2D5A38] shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h2 className="font-brand font-bold text-xl text-[#1B3322]">
              1. Site Status: Pure Informational Travel Blog
            </h2>
            <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
              <strong>Transylvania Atlas</strong> (<span className="font-mono text-xs">transylvaniaatlas.com</span>) is an independent travel blog and cultural reference authored, edited, and operated by an individual creator under the public alias <strong>&ldquo;The Traveller.&rdquo;</strong>
            </p>
            <div className="p-4 bg-white border border-[#E5E0D8] rounded-lg text-xs text-[#2C352E] font-medium leading-relaxed">
              <strong>Explicit Declaration:</strong> Transylvania Atlas is purely an informational and educational travel resource. The site does not sell physical products or services, does not process bookings, reservations, ticket sales, or payments of any kind, and is not a travel agency, booking platform, or tour operator.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Advertising Disclosure */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          2. Advertising &amp; Third-Party Networks Disclosure
        </h2>
        <p>
          To maintain server hosting and ongoing editorial research, Transylvania Atlas displays advertising served by <strong>Google (Google AdSense)</strong> and certified third-party advertising networks.
        </p>
        <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 shadow-xs">
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#525B51]">
            <li>
              <strong>No Endorsement:</strong> Transylvania Atlas does not control, vet, endorse, or assume legal responsibility for any advertiser, brand, product, service, claim, or offer displayed in third-party ad banners or sponsored widgets.
            </li>
            <li>
              <strong>External Navigation:</strong> Clicking on any advertisement or third-party sponsor link navigates you away from Transylvania Atlas and subjects you entirely to the terms, pricing, and privacy policies of that independent third-party advertiser.
            </li>
            <li>
              <strong>Transactions:</strong> Any purchase, contract, or interaction you enter into with an advertiser is exclusively between you and that commercial party.
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Third-Party Services Disclaimer (Crucial Explicit Clause) */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#A84234]" />
          <span>3. Third-Party Services &amp; Commercial Disclaimer</span>
        </h2>
        <p>
          Throughout our regional guides, itineraries, and practical articles, we may reference, name, or provide factual information about external travel services. Transylvania Atlas is completely independent and <strong>is not affiliated with, nor does it accept any liability for</strong>, disputes, delays, cancellations, refunds, quality of service, accidents, or financial losses relating to:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              A. Car Rental &amp; Transport Companies
            </h3>
            <p className="text-xs text-[#525B51]">
              Including Enterprise, Europcar, Sixt, Hertz, Avis, Autonom, local car hire providers, taxi services, ride-hailing apps, and any other transport or vehicle leasing operator.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              B. Accommodation Providers &amp; Platforms
            </h3>
            <p className="text-xs text-[#525B51]">
              Including Booking.com, Airbnb, Vrbo, Agoda, Expedia, hotels, guesthouses, traditional Saxon village pensions (<em>pensiuni</em>), mountain huts (<em>cabane</em>), and all other lodging establishments.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              C. Dining &amp; Hospitality Establishments
            </h3>
            <p className="text-xs text-[#525B51]">
              Including restaurants, cafes, traditional cellars, bakeries, street food vendors, wineries, breweries, or culinary tour venues.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 shadow-xs">
            <h3 className="font-brand font-bold text-sm text-[#1B3322]">
              D. Spas, Pools &amp; Leisure Facilities
            </h3>
            <p className="text-xs text-[#525B51]">
              Including thermal baths, indoor/outdoor swimming complexes, salt mines (<em>saline</em>), wellness resorts, cable cars (<em>telecabine</em>), adventure parks, and natural recreation venues.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl text-xs text-[#2C352E] leading-relaxed">
          <strong>Direct Relationship Rule:</strong> Any booking, reservation, ticket, payment, contract, or transaction that you make with any car rental company, accommodation provider, dining venue, spa, or other third party is <strong>solely and exclusively between you (the visitor) and that respective third party</strong>. Transylvania Atlas has no control over their policies, rates, cleanliness, safety standards, or terms of service.
        </div>
      </section>

      {/* 4. Currency & Financial Rates Disclaimer */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2 flex items-center gap-2">
          <Coins className="w-5 h-5 text-[#2D5A38]" />
          <span>4. Currency, Exchange Rates &amp; Pricing Disclaimer</span>
        </h2>
        <p>
          All references to currencies (including Romanian Leu - RON, Euro - EUR, British Pounds - GBP, or US Dollars - USD), currency exchange rates, estimated taxi fares, admission fees, highway vignette prices, or travel costs reflect approximate estimates <strong>at the time of publication only</strong>.
        </p>
        <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-2 text-xs text-[#525B51] shadow-xs">
          <p>
            Exchange rates fluctuate continually and prices change. Pricing figures on Transylvania Atlas are <strong>not updated in real time</strong> and must not be relied upon as live financial quotes or price guarantees.
          </p>
          <p className="font-semibold text-[#1B3322]">
            Traveller Guidance: We strongly encourage all visitors to exchange currency solely through licensed commercial banks or official authorized exchange bureaus (<em>Case de Schimb Valutar</em>) with clearly posted zero-commission rates, and to verify live exchange rates independently via the National Bank of Romania (BNR) or official banking channels before transacting.
          </p>
        </div>
      </section>

      {/* 5. General Accuracy & "As-Is" Information */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          5. General Accuracy &amp; &ldquo;As-Is&rdquo; Editorial Disclaimer
        </h2>
        <p>
          Content on Transylvania Atlas is researched, drafted, and presented in good faith for cultural enrichment, historical exploration, and general travel planning.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-[#525B51]">
          <li>
            <strong>Independent Verification:</strong> While reasonable care is taken to verify information, Transylvania Atlas does not guarantee the absolute accuracy, completeness, current validity, or reliability of opening hours, admission prices, road passability (such as the Transfăgărășan seasonal closure), hiking trail markings, public transit timetables, or accessibility features.
          </li>
          <li>
            <strong>Mountain &amp; Outdoor Safety:</strong> Weather conditions in the Carpathian Mountains can change rapidly, and wildlife (including brown bears) is native to the region. Visitors are responsible for assessing their personal fitness, observing park rules, hiring licensed mountain guides where appropriate, and carrying adequate gear.
          </li>
        </ul>
      </section>

      {/* 6. Limitation of Liability */}
      <section className="space-y-4 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#9C5D1F]" />
          <span>6. Limitation of Liability</span>
        </h2>
        <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl space-y-3 text-xs text-[#525B51] shadow-xs">
          <p>
            To the maximum extent permitted by applicable law in the United Kingdom, European Union, and international jurisdictions:
          </p>
          <p className="uppercase font-semibold text-[#1B3322] leading-relaxed">
            Transylvania Atlas, its operator &ldquo;The Traveller,&rdquo; and any contributors shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages, including but not limited to loss of profits, personal injury, property damage, missed flights, cancelled reservations, vehicle rental disputes, or travel disruptions arising out of your access to, use of, or inability to use this website or reliance on any information contained herein.
          </p>
          <p>
            You assume full personal responsibility for your travel choices, safety, navigation, and compliance with local Romanian laws and municipal ordinances.
          </p>
        </div>
      </section>

      {/* 7. Governing Law & Jurisdiction */}
      <section className="space-y-3 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          7. Governing Law &amp; Jurisdiction
        </h2>
        <p>
          These Terms &amp; Conditions, their subject matter, and their formation shall be governed by and construed in accordance with the laws of the <strong>United Kingdom</strong> and applicable European Union legal principles, without regard to conflict of laws rules.
        </p>
        <p>
          Any dispute, claim, or controversy arising under or relating to these Terms or Transylvania Atlas shall be subject to the exclusive jurisdiction of the competent courts of the United Kingdom, unless statutory consumer protection laws in your country of residence mandate alternative jurisdiction.
        </p>
      </section>

      {/* 8. Modifications to Terms */}
      <section className="space-y-3 text-xs sm:text-sm text-[#495248] leading-relaxed">
        <h2 className="font-brand font-bold text-2xl text-[#1B3322] border-b border-[#E5E0D8] pb-2">
          8. Amendments to Terms
        </h2>
        <p>
          We reserve the right to revise, update, or modify these Terms &amp; Conditions at any time. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date at the top. Your continued use of Transylvania Atlas following the posting of amended terms signifies your agreement to the revisions.
        </p>
      </section>

      {/* 9. Contact Information */}
      <section className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-brand font-bold text-xl text-[#1B3322]">
          9. Contacting the Editorial Desk
        </h2>
        <p className="text-xs sm:text-sm text-[#495248] leading-relaxed">
          For legal inquiries, copyright notices, or questions regarding these Terms &amp; Conditions:
        </p>
        <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl text-xs space-y-1 font-mono text-[#2C352E]">
          <div><strong>Publication:</strong> Transylvania Atlas (transylvaniaatlas.com)</div>
          <div><strong>Author &amp; Operator:</strong> The Traveller</div>
          <div><strong>Contact Email:</strong> <a href="mailto:info@transylvaniaatlas.com" className="text-[#2D5A38] underline">info@transylvaniaatlas.com</a></div>
        </div>
      </section>
    </div>
  );
};
