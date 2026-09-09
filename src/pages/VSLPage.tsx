import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, CheckCircle2, ChevronRight, MessageCircle, Sparkles, BookOpen, Clock, Users, ArrowRight, ShieldCheck, Download, Award, Share2 } from 'lucide-react';
import { VSL_MODULES } from '../data/vslModulesData';
import { COMPANY_DETAILS } from '../data/compensationData';
import { VimeoEmbedPlayer } from '../components/VimeoEmbedPlayer';

interface VSLPageProps {
  navigate: (path: string) => void;
  openExitModal: () => void;
}

export const VSLPage: React.FC<VSLPageProps> = ({ navigate, openExitModal }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(24);

  const activeModule = VSL_MODULES.find((m) => m.id === selectedModuleId) || VSL_MODULES[0];

  const handleModuleSelect = (id: number) => {
    setSelectedModuleId(id);
    setVideoProgress(5);
    setIsPlaying(true);
  };

  const otherModules = VSL_MODULES
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 border border-emerald-700/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base sm:text-lg font-serif text-white">
              Milnapath Video Vault
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Official company overview, partner testimonials, and business presentation series.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/apply')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
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
          <div className="relative aspect-video bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/60 flex flex-col justify-between group">
            {activeModule.vimeoId ? (
              /* Real Live Vimeo Video Player with custom More Videos end screen */
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-emerald-950/80 to-stone-950 flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                    <div className="w-[500px] h-[500px] border-8 border-emerald-500 rounded-full animate-spin-slow"></div>
                  </div>

                  <div className="relative z-10 space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span>MODULE {activeModule.id} OF {VSL_MODULES.length}: {activeModule.category.toUpperCase()}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif tracking-tight drop-shadow-md">
                      {activeModule.title}
                    </h1>

                    <p className="text-sm sm:text-base text-emerald-100/90 max-w-md mx-auto line-clamp-2">
                      Presenter: {activeModule.speaker} • Duration: {activeModule.duration} mins
                    </p>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 mx-auto"
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
                      <span className="hidden sm:inline-block text-xs bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-medium border border-emerald-700/50">
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
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-700 block">
                  Module {activeModule.id} Overview
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-emerald-950 mt-1">
                  {activeModule.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium">
                  <Clock className="w-4 h-4 text-stone-500" />
                  {activeModule.duration}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs sm:text-sm px-3 py-1.5 rounded-full font-semibold border border-emerald-100">
                  <Users className="w-4 h-4 text-emerald-600" />
                  {activeModule.speaker}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {activeModule.description}
            </p>

            {/* Key Takeaways Checklist */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Key Strategic Takeaways From This Session:
              </h4>
              <ul className="space-y-2.5">
                {activeModule.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Persistent Conversion Buttons Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate('/apply')}
                className="w-full sm:w-auto flex-1 py-4.5 px-6 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl text-sm sm:text-base shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Apply to Join My Direct Mentorship Team</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4.5 px-6 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold rounded-2xl text-sm sm:text-base border border-emerald-300 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: 10-Module Playlist Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl shadow-lg border border-stone-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-emerald-950">
                  Videos
                </h3>
                <p className="text-xs text-stone-500">{VSL_MODULES.length} Videos Available</p>
              </div>
              <span className="text-xs sm:text-sm font-bold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md">
                {VSL_MODULES.length} / {VSL_MODULES.length} Free
              </span>
            </div>

            {/* Playlist items */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {VSL_MODULES.map((m) => {
                const isCurrent = m.id === selectedModuleId;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModuleSelect(m.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${
                      isCurrent
                        ? 'bg-emerald-900 text-white border-emerald-700 shadow-md ring-1 ring-emerald-600'
                        : 'bg-stone-50 hover:bg-emerald-50/70 text-stone-800 border-stone-200/80'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isCurrent
                          ? 'bg-amber-400 text-emerald-950'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {isCurrent ? <Play className="w-3.5 h-3.5 fill-current" /> : m.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider truncate ${
                            isCurrent ? 'text-amber-300' : 'text-emerald-700'
                          }`}
                        >
                          {m.category}
                        </span>
                        <span
                          className={`text-xs font-mono shrink-0 ${
                            isCurrent ? 'text-emerald-200' : 'text-stone-500'
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
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Card */}
            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={() => navigate('/register')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Ready to Register? (GT Bank: 0718549018)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mentorship Guarantee Box */}
          <div className="bg-emerald-950 text-white rounded-3xl p-5 border border-emerald-800 shadow-md space-y-3 text-left">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Mentorship Promise</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
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
    </div>
  );
};
