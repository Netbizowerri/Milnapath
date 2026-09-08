import { PackageTier, CompensationStream, RankAward } from '../types';

export const COMPANY_DETAILS = {
  brandName: 'Milnapath International',
  legalName: "Millennium Nature's Path Intl",
  bankName: 'Guaranty Trust Bank (GT Bank)',
  accountNumber: '0718549018',
  accountName: "Millennium Nature's Path Intl",
  whatsappNumber: '+2349038237790',
  whatsappRaw: '2349038237790',
  email: 'info@milnapath.com',
  exchangeRate: {
    pvToDollar: 1,
    dollarToNaira: 500, // 1 PV = $1 = ₦500
    display: '1 PV = $1.00 = ₦500'
  },
  registrationFee: 10000,
  formspreeEndpoint: 'https://formspree.io/f/mqaeodqv' // fallback / configured endpoint
};

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'foretaste',
    name: 'Foretaste (Reg)',
    cost: 10000,
    pv: 10,
    directBonusRate: 20,
    directBonusRange: '₦2,000 Direct',
    dailyBinaryCapPairs: null,
    dailyBinaryCapNaira: null,
    description: 'Entry gateway registration package with immediate product access and 3-level foretaste referral bonuses.',
    recommendedFor: 'Trial starters & students stepping into direct sales',
    deliverables: ['1 Bottle of Detox Plus (worth ₦13,500)', '10 Personal PV credited', 'Access to 3-level Foretaste bonus matrix']
  },
  {
    id: 'entry',
    name: 'Entry Tier',
    cost: 30000,
    pv: 40,
    directBonusRate: 20,
    directBonusRange: '₦4,000 – ₦112,000',
    dailyBinaryCapPairs: 25,
    dailyBinaryCapNaira: 70000,
    description: 'Foundation business builder tier qualifying you for binary pairing and unilevel commissions.',
    recommendedFor: 'Budget-conscious entrepreneurs ready to start building a team',
    badge: 'Popular Starter',
    deliverables: ['Full selection of Milnapath products worth ₦30k', '40 PV Assigned', '25 binary pairs/day earning cap (₦70k/day)']
  },
  {
    id: 'standard',
    name: 'Standard Tier',
    cost: 60000,
    pv: 80,
    directBonusRate: 22,
    directBonusRange: '₦4,400 – ₦123,200',
    dailyBinaryCapPairs: 40,
    dailyBinaryCapNaira: 112000,
    description: 'Accelerated direct bonus tier (22%) with elevated binary capping of 40 pairs daily.',
    recommendedFor: 'Motivated network marketers aiming for steady part-time income',
    deliverables: ['Products worth ₦60k at distributor price', '80 PV Assigned', '40 binary pairs/day earning cap (₦112k/day)']
  },
  {
    id: 'executive',
    name: 'Executive Tier',
    cost: 180000,
    pv: 240,
    directBonusRate: 24,
    directBonusRange: '₦4,800 – ₦134,400',
    dailyBinaryCapPairs: 60,
    dailyBinaryCapNaira: 168000,
    description: 'High-leverage tier unlocking 24% direct referral commissions and ₦168,000 daily binary cap.',
    recommendedFor: 'Experienced team builders and wellness practitioners',
    badge: 'Smart Value',
    deliverables: ['Comprehensive product inventory worth ₦180k', '240 PV Assigned', '60 binary pairs/day earning cap (₦168k/day)']
  },
  {
    id: 'elite',
    name: 'Elite Tier',
    cost: 420000,
    pv: 560,
    directBonusRate: 26,
    directBonusRange: '₦5,200 – ₦145,600',
    dailyBinaryCapPairs: 100,
    dailyBinaryCapNaira: 280000,
    description: 'Professional leader tier with 26% direct bonus rate and 100 pairs/day capping limit.',
    recommendedFor: 'Community health advocates, clinics, and ambitious professionals',
    deliverables: ['Bulk stock of all 12 therapeutic products (₦420k value)', '560 PV Assigned', '100 binary pairs/day earning cap (₦280k/day)']
  },
  {
    id: 'vip',
    name: 'VIP Tier',
    cost: 840000,
    pv: 1125,
    directBonusRate: 28,
    directBonusRange: '₦5,600 – ₦156,800',
    dailyBinaryCapPairs: 175,
    dailyBinaryCapNaira: 490000,
    description: 'The pinnacle membership package offering maximum 28% referral commission and 175 daily pairs (₦490k/day).',
    recommendedFor: 'Top leaders, investors, and serious network builders seeking maximum payout',
    badge: 'Maximum Payout',
    deliverables: ['Full wholesale master shipment worth ₦840k', '1,125 PV Assigned', '175 binary pairs/day earning cap (₦490k/day = ₦14.7M/mo)']
  }
];

