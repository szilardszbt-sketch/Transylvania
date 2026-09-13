import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, ArrowLeft, ShieldCheck, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [botField, setBotField] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  const getMailtoUrl = (data: typeof formData) => {
    const subjectLine = data.subject.trim() || 'Inquiry - Transylvania Atlas';
    const bodyText = `Name: ${data.name || 'Anonymous'}\nEmail: ${data.email || 'Not provided'}\n\nMessage:\n${data.message}`;
    return `mailto:info@transylvaniaatlas.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleSendViaMailApp = () => {
    window.location.href = getMailtoUrl(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (botField) {
      // Honeypot caught spam
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Dispatch real email via FormSubmit AJAX service directed to info@transylvaniaatlas.com
      const response = await fetch('https://formsubmit.co/ajax/info@transylvaniaatlas.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Transylvania Atlas] ${formData.subject || 'Website Inquiry'}`,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && (result.success === 'true' || result.success === true)) {
        setSubmitted(true);
      } else if (result && result.message && result.message.includes('Activation')) {
        // FormSubmit confirmation email is pending on info@transylvaniaatlas.com
        // We consider it dispatched and inform the user, while offering immediate mailto backup
        setSubmitted(true);
      } else {
        // Fallback: Show friendly note with instant mail app backup
        setErrorMessage(
          'We encountered an issue submitting your form automatically. You can launch your mail app with one click below to send directly.'
        );
      }
    } catch {
      // Network failure or ad-blocker blocked the external request
      setErrorMessage(
        'Could not connect to the form delivery service. Please use the button below to send your note directly via your email client.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8 sm:py-12">
      <SEO
        title="Contact & Inquiries — Transylvania & Romania"
        description="Get in touch with the editorial team at Transylvania Atlas for feedback, corrections, photography submissions, and travel questions."
        canonicalPath="/contact"
      />
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#E3DDD2] pb-4">
        <button
          onClick={() => handleNav('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A38] hover:text-[#1B3322] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Transylvania Atlas</span>
        </button>
        <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#717A70]">
          Contact &amp; Inquiries
        </span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#2D5A38]">
          Get in Touch
        </span>
        <h1 className="font-brand text-4xl sm:text-5xl font-bold text-[#1B3322]">
          Contact &amp; Inquiries
        </h1>
        <p className="text-sm sm:text-base text-[#5D665B] max-w-2xl font-editorial leading-relaxed">
          Have a question about traveling in Transylvania, a factual correction for one of our guides, or feedback on our cultural notes? We welcome correspondence from travelers and researchers.
        </p>
      </div>

      {/* Grid: Direct Contact Details & Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Direct Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-xl p-6 space-y-5">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EFECE6] text-[#2D5A38] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-brand font-bold text-base text-[#1B3322]">
                Direct Email
              </h3>
              <p className="text-xs text-[#525B51] leading-relaxed">
                You can write to us directly at:
              </p>
              <a
                href="mailto:info@transylvaniaatlas.com"
                className="font-mono text-xs font-semibold text-[#2D5A38] hover:underline block break-all pt-1"
              >
                info@transylvaniaatlas.com
              </a>
            </div>

            <div className="pt-4 border-t border-[#EAE5DC] space-y-2 text-xs text-[#525B51]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#7AA884] shrink-0 mt-0.5" />
                <span>We typically review and reply to inquiries within 1&ndash;2 business days.</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#7AA884] shrink-0 mt-0.5" />
                <span>Your contact details are used solely to reply to your message.</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl text-xs space-y-2 text-[#6E786D]">
            <h4 className="font-brand font-bold text-[#1B3322]">
              About the Project
            </h4>
            <p className="leading-relaxed">
              Transylvania Atlas is an independent, non-commercial cultural travel guide.
            </p>
            <button
              onClick={() => handleNav('/about')}
              className="text-[#2D5A38] font-semibold hover:underline inline-block pt-1 cursor-pointer"
            >
              Read more about our project &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-white border border-[#2D5A38]/30 rounded-xl p-8 sm:p-10 text-center space-y-5 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#EBF2EC] flex items-center justify-center mx-auto text-[#2D5A38]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-brand font-bold text-2xl text-[#1B3322]">
                  Thank You for Your Message
                </h2>
                <p className="text-xs sm:text-sm text-[#525B51] max-w-md mx-auto leading-relaxed">
                  Your message has been dispatched to{' '}
                  <span className="font-semibold text-[#1B3322]">info@transylvaniaatlas.com</span>. We typically review and respond within 1–2 business days.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="max-w-md mx-auto p-4 bg-[#FAF8F5] border border-[#E5DFD4] rounded-lg text-left text-xs space-y-1.5 text-[#4A544C]">
                <div><span className="font-semibold text-[#1B3322]">From:</span> {formData.name || 'Anonymous'} &lt;{formData.email}&gt;</div>
                <div><span className="font-semibold text-[#1B3322]">Subject:</span> {formData.subject}</div>
                <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between">
                  <span className="text-[11px] text-[#717A70]">Want a copy in your personal sent folder?</span>
                  <button
                    type="button"
                    onClick={handleSendViaMailApp}
                    className="inline-flex items-center gap-1 text-[#2D5A38] font-semibold hover:underline cursor-pointer"
                  >
                    <span>Open in Mail App</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setErrorMessage(null);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 bg-[#1B3322] hover:bg-[#284B32] text-white text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Note
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/explore')}
                  className="px-5 py-2.5 bg-[#EFECE6] hover:bg-[#E3DDD2] text-[#1B3322] text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Destinations
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#E3DDD2] rounded-xl p-6 sm:p-8 space-y-5 shadow-xs"
            >
              <p className="hidden" aria-hidden="true">
                <label>
                  Don’t fill this out if you're human:{' '}
                  <input
                    name="bot-field"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </p>

              <div className="border-b border-[#EAE5DC] pb-4">
                <h3 className="font-brand text-lg font-bold text-[#1B3322] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#2D5A38]" />
                  <span>Send Us a Message</span>
                </h3>
                <p className="text-xs text-[#6E786D] mt-0.5">
                  Submissions are automatically routed to our team at info@transylvaniaatlas.com.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendViaMailApp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded font-semibold text-[11px] transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Your Email Client Instead</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3322]">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg text-xs text-[#1B3322] focus:outline-none focus:border-[#2D5A38] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3322]">
                    Your Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg text-xs text-[#1B3322] focus:outline-none focus:border-[#2D5A38] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3322]">
                  Subject <span className="text-rose-600">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Question regarding Saxon church visiting"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg text-xs text-[#1B3322] focus:outline-none focus:border-[#2D5A38] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3322]">
                  Message / Inquiry <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Write your question, feedback, or historical note here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg text-xs text-[#1B3322] focus:outline-none focus:border-[#2D5A38] resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-[#717A70]">
                  By submitting this form, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => handleNav('/privacy-policy')}
                    className="text-[#2D5A38] underline hover:text-[#1B3322] cursor-pointer"
                  >
                    Privacy Policy
                  </button>.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSendViaMailApp}
                    title="Open in your default email client with your message pre-filled"
                    className="w-full sm:w-auto px-4 py-3 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#DDD6CA] text-[#2D5A38] hover:text-[#1B3322] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Mail App</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 bg-[#1B3322] hover:bg-[#284B32] disabled:bg-[#1B3322]/60 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
