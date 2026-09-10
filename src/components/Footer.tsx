import React from 'react';
import { ShieldCheck, PhoneCall, Mail, Building, Landmark, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';
import { PRODUCTS } from '../data/productsData';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-purple-950 text-purple-100 border-t border-purple-900 pt-16 pb-24 md:pb-12 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Corporate Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-900/80">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-[53px] h-[53px] rounded-xl overflow-hidden shadow-lg border border-white/20 shrink-0 bg-[#502C46] flex items-center justify-center">
                <img
                  src="https://i.ibb.co/YFhcJhNm/Milnapath-International-2.jpg"
                  alt="Milnapath International Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl text-white font-serif tracking-tight">
                  MILNAPATH
                </span>
                <span className="text-xs uppercase font-bold tracking-widest bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded ml-1.5 border border-amber-400/30">
                  INTL
                </span>
                <p className="text-xs sm:text-sm text-purple-300 font-medium">Millennium Nature’s Path Intl</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
              Pioneering cellular regenerative phytotherapy across Africa. We empower families with scientifically validated natural health products while creating sustainable, generational wealth through an equitable direct selling model.
            </p>

            <div className="pt-1 flex flex-col gap-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-purple-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>NAFDAC Approved Natural Formulations</span>
              </div>
            </div>
          </div>

          {/* Quick Funnel Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 font-serif">
              Sales Funnel & Systems
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Health & Wealth Opportunity
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/vsl')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/apply')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Direct Mentorship Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/register')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Official Distributor Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/compensation')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  12 Ways to Earn & Income Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/products')}
                  className="hover:text-amber-300 text-purple-200 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-4 h-4 text-purple-500" />
                  Full 12-Product Herbal Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Herbal Formulations */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 font-serif">
              Therapeutic Catalog
            </h4>
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-2 text-xs sm:text-sm">
              {PRODUCTS.slice(0, 10).map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => navigate(`/products/${prod.slug}`)}
                  className="text-left text-purple-200/90 hover:text-white truncate transition-colors text-xs sm:text-sm"
                >
                  • {prod.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-xs sm:text-sm text-amber-400 hover:underline pt-1 inline-block font-semibold"
            >
              View all 12 products →
            </button>
          </div>

          {/* Official Bank Verification Card */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 font-serif">
              Official Corporate Banking
            </h4>
            <div className="p-4 rounded-xl bg-purple-900/60 border border-purple-700/60 shadow-inner space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-200">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>{COMPANY_DETAILS.bankName}</span>
              </div>
              <div className="bg-purple-950/80 p-3 rounded-lg border border-purple-800">
                <span className="text-xs text-purple-400 block uppercase tracking-wider font-semibold">Account Number</span>
                <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                  {COMPANY_DETAILS.accountNumber}
                </span>
                <span className="text-xs sm:text-sm text-purple-300 block truncate mt-0.5 font-medium">
                  {COMPANY_DETAILS.accountName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                Send registration proof of transfer directly to WhatsApp verification line:
              </p>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello Milnapath, I have completed my registration payment to GT Bank.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+234 903 823 7790</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-purple-400/90">
          <p>
            © {new Date().getFullYear()} Millennium Nature’s Path Intl (Milnapath International). All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-purple-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/terms-of-service')}
              className="hover:text-purple-200 transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/income-disclaimer')}
              className="hover:text-amber-300 transition-colors font-medium text-amber-400/90"
            >
              Income & Health Disclaimer
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-900/50 text-xs sm:text-sm text-purple-400/80 leading-relaxed text-center">
          Disclaimer: Dietary supplements and botanical extracts manufactured or distributed by Milnapath International are formulated to support overall health and physiological wellness. Results vary based on individual metabolism, adherence to dosage, and lifestyle. Direct selling earnings depend on personal diligence, sales capability, and leadership development.
        </div>
      </div>
    </footer>
  );
};