export const COMPENSATION_STREAMS: CompensationStream[] = [
  {
    number: 1,
    name: 'Foretaste Bonus',
    shortDescription: '3-tier immediate payout on all ₦10,000 signups in your team.',
    payoutDetail: '20% Direct (₦2,000), 6% 1st Indirect (₦600), 4% 2nd Indirect (₦400). Total 30% payout!',
    formulaDescription: 'Paid in real-time as new partners register with ₦10,000 across 3 active generations.',
    iconName: 'Coins',
    badge: '3 Levels Deep'
  },
  {
    number: 2,
    name: 'Activation Bonus',
    shortDescription: 'Earn up to 28% of PV whenever a direct downline purchases any business package.',
    payoutDetail: 'Entry (20%), Standard (22%), Executive (24%), Elite (26%), VIP (28%).',
    formulaDescription: 'Bonus = Sponsor Rate % × Package PV × ₦500. Up to ₦156,800 per direct VIP sign-up!',
    iconName: 'Zap',
    badge: 'Up to 28%'
  },
  {
    number: 3,
    name: 'Upgrade Bonus',
    shortDescription: 'Earn up to 28% on differential PV whenever direct downlines upgrade to higher packages.',
    payoutDetail: 'No lost commissions. Receive full sponsor percentage on the upgrade point differential.',
    formulaDescription: 'Bonus = Sponsor Rate % × (New Tier PV - Old Tier PV) × ₦500.',
    iconName: 'TrendingUp',
    badge: 'Continuous Pay'
  },
  {
    number: 4,
    name: 'Binary Pairing Bonus',
    shortDescription: '14% matching bonus on your lesser team volume, calculated per 40 PV pair to infinity.',
    payoutDetail: '1 Pair (40 PV Left + 40 PV Right) = 14% of 40 PV × ₦500 = ₦2,800 cash per pair.',
    formulaDescription: 'Uncapped depth! Capped only by your package tier daily limit (up to ₦490,000 daily for VIP).',
    iconName: 'GitMerge',
    badge: '14% to Infinity'
  },
  {
    number: 5,
    name: 'Repurchase Cashback',
    shortDescription: '20% instant cashback on all personal monthly product re-orders.',
    payoutDetail: '20% of your personal re-order PV is returned back to your e-wallet automatically.',
    formulaDescription: 'Reorder 100 PV of stock → Get 20 PV cashback × ₦500 = ₦10,000 returned instantly.',
    iconName: 'RotateCcw',
    badge: '20% Cashback'
  },
  {
    number: 6,
    name: 'Unilevel Residual Bonus',
    shortDescription: 'Residual monthly payouts spanning 12 compressed team generations.',
    payoutDetail: 'Gen 1 (7%), Gen 2 (6%), Gen 3 (5%), Gen 4–5 (4%), Gen 6–7 (3%), Gen 8–10 (2%), Gen 11–12 (1%).',
    formulaDescription: 'Dynamic compression ensures you never miss commissions on non-active accounts.',
    iconName: 'Layers',
    badge: '12 Compressed Levels'
  },
  {
    number: 7,
    name: 'Retail Profit Margin',
    shortDescription: '25% direct cash profit on every bottle or tea sold at retail price.',
    payoutDetail: 'Distributors buy at wholesale member price and retail to consumers for a clean 25% margin.',
    formulaDescription: 'E.g., buy Detox Plus at ₦10,000, sell at ₦13,500 retail = ₦3,500 instant pocket cash.',
    iconName: 'Store',
    badge: '25% Margin'
  },
  {
    number: 8,
    name: 'Lifestyle Awards',
    shortDescription: 'Monthly PV milestones yielding cash stipends and all-expense paid world travel.',
    payoutDetail: 'Monthly cash stipends ranging from ₦125,000 to ₦1,000,000, plus international trips.',
    formulaDescription: 'Based on consistent monthly team maintenance and leadership production.',
    iconName: 'PlaneTakeoff',
    badge: '₦125k to ₦1M+'
  },
  {
    number: 9,
    name: 'Rank Awards (Cumulative)',
    shortDescription: 'Never-flushing cumulative lesser leg PV milestones with cars, laptops, and a ₦60M luxury villa.',
    payoutDetail: 'Star 1 (₦70k items) all the way to Star 3 Diamond (₦60,000,000 Luxury Mansion).',
    formulaDescription: 'Points never flush! Every single pair you produce steadily accumulates toward your next asset.',
    iconName: 'Award',
    badge: 'Never Flush PV'
  },
  {
    number: 10,
    name: 'Promo Awards',
    shortDescription: 'Company challenge pools and timed fast-track reward incentives.',
    payoutDetail: 'Special short-term quarterly drives offering cash bonuses, smartphones, and product hampers.',
    formulaDescription: 'Announced during corporate regional conventions and seasonal campaigns.',
    iconName: 'Sparkles',
    badge: 'Bonus Incentives'
  },
  {
    number: 11,
    name: 'Stockist Operational Bonus',
    shortDescription: 'Lucrative profit overrides for operating a regional Milnapath distribution hub.',
    payoutDetail: 'Mini Stockist (₦2M stock / 4.5%), Super Stockist (₦5M stock / 6%), Mega Stockist (₦10M stock / 7.5%).',
    formulaDescription: 'Earn on all products moving through your center, whether downlines are yours or not!',
    iconName: 'Building2',
    badge: '4.5% to 7.5%'
  },
  {
    number: 12,
    name: 'Global Profit Pool Share',
    shortDescription: '3% quarterly corporate profit pool shared among top Star 3 Diamond leaders.',
    payoutDetail: 'Milnapath pools 3% of worldwide total company PV and distributes it every 90 days.',
    formulaDescription: 'True passive generational equity shared among the highest-ranking leaders.',
    iconName: 'Globe',
    badge: '3% Global Equity'
  }
];

