import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Leaf, 
  Users, 
  Activity,
  HeartHandshake
} from 'lucide-react';
import { VimeoEmbedPlayer } from './VimeoEmbedPlayer';

interface AboutSectionProps {
  navigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ navigate }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Corporate overview video (Vimeo ID: 1225216185)
  const corporateVimeoId = '1225216185';
  const videoPosterUrl = 'https://i.vimeocdn.com/video/2198878474-a0925424588d681015a4b0783dd46e13fc8e5bf05918dc17cac86c43e207490f-d_640';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Brand Story & Mission */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-200 shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-purple-700" />
            About Milnapath International
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-purple-950 tracking-tight leading-tight">
            Restoring Vibrant Health & Building Generational Wealth Across Africa
          </h2>

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            <strong className="text-purple-950">Millennium Nature’s Path International (Milnapath)</strong> is an indigenous, forward-thinking direct selling powerhouse established to revolutionize holistic health and financial self-determination. By blending centuries-old African herbal pharmacology with state-of-the-art laboratory extraction, Milnapath produces potent, 100% natural phytomedicines that target cellular rejuvenation, chronic disease reversal, and immune fortification.
          </p>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Beyond pharmaceutical-grade natural wellness, Milnapath offers one of the most lucrative and partner-centric compensation ecosystems in Africa — featuring a <strong className="text-purple-900">guaranteed ₦500/$1 exchange rate</strong>, 14% infinite binary matching with zero volume flushing, and direct car, house, and international travel awards.
          </p>

          {/* Key Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
              <div className="w-9 h-9 rounded-lg bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">NAFDAC Certified Quality</h4>
                <p className="text-xs text-stone-600 mt-0.5">Rigorous batch-testing, 100% herbal active ingredients with no hazardous synthetic additives.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-100">
              <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">14% Infinite Binary Match</h4>
                <p className="text-xs text-stone-600 mt-0.5">Matches every 40 PV lesser-leg volume with zero volume flush on accumulated sales.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
              <div className="w-9 h-9 rounded-lg bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">Milestone Awards</h4>
                <p className="text-xs text-stone-600 mt-0.5">Brand new luxury cars (₦5M to ₦15M), house funds, and fully-sponsored international vacations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-100">
              <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">Foretaste Accessible Entry</h4>
                <p className="text-xs text-stone-600 mt-0.5">Accessible ₦10,000 starter package with product inclusion, enabling anyone to launch immediately.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Explore Natural Remedies</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => navigate('/compensation')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-purple-50 text-purple-900 font-bold text-sm border-2 border-purple-800 transition-all hover:scale-105"
            >
              <span>Explore Compensation Plan</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Impact Corporate Video Showcase (Vertical 9:16 Orientation) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
            {/* Ambient Background Accent Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-amber-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000 pointer-events-none"></div>

            <div className="relative z-10 bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 aspect-[9/16] w-full">
              {isPlayingVideo ? (
                /* Live Vimeo Embed Player with custom More Videos screen */
                <div className="absolute inset-0 w-full h-full">
                  <VimeoEmbedPlayer
                    vimeoId={corporateVimeoId}
                    title="About Milnapath International Video Presentation"
                    isVertical={true}
                    onClose={() => setIsPlayingVideo(false)}
                    onMoreVideosClick={() => navigate('/vsl')}
                    moreVideos={[
                      {
                        id: 'test-1',
                        title: 'Partner Testimonial: Mary Linus Ibu',
                        subtitle: 'Direct Partner Story • 01:05 mins',
                        posterUrl: 'https://i.vimeocdn.com/video/2198866847-0f531fb3adfb34f3fd511d13a6c6e8060a04c60a472ac155776461dba48ec1ce-d_640',
                        onClick: () => navigate('/vsl')
                      },
                      {
                        id: 'test-2',
                        title: 'Partner Testimonial: Adagold Nicholas',
                        subtitle: 'Direct Partner Story • 01:00 mins',
                        posterUrl: 'https://i.vimeocdn.com/video/2198867854-a2fd10a2c75737ae8d1b5823bf50618db61b3c5274f03855c207f04cc4976a35-d_640',
                        onClick: () => navigate('/vsl')
                      }
                    ]}
                  />
                </div>
              ) : (
                /* Video Poster Card with Interactive Play Button */
                <button 
                  type="button"
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer text-left group flex flex-col justify-between p-5 overflow-hidden focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                  aria-label="Play About Milnapath International Corporate Presentation Video"
                >
                  <img
                    src={videoPosterUrl}
                    alt="Milnapath Corporate Presentation"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/70 pointer-events-none" />

                  {/* Top Header Tag */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-200 bg-purple-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-700/50 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Corporate Showcase
                    </span>
                    <span className="text-[11px] font-semibold text-amber-300 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-700">
                      9:16 Vertical
                    </span>
                  </div>

                  {/* Center Play Button with Rings */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-3 py-6">
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full bg-amber-400/20 animate-ping"></div>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-300 text-purple-950 flex items-center justify-center shadow-2xl shadow-amber-500/60 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/40">
                        <Play className="w-9 h-9 fill-current translate-x-1 text-purple-950" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white bg-stone-900/90 px-4 py-1.5 rounded-full border border-stone-700 backdrop-blur-sm shadow-lg group-hover:bg-purple-900 group-hover:border-purple-600 transition-colors">
                      Click to Watch Presentation
                    </span>
                  </div>

                  {/* Bottom Video Details */}
                  <div className="relative z-10 bg-stone-950/90 backdrop-blur-md p-4 rounded-2xl border border-stone-800">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                      Why Milnapath?
                    </h3>
                    <p className="text-xs text-amber-300 font-medium mt-1">
                      The Vision, Cellular Healing Science & Million-Dollar Compensation Journey
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
