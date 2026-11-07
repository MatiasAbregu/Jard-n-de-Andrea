import { X, Heart, Sparkles } from 'lucide-react';
import { COMPLETE_LETTER } from '../data/flowers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CompleteLetterModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-400/30 shadow-2xl shadow-amber-500/10 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
            <div>
              <h3 id="letter-title" className="text-lg font-serif font-bold text-amber-200">
                Para Andrea · La Carta Completa
              </h3>
              <p className="text-xs text-white/50">6 Meses Juntos · De mi puño y corazón</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Cerrar carta completa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Letter Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-200 font-serif leading-relaxed text-base sm:text-lg">
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-amber-200 text-xs sm:text-sm font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
            <span>
              Cada fragmento corresponde a uno de nuestros 6 meses, a una flor y a una canción de tu diario.
            </span>
          </div>

          {COMPLETE_LETTER.split('\n\n').map((para, index) => (
            <p
              key={index}
              className="first-letter:text-3xl first-letter:font-bold first-letter:text-amber-300 first-letter:float-left first-letter:mr-2"
            >
              {para}
            </p>
          ))}

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-sm font-sans text-amber-300 font-semibold tracking-wider uppercase">
              Por siempre juntos, superando cualquier vendaval.
            </p>
            <p className="text-xs text-white/50 mt-1 font-serif italic">
              Con todo mi amor para Andrea ❤️
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-amber-400 text-stone-950 font-medium text-sm hover:bg-amber-300 transition-colors shadow-lg"
          >
            Volver al campo de flores
          </button>
        </div>
      </div>
    </div>
  );
}
