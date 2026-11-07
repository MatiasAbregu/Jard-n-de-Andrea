import { useEffect, useRef } from 'react';
import { FlowerData } from '../data/flowers';

interface Props {
  currentFlower: FlowerData;
}

interface FlowerPetalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  flowerId: string;
  color: string;
  secondaryColor: string;
}

export function FlowerFieldCanvas({ currentFlower }: Props) {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ambient particles (Rendered BEHIND at z-0)
  const ambientParticlesRef = useRef<FlowerPetalParticle[]>([]);
  // Touch/Click burst particles (Rendered ALWAYS ON TOP at z-40)
  const touchBurstParticlesRef = useRef<FlowerPetalParticle[]>([]);

  const currentFlowerRef = useRef<FlowerData>(currentFlower);

  useEffect(() => {
    currentFlowerRef.current = currentFlower;
  }, [currentFlower]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const touchCanvas = touchCanvasRef.current;
    if (!bgCanvas || !touchCanvas) return;

    const bgCtx = bgCanvas.getContext('2d');
    const touchCtx = touchCanvas.getContext('2d');
    if (!bgCtx || !touchCtx) return;

    let animationFrameId: number;
    let width = (bgCanvas.width = touchCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = touchCanvas.height = window.innerHeight);

    const handleResize = () => {
      if (!bgCanvas || !touchCanvas) return;
      width = bgCanvas.width = touchCanvas.width = window.innerWidth;
      height = bgCanvas.height = touchCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial ambient falling petals (BEHIND CONTENT)
    const ambientCount = window.innerWidth < 640 ? 25 : 45;
    const ambientParticles = ambientParticlesRef.current;
    ambientParticles.length = 0;

    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push(createAmbientPetal(width, height, currentFlower));
    }

    // Global touch/pointer listener: creates touch-burst petals ALWAYS ON TOP
    const handleGlobalPointer = (e: PointerEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      spawnTouchBurstPetals(clientX, clientY, currentFlowerRef.current);
    };

    window.addEventListener('pointerdown', handleGlobalPointer, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.015;

      // =========================================================================
      // 1. BACKGROUND CANVAS (z-0): Glow + Field Stems + AMBIENT FALLING PETALS
      // =========================================================================
      bgCtx.clearRect(0, 0, width, height);

      // Radial Glow
      const grad = bgCtx.createRadialGradient(
        width / 2,
        height * 0.35,
        15,
        width / 2,
        height * 0.35,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, currentFlower.palette.glow);
      grad.addColorStop(1, 'transparent');
      bgCtx.fillStyle = grad;
      bgCtx.fillRect(0, 0, width, height);

      // Swaying Field Stems
      drawFieldStems(bgCtx, width, height, time, currentFlower);

      // Ambient Falling Petals (Passively appearing over time, rendered BEHIND content)
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx + Math.sin(time + p.y * 0.006) * 0.7;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around screen
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        bgCtx.save();
        bgCtx.translate(p.x, p.y);
        bgCtx.rotate(p.rotation);
        bgCtx.globalAlpha = Math.max(0, p.opacity);

        drawFlowerPetal(bgCtx, p.flowerId, p.size, p.color, p.secondaryColor, false);
        bgCtx.restore();
      }

      // Maintain ambient petal count
      if (ambientParticles.length < ambientCount) {
        ambientParticles.push(createAmbientPetal(width, height, currentFlower, true));
      }

      // =========================================================================
      // 2. TOUCH CANVAS (z-40): ONLY TOUCH/CLICK PETALS (SIEMPRE ARRIBA DEL TODO)
      // =========================================================================
      touchCtx.clearRect(0, 0, width, height);

      const touchParticles = touchBurstParticlesRef.current;
      for (let i = touchParticles.length - 1; i >= 0; i--) {
        const p = touchParticles[i];
        p.x += p.vx + Math.sin(time + p.y * 0.008) * 0.5;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.opacity -= 0.012;

        if (p.opacity <= 0) {
          touchParticles.splice(i, 1);
          continue;
        }

        touchCtx.save();
        touchCtx.translate(p.x, p.y);
        touchCtx.rotate(p.rotation);
        touchCtx.globalAlpha = Math.max(0, p.opacity);

        // Render Touch Petals ALWAYS ON TOP with vivid luminescence
        drawFlowerPetal(touchCtx, p.flowerId, p.size, p.color, p.secondaryColor, true);

        touchCtx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleGlobalPointer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentFlower]);

  // Burst of petals strictly triggered by user CLICK or TOUCH
  const spawnTouchBurstPetals = (x: number, y: number, flower: FlowerData) => {
    const burstCount = flower.id === 'lirio-del-valle' ? 9 : 10;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.45;
      const speed = 2.4 + Math.random() * 4.2;

      touchBurstParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (flower.id === 'lirio-del-valle' ? 2.0 : 1.4),
        size: flower.id === 'lirio-del-valle' ? 12 + Math.random() * 7 : 10 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.12,
        opacity: 1.0,
        flowerId: flower.id,
        color: flower.palette.accent,
        secondaryColor: flower.palette.secondary,
      });
    }
  };

  return (
    <>
      {/* 1. Background Canvas: Stems, glow, and ambient passive petals BEHIND all cards (z-0) */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      />

      {/* 2. Forefront Touch Canvas: CLICK & TOUCH PETALS ONLY - SIEMPRE ARRIBA DEL TODO (z-40) */}
      <canvas
        ref={touchCanvasRef}
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-300"
      />
    </>
  );
}

