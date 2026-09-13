import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Info,
  ArrowRight,
  Type,
  Check,
  ListChecks,
  Compass,
  AlertTriangle,
  Lightbulb,
  Share2,
  BookmarkCheck
} from 'lucide-react';
import { practicalGuides } from '../data/practicalGuides';
import { ShareButtons } from '../components/common/ShareButtons';
import { SEO } from '../components/common/SEO';

interface PracticalGuideDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

type TextSize = 'standard' | 'large' | 'larger';

export const PracticalGuideDetailPage: React.FC<PracticalGuideDetailPageProps> = ({ slug, onNavigate }) => {
  const guide = practicalGuides.find(g => g.slug === slug) || practicalGuides[0];
  const otherGuides = practicalGuides.filter(g => g.id !== guide.id).slice(0, 3);

  // Font size state
  const [textSize, setTextSize] = useState<TextSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('romania_guide_text_size') as TextSize) || 'standard';
    }
    return 'standard';
  });

  const [activeTab, setActiveTab] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSetTextSize = (size: TextSize) => {
    setTextSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('romania_guide_text_size', size);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Font size classes based on state
  const fontClasses = {
    standard: {
      prose: 'text-[16px] sm:text-[17px] leading-[1.75]',
      bullet: 'text-[15px] sm:text-[16px] leading-relaxed',
      subheading: 'text-xl sm:text-2xl',
      cardTitle: 'text-base sm:text-lg',
      summary: 'text-lg sm:text-xl leading-relaxed'
    },
    large: {
      prose: 'text-[18px] sm:text-[19px] leading-[1.8]',
      bullet: 'text-[17px] sm:text-[18px] leading-relaxed',
      subheading: 'text-2xl sm:text-3xl',
      cardTitle: 'text-lg sm:text-xl',
      summary: 'text-xl sm:text-2xl leading-relaxed'
    },
    larger: {
      prose: 'text-[20px] sm:text-[21px] leading-[1.85]',
      bullet: 'text-[19px] sm:text-[20px] leading-relaxed',
      subheading: 'text-3xl sm:text-4xl',
      cardTitle: 'text-xl sm:text-2xl',
      summary: 'text-2xl sm:text-3xl leading-relaxed'
    }
  }[textSize];

  // Parse sections
  const rawSections = guide.content.trim().split(/(?=### )/g);

  // Extract table of contents headings
  const tocItems = rawSections.map((sec, idx) => {
    const lines = sec.trim().split('\n');
    const firstLine = lines[0] || '';
    const title = firstLine.startsWith('### ') ? firstLine.replace('### ', '') : 'Overview';
    const anchorId = `section-${idx}`;
    return { id: anchorId, title };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-8">
      <SEO
        title={`${guide.title} — Transylvania Travel Guide`}
        description={guide.summary}
        canonicalPath={`/guides/${guide.slug}`}
      />
      {/* Top Breadcrumb & Share */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DDD2] pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#717A70]">
          <button 
            onClick={() => onNavigate('/')} 
            className="hover:underline hover:text-[#1B3322] cursor-pointer transition-colours"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button 
            onClick={() => onNavigate('/plan-your-visit')} 
            className="hover:underline hover:text-[#1B3322] cursor-pointer transition-colours"
          >
            Plan Your Visit
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1B3322] font-semibold truncate max-w-[200px] sm:max-w-xs">{guide.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E3DDD2] bg-white hover:bg-[#F6F4EF] text-xs font-medium text-[#1B3322] transition-colours cursor-pointer"
            title="Copy guide link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2D5A38]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#5D665B]" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Guide Header Banner */}
      <div className="space-y-5 bg-gradient-to-b from-[#FAF8F5] to-[#F4EFEA] border border-[#E4DED4] p-6 sm:p-8 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs text-[#2D5A38] bg-[#E8F0EA] px-3 py-1 rounded-full font-semibold uppercase tracking-wider border border-[#D5E5D8]">
            <BookOpen className="w-3.5 h-3.5 text-[#2D5A38]" />
            <span>Practical Reference Guide</span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-[#626C61]">
            <span className="flex items-center gap-1.5 bg-white/80 border border-[#E2DDD3] px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-[#2D5A38]" />
              {guide.readTime}
            </span>
          </div>
        </div>

        <h1 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3322] leading-tight tracking-tight">
          {guide.title}
        </h1>

        <p className={`text-[#3C443D] font-editorial italic ${fontClasses.summary} border-l-3 border-[#2D5A38] pl-4`}>
          {guide.summary}
        </p>

        {/* Readability & Text Size Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E5E0D8]/80 text-xs text-[#525C51]">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#2D5A38]" />
            <span className="font-medium">Reading Text Size:</span>
            <div className="inline-flex rounded-lg border border-[#DCD6CC] bg-white p-0.5 shadow-2xs">
              <button
                onClick={() => handleSetTextSize('standard')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  textSize === 'standard' 
                    ? 'bg-[#1B3322] text-white shadow-2xs' 
                    : 'text-[#555E54] hover:bg-[#F2EFE9]'
                }`}
              >
                Default (17px)
              </button>
              <button
                onClick={() => handleSetTextSize('large')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  textSize === 'large' 
                    ? 'bg-[#1B3322] text-white shadow-2xs' 
                    : 'text-[#555E54] hover:bg-[#F2EFE9]'
                }`}
              >
                Large (19px)
              </button>
              <button
                onClick={() => handleSetTextSize('larger')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  textSize === 'larger' 
                    ? 'bg-[#1B3322] text-white shadow-2xs' 
                    : 'text-[#555E54] hover:bg-[#F2EFE9]'
                }`}
              >
                Extra Large (21px)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#6B756A] font-sans">
            <BookmarkCheck className="w-4 h-4 text-[#2D5A38]" />
            <span>Updated with official Romanian regulations</span>
          </div>
        </div>
      </div>

      {/* Key Takeaways Box (Arranged into High-Contrast Scannable Bullet Cards) */}
      <div className="bg-[#FAF8F4] border-2 border-[#DCD5C9] rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#1B3322]">
          <div className="w-8 h-8 rounded-lg bg-[#2D5A38] text-white flex items-center justify-center shrink-0">
            <ListChecks className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-brand text-lg sm:text-xl font-bold">Key Takeaways & Rules of Thumb</h2>
            <p className="text-xs text-[#6B756A]">Essential summary points to keep in mind before you travel</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {guide.keyTakeaways.map((takeaway, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3 bg-white border border-[#E5E0D7] p-4 rounded-xl shadow-2xs hover:border-[#2D5A38]/40 transition-colours"
            >
              <div className="w-5 h-5 rounded-full bg-[#EBF3ED] flex items-center justify-center shrink-0 mt-0.5 border border-[#CFE2D3]">
                <Check className="w-3.5 h-3.5 text-[#2D5A38] stroke-[2.5]" />
              </div>
              <span className={`text-[#2D352F] font-sans ${fontClasses.bullet}`}>
                {takeaway}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Table of Contents Quick Navigation Bar */}
      {tocItems.length > 1 && (
        <div className="bg-white border border-[#E3DDD2] rounded-xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5D665B]">
            <Compass className="w-4 h-4 text-[#2D5A38]" />
            <span>Quick Section Index</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {tocItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.id}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-lg bg-[#F5F2EC] hover:bg-[#1B3322] text-[#2C342D] hover:text-white transition-all border border-[#E3DCD1]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A38] group-hover:bg-white" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Structured Guide Content Sections */}
      <div className="space-y-12">
        {rawSections.map((sectionText, sIdx) => {
          const trimmed = sectionText.trim();
          if (!trimmed) return null;

          const lines = trimmed.split('\n');
          const isHeading = lines[0].startsWith('### ');
          const sectionTitle = isHeading ? lines[0].replace('### ', '').trim() : '';
          const bodyLines = isHeading ? lines.slice(1) : lines;
          const sectionBody = bodyLines.join('\n').trim();

          // Split paragraphs or bullet blocks inside section
          const paragraphs = sectionBody.split('\n\n');

          return (
            <section 
              key={sIdx} 
              id={`section-${sIdx}`} 
              className="scroll-mt-24 space-y-6"
            >
              {sectionTitle && (
                <div className="flex items-center gap-3 border-b-2 border-[#E5DFD4] pb-3 pt-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1B3322] text-white text-xs font-bold font-sans">
                    {sIdx + 1}
                  </span>
                  <h2 className={`font-brand font-bold text-[#1B3322] ${fontClasses.subheading}`}>
                    {sectionTitle}
                  </h2>
                </div>
              )}

              <div className="space-y-5 text-[#242B25] font-sans">
                {paragraphs.map((para, pIdx) => {
                  const paraTrimmed = para.trim();
                  if (!paraTrimmed) return null;

                  // Check if it's a Callout / Tip block (starts with '> ')
                  if (paraTrimmed.startsWith('> ')) {
                    const tipContent = paraTrimmed.replace(/^>\s*/gm, '');
                    return (
                      <div 
                        key={pIdx} 
                        className="bg-[#F3F8F4] border-l-4 border-[#2D5A38] p-4 sm:p-5 rounded-r-xl space-y-1 my-4 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D5A38]">
                          <Lightbulb className="w-4 h-4 text-[#2D5A38]" />
                          <span>Local Recommendation & Tip</span>
                        </div>
                        <p className={`text-[#263329] ${fontClasses.prose} font-editorial italic`}>
                          {tipContent}
                        </p>
                      </div>
                    );
                  }

                  // Check if it's a Warning / Alert block
                  if (paraTrimmed.startsWith('! ') || paraTrimmed.toLowerCase().includes('zero tolerance') || paraTrimmed.toLowerCase().includes('important:')) {
                    return (
                      <div 
                        key={pIdx} 
                        className="bg-[#FFF9F2] border-l-4 border-[#D97706] p-4 sm:p-5 rounded-r-xl space-y-1 my-4 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                          <span>Important Regulation</span>
                        </div>
                        <p className={`text-[#45280A] ${fontClasses.bullet}`}>
                          {paraTrimmed.replace(/^!\s*/, '')}
                        </p>
                      </div>
                    );
                  }

                  // Bullet Points list (starts with '- ')
                  if (paraTrimmed.startsWith('- ')) {
                    const bulletLines = paraTrimmed.split('\n').filter(l => l.trim().startsWith('- '));
                    return (
                      <div key={pIdx} className="grid grid-cols-1 gap-3 my-3">
                        {bulletLines.map((line, lIdx) => {
                          const cleanLine = line.replace(/^-\s*/, '').trim();
                          
                          // Format bold title and description if present: **Title:** Description
                          const matchBold = cleanLine.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
                          
                          if (matchBold) {
                            const [, label, desc] = matchBold;
                            return (
                              <div 
                                key={lIdx} 
                                className="flex items-start gap-3.5 bg-[#FAF8F5] border border-[#E7E2D8] hover:border-[#2D5A38]/50 p-4 rounded-xl shadow-2xs transition-colours"
                              >
                                <div className="w-2.5 h-2.5 rounded-full bg-[#2D5A38] mt-2 shrink-0 ring-4 ring-[#E8F0EA]" />
                                <div className="space-y-0.5">
                                  <strong className={`font-brand font-bold text-[#1B3322] block ${fontClasses.cardTitle}`}>
                                    {label}
                                  </strong>
                                  <span className={`text-[#384039] block ${fontClasses.bullet}`}>
                                    {desc}
                                  </span>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div 
                              key={lIdx} 
                              className="flex items-start gap-3.5 bg-[#FAF8F5] border border-[#E7E2D8] p-3.5 rounded-xl shadow-2xs"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#2D5A38] mt-2.5 shrink-0" />
                              <span className={`text-[#384039] ${fontClasses.bullet}`}>
                                {cleanLine}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  // Numbered Step list (starts with 1., 2., etc.)
                  if (paraTrimmed.match(/^\d+\.\s/)) {
                    const stepLines = paraTrimmed.split('\n').filter(l => l.trim().match(/^\d+\.\s/));
                    return (
                      <div key={pIdx} className="grid grid-cols-1 gap-3.5 my-3">
                        {stepLines.map((line, lIdx) => {
                          const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
                          const matchBold = cleanLine.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);

                          return (
                            <div 
                              key={lIdx} 
                              className="flex items-start gap-3.5 bg-white border border-[#E4DED3] p-4 rounded-xl shadow-2xs"
                            >
                              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EAE5DB] text-[#1B3322] font-bold text-xs shrink-0 font-sans border border-[#D9D2C6]">
                                {lIdx + 1}
                              </div>
                              <div className="space-y-1">
                                {matchBold ? (
                                  <>
                                    <h4 className={`font-brand font-bold text-[#1B3322] ${fontClasses.cardTitle}`}>
                                      {matchBold[1]}
                                    </h4>
                                    <p className={`text-[#3A433B] ${fontClasses.bullet}`}>
                                      {matchBold[2]}
                                    </p>
                                  </>
                                ) : (
                                  <p className={`text-[#3A433B] ${fontClasses.bullet}`}>
                                    {cleanLine}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  // Regular Prose Paragraph
                  return (
                    <p 
                      key={pIdx} 
                      className={`text-[#2F3630] ${fontClasses.prose} leading-[1.8] tracking-normal`}
                    >
                      {paraTrimmed}
                    </p>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Frequently Asked Questions Accordion Box */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div className="space-y-6 pt-8 border-t-2 border-[#E3DDD2]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2D5A38] text-white flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-brand text-2xl font-bold text-[#1B3322]">
                Frequently Asked Practical Questions
              </h2>
              <p className="text-xs text-[#6B756A]">Direct answers to the most common queries from travellers</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {guide.faqs.map((faq, fIdx) => (
              <div 
                key={fIdx} 
                className="bg-white border border-[#E3DDD2] rounded-xl p-5 sm:p-6 space-y-2.5 shadow-2xs hover:border-[#2D5A38]/40 transition-colours"
              >
                <h3 className="font-brand font-bold text-base sm:text-lg text-[#1B3322] flex items-start gap-2.5">
                  <span className="text-[#2D5A38] font-mono text-sm">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <div className="pl-6 border-l-2 border-[#EBF3ED]">
                  <p className={`text-[#444E45] ${fontClasses.bullet} leading-relaxed`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Practical Guides Grid */}
      <div className="space-y-5 pt-10 border-t-2 border-[#E3DDD2]">
        <div className="flex items-center justify-between">
          <h3 className="font-brand text-2xl font-bold text-[#1B3322]">
            Explore More Practical Guides
          </h3>
          <button
            onClick={() => onNavigate('/plan-your-visit')}
            className="text-xs font-semibold text-[#2D5A38] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All Travel Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherGuides.map(og => (
            <div
              key={og.id}
              onClick={() => {
                onNavigate(`/plan-your-visit/${og.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-[#E5E0D8] rounded-xl p-5 hover:border-[#2D5A38] hover:bg-[#FAF8F4] transition-all cursor-pointer group flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-2">
                <span className="text-[11px] text-[#788476] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#2D5A38]" />
                  {og.readTime}
                </span>
                <h4 className="font-brand text-base font-bold text-[#1B3322] group-hover:text-[#2D5A38] leading-snug transition-colours">
                  {og.title}
                </h4>
                <p className="text-xs text-[#5D665B] line-clamp-2 leading-relaxed">
                  {og.summary}
                </p>
              </div>

              <div className="text-xs font-semibold text-[#1B3322] group-hover:text-[#2D5A38] pt-4 flex items-center justify-between border-t border-[#F2EEE8] mt-4">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
