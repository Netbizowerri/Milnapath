import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Award, TrendingUp, Users, HeartPulse, ChevronRight, Zap, Play, Lock, FileCheck, Star, PackageCheck, PhoneCall, UserPlus, Copy, Check, MessageSquare, Landmark } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { PACKAGE_TIERS, COMPANY_DETAILS } from '../data/compensationData';
import { PartnerVideoTestimonials } from '../components/PartnerVideoTestimonials';
import { AboutSection } from '../components/AboutSection';
import { MilestoneGallery } from '../components/MilestoneGallery';

interface LandingPageProps {
  navigate: (path: string) => void;
  openExitModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate, openExitModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    packageId: 'foretaste',
    username: '',
    cityState: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);

  // Top 5 Highlighted products as specified in PRD
  const highlightSlugs = ['detox-plus', 'gastro-pro', 'nakom-oil', 'gynomil', 'd-man'];
  const highlightProducts = PRODUCTS.filter((p) => highlightSlugs.includes(p.slug));

  const selectedTier = PACKAGE_TIERS.find((p) => p.id === formData.packageId) || PACKAGE_TIERS[0];

  const handleFastRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(COMPANY_DETAILS.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          formName: 'Milnapath Homepage Fast Registration Form',
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          email: formData.email,
          selectedPackage: `${selectedTier.name} - ₦${selectedTier.cost.toLocaleString()} (${selectedTier.pv} PV)`,
          preferredUsername: formData.username || 'Auto-assign',
          cityState: formData.cityState || 'Not specified',
          crmTag: 'Privyr-Fast-Distributor-Signup',
          sourcePage: 'Homepage Hero Fast Registration',
          registeredAt: new Date().toISOString(),
        }),
      });
    } catch {
      // smooth UX fallback
    } finally {
      setIsSubmitting(false);
      setRegistrationSuccess(true);
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.accountNumber);
    setAccountCopied(true);
    setTimeout(() => setAccountCopied(false), 2500);
  };

  const handleLaunchWhatsAppActivation = () => {
    const message = `*MILNAPATH FAST DISTRIBUTOR REGISTRATION*
----------------------------------------
*Full Name:* ${formData.fullName || 'Not provided'}
*Phone/WhatsApp:* ${formData.whatsapp || 'Not provided'}
*Email:* ${formData.email || 'Not provided'}
*Package Selected:* ${selectedTier.name} (₦${selectedTier.cost.toLocaleString()} / ${selectedTier.pv} PV)
*Preferred Username:* ${formData.username || 'Auto-assign'}
*Location:* ${formData.cityState || 'Nigeria'}
----------------------------------------
Hello Support, I just submitted my Fast Registration on the homepage. I am making payment of ₦${selectedTier.cost.toLocaleString()} to GT Bank (${COMPANY_DETAILS.accountNumber} - ${COMPANY_DETAILS.accountName}). Please confirm and activate my distributor ID.`;

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION & FAST REGISTRATION FORM */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        {/* Background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: The Opportunity Hook */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-amber-300 font-bold">2026 OFFICIAL ENROLLMENT SYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif leading-[1.15] text-white">
              Stop Chasing Prospects. Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">7-Figure Automated Network</span> with Milnapath Phytotherapy.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              Unlock true recurring residual income with Nigeria’s fastest-growing botanical health company. Register today to earn through <strong className="text-white">14% binary matching to infinity</strong>, ₦10,000 Foretaste referral matrix, and high-demand NAFDAC-approved cellular medicines.
            </p>

            {/* Quick Badges list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-100 bg-emerald-900/50 p-3 rounded-xl border border-emerald-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>₦10,000 Foretaste Entry</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-100 bg-emerald-900/50 p-3 rounded-xl border border-emerald-800/60">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Up to 28% Referral Bonus</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-100 bg-emerald-900/50 p-3 rounded-xl border border-emerald-800/60 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No-Flush Lesser Leg PV</span>
              </div>
            </div>

            {/* Direct Link to Compensation Video Presentation for viewers */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/vsl')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-semibold text-sm border border-emerald-600/40 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Want to see how it works? Watch Video Presentation</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Converting Fast Registration Form */}
          <div className="lg:col-span-5">
            <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400/40 relative">
              {/* Corner Tag */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-emerald-950" />
                <span>Fast Partner Registration</span>
              </div>

              <div className="mb-5 text-left">
                <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 block mb-1">
                  Official Distributor Fast-Track
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-emerald-950">
                  Register as a Milnapath Partner
                </h3>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  Reserve your distributor position, pick your starting package, and connect directly with top mentorship leaders.
                </p>
              </div>

              {registrationSuccess ? (
                <div className="text-left py-2 space-y-4">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-950 font-serif">
                      Distributor Spot Reserved!
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                      Congratulations, <span className="font-bold text-emerald-900">{formData.fullName}</span>! Your registration details have been securely captured.
                    </p>
                  </div>

                  {/* Summary of Chosen Package */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Selected Package:</span>
                      <span className="font-bold text-emerald-950">{selectedTier.name} (₦{selectedTier.cost.toLocaleString()})</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Volume Credited:</span>
                      <span className="font-semibold text-stone-800">{selectedTier.pv} PV</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-600">
                      <span>Assigned Team:</span>
                      <span className="font-semibold text-emerald-700">Direct Mentorship Core</span>
                    </div>
                  </div>

                  {/* Official GT Bank Account Information */}
                  <div className="bg-emerald-950 text-white rounded-xl p-4 border border-emerald-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>GT Bank Official Account</span>
                      </div>
                      <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                        Verified Corporate
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-300 block">Account Name</span>
                      <p className="text-sm sm:text-base font-bold text-white">{COMPANY_DETAILS.accountName}</p>
                    </div>
                    <div className="bg-emerald-900/80 p-2.5 rounded-lg flex items-center justify-between border border-emerald-700/60">
                      <div>
                        <span className="text-[11px] text-emerald-300 block">Account Number</span>
                        <span className="font-mono text-lg sm:text-xl font-bold text-amber-300 tracking-wider">
                          {COMPANY_DETAILS.accountNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {accountCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={handleLaunchWhatsAppActivation}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span>Confirm on WhatsApp & Send Proof</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/register')}
                      className="w-full py-2.5 bg-white hover:bg-stone-50 text-emerald-900 font-semibold rounded-xl text-xs sm:text-sm border border-stone-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Full Registration & Bank Step-by-Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => setRegistrationSuccess(false)}
                        className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                      >
                        Register another partner
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFastRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Chinedu Eze"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 placeholder:text-stone-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                        WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08031234567"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 placeholder:text-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. chinedu@yahoo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                      Select Starting Package <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.packageId}
                      onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 font-medium"
                    >
                      {PACKAGE_TIERS.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier.name} — ₦{tier.cost.toLocaleString()} ({tier.pv} PV)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                        Preferred Username <span className="text-stone-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. chinedu_biz"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 placeholder:text-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                        City & State <span className="text-stone-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ikeja, Lagos"
                        value={formData.cityState}
                        onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900 placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-xl shadow-emerald-800/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Registering Partner...</span>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 text-amber-300" />
                        <span>Complete Fast Registration</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-stone-500 text-center pt-0.5">
                    <Lock className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span>Official Milnapath Portal • GT Bank Verified Account: 0718549018</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES & CORPORATE INTEGRITY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">NAFDAC Regulated</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">Standardized botanical therapy safe for families</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">GT Bank Verified</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">Corp Acct: 0718549018 (Millennium Nature's Path)</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">14% Binary Leverage</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">Matches 40 PV to infinity on lesser leg volume</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">Daily Bank Payouts</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">Withdraw commissions directly to your local bank</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 ABOUT SECTION WITH VIDEO ON RIGHT COLUMN */}
      <AboutSection navigate={navigate} />

      {/* 3. PRODUCT HIGHLIGHTS GRID (DETOX PLUS, GASTRO-PRO, NAKOM OIL, GYNOMIL, D-MAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            <HeartPulse className="w-3.5 h-3.5" />
            Proven Clinical Phytotherapy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
            High-Efficacy Health Solutions People Re-Order Every 30 Days
          </h2>
          <p className="text-sm text-stone-600">
            Network marketing longevity depends on genuine product efficacy. Milnapath products deliver fast, noticeable symptomatic relief, fueling perpetual re-orders and 20% repurchase cashback.
          </p>
        </div>

        {/* 5-Product Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlightProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border border-stone-200/80 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Product Image Stage - Full uncropped display with ample headroom */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-50/80 flex items-center justify-center pt-6 pb-2 px-3 border-b border-stone-100">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[145px] object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Floating category and PV badges - Sleek & compact */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-1 z-10">
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-normal px-2 py-0.5 rounded-full bg-emerald-950/85 text-emerald-200 shadow-xs border border-emerald-800/40 backdrop-blur-xs truncate max-w-[70%]">
                    {prod.category}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-950 bg-amber-400 px-1.5 py-0.5 rounded shadow-xs shrink-0">
                    {prod.pv} PV
                  </span>
                </div>
              </div>

              {/* Product Title & Complete Short Description */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-emerald-700 transition-colors leading-tight">
                    {prod.name}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mt-2">
                    {prod.shortDescription}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 font-medium">Retail Price:</span>
                    <span className="font-bold text-emerald-950 text-base">
                      ₦{prod.retailPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-semibold">
                    <span>Member Price:</span>
                    <span className="font-bold text-emerald-950">₦{prod.memberPrice.toLocaleString()}</span>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate(`/products/${prod.slug}`)}
                      className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold rounded-lg text-center transition-colors"
                    >
                      Details
                    </button>
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(`Hello Milnapath, I would like to order ${prod.name} (₦${prod.retailPrice.toLocaleString()}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg text-center shadow-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-base shadow-md transition-all hover:scale-105"
          >
            <span>Explore All 12 Milnapath Therapeutic Formulations</span>
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </section>

      {/* 4. PACKAGES SUMMARY (FORETASTE ₦10K TO VIP ₦840K) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Select Your Business Altitude
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
            Affordable Entry, Massive Binary Scaling
          </h2>
          <p className="text-base text-stone-600">
            Start with as low as ₦10,000 Foretaste and upgrade anytime to higher packages using differential PV. Every tier unlocks higher direct bonus percentages and bigger daily binary caps.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGE_TIERS.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl p-6 sm:p-7 shadow-lg border transition-all duration-200 flex flex-col justify-between ${
                pkg.id === 'vip'
                  ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-amber-100'
                  : pkg.id === 'executive'
                  ? 'border-emerald-400 ring-1 ring-emerald-300 shadow-emerald-50'
                  : 'border-stone-200'
              }`}
            >
              {/* Badge if any */}
              {pkg.badge && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full shadow-sm">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-emerald-950">
                    {pkg.name}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {pkg.pv} PV
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif">
                      ₦{pkg.cost.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-stone-500 font-medium">one-time</span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-600 mt-1.5 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-3 py-3.5 border-y border-stone-100 text-sm">
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="font-medium">Direct Referral Bonus:</span>
                    <span className="font-bold text-emerald-800">{pkg.directBonusRate}% ({pkg.directBonusRange})</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="font-medium">Daily Binary Pair Cap:</span>
                    <span className="font-bold text-amber-700">
                      {pkg.dailyBinaryCapPairs ? `${pkg.dailyBinaryCapPairs} pairs/day (₦${pkg.dailyBinaryCapNaira?.toLocaleString()}/day)` : 'N/A (Foretaste Matrix)'}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-stone-600 italic">
                    Best for: {pkg.recommendedFor}
                  </div>
                </div>

                <div className="pt-4 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                    Deliverables Included:
                  </span>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                    pkg.id === 'vip'
                      ? 'bg-amber-500 hover:bg-amber-400 text-emerald-950 shadow-amber-500/20'
                      : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. REASONS TO JOIN & DIRECT MENTORSHIP BLUEPRINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-emerald-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                AUTOMATED RECRUITING CO-OP
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
                Never Run Out of Leads. We Give You Our Turnkey Sales Funnel Free.
              </h2>
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
                When you register through our mentorship portal, you don't just get bottles of herbal medicine—you receive access to this exact digital recruiting sales funnel, pre-written WhatsApp scripts, and automated prospect qualification.
              </p>

              <div className="space-y-3 text-sm sm:text-base text-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Turnkey landing pages that filter out time-wasters and tire-kickers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Direct WhatsApp closing templates with 80%+ conversion rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>1-on-1 zoom strategy calls with top Diamond leaders</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/apply')}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-base shadow-xl shadow-amber-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Apply for Direct Mentorship (Survey)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={openExitModal}
                  className="px-5 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-semibold text-sm border border-emerald-700 transition-colors"
                >
                  Download Free 2026 PDF Playbook
                </button>
              </div>
            </div>

            {/* Right Card: Official Banking Spotlight */}
            <div className="bg-emerald-950/80 p-6 sm:p-8 rounded-2xl border border-emerald-700/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Guaranty Trust Bank (GT Bank)
                </span>
                <span className="text-xs bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded font-mono">
                  Verified Corporate
                </span>
              </div>

              <div>
                <span className="text-xs sm:text-sm text-emerald-300 block">Account Name</span>
                <p className="text-xl font-bold text-white font-serif">{COMPANY_DETAILS.accountName}</p>
              </div>

              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/80">
                <span className="text-xs sm:text-sm text-emerald-400 block mb-1">Corporate Account Number</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-wider">
                    {COMPANY_DETAILS.accountNumber}
                  </span>
                </div>
              </div>

              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Pay your ₦10,000 Foretaste registration fee or higher package directly to GT Bank, then submit your proof of payment on WhatsApp to be activated instantly.
              </p>

              <button
                onClick={() => navigate('/register')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm sm:text-base transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Go to Step-by-Step Payment Instructions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTNERS' VIDEO TESTIMONIALS CAROUSEL */}
      <PartnerVideoTestimonials navigate={navigate} />

      {/* 7. PARTNERS MEETING MILESTONES GALLERY */}
      <MilestoneGallery />
    </div>
  );
};
