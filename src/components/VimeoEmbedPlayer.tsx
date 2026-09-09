import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { RotateCcw, Play, X, ArrowRight, Video as VideoIcon } from 'lucide-react';

export interface NextVideoItem {
  id: string | number;
  title: string;
  subtitle?: string;
  posterUrl?: string;
  duration?: string;
  onClick: () => void;
}

interface VimeoEmbedPlayerProps {
  vimeoId: string;
  title: string;
  onClose?: () => void;
  moreVideos?: NextVideoItem[];
  onMoreVideosClick?: () => void;
  onReplay?: () => void;
  className?: string;
}

export const VimeoEmbedPlayer: React.FC<VimeoEmbedPlayerProps> = ({
  vimeoId,
  title,
  onClose,
  moreVideos = [],
  onMoreVideosClick,
  onReplay,
  className = 'w-full h-full'
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    setHasEnded(false);
    if (!iframeRef.current) return;

    try {
      const player = new Player(iframeRef.current);
      playerRef.current = player;

      const handleEnded = () => {
        setHasEnded(true);
        player.pause().catch(() => {});
      };

      const handleTimeUpdate = (data: { seconds: number; duration: number }) => {
        // Intercept 0.8s before the video ends so Vimeo's end screen never flashes
        if (data.duration > 0 && data.duration - data.seconds <= 0.8) {
          handleEnded();
        }
      };

      player.on('ended', handleEnded);
      player.on('timeupdate', handleTimeUpdate);

      return () => {
        player.off('ended');
        player.off('timeupdate');
        player.destroy().catch(() => {});
        playerRef.current = null;
      };
    } catch {
      // Fallback
    }
  }, [vimeoId]);

  const handleReplayClick = () => {
    setHasEnded(false);
    if (onReplay) {
      onReplay();
    } else if (playerRef.current) {
      playerRef.current.setCurrentTime(0)
        .then(() => playerRef.current?.play())
        .catch(() => {});
    }
  };

  return (
    <div className={`relative bg-black overflow-hidden flex items-center justify-center ${className}`}>
      {/* Vimeo iframe */}
      <iframe
        ref={iframeRef}
        key={vimeoId}
        src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
      />

      {/* Close button while playing */}
      {onClose && !hasEnded && (
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors z-30 border border-stone-700 shadow-md"
        >
          Close Video
        </button>
      )}

      {/* Custom "More Videos" End Screen Overlay */}
      {hasEnded && (
        <div className="absolute inset-0 z-40 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white transition-opacity duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-300 tracking-wide">
                More Videos
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReplayClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Replay</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Body: Recommended "More Videos" */}
          <div className="my-auto py-2">
            {moreVideos.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-xs text-stone-400 font-medium">Continue Watching:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {moreVideos.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setHasEnded(false);
                        item.onClick();
                      }}
                      className="group/item flex items-center gap-3 p-2.5 rounded-xl bg-stone-900/90 hover:bg-emerald-950/80 border border-stone-800 hover:border-emerald-600/60 cursor-pointer transition-all duration-200 text-left"
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
                        <div className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-700/40">
                          <VideoIcon className="w-4 h-4 text-emerald-300" />
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
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-stone-300">Explore more company presentations, partner milestones & compensation videos.</p>
              </div>
            )}
          </div>

          {/* Footer Navigation Button */}
          {onMoreVideosClick && (
            <div className="pt-2 border-t border-stone-800 flex items-center justify-center">
              <button
                onClick={onMoreVideosClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm border border-emerald-600/50 shadow-md transition-all hover:scale-105 cursor-pointer"
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
