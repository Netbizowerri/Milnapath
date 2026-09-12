import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, CheckCircle2, ChevronRight, MessageCircle, Sparkles, BookOpen, Clock, Users, ArrowRight, ShieldCheck, Download, Award, Share2, Plus, X, Video as VideoIcon, ExternalLink } from 'lucide-react';
import { VSL_MODULES } from '../data/vslModulesData';
import { VideoModule } from '../types';
import { COMPANY_DETAILS } from '../data/compensationData';
import { VimeoEmbedPlayer } from '../components/VimeoEmbedPlayer';
import { YouTubeEmbedPlayer, extractYouTubeId } from '../components/YouTubeEmbedPlayer';

interface VSLPageProps {
  navigate: (path: string) => void;
  openExitModal: () => void;
}

export const VSLPage: React.FC<VSLPageProps> = ({ navigate, openExitModal }) => {
  const [videoList, setVideoList] = useState<VideoModule[]>(() => {
    try {
      const saved = localStorage.getItem('milnapath_custom_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultYouTubeIds = new Set(VSL_MODULES.map((m) => m.youtubeId).filter(Boolean));
          const defaultTitles = new Set(VSL_MODULES.map((m) => m.title.toLowerCase()));
          const genuineCustom = parsed.filter((p: VideoModule) => 
            (!p.youtubeId || !defaultYouTubeIds.has(p.youtubeId)) &&
            !defaultTitles.has(p.title.toLowerCase())
          );
          // The Milnapath Business Plan must ALWAYS be at the very top of all others on the video list
          const topVideo = VSL_MODULES[0]; // The Milnapath Business Plan
          const otherDefaults = VSL_MODULES.slice(1);
          return [topVideo, ...genuineCustom, ...otherDefaults];
        }
      }
    } catch (e) {
      console.error('Error restoring custom videos:', e);
    }
    return VSL_MODULES;
  });

  const [selectedModuleId, setSelectedModuleId] = useState<number>(() => {
    return videoList[0]?.id || 1;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(24);

  // Modal State for adding YouTube video
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VideoModule['category']>('Products');
  const [newSpeaker, setNewSpeaker] = useState<string>('Milnapath Partner');
  const [newDuration, setNewDuration] = useState<string>('05:00');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newTakeaways, setNewTakeaways] = useState<string>('');
  const [addError, setAddError] = useState<string>('');

  const activeModule = videoList.find((m) => m.id === selectedModuleId) || videoList[0] || VSL_MODULES[0];
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const [isPlayerInView, setIsPlayerInView] = useState<boolean>(true);

  // IntersectionObserver to detect when the video player is scrolled out of viewport
  useEffect(() => {
    const el = videoPlayerRef.current || document.getElementById('main-video-player');
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlayerInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToPlayer = () => {
    const executeScroll = () => {
      const el = videoPlayerRef.current || document.getElementById('main-video-player');
      if (el) {
        // Method 1: scrollIntoView with smooth behavior (honors scroll-mt-24)
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        } catch {
          // fallback
        }

        // Method 2: coordinate-based window.scrollTo with 75px offset for sticky header
        const rect = el.getBoundingClientRect();
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const targetScrollTop = Math.max(0, rect.top + currentScrollTop - 75);

        try {
          window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
          });
        } catch {
          window.scrollTo(0, targetScrollTop);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Trigger across animation frames and mobile touch intervals to ensure scroll is never cancelled
    executeScroll();
    requestAnimationFrame(executeScroll);
    setTimeout(executeScroll, 60);
    setTimeout(executeScroll, 180);
    setTimeout(executeScroll, 350);
  };

  // Automatically scroll up to video player whenever selected module changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    scrollToPlayer();
  }, [selectedModuleId]);

  const handleModuleSelect = (id: number) => {
    setSelectedModuleId(id);
    setVideoProgress(5);
    setIsPlaying(true);
    // Immediately scroll up to the video player so the user can watch the video
    scrollToPlayer();
  };

  const otherModules = videoList
    .filter((m) => m.id !== activeModule.id)
    .slice(0, 4)
    .map((m) => ({
      id: m.id,
      title: m.title,
      subtitle: `${m.speaker} • ${m.duration}`,
      posterUrl: m.posterUrl,
      duration: m.duration,
      onClick: () => handleModuleSelect(m.id),
    }));

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(
    `Hello Milnapath Mentor, I am currently watching Video ${activeModule.id}: "${activeModule.title}" and I would like to ask some questions before joining.`
  )}`;

  const handleAddYouTubeVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');

    const extractedId = extractYouTubeId(newVideoUrl);
    if (!extractedId) {
      setAddError('Please enter a valid YouTube video link or 11-character video ID (e.g. https://youtu.be/VRgVgYKakBs).');
      return;
    }

    if (!newTitle.trim()) {
      setAddError('Please enter a descriptive title for this video.');
      return;
    }

    const newId = Date.now();
    const takeawaysList = newTakeaways.trim()
      ? newTakeaways.split('\n').map((s) => s.trim()).filter(Boolean)
      : [
          'Detailed botanical phytotherapy benefits and patient wellness impact',
          'Business compensation milestones and distributor earning leverage',
          'Actionable next steps for joining our direct mentorship team'
        ];

    const newModule: VideoModule = {
      id: newId,
      title: newTitle.trim(),
      category: newCategory,
      duration: newDuration.trim() || '05:00',
      youtubeId: extractedId,
      posterUrl: `https://i.ytimg.com/vi/${extractedId}/hqdefault.jpg`,
      speaker: newSpeaker.trim() || 'Milnapath Partner',
      description: newDescription.trim() || 'Official YouTube presentation for Milnapath International.',
      keyTakeaways: takeawaysList
    };

    // Ensure The Milnapath Business Plan remains at the very top of all others on the video list
    const topVideo = videoList[0]?.youtubeId === 'yuMGbfulA08' ? videoList[0] : VSL_MODULES[0];
    const restList = videoList.filter((v) => v.id !== topVideo.id);
    const updatedList = [topVideo, newModule, ...restList];
    setVideoList(updatedList);
    setSelectedModuleId(newId);
    setIsPlaying(true);
    scrollToPlayer();

    try {
      const customOnes = updatedList.filter((m) => !VSL_MODULES.some((def) => def.id === m.id));
      localStorage.setItem('milnapath_custom_videos', JSON.stringify(customOnes));
    } catch (err) {
      console.error('Failed to save custom video:', err);
    }

    // Reset form and close
    setNewVideoUrl('');
    setNewTitle('');
    setNewDescription('');
    setNewTakeaways('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-950 text-white rounded-2xl p-4 sm:p-5 border border-purple-700/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base sm:text-lg font-serif text-white">
              Milnapath Video Vault
            </h2>
            <p className="text-xs sm:text-sm text-purple-200">
              Official company overview, partner testimonials, and business presentation series.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/apply')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Apply for Mentorship</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video Presentation + Playlist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: 16:9 Video Canvas */}
        <div className="lg:col-span-8 space-y-6">
          {/* Video Container (16:9 aspect ratio) */}
          <div
            ref={videoPlayerRef}
            id="main-video-player"
            className="relative aspect-video bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-800/60 flex flex-col justify-between group scroll-mt-24"
          >
            {activeModule.youtubeId ? (
              /* Real Live YouTube Video Player */
              <YouTubeEmbedPlayer
                key={activeModule.youtubeId}
                youtubeIdOrUrl={activeModule.youtubeId}
                title={activeModule.title}
                posterUrl={activeModule.posterUrl}
                moreVideos={otherModules}
                onReplay={() => {
                  setVideoProgress(0);
                  setIsPlaying(true);
                }}
              />
            ) : activeModule.vimeoId ? (
              /* Legacy Vimeo Video Player with custom More Videos end screen */
              <VimeoEmbedPlayer
                key={activeModule.vimeoId}
                vimeoId={activeModule.vimeoId}
                title={activeModule.title}
                moreVideos={otherModules}
                onReplay={() => {
                  setVideoProgress(0);
                  setIsPlaying(true);
                }}
              />
            ) : (
              /* Visual Screen Poster / Player for upcoming modules */
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/80 to-stone-950 flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                    <div className="w-[500px] h-[500px] border-8 border-purple-500 rounded-full animate-spin-slow"></div>
                  </div>

                  <div className="relative z-10 space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-purple-900/80 border border-purple-500/40 text-purple-300 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span>MODULE {activeModule.id} OF {videoList.length}: {activeModule.category.toUpperCase()}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif tracking-tight drop-shadow-md">
                      {activeModule.title}
                    </h1>

                    <p className="text-sm sm:text-base text-purple-100/90 max-w-md mx-auto line-clamp-2">
                      Presenter: {activeModule.speaker} • Duration: {activeModule.duration} mins
                    </p>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-purple-950 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 mx-auto"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 fill-current ml-1" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 space-y-2 mt-auto">
                  <div className="w-full bg-stone-700/60 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-white text-xs sm:text-sm pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-amber-400 transition-colors p-1"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-amber-400 transition-colors p-1"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="text-xs text-stone-300 font-mono">
                        {Math.floor((parseInt(activeModule.duration.split(':')[0]) * videoProgress) / 100)}:
                        {Math.floor(videoProgress % 60).toString().padStart(2, '0')} / {activeModule.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-xs bg-purple-900/80 text-purple-300 px-2 py-0.5 rounded font-medium border border-purple-700/50">
                        HD 1080p Video
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Module Information & Learning Outcomes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-200/80 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-purple-700 block">
                  Module {activeModule.id} Overview
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-purple-950 mt-1">
                  {activeModule.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium">
                  <Clock className="w-4 h-4 text-stone-500" />
                  {activeModule.duration}
                </span>
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 text-xs sm:text-sm px-3 py-1.5 rounded-full font-semibold border border-purple-100">
                  <Users className="w-4 h-4 text-purple-600" />
                  {activeModule.speaker}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {activeModule.description}
            </p>

            {/* Key Takeaways Checklist */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-700" />
                Key Strategic Takeaways From This Session:
              </h4>
              <ul className="space-y-2.5">
                {activeModule.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Persistent Conversion Buttons Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate('/apply')}
                className="w-full sm:w-auto flex-1 py-4.5 px-6 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-2xl text-sm sm:text-base shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Apply to Join My Direct Mentorship Team</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4.5 px-6 bg-purple-50 hover:bg-purple-100 text-purple-950 font-bold rounded-2xl text-sm sm:text-base border border-purple-300 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-purple-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Video Playlist Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 gap-2">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-purple-950">
                  Videos
                </h3>
                <p className="text-xs text-stone-500">{videoList.length} Videos Available</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-sm active:scale-95"
                  title="Add YouTube Video"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add YouTube</span>
                </button>
                <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-900 rounded-md shrink-0">
                  {videoList.length} Free
                </span>
              </div>
            </div>

            {/* Playlist items */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {videoList.map((m, idx) => {
                const isCurrent = m.id === selectedModuleId;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModuleSelect(m.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${
                      isCurrent
                        ? 'bg-purple-900 text-white border-purple-700 shadow-md ring-1 ring-purple-600'
                        : 'bg-stone-50 hover:bg-purple-50/70 text-stone-800 border-stone-200/80'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isCurrent
                          ? 'bg-amber-400 text-purple-950'
                          : m.youtubeId
                          ? 'bg-red-100 text-red-700'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {isCurrent ? <Play className="w-3.5 h-3.5 fill-current" /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className={`text-xs font-bold uppercase tracking-wider truncate ${
                              isCurrent ? 'text-amber-300' : 'text-purple-700'
                            }`}
                          >
                            {m.category}
                          </span>
                          {m.youtubeId && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white shrink-0 leading-none">
                              YouTube
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs font-mono shrink-0 ${
                            isCurrent ? 'text-purple-200' : 'text-stone-500'
                          }`}
                        >
                          {m.duration}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${
                          isCurrent ? 'text-white' : 'text-stone-900'
                        }`}
                      >
                        {m.title}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                        <span
                          className={`text-[11px] font-bold inline-flex items-center gap-1 ${
                            isCurrent ? 'text-amber-300' : 'text-purple-700 group-hover:text-purple-900'
                          }`}
                        >
                          <Play className="w-2.5 h-2.5 fill-current" />
                          {isCurrent ? 'Now Playing Above' : 'Click to Watch Video ↑'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Card */}
            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={() => navigate('/register')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Ready to Register? (GT Bank: 0718549018)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mentorship Guarantee Box */}
          <div className="bg-purple-950 text-white rounded-3xl p-5 border border-purple-800 shadow-md space-y-3 text-left">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Mentorship Promise</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              When you join under our sponsor network, you receive 1-on-1 placement guidance, access to weekly WhatsApp closed-door briefings, and ready-to-run Facebook/Google ad funnels.
            </p>
            <button
              onClick={() => navigate('/apply')}
              className="text-xs sm:text-sm text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              Fill out the 2-minute qualification survey →
            </button>
          </div>
        </div>
      </div>

      {/* Add YouTube Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-purple-100 overflow-hidden text-stone-900 animate-scaleUp">
            <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg">Add YouTube Video</h3>
                  <p className="text-xs text-purple-200">Upload YouTube links directly to the videos page</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddError('');
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddYouTubeVideo} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {addError}
                </div>
              )}

              {/* YouTube Link / ID Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center justify-between">
                  <span>YouTube Video Link or ID *</span>
                  <span className="text-[11px] font-normal text-stone-500">e.g. https://youtu.be/VRgVgYKakBs</span>
                </label>
                <input
                  type="text"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://youtu.be/VRgVgYKakBs or VRgVgYKakBs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent font-mono"
                  required
                />
                {newVideoUrl && extractYouTubeId(newVideoUrl) && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-purple-50 rounded-xl border border-purple-100">
                    <img
                      src={`https://i.ytimg.com/vi/${extractYouTubeId(newVideoUrl)}/hqdefault.jpg`}
                      alt="Thumbnail preview"
                      className="w-20 aspect-video object-cover rounded-lg shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-xs text-purple-950 font-medium">
                      <span className="text-purple-700 font-bold block">Valid YouTube ID:</span>
                      <code>{extractYouTubeId(newVideoUrl)}</code>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. D-Man From Milnapath International"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Category and Duration Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as VideoModule['category'])}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="Products">Products</option>
                    <option value="Business Opportunity">Business Opportunity</option>
                    <option value="Testimonial">Testimonial</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                    Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="03:45"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Speaker / Presenter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Speaker / Presenter
                </label>
                <input
                  type="text"
                  value={newSpeaker}
                  onChange={(e) => setNewSpeaker(e.target.value)}
                  placeholder="e.g. Milnapath Phytotherapy Showcase"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed summary of the video presentation..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {/* Key Takeaways */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-950">
                  Key Takeaways (one per line)
                </label>
                <textarea
                  rows={3}
                  value={newTakeaways}
                  onChange={(e) => setNewTakeaways(e.target.value)}
                  placeholder="Key takeaway 1&#10;Key takeaway 2&#10;Key takeaway 3"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setAddError('');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-amber-300 font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video to Vault</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Mobile Return-to-Video Button when scrolled down past player */}
      {!isPlayerInView && (
        <div className="fixed bottom-20 left-4 right-4 z-30 lg:hidden flex justify-center pointer-events-none">
          <button
            type="button"
            onClick={scrollToPlayer}
            className="pointer-events-auto bg-purple-950/95 hover:bg-purple-900 text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-amber-400/80 backdrop-blur-md flex items-center gap-2 text-xs font-bold transition-all transform active:scale-95 animate-pulse"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="truncate max-w-[190px]">Now Playing: {activeModule.title}</span>
            <span className="text-amber-300 font-extrabold flex items-center gap-0.5 shrink-0">
              Scroll Up ↑
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
