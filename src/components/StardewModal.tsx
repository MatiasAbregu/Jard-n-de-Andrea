import { X, Sparkles, Heart } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function StardewModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stardew-title"
    >
      <div className="relative w-full max-w-lg my-auto rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-stone-950 border-2 border-amber-400/50 shadow-2xl shadow-indigo-500/25 overflow-hidden p-5 sm:p-6 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 min-h-[44px] min-w-[44px] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Cerrar ventana de Stardew Valley"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Pixel Ring & Stardew Valley Vibe */}
        <div className="flex flex-col items-center">
          {/* Authentic Pixel-Art Style Wedding Ring Icon */}
          <div className="relative w-20 h-20 rounded-2xl bg-indigo-950/80 border-2 border-purple-400/60 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-2">
            <svg
              className="w-14 h-14 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="crispEdges"
            >
              {/* Iridium Band Shadow & Outline */}
              <rect x="8" y="14" width="16" height="14" rx="7" stroke="#3b0764" strokeWidth="2" fill="none" />
              {/* Iridium Band Body (Deep Purple & Violet) */}
              <rect x="9" y="15" width="14" height="12" rx="6" stroke="#9333ea" strokeWidth="2.5" fill="none" />
              <rect x="10" y="16" width="12" height="10" rx="5" stroke="#c084fc" strokeWidth="1" fill="none" />

              {/* Prismatic Shard / Gem Setting */}
              <polygon points="16,4 22,10 16,16 10,10" fill="#f43f5e" />
              <polygon points="16,4 20,9 16,13 12,9" fill="#38bdf8" />
              <polygon points="16,6 18,9 16,11 14,9" fill="#fef08a" />

              {/* Prismatic Sparkle Glints */}
              <rect x="15" y="7" width="2" height="3" fill="#ffffff" />
              <rect x="22" y="5" width="2" height="2" fill="#fde047" />
              <rect x="8" y="6" width="2" height="2" fill="#a855f7" />
            </svg>

            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 p-1 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 id="stardew-title" className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
            El Anillo de Pedida · Wedding Ring
          </h3>
          <p className="text-xs text-purple-300 uppercase tracking-widest mt-0.5">
            Nuestra Promesa de Stardew Valley
          </p>
        </div>

        {/* Real In-Game Wedding Photo of Them Kissing */}
        <div className="my-4 p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 shadow-inner">
          <div className="relative mx-auto max-w-[200px] rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-xl bg-stone-950">
            <img
              src="/assets/aistudio/Captura_de_pantalla_2026-10-26_174205_3aecce40.png"
              alt="Nuestra boda en Stardew Valley"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain [image-rendering:pixelated]"
            />
            {/* Heart badge */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm py-0.5 px-2 rounded-md text-[10px] text-amber-200 font-medium flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              <span>Nuestra boda en el juego</span>
            </div>
          </div>
        </div>

        {/* Description updating tradition for other players */}
        <div className="my-3 p-4 rounded-2xl bg-indigo-950/60 border border-purple-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-serif italic space-y-2.5 text-left">
          <p className="text-center text-amber-300 font-medium not-italic text-sm">
            «...así como espero algún día poder cumplir lo del Stardew Valley.»
          </p>

          <p className="font-sans text-xs text-slate-300 not-italic">
            En Stardew Valley multijugador, para casarte con otro jugador no se usa el colgante del viejo marinero: se forja el <strong>Anillo de Pedida (Wedding Ring)</strong> con 5 barras de iridio y una esquirla prismática, los tesoros más raros y valiosos de todo el juego.
          </p>

          <p className="font-sans text-xs text-slate-300 not-italic">
            Se lo entregás a quien elegiste como tu compañera de vida para compartir la granja, los días y cada aventura juntos.
          </p>

          <div className="pt-2 border-t border-purple-400/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <p className="font-sans text-xs text-amber-200 font-semibold not-italic">
              Nuestra boda en Stardew Valley fue hermosa, pero mi juramento con vos es para la vida real. Sos el amor de mi vida, Andrea. 💍❤️
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-medium text-sm transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Guardar en el corazón</span>
        </button>
      </div>
    </div>
  );
}
