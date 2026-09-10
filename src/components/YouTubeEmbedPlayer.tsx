import React, { useState } from 'react';
import { Play, RotateCcw, ExternalLink, Loader2, Video as VideoIcon, ArrowRight, X } from 'lucide-react';

export interface NextVideoItem {
  id: string | number;
  title: string;
  subtitle?: string;
  posterUrl?: string;
  duration?: string;
  onClick: () => void;
}

interface YouTubeEmbedPlayerProps {
  youtubeIdOrUrl: string;
  title: string;
  posterUrl?: string;
  onClose?: () => void;
  moreVideos?: NextVideoItem[];
  onMoreVideosClick?: () => void;
  onReplay?: () => void;
  className?: string;
}

/**
 * Robust YouTube video ID extractor that handles:
 * - https://youtu.be/VRgVgYKakBs
 * - https://www.youtube.com/watch?v=VRgVgYKakBs
 * - https://www.youtube.com/embed/VRgVgYKakBs
 * - VRgVgYKakBs
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  
  // If already an 11-character alphanumeric/dash/underscore ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Short URL format: youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }

  // Standard watch URL: youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Embed URL format: youtube.com/embed/ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Fallback match for any 11-char sequence
  const genericMatch = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  return genericMatch ? genericMatch[1] : trimmed;
}

export const YouTubeEmbedPlayer: React.FC<YouTubeEmbedPlayerProps> = ({
  youtubeIdOrUrl,
  title,
  posterUrl,
  onClose,
  moreVideos = [],
  onMoreVideosClick,
  onReplay,
  className = 'w-full h-full'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreOverlay, setShowMoreOverlay] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const videoId = extractYouTubeId(youtubeIdOrUrl);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`;
  const directWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handleReplay = () => {
    setShowMoreOverlay(false);
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
    if (onReplay) onReplay();
  };

  return (
    <div className={`relative bg-black overflow-hidden flex items-center justify-center ${className}`}>
      {/* YouTube Iframe Embed */}
      {videoId ? (
        <iframe
          key={`${videoId}-${refreshKey}`}
          src={embedUrl}
          title={title}
          className="w-full h-full border-0 absolute inset-0 z-10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center text-white bg-stone-900">
          <VideoIcon className="w-12 h-12 text-stone-500 mb-2" />
          <p className="text-sm font-semibold">Video currently unavailable</p>
          <p className="text-xs text-stone-400 mt-1">Please check back shortly or select another session.</p>
        </div>
      )}

      {/* Loading Spinner overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-stone-950/90 flex flex-col items-center justify-center gap-3 text-white pointer-events-none">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
            />
          )}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="text-xs font-semibold text-stone-200">Loading YouTube Video...</span>
          </div>
        </div>
      )}

      {/* Quick Action Overlays (Top Bar) */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        <a
          href={directWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-medium backdrop-blur-md border border-stone-700/60 shadow-md transition-all hover:scale-105"
          title="Watch directly on YouTube"
        >
          <span>Open YouTube</span>
          <ExternalLink className="w-3 h-3 text-amber-400" />
        </a>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center backdrop-blur-md border border-stone-700/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Replay & More Videos Button (Bottom Bar) */}
      <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 pointer-events-auto">
        {moreVideos.length > 0 && !showMoreOverlay && (
          <button
            type="button"
            onClick={() => setShowMoreOverlay(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/80 hover:bg-purple-900 text-purple-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-purple-700/60 shadow-md transition-all hover:scale-105"
          >
            <VideoIcon className="w-3 h-3 text-amber-400" />
            <span>Playlist ({moreVideos.length})</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-stone-700/60 shadow-md transition-all hover:scale-105"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Replay</span>
        </button>
      </div>

      {/* "More Videos" Modal Overlay */}
      {showMoreOverlay && (
        <div className="absolute inset-0 z-40 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white transition-opacity duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-300 tracking-wide">
                Recommended Videos
              </h3>
            </div>
            <button
              onClick={() => setShowMoreOverlay(false)}
              className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-auto py-3 space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
            {moreVideos.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setShowMoreOverlay(false);
                  item.onClick();
                }}
                className="w-full group/item flex items-center gap-3 p-2.5 rounded-xl bg-stone-900/90 hover:bg-purple-950/80 border border-stone-800 hover:border-purple-600/60 cursor-pointer transition-all duration-200 text-left"
              >
                {item.posterUrl ? (
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-800 border border-stone-700">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-700/40">
                    <VideoIcon className="w-4 h-4 text-purple-300" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover/item:text-amber-300 truncate transition-colors">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <Play className="w-4 h-4 text-stone-500 group-hover/item:text-amber-400 shrink-0 mr-1" />
              </button>
            ))}
          </div>

          {onMoreVideosClick && (
            <div className="pt-2 border-t border-stone-800 flex items-center justify-center">
              <button
                onClick={() => {
                  setShowMoreOverlay(false);
                  onMoreVideosClick();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm border border-purple-600/50 shadow-md transition-all hover:scale-105"
              >
                <span>Browse All Videos</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
