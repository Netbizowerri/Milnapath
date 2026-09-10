import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppBubble } from './components/WhatsAppBubble';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ExitIntentModal } from './components/ExitIntentModal';

import { LandingPage } from './pages/LandingPage';
import { VSLPage } from './pages/VSLPage';
import { ApplyPage } from './pages/ApplyPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CompensationPage } from './pages/CompensationPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  // Simple client-side routing state initialized from browser URL if present
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [exitModalOpen, setExitModalOpen] = useState<boolean>(false);
  const [hasTriggeredExitModal, setHasTriggeredExitModal] = useState<boolean>(false);

  // Navigate helper that updates path, pushes to browser history, and scrolls to top automatically
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Exit-intent mouse leave detection for desktop
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggeredExitModal && currentPath === '/') {
        setExitModalOpen(true);
        setHasTriggeredExitModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggeredExitModal, currentPath]);

  // Route Dispatcher
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return <LandingPage navigate={navigate} openExitModal={() => setExitModalOpen(true)} />;
    }
    if (currentPath === '/vsl') {
      return <VSLPage navigate={navigate} openExitModal={() => setExitModalOpen(true)} />;
    }
    if (currentPath === '/apply') {
      return <ApplyPage navigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <RegisterPage navigate={navigate} />;
    }
    if (currentPath === '/products') {
      return <ProductsPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentPath === '/compensation') {
      return <CompensationPage navigate={navigate} />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" navigate={navigate} />;
    }
    if (currentPath === '/terms-of-service') {
      return <LegalPage type="terms" navigate={navigate} />;
    }
    if (currentPath === '/income-disclaimer') {
      return <LegalPage type="income-disclaimer" navigate={navigate} />;
    }

    // Default fallback to LandingPage
    return <LandingPage navigate={navigate} openExitModal={() => setExitModalOpen(true)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-purple-600 selection:text-white">
      {/* Persistent Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Body Content with smooth fade */}
      <main className="flex-1 transition-opacity duration-300">
        {renderRoute()}
      </main>

      {/* Persistent Global Footer */}
      <Footer navigate={navigate} />

      {/* Floating Smart VIP Support Assistant */}
      <WhatsAppBubble navigate={navigate} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav currentPath={currentPath} navigate={navigate} />

      {/* Exit Intent Free PDF Download Modal */}
      <ExitIntentModal
        isOpen={exitModalOpen}
        onClose={() => setExitModalOpen(false)}
        onSuccessRedirect={() => {
          setExitModalOpen(false);
          navigate('/vsl');
        }}
      />
    </div>
  );
}
