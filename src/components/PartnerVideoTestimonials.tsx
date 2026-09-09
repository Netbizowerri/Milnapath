import React, { useState, useRef } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { VimeoEmbedPlayer } from './VimeoEmbedPlayer';

export interface PartnerVideoItem {
  id: string;
  name: string;
  title: string;
  badge: string;
  posterUrl: string;
  vimeoId?: string;
  videoSrc?: string;
  fallbackSrc?: string;
}

const PARTNER_VIDEOS: PartnerVideoItem[] = [
  {
    id: 'video-1',
    name: 'Mary Linus Ibu ("Mary Light")',
    title: 'Star 1 Manager',
    badge: 'Kidney Stone Recovery & Business Success',
    posterUrl: 'https://i.vimeocdn.com/video/2198866847-0f531fb3adfb34f3fd511d13a6c6e8060a04c60a472ac155776461dba48ec1ce-d_640',
    vimeoId: '1225207239',
    videoSrc: '/videos/testimonial-1.mp4',
    fallbackSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'video-2',
    name: 'Adagold Nicholas (Ruth Kanu)',
    title: 'Star 1 Diamond & Sri Lanka Trip Qualifier',
    badge: 'Ulcer & Leg Recovery & Financial Freedom',
    posterUrl: 'https://i.vimeocdn.com/video/2198867854-a2fd10a2c75737ae8d1b5823bf50618db61b3c5274f03855c207f04cc4976a35-d_640',
    vimeoId: '1225208008',
    videoSrc: '/videos/testimonial-2.mp4',
    fallbackSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'video-3',
    name: 'Esther Felix Akpan ("Esther Wealth")',
    title: 'Star 4 Manager & Car Awardee',
    badge: '3-Year Ulcer Recovery & Car Winner',
    posterUrl: 'https://i.vimeocdn.com/video/2198871114-32c650a193f774ea3062cc235ca7771e62f6bdd957eb546760a23aff3f05ab0d-d_640',
    vimeoId: '1225210477',
    videoSrc: '/videos/testimonial-3.mp4',
    fallbackSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'video-4',
    name: 'Evigonome Unuo ("Evi Million")',
    title: 'Star 4 Manager & ₦5M Car Awardee',
    badge: 'Hemorrhoids & Eye Recovery & Car Winner',
    posterUrl: 'https://i.vimeocdn.com/video/2198872206-eabbe89a58880dfab533c7173b1464ad4e196cc483f007a9ab516577e97e9a21-d_640',
    vimeoId: '1225211287',
    videoSrc: '/videos/testimonial-4.mp4',
    fallbackSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
  }
];

interface PartnerVideoTestimonialsProps {
  navigate?: (path: string) => void;
}

