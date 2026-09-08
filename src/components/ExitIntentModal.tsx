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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            FREE EXCLUSIVE PDF PLAYBOOK
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
            Wait! Don’t Leave Without The 2026 Milnapath 7-Figure Playbook
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 mt-2">
            "The Step-By-Step System to Reaching Diamond Rank in 90 Days with 14% Binary Leverage & Organic Phytotherapy."
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-emerald-950 font-serif">
                Download Authorized!
              </h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Your PDF guide has been dispatched to <span className="font-semibold text-emerald-800">{formData.email}</span> and WhatsApp. Redirecting you to the Video Masterclass...
              </p>
              <div className="pt-2">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start gap-3 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">What is inside this confidential 24-page report:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-stone-700 text-[11px]">
                    <li>Exact breakdown of the 14% binary matching formula</li>
                    <li>How ₦10,000 Foretaste yields 30% instant referral kickbacks</li>
                    <li>Clinical phytotherapy prescription guide for all 12 products</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Emmanuel Okon"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  WhatsApp Number (For PDF & Video Access) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 08031234567"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Best Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., emmanuel@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75"
                >
                  {loading ? (
                    <span>Processing Instant Download...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Free PDF & Proceed to VSL</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Spam Guarantee. Instant direct routing to Privyr CRM.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
