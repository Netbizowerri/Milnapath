import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  LayoutGrid,
  Table as TableIcon,
  Tag,
  TrendingUp,
  Download
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, OFFICIAL_PRICE_LIST } from '../data/productsData';
import { COMPANY_DETAILS } from '../data/compensationData';

interface ProductsPageProps {
  navigate: (path: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copied, setCopied] = useState<boolean>(false);

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

  const rawPriceListText = `*MILNAPATH PRICE LIST*
*PDT Name       Dist. ~N~    Retail ~N~*
Detox plus        11000     14000
Rejuvenating    12000     15000
Gastro Pro        12000     15000
Blood build tea 12000     15000
Peptic tea          12000     15000
Kardiamil           11000     14000 
Glucomil            11000     14000 
Gynomil             11000     14000 
Dman                 11000     14000 
Nakom oil          8000       10000 
Malaria/ typh.   11000     14000
Control oil            8000     10000
Body lotion        12000     15000
Organic soap    12000     15000`;

  const handleCopyPriceList = async () => {
    try {
      await navigator.clipboard.writeText(rawPriceListText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-3xl p-6 sm:p-10 text-white border border-purple-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            100% ORGANIC AFRICAN & GLOBAL PHYTOTHERAPY
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            Milnapath Master Formulations & Official Price List
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
            Formulated by seasoned phytotherapists and certified by NAFDAC. Designed to heal cellular toxicity, metabolic dysfunction, cardiovascular imbalance, reproductive issues, and chronic infections without chemical side effects.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-purple-200 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              NAFDAC Approved
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-amber-400" />
              Up to 27% Retail Profit Margin for Distributors
            </span>
            <span>•</span>
            <span>20% Personal Repurchase Cashback</span>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleCopyPriceList}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Price List Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Official WhatsApp Price List</span>
                </>
              )}
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-800/80 hover:bg-purple-700 text-purple-100 rounded-xl font-bold text-sm border border-purple-600/60 transition-colors"
            >
              {viewMode === 'grid' ? (
                <>
                  <TableIcon className="w-4 h-4 text-amber-300" />
                  <span>Switch to Price List Table</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-4 h-4 text-amber-300" />
                  <span>Switch to Product Cards Grid</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Official Price List Quick Summary Strip */}
      <div className="bg-gradient-to-r from-purple-50 via-amber-50/50 to-purple-50 border border-purple-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-700 text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-purple-950">
              Official Milnapath Product Pricing Schedule (Naira ~₦~)
            </h2>
            <p className="text-xs text-stone-600">
              Wholesale Distributor Rate vs. Suggested Consumer Retail Rate with guaranteed profit spread
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleCopyPriceList}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 border border-purple-200 text-purple-900 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-purple-600" />}
            <span>{copied ? 'Copied' : 'Copy List'}</span>
          </button>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
              `Hello Milnapath, please assist me with registering as a distributor or ordering products at wholesale price:\n\n${rawPriceListText}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-amber-300" />
            <span>Order Wholesale</span>
          </a>
        </div>
      </div>

      {/* Filter, Search and View Toggle Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-200/80 space-y-4">
        {/* Search Input & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name or indication (e.g. detox, peptic, kardiamil, malaria, soap)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-purple-600 focus:outline-none text-stone-900"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Price Table</span>
            </button>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-sm">
          <span className="text-stone-500 font-bold uppercase tracking-wider text-xs shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-purple-800 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Table View OR Grid View */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-stone-600 px-1">
            <span>
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of {PRODUCTS.length} Official Formulations
            </span>
            <div className="flex items-center gap-3">
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-purple-700 font-bold hover:underline text-xs sm:text-sm"
                >
                  Reset Category Filter
                </button>
              )}
              <button
                onClick={handleCopyPriceList}
                className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors inline-flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Formatted Text'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-stone-900 text-white border-b border-stone-800 font-serif text-xs uppercase tracking-wider">
                    <th className="py-4 px-4 sm:px-6">PDT Name</th>
                    <th className="py-4 px-4 text-right">Dist. (~₦~)</th>
                    <th className="py-4 px-4 text-right">Retail (~₦~)</th>
                    <th className="py-4 px-4 text-right">Retail Profit (~₦~)</th>
                    <th className="py-4 px-4 hidden md:table-cell">Category</th>
                    <th className="py-4 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((product) => {
                    const profit = product.retailPrice - product.memberPrice;
                    const margin = Math.round((profit / product.retailPrice) * 100);

                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-purple-50/50 transition-colors group"
                      >
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => navigate(`/products/${product.slug}`)}
                                className="font-bold text-stone-900 group-hover:text-purple-700 transition-colors text-left text-sm sm:text-base"
                              >
                                {product.name}
                              </button>
                              <span className="block text-xs text-stone-500 line-clamp-1 max-w-xs">
                                {product.shortDescription}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-bold text-purple-800">
                          ₦{product.memberPrice.toLocaleString()}
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-bold text-stone-900">
                          ₦{product.retailPrice.toLocaleString()}
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-semibold text-emerald-700">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-xs">
                            +₦{profit.toLocaleString()} ({margin}%)
                          </span>
                        </td>

                        <td className="py-4 px-4 hidden md:table-cell text-xs text-stone-600">
                          <span className="bg-stone-100 px-2.5 py-1 rounded-full font-medium">
                            {product.category}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => navigate(`/products/${product.slug}`)}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg transition-colors"
                            >
                              Details
                            </button>
                            <a
                              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                                `Hello Milnapath, I want to order ${product.name} (Wholesale: ₦${product.memberPrice.toLocaleString()} / Retail: ₦${product.retailPrice.toLocaleString()}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors shadow-xs"
                              title="Order via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-stone-600 px-1">
            <span>
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of {PRODUCTS.length} Products
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-purple-700 font-bold hover:underline"
              >
                Reset Category Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const profit = product.retailPrice - product.memberPrice;
              const margin = Math.round((profit / product.retailPrice) * 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 border border-stone-200/90 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Image Header */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-stone-50/80 flex items-center justify-center pt-7 pb-3 px-3 border-b border-stone-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full max-h-[175px] object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {product.category}
                    </span>

                    {/* Profit Tag */}
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                      +₦{profit.toLocaleString()} Profit
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-purple-700 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Key Indications Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                        Key Indications:
                      </span>
                      {product.keyIndications.slice(0, 3).map((indication, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{indication}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Grid */}
                    <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/70 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-500 block font-medium">Retail Price</span>
                        <span className="font-extrabold text-lg text-stone-900">
                          ₦{product.retailPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-purple-700 block font-semibold">Distributor Price</span>
                        <span className="font-bold text-base text-purple-800">
                          ₦{product.memberPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-bold rounded-xl transition-colors text-center"
                      >
                        View Details
                      </button>

                      <a
                        href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                          `Hello Milnapath, I would like to order ${product.name} (₦${product.retailPrice.toLocaleString()} / Member: ₦${product.memberPrice.toLocaleString()}). Please assist me with payment and delivery.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-purple-700 hover:bg-purple-600 text-white text-sm font-bold rounded-xl transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Order (WA)</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Become a Stockist Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800">
            Wholesale & Clinic Distribution
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-purple-950">
            Want to Distribute Milnapath Products in Bulk?
          </h2>
          <p className="text-sm sm:text-base text-stone-700 max-w-xl leading-relaxed">
            Open an official Mini (₦2M), Super (₦5M), or Mega Stockist center (₦10M) in your city and earn 4.5% to 7.5% overrides on all products dispensed.
          </p>
        </div>

        <button
          onClick={() => navigate('/compensation')}
          className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-sm sm:text-base shrink-0 shadow-md flex items-center gap-2"
        >
          <span>Explore Stockist Model</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
