import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, ChevronRight, MessageCircle, HeartPulse, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/compensationData';

interface ProductsPageProps {
  navigate: (path: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyIndications.some((ind) => ind.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white border border-emerald-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            100% ORGANIC AFRICAN & GLOBAL PHYTOTHERAPY
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            Milnapath 12-Product Master Therapeutic Catalog
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Formulated by seasoned phytotherapists and certified by NAFDAC. Designed to heal cellular toxicity, metabolic dysfunction, reproductive imbalances, and chronic infections without harsh chemical side effects.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-300 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              NAFDAC Approved
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HeartPulse className="w-4 h-4 text-amber-400" />
              25% Retail Profit Margin for Distributors
            </span>
            <span>•</span>
            <span>20% Personal Repurchase Cashback</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-stone-200/80 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or indication (e.g. ulcer, fertility, detox, prostate, malaria)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none text-stone-900"
          />
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-stone-400 font-bold uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid (All 12) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            Showing <strong className="text-stone-800">{filteredProducts.length}</strong> of 12 Products
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-emerald-700 font-bold hover:underline"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 border border-stone-200/90 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Image Header - Full uncropped display */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-stone-50 flex items-center justify-center p-3 border-b border-stone-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-900/90 text-emerald-100 shadow-xs border border-emerald-700/40">
                    {product.category}
                  </span>
                  <span className="text-xs font-extrabold text-amber-950 bg-amber-400 px-2.5 py-1 rounded-md shadow-xs">
                    {product.pv} PV
                  </span>
                </div>
              </div>

              {/* Card Title & Description */}
              <div className="p-5 border-b border-stone-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold tracking-wider">
                    NAFDAC Approved • Botanical Formula
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-2">
                  {product.shortDescription}
                </p>
              </div>

              {/* Card Middle: Key Clinical Indications */}
              <div className="p-6 space-y-3 bg-stone-50/40 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Key Indications & Target Symptoms:
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {product.keyIndications.slice(0, 3).map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Pricing & CTAs */}
              <div className="p-6 bg-white border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Retail Price</span>
                    <span className="font-extrabold text-base text-emerald-950 font-serif">
                      ₦{product.retailPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-700 block font-semibold">Distributor Price</span>
                    <span className="font-bold text-sm text-emerald-800">
                      ₦{product.memberPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    View Details
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                      `Hello Milnapath, I would like to order ${product.name} (₦${product.retailPrice.toLocaleString()} / Member: ₦${product.memberPrice.toLocaleString()}). Please assist me with payment and delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order (WA)</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become a Stockist Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Wholesale & Clinic Distribution
          </span>
          <h3 className="text-xl font-bold font-serif text-emerald-950">
            Want to Distribute Milnapath Products in Bulk?
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl">
            Open an official Mini (₦2M), Super (₦5M), or Mega Stockist center (₦10M) in your city and earn 4.5% to 7.5% overrides on all products dispensed.
          </p>
        </div>

        <button
          onClick={() => navigate('/compensation')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs shrink-0 shadow-md flex items-center gap-2"
        >
          <span>Explore Stockist Model</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