// Helper: Create passive ambient falling petal
function createAmbientPetal(
  width: number,
  height: number,
  flower: FlowerData,
  startAtTop = false
): FlowerPetalParticle {
  return {
    x: Math.random() * width,
    y: startAtTop ? -20 : Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6 + (flower.season === 'Invierno' ? 0.2 : 0.4),
    vy: 0.45 + Math.random() * 0.8,
    size: flower.id === 'lirio-del-valle' ? 9 + Math.random() * 5 : 8 + Math.random() * 7,
    rotation: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.03,
    opacity: 0.3 + Math.random() * 0.5,
    flowerId: flower.id,
    color: flower.palette.accent,
    secondaryColor: flower.palette.secondary,
  };
}

// Anatomically distinct petal drawing
function drawFlowerPetal(
  ctx: CanvasRenderingContext2D,
  flowerId: string,
  size: number,
  color: string,
  secondaryColor: string,
  isTopBurst: boolean
) {
  switch (flowerId) {
    case 'rosas': {
      // Rosas: Curved teardrop rose petal
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.5, 0, size * 0.9);
      ctx.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.6, 0, -size);
      ctx.fillStyle = '#e11d48';
      if (isTopBurst) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(225, 29, 72, 0.7)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Soft highlight on edge
      ctx.beginPath();
      ctx.arc(0, -size * 0.4, size * 0.5, 0, Math.PI);
      ctx.fillStyle = 'rgba(251, 113, 133, 0.6)';
      ctx.fill();
      break;
    }

    case 'peonias': {
      // Peonías: Lush, wavy multi-lobed petal
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.7, -size * 0.8, size * 0.9, -size * 0.2);
      ctx.quadraticCurveTo(size * 0.6, size * 0.4, size * 0.3, size * 0.8);
      ctx.quadraticCurveTo(0, size, -size * 0.3, size * 0.8);
      ctx.quadraticCurveTo(-size * 0.6, size * 0.4, -size * 0.9, -size * 0.2);
      ctx.quadraticCurveTo(-size * 0.7, -size * 0.8, 0, -size);
      ctx.fillStyle = 'rgba(244, 114, 182, 0.9)';
      if (isTopBurst) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(244, 114, 182, 0.7)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(254, 226, 226, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.4, size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'claveles': {
      // Claveles: Serrated / ruffled fringed edges
      ctx.beginPath();
      ctx.moveTo(0, size * 0.8);
      ctx.lineTo(size * 0.3, 0);
      ctx.lineTo(size * 0.6, -size * 0.4);
      ctx.lineTo(size * 0.4, -size * 0.6);
      ctx.lineTo(size * 0.6, -size * 0.8);
      ctx.lineTo(size * 0.2, -size * 0.9);
      ctx.lineTo(0, -size);
      ctx.lineTo(-size * 0.2, -size * 0.9);
      ctx.lineTo(-size * 0.6, -size * 0.8);
      ctx.lineTo(-size * 0.4, -size * 0.6);
      ctx.lineTo(-size * 0.6, -size * 0.4);
      ctx.lineTo(-size * 0.3, 0);
      ctx.closePath();
      ctx.fillStyle = '#f59e0b';
      if (isTopBurst) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(0, size * 0.4, size * 0.25, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'iris': {
      // Iris: Slender violet falling petal with central golden beard
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.2);
      ctx.quadraticCurveTo(size * 0.5, -size * 0.4, size * 0.7, size * 0.2);
      ctx.quadraticCurveTo(size * 0.4, size * 0.9, 0, size);
      ctx.quadraticCurveTo(-size * 0.4, size * 0.9, -size * 0.7, size * 0.2);
      ctx.quadraticCurveTo(-size * 0.5, -size * 0.4, 0, -size * 1.2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.9)';
      if (isTopBurst) {
        ctx.shadowBlur = 9;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.ellipse(0, -size * 0.1, size * 0.15, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.fill();
      break;
    }

    case 'tulipanes': {
      // Tulipanes: Smooth, curved cup-shaped tulip petal
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.1);
      ctx.quadraticCurveTo(size * 0.8, -size * 0.6, size * 0.6, size * 0.6);
      ctx.quadraticCurveTo(size * 0.2, size, 0, size);
      ctx.quadraticCurveTo(-size * 0.2, size, -size * 0.6, size * 0.6);
      ctx.quadraticCurveTo(-size * 0.8, -size * 0.6, 0, -size * 1.1);
      ctx.fillStyle = '#fb7185';
      if (isTopBurst) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(251, 113, 133, 0.7)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.beginPath();
      ctx.ellipse(0, size * 0.2, size * 0.35, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'lirio-del-valle': {
      // Lirio del Valle: Delicate porcelain-white bell-shaped flower with scalloped rim!
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(0, -size * 0.85, size * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // Bell shape
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.bezierCurveTo(size * 0.65, -size * 0.5, size * 0.85, 0, size * 0.7, size * 0.5);
      // Scalloped bottom rim (ruffled bell hem)
      ctx.quadraticCurveTo(size * 0.4, size * 0.65, size * 0.25, size * 0.45);
      ctx.quadraticCurveTo(0, size * 0.65, -size * 0.25, size * 0.45);
      ctx.quadraticCurveTo(-size * 0.4, size * 0.65, -size * 0.7, size * 0.5);
      ctx.bezierCurveTo(-size * 0.85, 0, -size * 0.65, -size * 0.5, 0, -size * 0.7);
      ctx.closePath();

      ctx.fillStyle = '#ffffff';
      if (isTopBurst) {
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(254, 240, 138, 0.95)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Soft interior golden shimmer inside the bell
      ctx.beginPath();
      ctx.arc(0, size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.fill();
      break;
    }

    default: {
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.6, size, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      break;
    }
  }
}

// Swaying field grass stems at the bottom
function drawFieldStems(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  flower: FlowerData
) {
  const stemsCount = Math.floor(width / (window.innerWidth < 640 ? 15 : 20));
  ctx.save();
  ctx.strokeStyle = flower.isGrandFinale
    ? 'rgba(52, 211, 153, 0.25)'
    : 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;

  for (let i = 0; i < stemsCount; i++) {
    const baseX = (i / stemsCount) * width;
    const stemHeight = 45 + Math.sin(i * 1.3) * 20 + Math.cos(i * 0.7) * 15;
    const sway = Math.sin(time * 1.2 + i * 0.25) * 12;

    ctx.beginPath();
    ctx.moveTo(baseX, height);
    ctx.quadraticCurveTo(
      baseX + sway * 0.5,
      height - stemHeight * 0.5,
      baseX + sway,
      height - stemHeight
    );
    ctx.stroke();

    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.arc(baseX + sway, height - stemHeight, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = flower.palette.accent;
      ctx.globalAlpha = 0.4;
      ctx.fill();
    }
  }
  ctx.restore();
}
