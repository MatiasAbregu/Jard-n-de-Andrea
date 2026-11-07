import { useState, useEffect, useRef, TouchEvent } from 'react';
import { FLOWERS } from './data/flowers';
import { FlowerFieldCanvas } from './components/FlowerFieldCanvas';
import { MusicPlayerCard } from './components/MusicPlayerCard';
import { FlowerDisplayCard } from './components/FlowerDisplayCard';
import { DiaryLetterCard } from './components/DiaryLetterCard';
import { GrandFinaleScreen } from './components/GrandFinaleScreen';
import { SeasonalTimeline } from './components/SeasonalTimeline';
import { CompleteLetterModal } from './components/CompleteLetterModal';
import { StardewModal } from './components/StardewModal';
import { SeasonalWanderingAnimals } from './components/SeasonalWanderingAnimals';
import { LilyBloomingIntro } from './components/LilyBloomingIntro';
import { ChevronLeft, ChevronRight, Heart, Volume2, VolumeX, Mail } from 'lucide-react';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [isStardewModalOpen, setIsStardewModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasBloomedLily, setHasBloomedLily] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentFlower = FLOWERS[currentIndex];

  // Play gentle harmonic chime using Web Audio API on flower change
  const playChime = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % FLOWERS.length;
      if (next !== 5) setHasBloomedLily(false);
      else setHasBloomedLily(false);
      playChime(320 + next * 60);
      return next;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + FLOWERS.length) % FLOWERS.length;
      if (prevIdx !== 5) setHasBloomedLily(false);
      else setHasBloomedLily(false);
      playChime(320 + prevIdx * 60);
      return prevIdx;
    });
  };

  const selectIndex = (index: number) => {
    if (index >= 0 && index < FLOWERS.length) {
      if (index === 5 && currentIndex !== 5) {
        setHasBloomedLily(false);
      }
      setCurrentIndex(index);
      playChime(320 + index * 60);
    }
  };

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger only if horizontal swipe dominates over vertical scrolling
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        // Swiped left -> next flower
        goToNext();
      } else {
        // Swiped right -> previous flower
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen text-white bg-gradient-to-b ${currentFlower.palette.bgGradient} transition-colors duration-1000 relative flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-100`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Interactive Flower Field Animation */}
      <FlowerFieldCanvas currentFlower={currentFlower} />

      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <header className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5 border-b border-white/10 bg-black/40 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="text-base sm:text-lg font-serif font-bold text-white tracking-wide whitespace-nowrap">
            Jardín de Andrea
          </span>
        </div>

        {/* Zone 2: Navigation / Seasonal context */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-white/70 font-medium">
          <span>Verano</span>
          <span aria-hidden="true">·</span>
          <span>Otoño</span>
          <span aria-hidden="true">·</span>
          <span>Invierno</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-300">Primavera</span>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            title={soundEnabled ? 'Silenciar campanadas' : 'Activar campanadas'}
            aria-label={soundEnabled ? 'Silenciar sonidos de transición' : 'Activar sonidos de transición'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsLetterModalOpen(true)}
            className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-stone-950 font-medium text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Carta</span>
            <span>Completa</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Body Container */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-start gap-5">
        {/* Seasonal Timeline Header */}
        <SeasonalTimeline
          flowers={FLOWERS}
          currentIndex={currentIndex}
          onSelect={selectIndex}
        />

        {/* Swipe instructions banner on mobile */}
        <div className="flex items-center justify-between text-xs text-white/60 px-2 py-1 bg-white/5 rounded-xl backdrop-blur-sm border border-white/5">
          <button
            type="button"
            onClick={goToPrev}
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors min-h-[36px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[11px]">Anterior</span>
          </button>

          <div className="flex items-center gap-1.5 text-center">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] text-amber-200">
              Desliza el dedo horizontalmente para cambiar de flor
            </span>
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors min-h-[36px]"
          >
            <span className="text-[11px]">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Flow */}
        {currentFlower.isGrandFinale ? (
          /* Climax Screen for 6th Flower (Lirio del Valle / Noble Flor) */
          <>
            {!hasBloomedLily && (
              <LilyBloomingIntro onComplete={() => setHasBloomedLily(true)} />
            )}
            <div
              className={`space-y-5 transition-opacity duration-1000 ${
                hasBloomedLily ? 'opacity-100 animate-fadeIn' : 'opacity-0 pointer-events-none'
              }`}
            >
              <GrandFinaleScreen
                flower={currentFlower}
                onOpenCompleteLetter={() => setIsLetterModalOpen(true)}
                onOpenStardewModal={() => setIsStardewModalOpen(true)}
              />
            </div>
          </>
        ) : (
          /* Standard Flower Screen for Flowers 1 to 5 */
          <div className="space-y-5 animate-fadeIn">
            {/* 1. Music Player Card (Placed ABOVE the flower details as requested) */}
            <MusicPlayerCard flower={currentFlower} />

            {/* 2. Flower Visual and Meaning Note */}
            <FlowerDisplayCard flower={currentFlower} />

            {/* 3. Fragmented Diary Love Letter Card */}
            <DiaryLetterCard
              flower={currentFlower}
              onOpenStardewModal={() => setIsStardewModalOpen(true)}
              onOpenCompleteLetter={() => setIsLetterModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Roaming Seasonal Animals across screen with tap hop reaction (Deer hidden until Lily intro finishes) */}
      {(!currentFlower.isGrandFinale || hasBloomedLily) && (
        <SeasonalWanderingAnimals flower={currentFlower} />
      )}

      {/* Floating Bottom Navigation Bar for Mobile Thumb Ergonomics */}
      <footer className="sticky bottom-0 z-30 w-full bg-black/75 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            type="button"
            onClick={goToPrev}
            className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition-all active:scale-95"
            aria-label="Flor anterior"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {FLOWERS.map((fl, idx) => (
              <button
                key={fl.id}
                type="button"
                onClick={() => selectIndex(idx)}
                className={`transition-all min-h-[44px] min-w-[20px] flex items-center justify-center`}
                aria-label={`Ir a flor ${idx + 1}: ${fl.name}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 sm:w-8 h-2.5 bg-amber-400 shadow-md shadow-amber-400/50'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all active:scale-95 ${
              currentFlower.isGrandFinale
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-lg shadow-amber-400/30'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label="Siguiente flor"
          >
            <span className="hidden xs:inline">
              {currentFlower.isGrandFinale ? 'Reiniciar' : 'Siguiente'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Small Love Dedication */}
        <div className="text-center text-[10px] text-white/40 mt-1 font-serif italic">
          6 meses a tu lado · Para Andrea, con todo mi corazón
        </div>
      </footer>

      {/* Modals */}
      <CompleteLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
      />

      <StardewModal
        isOpen={isStardewModalOpen}
        onClose={() => setIsStardewModalOpen(false)}
      />
    </div>
  );
}
