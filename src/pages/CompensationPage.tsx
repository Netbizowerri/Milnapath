import React, { useState, useMemo } from 'react';
import { Calculator, Award, TrendingUp, Sparkles, CheckCircle2, ChevronRight, Coins, Zap, GitMerge, RotateCcw, Layers, Store, PlaneTakeoff, Globe, Building2, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { COMPENSATION_STREAMS, RANK_AWARDS, STOCKIST_TIERS, PACKAGE_TIERS, COMPANY_DETAILS } from '../data/compensationData';
import { MilestoneGallery } from '../components/MilestoneGallery';

interface CompensationPageProps {
  navigate: (path: string) => void;
}

export const CompensationPage: React.FC<CompensationPageProps> = ({ navigate }) => {
  // Calculator state
  const [selectedTierId, setSelectedTierId] = useState<string>('executive');
  const [directRecruitsPerMonth, setDirectRecruitsPerMonth] = useState<number>(4);
  const [averageRecruitPackage, setAverageRecruitPackage] = useState<string>('standard');
  const [pairsPerWeek, setPairsPerWeek] = useState<number>(10);
  const [monthlyTeamRepurchasePV, setMonthlyTeamRepurchasePV] = useState<number>(1200);

  const selectedTier = PACKAGE_TIERS.find((p) => p.id === selectedTierId) || PACKAGE_TIERS[3];
  const recruitPackageObj = PACKAGE_TIERS.find((p) => p.id === averageRecruitPackage) || PACKAGE_TIERS[2];

  // Calculations
  const calculatedEarnings = useMemo(() => {
    // 1. Direct Bonus: Sponsor Rate % * Recruit PV * ₦500 * Number of Recruits
    const sponsorRatePercent = selectedTier.directBonusRate / 100;
    const directBonusPerRecruit = sponsorRatePercent * recruitPackageObj.pv * COMPANY_DETAILS.exchangeRate.dollarToNaira;
    const monthlyDirectIncome = directBonusPerRecruit * directRecruitsPerMonth;

    // 2. Binary Pairing Bonus: 14% of 40 PV * ₦500 = ₦2,800 per pair
    const pairValueNaira = 0.14 * 40 * COMPANY_DETAILS.exchangeRate.dollarToNaira; // ₦2,800
    const monthlyPairs = pairsPerWeek * 4;

    // Apply daily cap restriction if applicable
    let cappedMonthlyPairs = monthlyPairs;
    if (selectedTier.dailyBinaryCapPairs) {
      const maxMonthlyPairs = selectedTier.dailyBinaryCapPairs * 30;
      cappedMonthlyPairs = Math.min(monthlyPairs, maxMonthlyPairs);
    }
    const monthlyBinaryIncome = cappedMonthlyPairs * pairValueNaira;

    // 3. Unilevel Residual: Average ~5% on team repurchase volume
    const estimatedUnilevelIncome = monthlyTeamRepurchasePV * 0.05 * COMPANY_DETAILS.exchangeRate.dollarToNaira;

    // 4. Foretaste Bonus assumption: 20% on ₦10k starter signups (if starting with foretaste)
    const foretasteEst = selectedTier.id === 'foretaste' ? directRecruitsPerMonth * 2000 : 0;

    const totalEstimatedMonthly = monthlyDirectIncome + monthlyBinaryIncome + estimatedUnilevelIncome + foretasteEst;
    const totalEstimatedAnnual = totalEstimatedMonthly * 12;

    return {
      monthlyDirectIncome,
      monthlyBinaryIncome,
      estimatedUnilevelIncome,
      totalEstimatedMonthly,
      totalEstimatedAnnual,
      pairValueNaira,
      cappedMonthlyPairs,
    };
  }, [selectedTier, recruitPackageObj, directRecruitsPerMonth, pairsPerWeek, monthlyTeamRepurchasePV]);

  // Map icon strings to Lucide components
  const getStreamIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins': return <Coins className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-purple-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'GitMerge': return <GitMerge className="w-5 h-5 text-amber-500" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5 text-purple-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-600" />;
      case 'Store': return <Store className="w-5 h-5 text-purple-600" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-5 h-5 text-amber-500" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-purple-600" />;
      case 'Globe': return <Globe className="w-5 h-5 text-purple-600" />;
      default: return <Award className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-3xl p-6 sm:p-12 text-white border border-purple-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            12 REVOLUTIONARY WEALTH PILLARS
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight">
            The Milnapath High-Leverage Compensation Plan
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
            Built for velocity and endurance. Our model combines a <strong className="text-white">3-level instant Foretaste matrix</strong>, <strong className="text-amber-300">up to 28% direct sponsor bonuses</strong>, and an aggressive <strong className="text-white">14% binary matching payout to infinity</strong> with zero leg flushing.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-purple-300 pt-2 font-mono">
            <span className="bg-purple-900/80 px-3 py-1.5 rounded-lg border border-purple-700">
              Exchange Rate: 1 PV = $1.00 = ₦500
            </span>
            <span className="bg-purple-900/80 px-3 py-1.5 rounded-lg border border-purple-700">
              Binary Matching: ₦2,800 per 40 PV Pair
            </span>
          </div>

          <div className="pt-3">
            <button
              onClick={() => navigate('/videos')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-purple-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current text-purple-950" />
              <span>Watch The Milnapath Business Plan Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MILESTONE GALLERY: PARTNERS MEETING MILESTONES */}
      <MilestoneGallery />

      {/* 1. INTERACTIVE REAL-TIME EARNINGS SIMULATOR */}
      <section className="bg-white rounded-3xl shadow-xl border-2 border-purple-600/30 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-purple-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Interactive Commission Calculator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Simulate Your Potential Monthly & Annual Payouts
            </h2>
            <p className="text-sm text-purple-100">
              Adjust your package tier, referral pace, and binary volume to test real earnings.
            </p>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-purple-950 font-bold text-sm rounded-xl shadow-md transition-all shrink-0"
          >
            Register Now (₦10,000)
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Control 1: Select Your Current Package */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wider text-stone-800">
                1. Your Personal Package Tier (Determines your bonus % & binary cap):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PACKAGE_TIERS.map((pkg) => {
                  const isSel = selectedTierId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTierId(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSel
                          ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-600/30'
                          : 'bg-stone-50 border-stone-200 hover:border-purple-300'
                      }`}
                    >
                      <span className={`text-xs font-bold block truncate ${isSel ? 'text-purple-900' : 'text-stone-700'}`}>
                        {pkg.name}
                      </span>
                      <span className="text-sm font-extrabold text-purple-950 font-serif">
                        ₦{pkg.cost.toLocaleString()}
                      </span>
                      <span className="text-xs text-amber-700 block mt-0.5 font-medium">
                        {pkg.directBonusRate}% Direct Bonus
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Direct Recruits per month */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold uppercase tracking-wider text-stone-800">
                  2. Monthly Direct Personal Referrals:
                </label>
                <span className="font-bold text-purple-900 font-mono text-base">
                  {directRecruitsPerMonth} Partners / month
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={directRecruitsPerMonth}
                onChange={(e) => setDirectRecruitsPerMonth(parseInt(e.target.value))}
                className="w-full accent-purple-700 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>0 recruits</span>
                <span>5 recruits</span>
                <span>10 recruits</span>
                <span>20 recruits</span>
              </div>
            </div>

            {/* Control 3: Average Package They Purchase */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold uppercase tracking-wider text-stone-800">
                3. Average Package They Register With:
              </label>
              <select
                value={averageRecruitPackage}
                onChange={(e) => setAverageRecruitPackage(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-base font-medium focus:ring-2 focus:ring-purple-600 text-stone-900"
              >
                {PACKAGE_TIERS.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ₦{pkg.cost.toLocaleString()} ({pkg.pv} PV)
                  </option>
                ))}
              </select>
            </div>

            {/* Control 4: Binary Pairs per week */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold uppercase tracking-wider text-stone-800">
                  4. Binary Pairs Completed Per Week (1 Pair = 40 PV / ₦2,800):
                </label>
                <span className="font-bold text-purple-900 font-mono text-base">
                  {pairsPerWeek} pairs/week (~{pairsPerWeek * 4} /mo)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="2"
                value={pairsPerWeek}
                onChange={(e) => setPairsPerWeek(parseInt(e.target.value))}
                className="w-full accent-purple-700 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>0 pairs</span>
                <span>25 pairs</span>
                <span>50 pairs</span>
                <span>100 pairs/wk</span>
              </div>
            </div>

            {/* Control 5: Monthly Team Repurchase PV */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-semibold uppercase tracking-wider text-stone-800">
                  5. Monthly Downline Team Repurchase Volume:
                </label>
                <span className="font-bold text-purple-900 font-mono text-base">
                  {monthlyTeamRepurchasePV.toLocaleString()} PV
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="200"
                value={monthlyTeamRepurchasePV}
                onChange={(e) => setMonthlyTeamRepurchasePV(parseInt(e.target.value))}
                className="w-full accent-purple-700 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>0 PV</span>
                <span>2,500 PV</span>
                <span>5,000 PV</span>
                <span>10,000 PV</span>
              </div>
            </div>
          </div>

          {/* Results Display Column (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-600 block">
                Estimated Total Monthly Cashout
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-purple-950 font-serif">
                  ₦{Math.round(calculatedEarnings.totalEstimatedMonthly).toLocaleString()}
                </span>
                <span className="text-sm text-stone-500 font-medium">/ month</span>
              </div>
              <span className="text-sm text-amber-700 font-bold block mt-1">
                ≈ ₦{Math.round(calculatedEarnings.totalEstimatedAnnual).toLocaleString()} Projected Annually
              </span>
            </div>

            {/* Income Streams Breakdown */}
            <div className="space-y-3 pt-4 border-t border-stone-200 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Direct Activation Bonus ({selectedTier.directBonusRate}%):</span>
                <span className="font-bold text-purple-900">
                  ₦{Math.round(calculatedEarnings.monthlyDirectIncome).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">
                  Binary Matching Bonus (14% Lesser Leg):
                </span>
                <span className="font-bold text-purple-900">
                  ₦{Math.round(calculatedEarnings.monthlyBinaryIncome).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">Unilevel Repurchase Residual (~5%):</span>
                <span className="font-bold text-purple-900">
                  ₦{Math.round(calculatedEarnings.estimatedUnilevelIncome).toLocaleString()}
                </span>
              </div>

              {selectedTier.dailyBinaryCapNaira && (
                <div className="pt-2 border-t border-stone-200 text-xs sm:text-sm text-stone-600">
                  Your <strong className="text-stone-800">{selectedTier.name}</strong> has a max daily binary cap of ₦{selectedTier.dailyBinaryCapNaira.toLocaleString()}/day (₦{(selectedTier.dailyBinaryCapNaira * 30).toLocaleString()}/mo).
                </div>
              )}
            </div>

            {/* Conversion CTA */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/register')}
                className="w-full py-4 bg-gradient-to-r from-purple-800 to-purple-700 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-xl text-sm sm:text-base shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Activate Your Milnapath Position Today</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 12 WAYS TO EARN COMPREHENSIVE BREAKDOWN */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            Complete Comp Plan Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-purple-950">
            The 12 Streams of Milnapath Income Detailed
          </h2>
          <p className="text-base text-stone-600">
            From your very first ₦10k registrant up to corporate equity share pools, explore each revenue channel below.
          </p>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPENSATION_STREAMS.map((stream) => (
            <div
              key={stream.number}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all border border-stone-200/90 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                    {getStreamIcon(stream.iconName)}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {stream.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-stone-500 tracking-wider">
                    Stream #{stream.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-purple-950">
                    {stream.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {stream.shortDescription}
                </p>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-sm text-stone-800 space-y-1.5">
                  <span className="font-bold text-purple-900 block">Payout Details:</span>
                  <p className="leading-relaxed">{stream.payoutDetail}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                {stream.formulaDescription}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RANK AWARDS LADDER (NON-FLUSH LESSER LEG PV) */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Never-Flush Cumulative Milestones
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-purple-950">
            Rank Awards: From Laptops to the ₦60,000,000 Villa
          </h2>
          <p className="text-base text-stone-600">
            At Milnapath, your points NEVER expire or flush. Every single package and product reorder in your lesser leg steadily pushes you toward your next car, trip, and mansion.
          </p>
        </div>

        {/* Rank Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RANK_AWARDS.map((award, index) => (
            <div
              key={award.rank}
              className={`bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all border flex flex-col justify-between ${
                index >= 6 ? 'border-amber-400 ring-1 ring-amber-300' : 'border-stone-200'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-purple-50 text-purple-800">
                    Step {index + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-100">
                    {award.lesserLegPV}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-purple-950">
                  {award.rank}
                </h3>

                <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100">
                  <span className="text-xs text-purple-700 uppercase font-bold tracking-wider block">Award</span>
                  <p className="font-bold text-sm sm:text-base text-purple-950 font-serif leading-snug">
                    {award.awardTitle}
                  </p>
                  <span className="text-sm font-extrabold text-amber-700 block mt-1">
                    {award.awardValue}
                  </span>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {award.details}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-purple-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  Lesser Leg PV
                </span>
                <span>Cumulative</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STOCKIST DISTRIBUTION HUBS (₦2M TO ₦10M) */}
      <section className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 rounded-3xl p-8 sm:p-12 text-white border border-purple-800 shadow-2xl space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/30">
            Distribution Franchise Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Operate a Regional Milnapath Stockist Center
          </h2>
          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
            Earn 4.5% to 7.5% overrides on ALL inventory flowing through your branch, plus product stock and company branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STOCKIST_TIERS.map((st) => (
            <div
              key={st.tier}
              className="bg-purple-900/60 rounded-2xl p-6 sm:p-7 border border-purple-700/80 space-y-4 text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white font-serif">{st.tier}</h3>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full">
                    {st.override} Override
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-serif block">
                    {st.capital}
                  </span>
                  <span className="text-sm text-purple-300">Inventory Stock: {st.pvStock}</span>
                </div>

                <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
                  {st.benefits}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-800">
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
                    `Hello Milnapath, I am interested in applying to become a ${st.tier} (${st.capital}) in my city.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-purple-950 text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Inquire for Stockist Center</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
