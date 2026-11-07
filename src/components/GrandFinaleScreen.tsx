import { useState, useEffect } from 'react';
import { FlowerData } from '../data/flowers';
import { Sparkles, Heart, Play, Pause, ExternalLink, Disc3, BookOpen, Gamepad2, Flower2 } from 'lucide-react';

interface Props {
  flower: FlowerData;
  onOpenCompleteLetter: () => void;
  onOpenStardewModal: () => void;
}

export function GrandFinaleScreen({ flower, onOpenCompleteLetter, onOpenStardewModal }: Props) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  // Close player when switching flowers
  useEffect(() => {
    setIsPlayingInline(false);
  }, [flower.id]);

  const primaryColor = flower.palette.primary; // #10b981
  const secondaryColor = flower.palette.secondary; // #34d399
  const accentColor = flower.palette.accent; // #fef08a

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Golden Aura Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-b from-amber-950/80 via-emerald-950/70 to-stone-950/90 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/20 text-center">
        {/* Subtle sparkle ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-400/20 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Flor #6 · El Clímax de Nuestros 6 Meses</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Para Mi Noble Flor, Andrea
          </h2>

          <p className="text-sm sm:text-base text-amber-200/90 font-serif italic max-w-xl">
            «La flor más hermosa y pura florece con dignidad inquebrantable, iluminando todo a su paso.»
          </p>
        </div>
      </div>

      {/* Music Video Section (Above the details as requested) with Spring Theme & Palette Matching */}
      <div
        className="relative rounded-3xl border border-amber-400/40 bg-gradient-to-br from-emerald-950/80 via-stone-900/90 to-amber-950/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl overflow-hidden"
        style={{
          boxShadow: `0 10px 30px -10px ${flower.palette.glow}`,
        }}
      >
        {/* Spring Seasonal Atmospheric Elements inside Music Frame */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl opacity-35"
            style={{ backgroundColor: secondaryColor }}
          />
          <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-35 text-amber-300">
            <Flower2 className="w-4 h-4" />
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[10px] tracking-widest font-serif uppercase">Primavera Noble</span>
          </div>
          {/* Subtle sparkling morning dew glints */}
          <span
            className="absolute bottom-3 right-16 w-1.5 h-1.5 rounded-full animate-ping opacity-60"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Themed Disc Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300"
              style={{
                backgroundColor: `${primaryColor}30`,
                borderColor: `${secondaryColor}60`,
                color: accentColor,
                boxShadow: isPlayingInline ? `0 0 18px ${flower.palette.glow}` : undefined,
              }}
            >
              <Disc3
                className={`w-7 h-7 ${isPlayingInline ? 'animate-spin [animation-duration:8s]' : ''}`}
                style={{ color: accentColor }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider" style={{ color: accentColor }}>
                <span>Canción Especial · Noble Flor</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                {flower.song.title}
              </h3>
              <p className="text-xs text-white/75">{flower.song.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Play/Pause Button matching theme */}
            <button
              type="button"
              onClick={() => setIsPlayingInline((prev) => !prev)}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-transform active:scale-95 shadow-md"
              style={{
                backgroundColor: isPlayingInline ? primaryColor : `${primaryColor}40`,
                color: '#ffffff',
                border: `1px solid ${secondaryColor}60`,
                boxShadow: isPlayingInline ? `0 4px 14px ${flower.palette.glow}` : undefined,
              }}
            >
              {isPlayingInline ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Ocultar video</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Reproducir video</span>
                </>
              )}
            </button>

            <a
              href={flower.song.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
              title="Abrir en YouTube"
              aria-label="Abrir en YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Animated Equalizer Bars matching emerald/gold spring palette */}
        <div className="relative z-10 pt-2 flex items-center justify-between gap-3 text-xs">
          <p className="italic font-serif text-sm truncate" style={{ color: accentColor }}>
            {flower.song.tagline}
          </p>

          <div className="flex items-end gap-1 h-3.5 shrink-0" aria-hidden="true">
            <span
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlayingInline ? 'animate-bounce [animation-delay:-0.3s] h-3.5' : 'h-1.5 opacity-40'
              }`}
              style={{ backgroundColor: accentColor }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlayingInline ? 'animate-bounce [animation-delay:-0.15s] h-2.5' : 'h-2 opacity-50'
              }`}
              style={{ backgroundColor: secondaryColor }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlayingInline ? 'animate-bounce h-4' : 'h-1 opacity-40'
              }`}
              style={{ backgroundColor: primaryColor }}
            />
            <span
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlayingInline ? 'animate-bounce [animation-delay:-0.25s] h-3' : 'h-2 opacity-50'
              }`}
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* Embedded YouTube Player */}
        {isPlayingInline && (
          <div className="relative z-10 mt-4 rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl bg-black">
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${flower.song.youtubeId}?autoplay=1&rel=0`}
                title={flower.song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        <div
          className="relative z-10 mt-3 p-3 rounded-xl border text-xs italic font-serif text-center"
          style={{
            backgroundColor: `${primaryColor}15`,
            borderColor: `${secondaryColor}30`,
            color: accentColor,
          }}
        >
          «{flower.song.connectionNote}»
        </div>
      </div>

      {/* Flower Portrait & Meaning Note */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5">
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border-2 border-amber-400/40 shadow-2xl bg-stone-950">
            <img
              src={flower.image}
              alt="Lirio del Valle - Noble Flor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="px-3 py-1 rounded-full bg-amber-400/90 text-stone-950 text-xs font-bold tracking-wide shadow-md">
                Convallaria Majalis · Lirio del Valle
              </span>
            </div>
          </div>
        </div>

        {/* Remate del Texto Card */}
        <div className="md:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900/95 to-amber-950/80 border-2 border-amber-400/40 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>El Remate de Mi Carta Para Vos</span>
            </div>

            <div className="space-y-4 text-stone-100 font-serif text-base sm:text-lg leading-relaxed italic">
              <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-amber-300">
                «Te amo Andrea, de verdad lo digo, de corazón; da igual cuanto peleemos, quiero permanecer a tu lado por siempre y cada juramento que hice lo quiero seguir cumpliendo hasta que me muera como vengo haciendo hasta ahora.»
              </p>

              <p className="text-amber-200 font-medium text-lg sm:text-xl not-italic border-l-2 border-amber-400 pl-4 py-1">
                «Sos una persona fantástica y quiero que lo entiendas de una vez... Porque para mí, sos mí &quot;noble flor&quot; como esta canción.»
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              <strong className="text-amber-300">Nota sobre el Lirio del Valle: </strong>
              {flower.flowerMeaning}
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenCompleteLetter}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Leer la carta completa</span>
            </button>

            <button
              type="button"
              onClick={onOpenStardewModal}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-900/70 via-indigo-900/70 to-amber-900/70 hover:opacity-90 text-purple-200 border border-purple-400/40 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <Gamepad2 className="w-4 h-4 text-purple-300" />
              <span>Anillo de Stardew Valley 💍</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