export const PartnerVideoTestimonials: React.FC<PartnerVideoTestimonialsProps> = ({ navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [itemsVisible, setItemsVisible] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const total = PARTNER_VIDEOS.length;

  // Responsive calculation for visible items count
  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setItemsVisible(1);
        } else if (window.innerWidth < 1024) {
          setItemsVisible(2);
        } else {
          setItemsVisible(3);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, total - itemsVisible);

  // Ensure currentIndex stays within valid bounds on viewport resize
  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleStartPlay = (id: string) => {
    setPlayingVideoId(id);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Section Title & Description */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Real People. Real Health. Real Wealth.
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-emerald-950 tracking-tight leading-tight">
          Partners’ Video Testimonials
        </h2>
        <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
          Hear firsthand from everyday Nigerians and healthcare professionals who transformed their physical wellness with Milnapath remedies and unlocked life-changing daily income.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Slide Header */}
        <div className="flex items-center justify-between gap-3 mb-6 px-1 sm:px-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200">
              {itemsVisible === 1
                ? `Video ${currentIndex + 1} of ${total}`
                : `Showing ${currentIndex + 1}–${Math.min(currentIndex + itemsVisible, total)} of ${total}`}
            </span>
            <span className="hidden sm:inline text-xs text-stone-500 font-medium">
              Click any video to play
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous video"
              className="w-10 h-10 rounded-full bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next video"
              className="w-10 h-10 rounded-full bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Outer Carousel Track Window */}
        <div
          className="overflow-hidden py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex -mx-2.5 sm:-mx-3 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`
            }}
          >
            {PARTNER_VIDEOS.map((video) => {
              const isPlaying = playingVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2.5 sm:px-3"
                >
                  <div className="relative bg-stone-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-stone-800 aspect-[9/14] max-h-[620px] flex items-center justify-center group">
                    {isPlaying ? (
                      /* Active Player (Vimeo or HTML5 Video) */
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        {video.vimeoId ? (
                          <VimeoEmbedPlayer
                            vimeoId={video.vimeoId}
                            title={video.name}
                            onClose={() => setPlayingVideoId(null)}
                            onMoreVideosClick={navigate ? () => navigate('/vsl') : undefined}
                            moreVideos={PARTNER_VIDEOS
                              .filter((v) => v.id !== video.id)
                              .slice(0, 3)
                              .map((v) => ({
                                id: v.id,
                                title: v.name,
                                subtitle: v.title,
                                posterUrl: v.posterUrl,
                                onClick: () => handleStartPlay(v.id)
                              }))
                            }
                          />
                        ) : (
                          <>
                            <video
                              ref={(el) => { videoRefs.current[video.id] = el; }}
                              controls
                              autoPlay
                              playsInline
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src !== video.fallbackSrc) {
                                  target.src = video.fallbackSrc || '';
                                  target.play().catch(() => {});
                                }
                              }}
                            >
                              {video.videoSrc && <source src={video.videoSrc} type="video/mp4" />}
                              {video.fallbackSrc && <source src={video.fallbackSrc} type="video/mp4" />}
                              Your browser does not support HTML5 video.
                            </video>

                            {/* Close Overlay Button */}
                            <button
                              onClick={() => setPlayingVideoId(null)}
                              className="absolute top-3.5 right-3.5 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors z-30 border border-stone-700 shadow-md cursor-pointer"
                            >
                              Close Video
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      /* Video Cover with Click-to-Play */
                      <div
                        onClick={() => handleStartPlay(video.id)}
                        className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-between p-4 sm:p-5"
                      >
                        {/* Background Poster Image */}
                        <img
                          src={video.posterUrl}
                          alt={video.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />

                        {/* Dark Vignette Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/70 pointer-events-none" />

                        {/* Top Meta Tag */}
                        <div className="relative z-10 flex items-start justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-200 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-700/50 shadow-xs">
                            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                            Verified Partner
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-amber-300 bg-stone-900/85 backdrop-blur-md px-2 py-1 rounded-md border border-stone-700 truncate max-w-[140px]">
                            {video.title}
                          </span>
                        </div>

                        {/* Center Play Button Pulse */}
                        <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2.5 py-6">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/40">
                            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5 text-emerald-950" />
                          </div>
                          <span className="text-xs font-bold text-white bg-stone-900/90 px-3.5 py-1 rounded-full border border-stone-700 backdrop-blur-sm shadow-md group-hover:bg-emerald-900 group-hover:border-emerald-600 transition-colors">
                            Click to Play
                          </span>
                        </div>

                        {/* Bottom Partner Info Overlay */}
                        <div className="relative z-10 bg-stone-950/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-800/80">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate leading-tight">
                                {video.name}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-amber-300 font-medium truncate mt-0.5">
                                {video.badge}
                              </p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center shrink-0">
                              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Desktop Next / Prev Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            aria-label="Previous videos"
            className="hidden lg:flex absolute -left-4 xl:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-stone-200 items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            aria-label="Next videos"
            className="hidden lg:flex absolute -right-4 xl:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-stone-200 items-center justify-center transition-all hover:scale-110 active:scale-95 z-20 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-7 h-2 bg-emerald-800 shadow-xs'
                  : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
