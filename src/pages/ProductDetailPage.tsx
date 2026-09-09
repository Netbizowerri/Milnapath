import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, HeartPulse, Sparkles, Award, Pill, Clock, PackageCheck, AlertCircle, PhoneCall, Maximize2, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/compensationData';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const retailTotal = product.retailPrice * quantity;
  const memberTotal = product.memberPrice * quantity;
  const savings = retailTotal - memberTotal;

  const whatsappMessage = `*NEW MILNAPATH PRODUCT ORDER*
----------------------------------------
*Product:* ${product.name}
*Category:* ${product.category}
*Quantity:* ${quantity} unit(s)
*Estimated Total:* ₦${retailTotal.toLocaleString()}
*Delivery Destination:* [Please enter your City/State]
----------------------------------------
Hello Milnapath Support, I would like to order ${quantity}x ${product.name}. How do I make payment and receive delivery?`;

  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <button
          onClick={() => navigate('/products')}
          className="hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </button>
        <span>/</span>
        <span className="text-stone-400">{product.category}</span>
        <span>/</span>
        <span className="text-emerald-900 font-bold">{product.name}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Visual Showcase Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl overflow-hidden text-white shadow-xl border border-emerald-700/60 relative flex flex-col justify-between">
            {/* Product Image Stage - Full uncropped display */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-stone-900/90 flex items-center justify-center p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-600/50 backdrop-blur-xs">
                  {product.category}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-950 bg-amber-400 px-3 py-1 rounded-full shadow-xs">
                  {product.pv} PV Awarded
                </span>
              </div>
            </div>

            {/* Product Title Bar inside detail card */}
            <div className="p-5 sm:p-6 bg-emerald-950/95 border-t border-emerald-800/80">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm sm:text-base text-emerald-200/95 mt-1 font-medium">
                {product.presentation}
              </p>
            </div>

            {/* Badges footer */}
            <div className="p-4 bg-emerald-950/90 border-t border-emerald-800/80 flex items-center justify-around text-center text-xs sm:text-sm text-emerald-300">
              <div>
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span>NAFDAC Approved</span>
              </div>
              <div className="border-l border-emerald-800 h-7"></div>
              <div>
                <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span>100% Pure Botanical</span>
              </div>
              <div className="border-l border-emerald-800 h-7"></div>
              <div>
                <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span>Clinical Potency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full Indications, Dosage & Ordering (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-emerald-950">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing & Order Config Card */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-7 border border-stone-200 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs sm:text-sm text-stone-500 block">Single Unit Retail Price</span>
                <span className="font-extrabold text-2xl sm:text-3xl text-emerald-950 font-serif">
                  ₦{product.retailPrice.toLocaleString()}
                </span>
              </div>
              <div className="bg-emerald-100/60 p-4 rounded-xl border border-emerald-200">
                <span className="text-xs sm:text-sm text-emerald-800 font-bold block">Distributor Member Price</span>
                <span className="font-bold text-xl sm:text-2xl text-emerald-900 font-serif">
                  ₦{product.memberPrice.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-emerald-800 block mt-1 font-medium">
                  Save ₦{(product.retailPrice - product.memberPrice).toLocaleString()} per unit with ₦10k registration!
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold uppercase tracking-wider text-stone-700">
                  Select Quantity:
                </label>
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 hover:bg-stone-100 text-stone-700 font-bold text-base"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-stone-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2 hover:bg-stone-100 text-stone-700 font-bold text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-sm text-stone-500 block">Total Retail Order:</span>
                <span className="font-extrabold text-xl sm:text-2xl text-emerald-950 font-serif">
                  ₦{retailTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buy via WhatsApp Button */}
            <div className="space-y-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Buy {quantity} Unit(s) via WhatsApp Now</span>
              </a>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm text-stone-600 pt-1">
                <span>Direct delivery available across all 36 Nigerian states & internationally.</span>
                <button
                  onClick={() => navigate('/register')}
                  className="text-amber-700 font-bold hover:underline text-left sm:text-right"
                >
                  Join as Distributor for ₦{memberTotal.toLocaleString()} →
                </button>
              </div>
            </div>
          </div>

          {/* Dosage & Administration Instructions */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              Recommended Dosage & Administration
            </h4>
            <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed">
              {product.dosage}
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 italic">
              Note: For optimal therapeutic response, maintain continuous usage for a complete 30 to 60-day cycle. Always drink ample clean water.
            </p>
          </div>
        </div>
      </div>

      {/* KEY ACTIVE BOTANICAL INGREDIENTS & FULL OFFICIAL BANNER SECTION */}
      <div className="space-y-6">
        {/* Active Botanicals Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-base font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-700" />
              Key Active Botanical Ingredients:
            </h4>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 self-start sm:self-auto">
              100% Organic Botanical Extracts
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.activeBotanicals.map((bot, i) => (
              <span
                key={i}
                className="bg-emerald-50 text-emerald-900 text-sm sm:text-base px-4 py-2 rounded-xl font-medium border border-emerald-200"
              >
                🌿 {bot}
              </span>
            ))}
          </div>
        </div>

        {/* Official Banner Displayed FULL */}
        {product.bannerUrl && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Official {product.name} Clinical Guide & Flyer
              </span>
              <button
                type="button"
                onClick={() => setIsBannerModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Fullscreen</span>
              </button>
            </div>

            <div 
              onClick={() => setIsBannerModalOpen(true)}
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-300 bg-stone-900 cursor-pointer group relative"
              title="Click to expand full flyer"
            >
              <img
                src={product.bannerUrl}
                alt={`${product.name} Official Presentation Banner`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-stone-700 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Click to enlarge full screen
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clinical Indications & Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full Key Indications & Symptoms Treated */}
        <div className="space-y-4 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="text-base font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-700" />
            Target Symptoms & Clinical Indications
          </h3>
          <ul className="space-y-3 text-sm sm:text-base text-stone-700">
            {product.keyIndications.map((ind, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Health Benefits */}
        <div className="space-y-4 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="text-base font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-700" />
            Comprehensive Physiological Benefits
          </h3>
          <ul className="space-y-3 text-sm sm:text-base text-stone-700">
            {product.fullBenefits.map((ben, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                <span>{ben}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Complementary Products Recommendation */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <h3 className="text-xl font-bold font-serif text-emerald-950">
          Other Highly Recommended Formulations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProducts.map((op) => (
            <div
              key={op.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50 flex items-center justify-center p-3 border-b border-stone-100">
                <img
                  src={op.imageUrl}
                  alt={op.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 text-xs font-bold text-emerald-100 uppercase bg-emerald-900/90 px-2.5 py-1 rounded-full shadow-xs">
                  {op.category}
                </span>
                <span className="absolute top-2 right-2 text-xs font-bold text-amber-900 bg-amber-400 px-2.5 py-1 rounded-md shadow-xs">
                  {op.pv} PV
                </span>
              </div>

              <div className="p-5 flex-1">
                <h4 className="font-bold text-base sm:text-lg text-stone-900 font-serif group-hover:text-emerald-700 transition-colors">
                  {op.name}
                </h4>
                <p className="text-sm text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {op.shortDescription}
                </p>
              </div>

              <div className="p-5 pt-3 flex items-center justify-between border-t border-stone-100 bg-stone-50/50">
                <span className="font-bold text-base text-emerald-950">
                  ₦{op.retailPrice.toLocaleString()}
                </span>
                <button
                  onClick={() => navigate(`/products/${op.slug}`)}
                  className="text-sm font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  View Product →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR BANNER */}
      {isBannerModalOpen && product.bannerUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsBannerModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls */}
            <div className="w-full flex items-center justify-between text-white pb-3">
              <span className="text-sm font-semibold text-stone-300">
                {product.name} Official Banner (Full View)
              </span>
              <button
                type="button"
                onClick={() => setIsBannerModalOpen(false)}
                className="bg-stone-800 hover:bg-stone-700 text-white rounded-full p-2 transition-colors cursor-pointer border border-stone-700 shadow-lg flex items-center gap-1 text-xs font-semibold px-3"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Modal Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl flex items-center justify-center max-h-[85vh] overflow-y-auto">
              <img
                src={product.bannerUrl}
                alt={`${product.name} Official Full Banner`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
