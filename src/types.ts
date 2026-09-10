export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Cleansing / Immunity' | 'Gastrointestinal' | 'Total Wellness' | "Women's Health" | 'Digestive Health' | 'Natural Skin Care' | 'Protection / Wellness' | 'Stem Cell / Anti-Aging' | 'Metabolic Balance' | "Men's Vitality" | 'Hematology / Blood Support' | 'Infection Defense';
  shortDescription: string;
  keyIndications: string[];
  fullBenefits: string[];
  dosage: string;
  presentation: string;
  activeBotanicals: string[];
  retailPrice: number;
  memberPrice: number;
  pv: number;
  featured?: boolean;
  nafdacApproved: boolean;
  imageAccent: string;
  imageUrl: string;
  bannerUrl?: string;
  youtubeVideoId?: string;
}

export interface PackageTier {
  id: string;
  name: string;
  cost: number;
  pv: number;
  directBonusRate: number; // percentage (e.g. 20%)
  directBonusRange: string;
  dailyBinaryCapPairs: number | null;
  dailyBinaryCapNaira: number | null;
  description: string;
  recommendedFor: string;
  badge?: string;
  deliverables: string[];
}

export interface CompensationStream {
  number: number;
  name: string;
  shortDescription: string;
  payoutDetail: string;
  formulaDescription: string;
  iconName: string;
  badge: string;
}

export interface RankAward {
  rank: string;
  lesserLegPV: string;
  awardTitle: string;
  awardValue: string;
  details: string;
  icon: string;
}

export interface VideoModule {
  id: number;
  title: string;
  duration: string;
  category: 'Business Opportunity' | 'Products' | 'Strategy' | 'Testimonial' | 'Corporate';
  description: string;
  keyTakeaways: string[];
  youtubeId?: string;
  videoUrlPlaceholder?: string;
  vimeoId?: string;
  posterUrl?: string;
  speaker: string;
}

export interface SurveyState {
  fullName: string;
  whatsapp: string;
  email: string;
  location: string;
  monthlyIncomeGoal: string;
  capitalAvailability: string;
  weeklyHours: string;
  businessExperience: string;
  primaryMotivation: string;
  readinessTimeline: string;
}
