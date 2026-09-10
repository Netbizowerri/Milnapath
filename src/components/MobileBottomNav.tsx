import React from 'react';
import { Home, PlaySquare, Package, Calculator, UserPlus } from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPath, navigate }) => {
  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'VSL Class', path: '/vsl', icon: PlaySquare },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Earnings', path: '/compensation', icon: Calculator },
    { label: 'Register', path: '/register', icon: UserPlus, highlight: true },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-purple-950/95 backdrop-blur-md border-t border-purple-800/80 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-between text-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path || (tab.path === '/products' && currentPath.startsWith('/products/'));

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                tab.highlight
                  ? 'text-amber-400 font-bold'
                  : isActive
                  ? 'text-white font-bold'
                  : 'text-purple-300/70 hover:text-purple-100'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  tab.highlight
                    ? 'bg-amber-500/20 text-amber-300'
                    : isActive
                    ? 'bg-purple-800 text-white'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1 tracking-tight font-semibold truncate max-w-[68px]">
                {tab.label}
              </span>
              {isActive && !tab.highlight && (
                <span className="w-1 h-1 rounded-full bg-purple-400 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
