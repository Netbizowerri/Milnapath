import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Sparkles, UserCheck, TrendingUp, DollarSign, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';

interface ApplyPageProps {
  navigate: (path: string) => void;
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ navigate }) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [surveyData, setSurveyData] = useState({
    // Step 1: Goals & Vision
    monthlyIncomeGoal: '₦500,000 - ₦1,000,000 / month',
    primaryMotivation: 'Financial Independence & Quitting 9-to-5',
    // Step 2: Capacity & Time
    capitalAvailability: '₦30,000 - ₦60,000 (Entry / Standard)',
    weeklyHours: '10 - 20 hours per week (Part-Time)',
    networkMarketingExperience: 'Some experience in network marketing / affiliate sales',
    // Step 3: Contact & Commitment
    fullName: '',
    whatsapp: '',
    email: '',
    location: '',
    commitmentLevel: '10/10 - Ready to invest and follow instructions',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
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
          formType: 'Milnapath Prospect Qualification Application',
          crmTag: 'Privyr-Qualified-Prospect',
          ...surveyData,
          submissionDate: new Date().toISOString(),
          leadStatus: 'Highly Qualified',
        }),
      });
    } catch {
      // safe fallback
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/register');
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Container Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 sm:p-8 text-white relative">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-amber-400/30 mb-3">
            <Sparkles className="w-4 h-4" />
            DIRECT MENTORSHIP QUALIFICATION SURVEY
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif leading-tight">
            Apply to Join My Direct Milnapath Inner Circle Team
          </h1>
          <p className="text-sm sm:text-base text-emerald-200 mt-2 leading-relaxed">
            We work closely with only 10 serious individuals each month to help them hit Star 4 Leader (₦5M Car) in 6-12 months. Please answer honestly.
          </p>

          {/* Stepper Dots */}
          <div className="mt-6 flex items-center justify-between text-xs sm:text-sm max-w-sm">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-300 font-bold' : 'text-emerald-400/60'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step >= 1 ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-white'}`}>
                1
              </span>
              <span>Goals</span>
            </div>
            <div className="h-0.5 flex-1 bg-emerald-800 mx-2"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-300 font-bold' : 'text-emerald-400/60'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step >= 2 ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-white'}`}>
                2
              </span>
              <span>Capacity</span>
            </div>
            <div className="h-0.5 flex-1 bg-emerald-800 mx-2"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-300 font-bold' : 'text-emerald-400/60'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step >= 3 ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-white'}`}>
                3
              </span>
              <span>Contact</span>
            </div>
          </div>
        </div>

        {/* Survey Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
                Application Received & Qualified!
              </h2>
              <p className="text-sm sm:text-base text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-emerald-800">{surveyData.fullName || 'Leader'}</span>. Your profile matches our team criteria. We are now redirecting you to complete your official GT Bank payment and registration...
              </p>
              <div className="pt-2">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: INCOME & MOTIVATION */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-2.5">
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                      1. What is your realistic 90-day monthly income goal with Milnapath?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        '₦150,000 - ₦300,000 / month',
                        '₦500,000 - ₦1,000,000 / month',
                        '₦1,000,000 - ₦2,500,000 / month',
                        '₦3,000,000+ / month (Diamond Leader Target)'
                      ].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSurveyData({ ...surveyData, monthlyIncomeGoal: val })}
                          className={`p-3.5 sm:p-4 rounded-xl text-sm sm:text-base text-left font-medium border transition-all ${
                            surveyData.monthlyIncomeGoal === val
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                              : 'bg-stone-50 border-stone-200 hover:border-emerald-300 text-stone-700'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                      2. What is your primary driving motivation right now?
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        'Financial Independence & Quitting 9-to-5 Job',
                        'Curing a family member with Milnapath Phytotherapy & spreading wellness',
                        'Funding my children’s overseas education & family relocation',
                        'Building an automated digital business with high binary leverage'
                      ].map((mot) => (
                        <button
                          key={mot}
                          type="button"
                          onClick={() => setSurveyData({ ...surveyData, primaryMotivation: mot })}
                          className={`p-3.5 sm:p-4 rounded-xl text-sm sm:text-base text-left font-medium border transition-all ${
                            surveyData.primaryMotivation === mot
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                              : 'bg-stone-50 border-stone-200 hover:border-emerald-300 text-stone-700'
                          }`}
                        >
                          {mot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 shadow-md"
                    >
                      <span>Proceed to Step 2</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CAPITAL & COMMITMENT */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-2.5">
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                      3. What is your available startup capital right now to activate your package?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        '₦10,000 (Foretaste Registration Starter)',
                        '₦30,000 - ₦60,000 (Entry / Standard)',
                        '₦180,000 (Executive Tier - Recommended)',
                        '₦420,000 - ₦840,000 (Elite / VIP Max Payout)',
                        '₦2,000,000 - ₦10,000,000 (Stockist Center Hub)'
                      ].map((cap) => (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => setSurveyData({ ...surveyData, capitalAvailability: cap })}
                          className={`p-3.5 sm:p-4 rounded-xl text-sm sm:text-base text-left font-medium border transition-all ${
                            surveyData.capitalAvailability === cap
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                              : 'bg-stone-50 border-stone-200 hover:border-emerald-300 text-stone-700'
                          }`}
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                      4. How many hours per week can you dedicate to your Milnapath business?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        '5 - 10 hrs / week (Part-Time)',
                        '10 - 20 hrs / week (Focused)',
                        '25+ hrs / week (Full-Time Builder)'
                      ].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setSurveyData({ ...surveyData, weeklyHours: hrs })}
                          className={`p-3.5 sm:p-4 rounded-xl text-sm sm:text-base text-left font-medium border transition-all ${
                            surveyData.weeklyHours === hrs
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                              : 'bg-stone-50 border-stone-200 hover:border-emerald-300 text-stone-700'
                          }`}
                        >
                          {hrs}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 shadow-md"
                    >
                      <span>Proceed to Final Step</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION & PRIVYR SUBMISSION */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ngozi Adeleke"
                      value={surveyData.fullName}
                      onChange={(e) => setSurveyData({ ...surveyData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                        Active WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08031234567"
                        value={surveyData.whatsapp}
                        onChange={(e) => setSurveyData({ ...surveyData, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ngozi@gmail.com"
                        value={surveyData.email}
                        onChange={(e) => setSurveyData({ ...surveyData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                      Your City, State & Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ikeja, Lagos State, Nigeria"
                      value={surveyData.location}
                      onChange={(e) => setSurveyData({ ...surveyData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-900"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-extrabold rounded-2xl text-base sm:text-lg shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Processing Qualification...</span>
                      ) : (
                        <>
                          <span>Submit Application & Proceed to Payment (GT Bank)</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Step 2
                    </button>
                    <span className="text-xs text-stone-500">
                      Auto-routes to Privyr CRM & Formspree
                    </span>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
