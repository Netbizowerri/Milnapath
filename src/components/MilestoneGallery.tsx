import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2
} from 'lucide-react';

export const MILESTONE_IMAGES: string[] = [
  'https://i.ibb.co/LhYxCgLC/Whats-App-Image-2026-09-08-at-1-57-20-PM.jpg',
  'https://i.ibb.co/ns6bzBqj/Whats-App-Image-2026-09-08-at-1-57-19-PM-1.jpg',
  'https://i.ibb.co/1pHn39Q/Whats-App-Image-2026-09-08-at-1-57-19-PM.jpg',
  'https://i.ibb.co/hFkZN4j8/Whats-App-Image-2026-09-08-at-1-57-18-PM-3.jpg',
  'https://i.ibb.co/cK4nbQLH/Whats-App-Image-2026-09-08-at-1-57-18-PM-2.jpg',
  'https://i.ibb.co/k6KQVRy6/Whats-App-Image-2026-09-08-at-1-57-18-PM-1.jpg',
  'https://i.ibb.co/qYr922J0/Whats-App-Image-2026-09-08-at-1-57-18-PM.jpg',
  'https://i.ibb.co/LDytDXnz/Whats-App-Image-2026-09-08-at-1-57-17-PM-1.jpg',
  'https://i.ibb.co/cKZZ5dBH/Whats-App-Image-2026-09-08-at-1-57-17-PM.jpg',
  'https://i.ibb.co/PZ13kJP8/Whats-App-Image-2026-09-08-at-1-57-16-PM-2.jpg',
  'https://i.ibb.co/B5dJMq76/Whats-App-Image-2026-09-08-at-1-57-16-PM-1.jpg',
  'https://i.ibb.co/zH20jLC0/Whats-App-Image-2026-09-08-at-1-57-16-PM.jpg'
];

export const MilestoneGallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : MILESTONE_IMAGES.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < MILESTONE_IMAGES.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const currentImageUrl = lightboxIndex !== null ? MILESTONE_IMAGES[lightboxIndex] : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-amber-700" />
          Milestones & Celebrations
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-emerald-950 tracking-tight leading-tight">
          Partners Meeting Milestones
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
          Celebrating remarkable milestones, car awards, and leadership triumphs achieved by partners across Milnapath International.
        </p>
      </div>

      {/* Gallery Grid - Clean, no text or labels over images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {MILESTONE_IMAGES.map((imageUrl, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-stone-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 aspect-[4/5]"
          >
            {/* Clean Image */}
            <img
              src={imageUrl}
              alt={`Milnapath Partner Milestone ${idx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle hover overlay with expand icon */}
            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-stone-900/80 text-white flex items-center justify-center backdrop-blur-md shadow-lg border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Maximize2 className="w-5 h-5 text-amber-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Fullscreen Lightbox Modal */}
      {currentImageUrl && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-white">
              <span className="text-xs sm:text-sm font-semibold text-stone-300 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-700">
                {lightboxIndex + 1} / {MILESTONE_IMAGES.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close fullscreen view"
              className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors shadow-lg border border-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Container */}
          <div 
            className="relative flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : MILESTONE_IMAGES.length - 1))}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-700 backdrop-blur-md flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* High-Res Photo View */}
            <img
              src={currentImageUrl}
              alt={`Milnapath Partner Milestone ${lightboxIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] sm:max-h-[82vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-stone-800"
            />

            {/* Next Arrow */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null && prev < MILESTONE_IMAGES.length - 1 ? prev + 1 : 0))}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white border border-stone-700 backdrop-blur-md flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-95 z-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div 
            className="max-w-4xl mx-auto w-full z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-1">
              {MILESTONE_IMAGES.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    lightboxIndex === idx
                      ? 'border-amber-400 scale-110 shadow-md ring-2 ring-amber-400/40'
                      : 'border-stone-700 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
