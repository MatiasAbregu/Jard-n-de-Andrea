import { useState, useEffect, useRef } from 'react';
import { FlowerData } from '../data/flowers';
import { Heart, Sparkles } from 'lucide-react';

interface Props {
  flower: FlowerData;
}

interface AnimalUnit {
  id: number;
  emoji: string;
  name: string;
  sound: string;
  size: string;
  xOffset: number;
  yOffset: number;
}

export function SeasonalWanderingAnimals({ flower }: Props) {
  // 2D position roaming across the screen
  const [posX, setPosX] = useState(20);
  const [posY, setPosY] = useState(70);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [jumpingId, setJumpingId] = useState<number | null>(null);
  const [reaction, setReaction] = useState<{ id: number; text: string; x: number; y: number } | null>(null);

  const posRef = useRef({ x: 20, y: 70 });
  const dirRef = useRef<'right' | 'left'>('right');
  const targetYRef = useRef(70);

  const group = getAnimalGroup(flower.id);

  // Roam across the entire 2D viewport
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    let timeAccumulator = 0;

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      timeAccumulator += dt;

      // 1. Horizontal movement across screen
      const speedX = 4.8; // % per second
      if (dirRef.current === 'right') {
        posRef.current.x += speedX * dt;
        if (posRef.current.x > 84) {
          dirRef.current = 'left';
          setDirection('left');
        }
      } else {
        posRef.current.x -= speedX * dt;
        if (posRef.current.x < 3) {
          dirRef.current = 'right';
          setDirection('right');
        }
      }

      // 2. Vertical wandering across screen height (between 20% and 80%)
      if (Math.sin(timeAccumulator * 0.4) > 0.8) {
        targetYRef.current = 22 + ((timeAccumulator * 17) % 55);
      }
      const diffY = targetYRef.current - posRef.current.y;
      posRef.current.y += diffY * dt * 0.35 + Math.sin(timeAccumulator * 1.5) * 0.08;

      // Clamp Y to safe visible range
      posRef.current.y = Math.max(20, Math.min(80, posRef.current.y));

      setPosX(posRef.current.x);
      setPosY(posRef.current.y);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [flower.id]);

  // Jump handler when tapping any animal
  const handleAnimalClick = (e: React.MouseEvent, unit: AnimalUnit) => {
    e.stopPropagation();
    setJumpingId(unit.id);

    const rect = e.currentTarget.getBoundingClientRect();
    setReaction({
      id: Date.now(),
      text: unit.sound,
      x: rect.left + rect.width / 2,
      y: rect.top - 20,
    });

    setTimeout(() => {
      setJumpingId(null);
    }, 550);

    setTimeout(() => {
      setReaction(null);
    }, 1300);
  };

  return (
    <>
      {/* Full-screen floating layer for roaming animals */}
      <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
        <div
          className="absolute flex items-end gap-2.5 sm:gap-3.5 transition-all duration-300 ease-linear pointer-events-none"
          style={{
            left: `${posX}%`,
            top: `${posY}%`,
            transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        >
          {group.units.map((unit) => {
            const isJumping = jumpingId === unit.id;
            return (
              <div
                key={unit.id}
                onClick={(e) => handleAnimalClick(e, unit)}
                className={`pointer-events-auto cursor-pointer relative group transition-all duration-300 ${
                  isJumping
                    ? '-translate-y-8 scale-125 rotate-12'
                    : 'hover:-translate-y-2 hover:scale-110'
                }`}
                style={{
                  marginTop: `${unit.yOffset}px`,
                }}
                title={`¡Toca al ${unit.name} para que dé un saltito!`}
              >
                {/* Smaller Animal Emoji with soft shadow */}
                <span
                  className={`${unit.size} block filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.55)] select-none transition-transform ${
                    isJumping ? 'animate-wiggle' : 'animate-sway'
                  }`}
                  style={{
                    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                  }}
                >
                  {unit.emoji}
                </span>

                {/* Heart Burst on Jump */}
                {isJumping && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-rose-400 animate-ping">
                    <Heart className="w-4 h-4 fill-rose-400" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Reaction Speech Bubble on Jump */}
      {reaction && (
        <div
          className="fixed pointer-events-none z-40 px-3 py-1 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-serif font-bold shadow-2xl animate-bounce -translate-x-1/2"
          style={{ left: reaction.x, top: reaction.y }}
        >
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{reaction.text}</span>
          </div>
        </div>
      )}
    </>
  );
}

interface AnimalGroupData {
  title: string;
  season: string;
  units: AnimalUnit[];
}

function getAnimalGroup(flowerId: string): AnimalGroupData {
  switch (flowerId) {
    case 'rosas':
      // 1. Pollitos en verano 🐥
      return {
        title: 'Familia de Pollitos',
        season: 'Verano',
        units: [
          { id: 101, emoji: '🐥', name: 'Mamá Pollito', sound: '¡Pío pío! ❤️', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 102, emoji: '🐤', name: 'Pollito hermanito', sound: '¡Pío! ✨', size: 'text-xl sm:text-2xl', xOffset: 10, yOffset: 2 },
          { id: 103, emoji: '🐣', name: 'Pollito bebé', sound: '¡Chirp chirp! 💕', size: 'text-lg sm:text-xl', xOffset: 18, yOffset: 4 },
        ],
      };

    case 'peonias':
      // 2. Ovejitas en verano 🐑
      return {
        title: 'Ovejitas de Verano',
        season: 'Verano',
        units: [
          { id: 201, emoji: '🐑', name: 'Oveja mayor', sound: '¡Beeee! 🌸', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 202, emoji: '🐑', name: 'Ovejita juguetona', sound: '¡Meee! 💖', size: 'text-xl sm:text-2xl', xOffset: 12, yOffset: 3 },
        ],
      };

    case 'claveles':
      // 3. Alpacas de otoño 🦙
      return {
        title: 'Alpacas de Otoño',
        season: 'Otoño',
        units: [
          { id: 301, emoji: '🦙', name: 'Alpaca noble', sound: '¡Huuuum! 🍂', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 302, emoji: '🦙', name: 'Alpaquita suave', sound: '¡Munch! 🍁', size: 'text-xl sm:text-2xl', xOffset: 14, yOffset: 3 },
        ],
      };

    case 'iris':
      // 4. Pingüinitos de invierno 🐧
      return {
        title: 'Pingüinitos de Invierno',
        season: 'Invierno',
        units: [
          { id: 401, emoji: '🐧', name: 'Pingüino explorador', sound: '¡Waddle waddle! ❄️', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 402, emoji: '🐧', name: 'Pingüinito pequeño', sound: '¡Honk! 💙', size: 'text-xl sm:text-2xl', xOffset: 12, yOffset: 2 },
        ],
      };

    case 'tulipanes':
      // 5. Cisnes de primavera 🦢
      return {
        title: 'Cisnes Primaverales',
        season: 'Primavera',
        units: [
          { id: 501, emoji: '🦢', name: 'Cisne elegante', sound: '¡Honk de amor! 🌷', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 502, emoji: '🦢', name: 'Cisne compañero', sound: '¡Splash! 💖', size: 'text-xl sm:text-2xl', xOffset: 14, yOffset: 2 },
        ],
      };

    case 'lirio-del-valle':
      // 6. Ciervos nobles de primavera / bosque 🦌
      return {
        title: 'Ciervos Nobles del Bosque',
        season: 'Primavera',
        units: [
          { id: 601, emoji: '🦌', name: 'Ciervo noble', sound: '¡Noble flor! ✨', size: 'text-2xl sm:text-3xl', xOffset: 0, yOffset: 0 },
          { id: 602, emoji: '🦌', name: 'Cervatillo', sound: '¡Te amo Andrea! ❤️', size: 'text-xl sm:text-2xl', xOffset: 14, yOffset: 3 },
        ],
      };

    default:
      return {
        title: 'Amigos del Campo',
        season: 'Estación',
        units: [
          { id: 999, emoji: '🐾', name: 'Huellita', sound: '¡Hola! ❤️', size: 'text-2xl', xOffset: 0, yOffset: 0 },
        ],
      };
  }
}
