import { FlowerData } from '../data/flowers';
import { Feather, HeartHandshake, Sparkles, Gamepad2 } from 'lucide-react';

interface Props {
  flower: FlowerData;
  onOpenStardewModal?: () => void;
  onOpenCompleteLetter?: () => void;
}

export function DiaryLetterCard({ flower, onOpenStardewModal, onOpenCompleteLetter }: Props) {
  const isLast = flower.isGrandFinale;

  return (
    <div
      className={`rounded-3xl border p-5 sm:p-7 relative overflow-hidden transition-all duration-500 shadow-xl ${
        isLast
          ? 'bg-gradient-to-br from-amber-950/60 via-stone-900/90 to-emerald-950/60 border-amber-400/50 shadow-amber-500/20'
          : 'bg-stone-900/80 backdrop-blur-xl border-white/10'
      }`}
    >
      {/* Decorative parchment corner glow */}
      <div
        className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none opacity-20 blur-2xl"
        style={{ backgroundColor: flower.palette.accent }}
        aria-hidden="true"
      />

      {/* Header of the letter card */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Feather className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-serif font-semibold text-amber-200">
              {flower.diaryLetter.chapter}
            </h4>
            <p className="text-[11px] text-white/50">{flower.diaryLetter.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCompleteLetter}
          className="text-xs text-amber-300/80 hover:text-amber-200 underline underline-offset-4 flex items-center gap-1 transition-colors min-h-[40px] px-2"
        >
          <span>Leer carta entera</span>
        </button>
      </div>

      {/* Letter text with graceful typography */}
      <div className="relative space-y-4">
        <div className="text-stone-100 text-sm sm:text-base leading-relaxed sm:leading-loose font-serif font-normal italic space-y-3">
          {flower.diaryLetter.text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-amber-300">
              «{paragraph}»
            </p>
          ))}
        </div>

        {/* Special Highlight Banner if specified */}
        {flower.diaryLetter.highlightPhrase && (
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium ${
              isLast
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-200'
                : 'bg-white/5 border-white/10 text-stone-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Para vos, Andrea</span>
            </div>
            <p className="italic font-serif leading-snug">
              {flower.diaryLetter.highlightPhrase}
            </p>
          </div>
        )}

        {/* Stardew Valley Note Button if present */}
        {flower.stardewNote && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenStardewModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-amber-600/30 border border-purple-400/40 hover:border-purple-400/70 text-purple-200 text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm min-h-[44px]"
            >
              <Gamepad2 className="w-4 h-4 text-purple-300" />
              <span>Ver Anillo de Pedida de Stardew Valley 💍</span>
            </button>
          </div>
        )}

        {/* Special Grand Finale Callout for 6th screen */}
        {isLast && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-amber-500/20 border border-amber-400/40 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-300 text-sm font-serif font-bold">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>6 Meses Inolvidables · Nuestro Lazo Rojo</span>
            </div>
            <p className="text-xs text-white/90 font-serif italic">
              «Sos una persona fantástica y quiero que lo entiendas de una vez... Porque para mí noble flor como esta canción.»
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
