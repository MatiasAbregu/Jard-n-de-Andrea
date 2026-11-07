import { useState, useEffect } from 'react';
import { FlowerData } from '../data/flowers';
import { Play, Pause, ExternalLink, Disc3, Sun, Leaf, Snowflake, Flower2, Sparkles } from 'lucide-react';

interface Props {
  flower: FlowerData;
}

export function MusicPlayerCard({ flower }: Props) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  // Close player whenever the flower changes so audio doesn't bleed across flowers
  useEffect(() => {
    setIsPlayingInline(false);
  }, [flower.id]);

  const togglePlayer = () => {
    setIsPlayingInline((prev) => !prev);
  };

  // Color helpers based on flower palette
  const accentColor = flower.palette.accent;
  const primaryColor = flower.palette.primary;
  const secondaryColor = flower.palette.secondary;

  return (
    <div className="w-full transition-all duration-500">
      <div
        className={`relative rounded-3xl border transition-all duration-500 overflow-hidden shadow-xl ${
          flower.isGrandFinale
            ? 'bg-gradient-to-r from-emerald-950/80 via-stone-900/85 to-amber-950/80 border-amber-400/40 shadow-amber-500/10'
            : 'bg-stone-900/85 backdrop-blur-xl border-white/15'
        }`}
        style={{
          boxShadow: `0 10px 30px -10px ${flower.palette.glow}`,
        }}
      >
        {/* =========================================
            SEASONAL DECORATIVE ELEMENTS INSIDE BOX
            ========================================= */}

        {/* 1. Verano (Summer) Decorative Accents */}
        {flower.season === 'Verano' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Soft Sun Ray Glow at top right */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl opacity-25"
              style={{ backgroundColor: secondaryColor }}
            />
            {/* Summer sun corner motif */}
            <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-20 text-amber-200">
              <Sun className="w-5 h-5 animate-spin [animation-duration:30s]" />
              <span className="text-[10px] tracking-widest font-serif uppercase">Brisa de Verano</span>
            </div>
            {/* Subtle floating fireflies */}
            <span
              className="absolute top-8 right-24 w-1.5 h-1.5 rounded-full animate-ping opacity-40"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="absolute bottom-3 left-16 w-1 h-1 rounded-full animate-pulse opacity-60"
              style={{ backgroundColor: secondaryColor }}
            />
          </div>
        )}

        {/* 2. Otoño (Autumn) Decorative Accents */}
        {flower.season === 'Otoño' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Autumn amber glow */}
            <div
              className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-2xl opacity-25"
              style={{ backgroundColor: primaryColor }}
            />
            {/* Floating autumn leaf corner badges */}
            <div className="absolute top-2 right-3 flex items-center gap-1 opacity-25 text-amber-300">
              <Leaf className="w-4 h-4 rotate-45 transform" />
              <Leaf className="w-3.5 h-3.5 -rotate-12 transform" />
              <span className="text-[10px] tracking-widest font-serif uppercase ml-1">Viento Otoñal</span>
            </div>
            {/* Autumn leaf silhouette graphic in corner */}
            <svg
              className="absolute -bottom-3 right-4 w-16 h-16 opacity-10"
              viewBox="0 0 24 24"
              fill={accentColor}
            >
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3 1.3 5.7 3.4 7.5L5 22l4-2c1 .4 2 .6 3 .6 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
          </div>
        )}

        {/* 3. Invierno (Winter) Decorative Accents */}
        {flower.season === 'Invierno' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Wintry violet/ice glow */}
            <div
              className="absolute -top-10 -left-10 w-48 h-48 rounded-full blur-2xl opacity-25"
              style={{ backgroundColor: secondaryColor }}
            />
            {/* Frost snowflakes in the corner */}
            <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-30 text-indigo-200">
              <Snowflake className="w-4 h-4 animate-spin [animation-duration:20s]" />
              <Snowflake className="w-3 h-3" />
              <span className="text-[10px] tracking-widest font-serif uppercase">Escarcha & Luz</span>
            </div>
            {/* Ice crystal starlets */}
            <span className="absolute bottom-3 right-14 text-indigo-300 opacity-25 text-xs">❄</span>
            <span className="absolute top-10 left-32 text-indigo-200 opacity-20 text-[10px]">✦</span>
          </div>
        )}

        {/* 4. Primavera (Spring) Decorative Accents */}
        {flower.season === 'Primavera' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Spring morning glow */}
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: accentColor }}
            />
            {/* Spring blossoms & sparkles */}
            <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-30 text-emerald-200">
              <Flower2 className="w-4 h-4" />
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[10px] tracking-widest font-serif uppercase">
                {flower.isGrandFinale ? 'Noble Flor' : 'Renacer'}
              </span>
            </div>
            {/* Gentle dew sparkle */}
            <span
              className="absolute bottom-3 right-20 w-1.5 h-1.5 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        )}

        {/* =========================================
            MAIN MUSIC STRIP
            ========================================= */}
        <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Disc icon (matching flower palette) + Title & Artist */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 border ${
                  isPlayingInline ? 'animate-spin [animation-duration:7s]' : ''
                }`}
                style={{
                  backgroundColor: `${primaryColor}25`,
                  borderColor: `${secondaryColor}50`,
                  color: accentColor,
                  boxShadow: isPlayingInline ? `0 0 18px ${flower.palette.glow}` : undefined,
                }}
              >
                <Disc3 className="w-6 h-6" style={{ color: accentColor }} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[11px] text-white/60 tracking-wider uppercase font-medium">
                  <span className="truncate">Diario · Canción #{flower.order}</span>
                  <span aria-hidden="true">·</span>
                  <span
                    className="font-medium whitespace-nowrap"
                    style={{ color: accentColor }}
                  >
                    Mes {flower.monthNumber} de 6
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white truncate">
                  {flower.song.title}
                </h4>
                <p className="text-xs text-white/75 truncate">{flower.song.artist}</p>
              </div>
            </div>

            {/* Right: Play / Pause Button & External YouTube Link */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={togglePlayer}
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all duration-300 active:scale-95 shadow-md"
                style={{
                  backgroundColor: isPlayingInline ? primaryColor : `${primaryColor}35`,
                  color: '#ffffff',
                  border: `1px solid ${secondaryColor}60`,
                  boxShadow: isPlayingInline ? `0 4px 14px ${flower.palette.glow}` : undefined,
                }}
                aria-label={isPlayingInline ? 'Pausar canción' : 'Escuchar canción'}
              >
                {isPlayingInline ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span className="hidden xs:inline">Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Escuchar</span>
                  </>
                )}
              </button>

              <a
                href={flower.song.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                title="Abrir en YouTube"
                aria-label="Abrir canción en YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tagline & Animated Equalizer Bars matching flower theme */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <p
              className="italic font-serif text-sm truncate"
              style={{ color: accentColor }}
            >
              {flower.song.tagline}
            </p>

            {/* Animated Equalizer Bars matching flower palette */}
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
        </div>

        {/* Embedded YouTube Player on Toggle */}
        {isPlayingInline && (
          <div className="relative z-10 border-t border-white/10 bg-black/70 p-2 sm:p-3 animate-fadeIn">
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border"
              style={{ borderColor: `${secondaryColor}40` }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${flower.song.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={flower.song.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <p
              className="text-[11px] text-center mt-2 italic font-serif px-2"
              style={{ color: accentColor }}
            >
              «{flower.song.connectionNote}»
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
