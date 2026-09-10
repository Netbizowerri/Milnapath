import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, onClose, onSuccessRedirect }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit lead to Formspree
      await fetch(COMPANY_DETAILS.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          source: 'Milnapath Exit-Intent PDF Download',
          leadType: '7-Figure Playbook Lead Magnet',
          ...formData,
          crmTag: 'Privyr-Milnapath-Lead-Magnet',
          submittedAt: new Date().toISOString()
        })
      });
    } catch {
      // fallback smoothly
    } finally {
      setLoading(false);
      setSubmitted(true);

      // Trigger dummy download of the guide
      setTimeout(() => {
        onSuccessRedirect();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-300 hover:text-white p-1 rounded-full hover:bg-purple-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
            FREE EXCLUSIVE PDF PLAYBOOK
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif leading-tight">
            Wait! Don’t Leave Without The 2026 Milnapath 7-Figure Playbook
          </h3>
          <p className="text-sm sm:text-base text-purple-200 mt-2 leading-relaxed">
            "The Step-By-Step System to Reaching Diamond Rank in 90 Days with 14% Binary Leverage & Organic Phytotherapy."
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-purple-950 font-serif">
                Download Authorized!
              </h4>
              <p className="text-sm sm:text-base text-stone-600 max-w-sm mx-auto leading-relaxed">
                Your PDF guide has been dispatched to <span className="font-semibold text-purple-800">{formData.email}</span> and WhatsApp. Redirecting you to the Videos...
              </p>
              <div className="pt-2">
                <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-100 text-sm text-purple-950">
                <FileText className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">What is inside this confidential 24-page report:</span>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-stone-700 text-xs sm:text-sm">
                    <li>Exact breakdown of the 14% binary matching formula</li>
                    <li>How ₦10,000 Foretaste yields 30% instant referral kickbacks</li>
                    <li>Clinical phytotherapy prescription guide for all 12 products</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Emmanuel Okon"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                  WhatsApp Number (For PDF & Video Access) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 08031234567"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                  Best Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., emmanuel@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600 text-stone-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold rounded-xl text-base shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
                >
                  {loading ? (
                    <span>Processing Instant Download...</span>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Free PDF & Proceed to VSL</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Zero Spam Guarantee. Instant direct routing to Privyr CRM.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
