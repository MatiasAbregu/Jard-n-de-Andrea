import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function LilyBloomingIntro({ onComplete }: Props) {
  // Phase 0: Complete darkness, Phase 1: Stem rises, Phase 2: Buds form, Phase 3: Bells open & glow expands, Phase 4: Full golden illumination, Phase 5: Fading out to content
  const [phase, setPhase] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // 0ms: Pure black
    // 600ms: Stem glows and arches
    const t1 = setTimeout(() => setPhase(1), 600);
    // 1600ms: Buds swell and start glowing
    const t2 = setTimeout(() => setPhase(2), 1600);
    // 2800ms: Bells open, golden light radiates outwards
    const t3 = setTimeout(() => setPhase(3), 2800);
    // 4000ms: Golden illumination reaches full radiance
    const t4 = setTimeout(() => setPhase(4), 4000);
    // 5000ms: Smooth fade-out starts
    const t5 = setTimeout(() => setIsFadingOut(true), 5000);
    // 6000ms: Complete transition
    const t6 = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-6 sm:p-12 transition-opacity duration-1000 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic Radial Illumination expanding from the flower center */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background:
            phase === 0
              ? '#000000'
              : phase === 1
              ? 'radial-gradient(circle at 50% 55%, rgba(5, 150, 105, 0.25) 0%, rgba(0, 0, 0, 0.95) 55%, #000000 100%)'
              : phase === 2
              ? 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.35) 0%, rgba(16, 185, 129, 0.2) 40%, rgba(0, 0, 0, 0.85) 70%, #000000 100%)'
              : phase === 3
              ? 'radial-gradient(circle at 50% 48%, rgba(254, 240, 138, 0.5) 0%, rgba(52, 211, 153, 0.35) 35%, rgba(6, 78, 59, 0.4) 65%, #000000 100%)'
              : 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(254, 240, 138, 0.6) 25%, rgba(16, 185, 129, 0.45) 55%, rgba(0, 0, 0, 0.6) 85%, #000000 100%)',
        }}
      />

      {/* Floating Stardust Spores that appear as illumination grows */}
      {phase >= 2 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-70" />
          <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-emerald-200 animate-pulse opacity-80" />
          <div className="absolute top-2/5 left-2/3 w-2.5 h-2.5 rounded-full bg-yellow-100 animate-ping [animation-delay:0.5s]" />
          <div className="absolute top-3/5 left-1/3 w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:0.3s]" />
        </div>
      )}

      {/* Top Poetic Intro */}
      <div
        className="relative z-10 text-center space-y-2 transition-all duration-1000 max-w-md mx-auto"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(-15px)',
        }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/40 text-amber-200 text-xs font-serif tracking-widest uppercase shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>La Flor Más Noble Abre Sus Campanas</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide drop-shadow-[0_2px_12px_rgba(254,240,138,0.5)]">
          Floreciendo para vos, Andrea...
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/90 font-serif italic">
          Convallaria Majalis · Iluminando todo en la oscuridad
        </p>
      </div>

      {/* Centerpiece: The Blooming Lily SVG */}
      <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] h-[300px] sm:h-[380px] flex items-center justify-center my-auto">
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Emerald Leaves growing outwards */}
          <path
            d="M50 240C40 180 55 130 90 90C75 140 70 190 75 240Z"
            fill="url(#leafGrad1)"
            className="transition-all duration-1000"
            style={{
              opacity: phase >= 1 ? 0.95 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.4)',
              transformOrigin: '75px 240px',
            }}
          />
          <path
            d="M150 240C160 180 145 130 110 90C125 140 130 190 125 240Z"
            fill="url(#leafGrad2)"
            className="transition-all duration-1000"
            style={{
              opacity: phase >= 1 ? 0.95 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.4)',
              transformOrigin: '125px 240px',
            }}
          />

          {/* Gracefully Arching Stem */}
          <path
            d="M100 240C100 170 102 110 70 50C55 25 35 30 25 40"
            stroke="url(#stemGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: phase === 0 ? 300 : 0,
              filter: phase >= 2 ? 'drop-shadow(0 0 10px rgba(52,211,153,0.8))' : 'none',
            }}
          />

          {/* Bell 1 (Top delicate arch) */}
          {phase >= 1 && (
            <g
              className="transition-all duration-700 ease-out"
              style={{
                transformOrigin: '40px 45px',
                transform:
                  phase >= 3
                    ? 'scale(1.1) rotate(0deg)'
                    : phase >= 2
                    ? 'scale(0.7) rotate(-10deg)'
                    : 'scale(0.2) rotate(-25deg)',
                opacity: phase >= 1 ? 1 : 0,
              }}
            >
              <path d="M48 40C40 42 38 48 38 52" stroke="#34d399" strokeWidth="1.5" />
              <path
                d="M38 52C32 54 28 62 30 70C34 72 36 69 38 72C40 69 42 72 46 70C48 62 44 54 38 52Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
                className="filter drop-shadow-[0_0_12px_rgba(254,240,138,0.9)]"
              />
              <circle
                cx="38"
                cy="65"
                r={phase >= 3 ? 3 : 1.5}
                fill="#fef08a"
                className={phase >= 3 ? 'animate-ping' : ''}
              />
            </g>
          )}

          {/* Bell 2 (Upper mid arch) */}
          {phase >= 2 && (
            <g
              className="transition-all duration-700 delay-100 ease-out"
              style={{
                transformOrigin: '58px 70px',
                transform:
                  phase >= 3
                    ? 'scale(1.2) rotate(0deg)'
                    : 'scale(0.5) rotate(-15deg)',
                opacity: phase >= 2 ? 1 : 0,
              }}
            >
              <path d="M64 62C56 66 54 74 54 78" stroke="#34d399" strokeWidth="1.5" />
              <path
                d="M54 78C47 80 43 90 45 99C50 101 52 98 55 101C58 98 60 101 64 99C67 90 62 80 54 78Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
                className="filter drop-shadow-[0_0_15px_rgba(254,240,138,1)]"
              />
              <circle cx="55" cy="93" r={phase >= 3 ? 3.5 : 2} fill="#fef08a" />
            </g>
          )}

          {/* Bell 3 (Center large blossom) */}
          {phase >= 2 && (
            <g
              className="transition-all duration-700 delay-200 ease-out"
              style={{
                transformOrigin: '80px 105px',
                transform:
                  phase >= 3
                    ? 'scale(1.3) rotate(0deg)'
                    : 'scale(0.4) rotate(-10deg)',
                opacity: phase >= 2 ? 1 : 0,
              }}
            >
              <path d="M84 94C76 100 74 108 74 114" stroke="#34d399" strokeWidth="1.5" />
              <path
                d="M74 114C66 116 61 128 64 139C70 141 72 138 75 141C78 138 81 141 86 139C89 128 84 116 74 114Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
                className="filter drop-shadow-[0_0_18px_rgba(254,240,138,1)]"
              />
              <circle cx="75" cy="132" r={phase >= 3 ? 4 : 2.5} fill="#fef08a" />
            </g>
          )}

          {/* Bell 4 (Lower arch) */}
          {phase >= 3 && (
            <g
              className="transition-all duration-700 delay-300 ease-out"
              style={{
                transformOrigin: '98px 145px',
                transform: 'scale(1.2) rotate(0deg)',
                opacity: 1,
              }}
            >
              <path d="M96 134C90 140 88 148 88 154" stroke="#34d399" strokeWidth="1.5" />
              <path
                d="M88 154C81 156 77 166 80 175C85 177 87 174 90 177C93 174 95 177 100 175C103 166 98 156 88 154Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
                className="filter drop-shadow-[0_0_14px_rgba(254,240,138,1)]"
              />
              <circle cx="90" cy="168" r={3.5} fill="#fef08a" />
            </g>
          )}

          {/* Expanding Aura Burst on Full Bloom */}
          {phase >= 4 && (
            <circle
              cx="75"
              cy="110"
              r="60"
              fill="url(#auraGrad)"
              className="animate-pulse opacity-70"
            />
          )}

          <defs>
            <linearGradient id="stemGrad" x1="100" y1="240" x2="25" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="0.7" stopColor="#10b981" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="leafGrad1" x1="50" y1="240" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#064e3b" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="leafGrad2" x1="150" y1="240" x2="110" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#065f46" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
            <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Words & Direct Skip */}
      <div
        className="relative z-10 w-full max-w-md text-center space-y-4 transition-all duration-1000"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(15px)',
        }}
      >
        <p className="text-sm sm:text-base text-amber-200 font-serif italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          «Porque para mí, sos mí &quot;noble flor&quot; como esta canción...»
        </p>

        <button
          type="button"
          onClick={handleSkip}
          className="min-h-[44px] px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-2xl shadow-amber-400/50 transition-all hover:scale-105 active:scale-95"
        >
          <span>Entrar al diario</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
