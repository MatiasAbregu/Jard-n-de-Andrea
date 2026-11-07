import { FlowerData } from '../data/flowers';

interface Props {
  flowers: FlowerData[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function SeasonalTimeline({ flowers, currentIndex, onSelect }: Props) {
  return (
    <div className="w-full px-2 sm:px-4 py-3">
      {/* Scrollable container on small phones */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 max-w-2xl mx-auto overflow-x-auto no-scrollbar p-1 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10">
        {flowers.map((fl, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={fl.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`flex-1 min-w-[50px] sm:min-w-[70px] min-h-[44px] px-2 py-1.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'bg-white/20 text-white shadow-lg border border-white/25 scale-[1.03]'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              }`}
              aria-label={`Ver ${fl.name} (${fl.season})`}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm">{fl.seasonIcon}</span>
                <span className="text-[10px] sm:text-xs font-serif font-semibold hidden sm:inline">
                  {fl.name}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-tight uppercase opacity-75">
                {fl.season}
              </span>
            </button>
          );
        })}
      </div>

      {/* Seasonal progress line */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-white/50">
        <span>Estación: <strong className="text-amber-300 font-medium">{flowers[currentIndex].season}</strong></span>
        <span aria-hidden="true">·</span>
        <span>Flor {currentIndex + 1} de {flowers.length}</span>
      </div>
    </div>
  );
}
