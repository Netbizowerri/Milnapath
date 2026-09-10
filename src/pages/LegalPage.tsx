import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, ArrowLeft } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'income-disclaimer';
  navigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 hover:text-purple-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Main Funnel</span>
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-stone-200/90 space-y-8">
        {type === 'income-disclaimer' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-purple-950">
                  Official Income & Health Disclaimer
                </h1>
                <p className="text-xs text-stone-500">
                  Millennium Nature's Path Intl (Milnapath International) • Last updated January 2026
                </p>
              </div>
            </div>

            <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
              <h3 className="text-base font-bold text-purple-950">1. Nature of the Direct Selling Business</h3>
              <p>
                Participation in the Milnapath International compensation plan presents a legitimate business and direct retail sales opportunity. Individual earnings are strictly directly correlated with personal skill, active sales production, team mentorship, and marketplace diligence.
              </p>
              <p>
                Milnapath International does NOT offer an investment scheme, passive return on investment (ROI), or get-rich-quick program. No earnings are guaranteed solely by paying the ₦10,000 Foretaste registration fee or purchasing product packages. Commissions are paid exclusively upon bona fide retail transactions and product point volume (PV) generated within compliant downline structures.
              </p>

              <h3 className="text-base font-bold text-purple-950">2. Earnings Simulator & Hypothetical Projections</h3>
              <p>
                Any figures, earnings estimates, rank achievements, car awards, or bonus calculations displayed on this website or in the interactive calculator are for illustrative, educational, and simulation purposes only. Past performance of top leaders is not indicative of future results for every participant. The average distributor achieves earnings according to personal retail turnover and customer retention.
              </p>

              <h3 className="text-base font-bold text-purple-950">3. Dietary Supplement & Health Statement</h3>
              <p>
                The statements regarding Milnapath products—including Detox Plus, Gastro-Pro, Nakom Oil, Gynomil, D-Man, Glucomil, Rejuvenating Drink, and others—have been documented under traditional phytotherapy and approved by regulatory authorities such as NAFDAC as herbal remedies and dietary health supplements.
              </p>
              <p>
                These products are formulated to support the body’s natural biological recuperative mechanisms. They do not replace emergency medical interventions or licensed physician consultations. Individuals with severe chronic illnesses, pregnant women, or nursing mothers should seek clinical counsel before starting new health regimens.
              </p>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-purple-950">
                  Privacy Policy & Data Processing
                </h1>
                <p className="text-xs text-stone-500">
                  Respecting Your Personal Data • Compliant with NDPR & Global Privacy Standards
                </p>
              </div>
            </div>

            <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
              <h3 className="text-base font-bold text-purple-950">1. Information We Collect</h3>
              <p>
                When you submit forms on this website (such as the Lead Magnet opt-in, Video Training registration, Qualification Survey, or Distributor Registration Form), we collect information including your Full Name, WhatsApp phone number, email address, physical location, bank details, and desired genealogy ID.
              </p>

              <h3 className="text-base font-bold text-purple-950">2. CRM & Processing Integration (Formspree & Privyr)</h3>
              <p>
                Submissions on this sales funnel are securely transmitted using encrypted SSL endpoints via Formspree and ingested into our Privyr CRM pipeline to facilitate swift WhatsApp verification, mentorship dispatch, and courier shipment coordination. We do not sell, rent, or lease your personal contact details to any third-party marketing firms.
              </p>

              <h3 className="text-base font-bold text-purple-950">3. Communication via WhatsApp & Email</h3>
              <p>
                By opting into the video access or submitting an application, you consent to receive direct business updates, mentorship session links, and order dispatch notices from our official WhatsApp line (+234 903 823 7790). You may opt-out or request data erasure at any time by replying "STOP" or notifying support.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-purple-950">
                  Terms of Service & Distributor Agreement
                </h1>
                <p className="text-xs text-stone-500">
                  Millennium Nature’s Path Intl • Effective 2026
                </p>
              </div>
            </div>

            <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
              <h3 className="text-base font-bold text-purple-950">1. Independent Distributor Status</h3>
              <p>
                Upon enrollment and payment of the ₦10,000 Foretaste fee or chosen package to Guaranty Trust Bank (Account: 0718549018, Millennium Nature's Path Intl), the applicant becomes an Independent Distributor. You operate as an independent contractor, not an employee, agent, or legal partner of the company.
              </p>

              <h3 className="text-base font-bold text-purple-950">2. Ethical Advertising & Claims</h3>
              <p>
                Distributors agree to market Milnapath products strictly using company-verified indications, avoiding unauthorized medical cure guarantees. Distributors may not manipulate genealogy structures, cross-recruit from other Milnapath sponsor lines, or engage in unfair trade practices.
              </p>

              <h3 className="text-base font-bold text-purple-950">3. Bank Transfer Verification</h3>
              <p>
                All account activations are subject to bank confirmation by the corporate accounting department. False payment claims or forged transfer receipts result in immediate termination of distributor privileges and forfeiture of accumulated PV.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Official Corporate Support: +234 903 823 7790
          </span>
          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2.5 bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Go to Distributor Registration
          </button>
        </div>
      </div>
    </div>
  );
};