export const RANK_AWARDS: RankAward[] = [
  {
    rank: 'Star 1 Leader',
    lesserLegPV: '500 PV',
    awardTitle: 'Home Electronics & Kitchen Suite',
    awardValue: '₦70,000 Value',
    details: 'Milnapath branded smart kitchenware or equivalent electronic equipment voucher.',
    icon: 'PackageCheck'
  },
  {
    rank: 'Star 2 Leader',
    lesserLegPV: '1,500 PV',
    awardTitle: 'Business Laptop & Digital Kit',
    awardValue: '₦250,000 Value',
    details: 'High-speed business laptop computer and marketing kit to automate your recruiting.',
    icon: 'Laptop'
  },
  {
    rank: 'Star 3 Leader',
    lesserLegPV: '6,000 PV',
    awardTitle: 'All-Expense Paid Luxury Vacation',
    awardValue: '₦1,000,000 Value',
    details: '5-star regional resort getaway, flights, luxury buffet dining, and VIP training retreat.',
    icon: 'Plane'
  },
  {
    rank: 'Star 4 Leader',
    lesserLegPV: '25,000 PV',
    awardTitle: 'First Brand-New Car Award',
    awardValue: '₦5,000,000 Value',
    details: 'Fully registered official brand-new sedan handed over on stage at convention.',
    icon: 'Car'
  },
  {
    rank: 'Diamond Director',
    lesserLegPV: '60,000 PV',
    awardTitle: 'Executive Luxury SUV Award',
    awardValue: '₦10,000,000 Value',
    details: 'Executive SUV award or ₦10,000,000 direct bank transfer with ceremonial giant key.',
    icon: 'ShieldCheck'
  },
  {
    rank: 'Star 1 Diamond',
    lesserLegPV: '150,000 PV',
    awardTitle: 'Prestige Class Luxury Vehicle',
    awardValue: '₦15,000,000 Value',
    details: 'Upgraded prestige vehicle award celebrating national business expansion.',
    icon: 'Crown'
  },
  {
    rank: 'Star 2 Diamond',
    lesserLegPV: '350,000 PV',
    awardTitle: 'Executive Modern Home Grant',
    awardValue: '₦25,000,000 Value',
    details: '₦25,000,000 direct housing grant toward owning a private residence.',
    icon: 'Home'
  },
  {
    rank: 'Star 3 Diamond',
    lesserLegPV: '800,000 PV',
    awardTitle: 'Ultra-Luxury Custom Villa Award',
    awardValue: '₦60,000,000 Value',
    details: 'The crown jewel of Milnapath! ₦60,000,000 luxury villa award plus access to 3% Global Profit Pool.',
    icon: 'Gem'
  }
];

export const STOCKIST_TIERS = [
  {
    tier: 'Mini Stockist',
    capital: '₦2,000,000',
    override: '4.5%',
    pvStock: '4,000 PV',
    benefits: 'Serve local town distributors, 4.5% commission on all inventory dispenses, starter marketing banners.'
  },
  {
    tier: 'Super Stockist',
    capital: '₦5,000,000',
    override: '6.0%',
    pvStock: '10,000 PV',
    benefits: 'Serve local government areas, 6% product override, official Milnapath branch listing, seminar support.'
  },
  {
    tier: 'Mega Stockist',
    capital: '₦10,000,000',
    override: '7.5%',
    pvStock: '20,000 PV',
    benefits: 'State distribution hub, maximum 7.5% override, direct supply priority from headquarters, VIP lounge access.'
  }
];
