import React, { useState } from 'react';
import { Menu, X, ShieldCheck, PhoneCall, Sparkles, ChevronRight, Award, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/compensationData';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Videos', path: '/videos' },
    { label: 'Products (12)', path: '/products' },
    { label: 'Compensation Plan', path: '/compensation' },
    { label: 'Qualify for Mentorship', path: '/apply' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-purple-950/95 backdrop-blur-md border-b border-purple-800/60 text-white transition-all shadow-md">
      {/* Top micro-bar - strictly visible on desktop (lg:block), completely hidden on mobile/tablet */}
      <div className="hidden lg:block bg-purple-900/90 text-purple-100 text-xs py-1.5 px-4 border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-xs border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Direct Mentorship Portal
            </span>
            <span className="text-purple-200/90 text-xs">
              Registration: ₦10,000 Foretaste with 1 Detox Plus
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1 text-purple-300">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Official GT Bank Account: 0718549018
            </span>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello Milnapath Mentor, I would like more information on joining your team.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-200 hover:text-white font-medium transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
              WhatsApp: +234 903 823 7790
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar: Mobile has ONLY Logo and Menu Icon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-[53px] sm:h-[53px] rounded-xl overflow-hidden shadow-lg shadow-[#502C46]/50 border border-white/25 group-hover:scale-105 transition-transform shrink-0 bg-[#502C46] flex items-center justify-center">
            <img
              src="https://i.ibb.co/YFhcJhNm/Milnapath-International-2.jpg"
              alt="Milnapath International"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors font-serif">
                MILNAPATH
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30">
                INTL
              </span>
            </div>
            <p className="hidden sm:block text-xs text-purple-300 font-medium tracking-wide">
              Nature’s Path to Health & Wealth
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/videos' && currentPath === '/vsl');
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-800 text-white shadow-inner font-semibold border border-purple-700/50'
                    : 'text-purple-100/90 hover:text-white hover:bg-purple-900/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav('/compensation')}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-purple-200 hover:text-white bg-purple-900/60 hover:bg-purple-800/80 rounded-lg border border-purple-700/50 transition-colors"
          >
            <Award className="w-4 h-4 text-amber-400" />
            12 Ways to Earn
          </button>
          <button
            onClick={() => handleNav('/register')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-purple-950 font-bold px-4 py-2.5 rounded-lg text-sm sm:text-base shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Register (₦10,000)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu icon ONLY - No other buttons on mobile header */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-purple-200 hover:text-white hover:bg-purple-900 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-purple-950 border-b border-purple-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1.5 pt-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path === '/videos' && currentPath === '/vsl');
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-purple-800 text-white font-bold'
                      : 'text-purple-100 hover:bg-purple-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-purple-800/80 space-y-2.5">
            <button
              onClick={() => handleNav('/register')}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-bold rounded-xl text-center text-base shadow-md flex items-center justify-center gap-2"
            >
              <span>Register as Distributor (₦10k Foretaste)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNav('/compensation')}
              className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-purple-100 font-semibold rounded-xl text-center text-sm border border-purple-700/60 flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Explore 12 Ways to Earn & Calculator</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello Milnapath Mentor, I would like to chat directly on WhatsApp.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-purple-800/60 text-purple-200 font-medium rounded-xl text-center text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-purple-400" />
              <span>Direct WhatsApp: +234 903 823 7790</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
