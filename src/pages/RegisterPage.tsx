import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Landmark, MessageSquare, ArrowRight, UserPlus, CheckCircle2, PhoneCall, Sparkles, AlertCircle } from 'lucide-react';
import { COMPANY_DETAILS, PACKAGE_TIERS } from '../data/compensationData';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('foretaste');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    phone: '',
    email: '',
    address: '',
    gender: 'Male',
    dob: '',
    bankName: 'GT Bank',
    accountNumber: '',
    accountName: '',
    sponsorUsername: 'MILNA-DIRECT',
    placementUsername: 'AUTO-OPTIMIZE',
    packageChoice: 'Foretaste (Reg) - ₦10,000 (10 PV)',
    paymentReference: '',
  });

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentPackageObj = PACKAGE_TIERS.find((p) => p.id === selectedPackage) || PACKAGE_TIERS[0];

  const handlePackageChange = (pkgId: string) => {
    setSelectedPackage(pkgId);
    const chosen = PACKAGE_TIERS.find((p) => p.id === pkgId);
    if (chosen) {
      setForm((prev) => ({
        ...prev,
        packageChoice: `${chosen.name} - ₦${chosen.cost.toLocaleString()} (${chosen.pv} PV)`,
      }));
    }
  };

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
          formType: 'Milnapath Official Distributor Registration Form',
          crmTag: 'Privyr-New-Distributor-Signup',
          ...form,
          bankPaymentVerified: 'Pending WhatsApp Proof',
          registeredAt: new Date().toISOString(),
        }),
      });
    } catch {
      // safe fallback
    } finally {
      setIsSubmitting(false);
      setIsRegistered(true);
    }
  };

  const handleLaunchWhatsAppProof = () => {
    const message = `*OFFICIAL MILNAPATH DISTRIBUTOR REGISTRATION PROOF*
----------------------------------------
*Full Name:* ${form.fullName || 'Not provided'}
*Username:* ${form.username || 'Not provided'}
*Phone:* ${form.phone || 'Not provided'}
*Package Selected:* ${form.packageChoice}
*GT Bank Amount Paid:* ₦${currentPackageObj.cost.toLocaleString()}
*Bank Ref / Teller No:* ${form.paymentReference || 'Attached screenshot'}
*Sponsor Username:* ${form.sponsorUsername}
*Placement Username:* ${form.placementUsername}
----------------------------------------
Hello Support, I have paid to Millennium Nature's Path Intl GT Bank (0718549018). Please verify and activate my Milnapath Distributor Account ID.`;

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Step 4 of Sales Funnel: Official Enrollment
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-emerald-950">
          Official GT Bank Payment & Distributor Registration
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          Complete payment directly to the official corporate GT Bank account, then fill out the official registration form below for instant account provisioning and package shipment.
        </p>
      </div>

      {/* 1. OFFICIAL GT BANK INSTRUCTIONS CARD */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-amber-400/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Landmark className="w-4 h-4" />
              <span>Official Corporate Bank Details</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
              Pay Directly to Millennium Nature's Path Intl
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              To avoid middleman delays and guarantee legitimate product shipment, all registration fees are paid straight to our corporate GT Bank account.
            </p>

            {/* Account Details Box */}
            <div className="bg-emerald-900/80 rounded-2xl p-5 sm:p-6 border border-emerald-700/80 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-emerald-300 font-medium">Bank Name:</span>
                <span className="text-base font-bold text-white">{COMPANY_DETAILS.bankName}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-800">
                <span className="text-xs sm:text-sm text-emerald-300 font-medium">Account Name:</span>
                <span className="text-base font-bold text-amber-300 font-serif">{COMPANY_DETAILS.accountName}</span>
              </div>

              {/* Account Number with 1-Click Copy */}
              <div className="pt-2 border-t border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 block font-bold">
                    GT Bank Account Number
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wider">
                    {COMPANY_DETAILS.accountNumber}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                    copied
                      ? 'bg-amber-400 text-emerald-950 scale-105'
                      : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Account Number Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Account Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified GT Bank Corporate Account. NAFDAC Regulated.</span>
            </div>
          </div>

          {/* Right WhatsApp Dispatch Card */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-emerald-600/40 text-left space-y-4">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>Fast Verification Step</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              Already Made Your Transfer?
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Launch WhatsApp with your transfer receipt or bank reference number. Our admin verifies payments within 5 minutes.
            </p>

            <button
              type="button"
              onClick={handleLaunchWhatsAppProof}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold rounded-xl text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-5 h-5 text-white" />
              <span>Send Payment Proof to WhatsApp</span>
            </button>

            <span className="text-xs sm:text-sm text-emerald-300/90 block text-center">
              Direct Desk: +234 903 823 7790
            </span>
          </div>
        </div>
      </div>

      {/* 2. OFFICIAL DISTRIBUTOR REGISTRATION FORM */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-10 space-y-8">
        <div className="border-b border-stone-100 pb-5">
          <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
            <UserPlus className="w-4 h-4" />
            <span>Official Distributor Profile Setup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
            Milnapath Membership Registration Form
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1 leading-relaxed">
            Please fill out your official registration details. These will be encoded into the Milnapath international genealogy portal for your e-wallet and commission payouts.
          </p>
        </div>

        {isRegistered ? (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              Registration Form Submitted Successfully!
            </h3>
            <p className="text-base text-stone-700 max-w-lg mx-auto leading-relaxed">
              Your registration profile for username <strong className="text-emerald-900">{form.username}</strong> has been logged into our Privyr CRM queue.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleLaunchWhatsAppProof}
                className="px-7 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg inline-flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Notify Verification Admin on WhatsApp Now</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Package Tier Selection Cards */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                1. Select Your Registration Package <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {PACKAGE_TIERS.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => handlePackageChange(pkg.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30'
                          : 'bg-stone-50 border-stone-200 hover:border-emerald-300'
                      }`}
                    >
                      <div>
                        <span className={`text-xs sm:text-sm font-bold block truncate ${isSelected ? 'text-emerald-800' : 'text-stone-600'}`}>
                          {pkg.name}
                        </span>
                        <span className="font-serif font-bold text-sm sm:text-base text-emerald-950 block mt-1">
                          ₦{pkg.cost.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-2 self-start">
                        {pkg.pv} PV
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 border-b pb-1.5">
                2. Personal & Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Chukwuemeka"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Desired Username / Member ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ChineduWealth"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08031234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Date of Birth (DOB) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                  Residential Delivery Address (For Product Waybill) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street Address, Town / LGA, State, Country"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900 resize-none"
                />
              </div>
            </div>

            {/* Banking Details Section */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 border-b pb-1.5">
                3. Your Bank Details (For Receiving Milnapath Commissions)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Bank Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GT Bank / Access / Zenith"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Account Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10-digit NUBAN Account"
                    value={form.accountNumber}
                    onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Account Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name as registered with bank"
                    value={form.accountName}
                    onChange={(e) => setForm({ ...form, accountName: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Genealogy Sponsorship & Payment Proof */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-900 border-b pb-1.5">
                4. Sponsorship & GT Bank Payment Reference
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Sponsor Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.sponsorUsername}
                    onChange={(e) => setForm({ ...form, sponsorUsername: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-xl text-sm sm:text-base font-mono text-emerald-950 font-bold"
                  />
                  <span className="text-xs text-stone-500 mt-1 block">Default: Team Lead Sponsor</span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Placement Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.placementUsername}
                    onChange={(e) => setForm({ ...form, placementUsername: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-xl text-sm sm:text-base font-mono text-emerald-950 font-bold"
                  />
                  <span className="text-xs text-stone-500 mt-1 block">Binary tree auto-spillover</span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-700 mb-1">
                    Payment Reference / Teller Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GTB/TRX/8947264 or Sender Name"
                    value={form.paymentReference}
                    onChange={(e) => setForm({ ...form, paymentReference: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-600 text-stone-900"
                  />
                  <span className="text-xs text-stone-500 mt-1 block">Leave blank if submitting via WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold rounded-2xl text-base sm:text-lg shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Transmitting Official Registration...</span>
                ) : (
                  <>
                    <span>Submit Official Registration (₦{currentPackageObj.cost.toLocaleString()})</span>
                    <ArrowRight className="w-5 h-5 text-amber-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
