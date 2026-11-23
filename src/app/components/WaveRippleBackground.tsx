import { useEffect, useRef } from "react";

interface CircleWave {
  x: number;
  y: number;
  born: number;
  maxRadius: number;
}

export function WaveRippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const waves: CircleWave[] = [];
    let pointerX = 0;
    let pointerY = 0;
    let hasPointer = false;
    let lastEmitTime = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!hasPointer) {
        pointerX = width * 0.5;
        pointerY = height * 0.45;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > width || y < 0 || y > height) return;

      pointerX = x;
      pointerY = y;
      hasPointer = true;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const duration = 2800; // ms for a circle to expand and ease out slowly
    const emitInterval = 1250; // ms between waves, even when mouse is stationary

    const draw = (now: number) => {
      // Emit a wave every 1.25s from current pointer position (even when idle)
      if (lastEmitTime === 0 || now - lastEmitTime >= emitInterval) {
        waves.push({
          x: pointerX,
          y: pointerY,
          born: now,
          maxRadius: Math.min(560, Math.max(340, Math.max(width, height) * 0.38)),
        });
        if (waves.length > 12) waves.shift();
        lastEmitTime = now;
      }

      // Clean dark background (#0a0e1a)
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, width, height);

      // Prune expired waves and precompute active wave states
      const activeWaves: Array<{ x: number; y: number; radius: number; fade: number }> = [];
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        const elapsed = now - wave.born;
        if (elapsed >= duration) {
          waves.splice(i, 1);
          continue;
        }
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        const radius = 10 + eased * wave.maxRadius;
        // Slower ease-out fade
        const fade = Math.pow(1 - progress, 1.6);
        activeWaves.push({ x: wave.x, y: wave.y, radius, fade });
      }

      // Dotted background grid with 32px spacing, displaced by active waves
      const spacing = 32;
      const band = 72;
      const offsetX = (width % spacing) * 0.5;
      const offsetY = (height % spacing) * 0.5;

      for (let gx = offsetX; gx <= width; gx += spacing) {
        for (let gy = offsetY; gy <= height; gy += spacing) {
          let dxTotal = 0;
          let dyTotal = 0;
          let boost = 0;

          for (let w = 0; w < activeWaves.length; w++) {
            const aw = activeWaves[w];
            const vx = gx - aw.x;
            const vy = gy - aw.y;
            const d = Math.hypot(vx, vy);
            const diff = Math.abs(d - aw.radius);

            if (diff < band && d > 0.001) {
              const norm = 1 - diff / band;
              const strength = norm * norm * aw.fade;
              const push = strength * 10;
              dxTotal += (vx / d) * push;
              dyTotal += (vy / d) * push;
              boost = Math.max(boost, strength);
            }
          }

          const dotAlpha = 0.13 + boost * 0.22;
          const dotRadius = 1.05 + boost * 0.75;
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(gx + dxTotal, gy + dyTotal, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
