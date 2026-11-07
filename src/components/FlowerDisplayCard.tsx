import { FlowerData } from '../data/flowers';
import { Sparkles, Calendar, Heart } from 'lucide-react';

interface Props {
  flower: FlowerData;
}

export function FlowerDisplayCard({ flower }: Props) {
  return (
    <div
      className={`rounded-3xl border p-4 sm:p-6 transition-all duration-500 relative overflow-hidden ${
        flower.isGrandFinale
          ? 'bg-gradient-to-b from-emerald-950/70 via-stone-900/80 to-amber-950/60 border-amber-400/40 shadow-2xl shadow-amber-500/15'
          : 'bg-stone-900/75 backdrop-blur-xl border-white/10 shadow-xl'
      }`}
    >
      {/* Decorative ambient background radial glow */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{ backgroundColor: flower.palette.accent }}
        aria-hidden="true"
      />

      {/* Grid container: 1 col on mobile, 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative z-10">
        {/* Left Column: Flower Image Asset */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="relative group rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl border border-white/15 bg-stone-950">
            <img
              src={flower.image}
              alt={`${flower.name} - ${flower.seasonBadge}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            {/* Subtle contrast gradient scrim at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* In-image caption & season badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="font-serif italic text-amber-200/90 text-sm">
                Flor #{flower.order}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium border border-white/10 text-white/90">
                {flower.seasonIcon} {flower.season}
              </span>
            </div>

            {flower.isGrandFinale && (
              <div className="absolute top-3 left-3 right-3 flex justify-center">
                <span className="px-3 py-1 rounded-full bg-amber-400/90 text-stone-950 text-xs font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Nuestra Noble Flor
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Botanical & Emotional Meaning Note */}
        <div className="md:col-span-7 flex flex-col justify-between py-1">
          <div>
            {/* Seasonal Kicker */}
            <div className="flex items-center gap-2 text-xs text-amber-300/80 mb-1.5 font-medium tracking-wide uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>{flower.seasonBadge}</span>
              <span aria-hidden="true">·</span>
              <span>Mes {flower.monthNumber} de 6</span>
            </div>

            {/* Flower Headline */}
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {flower.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/50 italic font-serif mb-4">
              {flower.scientificName}
            </p>

            {/* Growth & Season Note */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-4">
              <p className="text-xs text-white/80 leading-relaxed">
                <strong className="text-amber-200 font-medium">Cuándo crece: </strong>
                {flower.seasonDescription}
              </p>
            </div>

            {/* Meaning & Symbolism Note (Requested by user) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/70 font-semibold tracking-wider uppercase">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                <span>Qué significa esta flor</span>
              </div>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
                {flower.flowerMeaning}
              </p>
            </div>
          </div>

          {/* Quick interactive touch hint */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
            <span>Desliza para cambiar de estación</span>
            <span className="font-serif italic text-amber-300/70">Mes {flower.monthNumber} / 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
