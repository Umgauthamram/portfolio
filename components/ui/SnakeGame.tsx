"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { X, Play, RotateCcw, Trophy, Volume2, VolumeX, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

// 30% wider arena: 52 columns x 40 rows (40 * 1.3 = 52)
const GRID_COLS = 52;
const GRID_ROWS = 40;
const SPEED_INITIAL = 85; // ms per tick for fast, responsive retro arcade pace

type Point = { x: number; y: number };

export default function SnakeGame({ isOpen, onClose }: SnakeGameProps) {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Directly track dark mode from document.documentElement class for instant reactivity
  useEffect(() => {
    if (typeof document === "undefined") return;
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  // Snake state: Initial start in the center of the 52x40 widescreen grid
  const snakeRef = useRef<Point[]>([
    { x: 26, y: 20 },
    { x: 25, y: 20 },
    { x: 24, y: 20 },
    { x: 23, y: 20 },
    { x: 22, y: 20 },
  ]);
  const directionRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirectionRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>({ x: 36, y: 20 });

  // Grid Cell Glow Map: 52x40 array for fading row & column trails behind the snake
  const cellGlowRef = useRef<Float32Array>(new Float32Array(GRID_COLS * GRID_ROWS));

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("snake_high_score");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  const spawnFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    let collision: boolean;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_COLS),
        y: Math.floor(Math.random() * GRID_ROWS),
      };
      // eslint-disable-next-line no-loop-func
      collision = currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y);
    } while (collision);
    foodRef.current = newFood;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 26, y: 20 },
      { x: 25, y: 20 },
      { x: 24, y: 20 },
      { x: 23, y: 20 },
      { x: 22, y: 20 },
    ];
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    cellGlowRef.current.fill(0);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsStarted(false);
    spawnFood(snakeRef.current);
  }, [spawnFood]);

  // Reset to initial ready state whenever the game modal opens
  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  // Audio feedback using Web Audio API
  const playSound = useCallback((type: "eat" | "die") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "eat") {
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // AudioContext unavailable
    }
  }, [soundEnabled]);

  // Direction setter with 180-degree turn guard
  const setDir = useCallback((dx: number, dy: number) => {
    const current = directionRef.current;
    if (dx !== 0 && current.x !== 0) return;
    if (dy !== 0 && current.y !== 0) return;
    nextDirectionRef.current = { x: dx, y: dy };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w") {
        if (!isStarted) setIsStarted(true);
        setDir(0, -1);
        e.preventDefault();
      } else if (key === "arrowdown" || key === "s") {
        if (!isStarted) setIsStarted(true);
        setDir(0, 1);
        e.preventDefault();
      } else if (key === "arrowleft" || key === "a") {
        if (!isStarted) setIsStarted(true);
        setDir(-1, 0);
        e.preventDefault();
      } else if (key === "arrowright" || key === "d") {
        if (!isStarted) setIsStarted(true);
        setDir(1, 0);
        e.preventDefault();
      } else if (key === " " || key === "spacebar") {
        if (!isStarted) {
          setIsStarted(true);
        } else {
          setIsPaused((prev) => !prev);
        }
        e.preventDefault();
      } else if (key === "escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isStarted, onClose, setDir]);

  // Game logic step
  const gameStep = useCallback(() => {
    if (gameOver || isPaused) return;

    directionRef.current = nextDirectionRef.current;
    const currentSnake = [...snakeRef.current];
    const head = currentSnake[0];
    const dir = directionRef.current;

    const newHead: Point = {
      x: head.x + dir.x,
      y: head.y + dir.y,
    };

    // Wall collision (exact uniform boundary on all 4 sides)
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_COLS ||
      newHead.y < 0 ||
      newHead.y >= GRID_ROWS
    ) {
      setGameOver(true);
      playSound("die");
      return;
    }

    // Self collision
    if (currentSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      setGameOver(true);
      playSound("die");
      return;
    }

    // --- Row and Column Fading Light Trail Behind the Snake ---
    const glowArr = cellGlowRef.current;
    glowArr[newHead.y * GRID_COLS + newHead.x] = 1.0;

    if (dir.x !== 0) {
      // Horizontal move: illuminate cells behind head in row `newHead.y`
      const row = newHead.y;
      for (let c = 0; c < GRID_COLS; c++) {
        const isBehind = dir.x > 0 ? c <= newHead.x : c >= newHead.x;
        if (isBehind) {
          const dist = Math.abs(newHead.x - c);
          const val = Math.max(0, 0.85 - dist * 0.04);
          const idx = row * GRID_COLS + c;
          glowArr[idx] = Math.max(glowArr[idx], val);
        }
      }
    } else if (dir.y !== 0) {
      // Vertical move: illuminate cells behind head in column `newHead.x`
      const col = newHead.x;
      for (let r = 0; r < GRID_ROWS; r++) {
        const isBehind = dir.y > 0 ? r <= newHead.y : r >= newHead.y;
        if (isBehind) {
          const dist = Math.abs(newHead.y - r);
          const val = Math.max(0, 0.85 - dist * 0.04);
          const idx = r * GRID_COLS + col;
          glowArr[idx] = Math.max(glowArr[idx], val);
        }
      }
    }

    currentSnake.unshift(newHead);

    // Food collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      playSound("eat");
      setScore((prev) => {
        const next = prev + 10;
        if (next > highScore) {
          setHighScore(next);
          if (typeof window !== "undefined") {
            localStorage.setItem("snake_high_score", next.toString());
          }
        }
        return next;
      });
      spawnFood(currentSnake);
    } else {
      currentSnake.pop();
    }

    snakeRef.current = currentSnake;
  }, [gameOver, isPaused, highScore, playSound, spawnFood]);

  // Main game ticker
  useEffect(() => {
    if (!isOpen || !isStarted || gameOver || isPaused) return;
    const interval = window.setInterval(gameStep, SPEED_INITIAL);
    return () => window.clearInterval(interval);
  }, [isOpen, isStarted, gameOver, isPaused, gameStep]);

  // High-DPI Canvas render loop (Retina sharp rendering at 60 FPS)
  useEffect(() => {
    if (!isOpen) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      try {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 2, 3);

        const availableW = Math.max(360, rect.width || 760);
        const availableH = Math.max(280, rect.height || 580);

        // Strict square cell calculation matching 52 x 40 grid
        const cellSize = Math.max(6, Math.floor(Math.min(availableW / GRID_COLS, availableH / GRID_ROWS)));
        const width = cellSize * GRID_COLS;
        const height = cellSize * GRID_ROWS;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        // Explicit check against the actual document HTML element
        const isDarkMode = typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : isDark;

        // 1. Solid Clean Background matching current theme
        ctx.fillStyle = isDarkMode ? "#090a0f" : "#fdfaf6";
        ctx.fillRect(0, 0, width, height);

        // 2. Fading Row & Column Trails Behind Snake
        const glowArr = cellGlowRef.current;
        for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
            const idx = r * GRID_COLS + c;
            let glow = glowArr[idx];

            if (glow > 0.005) {
              glow *= 0.94; // Smooth gradual fade out
              glowArr[idx] = glow;

              // Fill illuminated row/column cell with green
              ctx.fillStyle = isDarkMode
                ? `rgba(34, 197, 94, ${glow * 0.42})`
                : `rgba(22, 163, 74, ${glow * 0.28})`;
              ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);

              // Subtle border glow
              ctx.strokeStyle = isDarkMode
                ? `rgba(74, 222, 128, ${glow * 0.55})`
                : `rgba(34, 197, 94, ${glow * 0.45})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);
            }
          }
        }

        // 3. Crisp Vector Grid
        ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= GRID_COLS; i++) {
          const pos = Math.round(i * cellSize) + 0.5;
          ctx.moveTo(pos, 0);
          ctx.lineTo(pos, height);
        }
        for (let j = 0; j <= GRID_ROWS; j++) {
          const pos = Math.round(j * cellSize) + 0.5;
          ctx.moveTo(0, pos);
          ctx.lineTo(width, pos);
        }
        ctx.stroke();

        // 4. Food: STEADY RED BALL (No blinking, perfectly solid, clean)
        const food = foodRef.current;
        const foodCenterX = food.x * cellSize + cellSize / 2;
        const foodCenterY = food.y * cellSize + cellSize / 2;
        const foodRadius = (cellSize / 2) * 0.72;

        // Soft red ambient glow
        const foodGlow = ctx.createRadialGradient(
          foodCenterX, foodCenterY, foodRadius * 0.4,
          foodCenterX, foodCenterY, cellSize * 1.3
        );
        foodGlow.addColorStop(0, "rgba(239, 68, 68, 0.5)");
        foodGlow.addColorStop(0.6, "rgba(220, 38, 38, 0.15)");
        foodGlow.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = foodGlow;
        ctx.beginPath();
        ctx.arc(foodCenterX, foodCenterY, cellSize * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Core Solid Red Ball
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(foodCenterX, foodCenterY, foodRadius, 0, Math.PI * 2);
        ctx.fill();

        // Clean top-left highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(
          foodCenterX - foodRadius * 0.35,
          foodCenterY - foodRadius * 0.35,
          foodRadius * 0.32,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // 5. Snake: Two alternating clean greens
        const snake = snakeRef.current;
        const pad = 1.2;
        const segRadius = Math.max(2.5, cellSize * 0.22);

        const darkGreen = isDarkMode ? "#15803d" : "#166534";
        const lightGreen = isDarkMode ? "#4ade80" : "#22c55e";
        const strokeDark = isDarkMode ? "#166534" : "#14532d";
        const strokeLight = isDarkMode ? "#86efac" : "#15803d";

        snake.forEach((seg, idx) => {
          const isHead = idx === 0;
          const isDarkGreen = idx % 2 === 0;
          const fillColor = isDarkGreen ? darkGreen : lightGreen;
          const strokeColor = isDarkGreen ? strokeDark : strokeLight;

          const segX = seg.x * cellSize + pad;
          const segY = seg.y * cellSize + pad;
          const segW = Math.max(2, cellSize - pad * 2);
          const segH = Math.max(2, cellSize - pad * 2);
          const r = Math.max(0, Math.min(segW / 2, segH / 2, isHead ? segRadius * 1.4 : segRadius));

          ctx.fillStyle = fillColor;
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(segX, segY, segW, segH, r);
          } else {
            ctx.rect(segX, segY, segW, segH);
          }
          ctx.fill();

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Eyes
          if (isHead) {
            const dir = directionRef.current;
            const eyeR = cellSize * 0.16;
            const pupilR = eyeR * 0.55;

            let e1X = segX + segW * 0.5;
            let e1Y = segY + segH * 0.5;
            let e2X = segX + segW * 0.5;
            let e2Y = segY + segH * 0.5;

            if (dir.x === 1) {
              e1X = segX + segW * 0.7; e1Y = segY + segH * 0.3;
              e2X = segX + segW * 0.7; e2Y = segY + segH * 0.7;
            } else if (dir.x === -1) {
              e1X = segX + segW * 0.3; e1Y = segY + segH * 0.3;
              e2X = segX + segW * 0.3; e2Y = segY + segH * 0.7;
            } else if (dir.y === -1) {
              e1X = segX + segW * 0.3; e1Y = segY + segH * 0.3;
              e2X = segX + segW * 0.7; e2Y = segY + segH * 0.3;
            } else {
              e1X = segX + segW * 0.3; e1Y = segY + segH * 0.7;
              e2X = segX + segW * 0.7; e2Y = segY + segH * 0.7;
            }

            // Eye whites
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(e1X, e1Y, eyeR, 0, Math.PI * 2);
            ctx.arc(e2X, e2Y, eyeR, 0, Math.PI * 2);
            ctx.fill();

            // Pupils
            ctx.fillStyle = "#09090b";
            ctx.beginPath();
            ctx.arc(e1X + dir.x * 0.8, e1Y + dir.y * 0.8, pupilR, 0, Math.PI * 2);
            ctx.arc(e2X + dir.x * 0.8, e2Y + dir.y * 0.8, pupilR, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        ctx.restore();
      } catch (err) {
        console.error("Canvas render error:", err);
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isDark]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center p-3 sm:p-5 bg-[#fdfaf6]/95 dark:bg-black/90 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto transition-colors">
      {/* Seamless Open Viewport — Arena takes center stage */}
      <div className="relative w-full max-w-6xl flex flex-col items-center">
        {/* Top Bar: Title & Action Controls */}
        <div
          className="w-full flex items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-[var(--color-border)]"
          style={{ maxWidth: "min(100%, min(1000px, calc((100vh - 150px) * 1.3)))" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-3xl sm:text-4xl">🐍</span>
            <h3 className="font-[var(--font-heading)] font-black text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight">
              Retro Snake Grid
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Score Badges */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[2px_2px_0_var(--color-shadow)] font-[var(--font-code)] text-sm font-bold text-[var(--color-text-primary)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-[var(--color-text-muted)]">Points:</span>
                <span className="text-lg text-emerald-600 dark:text-emerald-400 font-black">{score}</span>
              </div>
              <div className="h-4 w-[2px] bg-[var(--color-border)]/20" />
              <div className="flex items-center gap-1.5">
                <Trophy size={16} className="text-amber-500 dark:text-yellow-400" />
                <span className="text-[var(--color-text-muted)]">Best:</span>
                <span className="text-lg text-amber-600 dark:text-yellow-400 font-black">{highScore}</span>
              </div>
            </div>

            {/* Mute and Close */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] transition-all cursor-pointer"
              title={soundEnabled ? "Mute" : "Unmute"}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-red-500 hover:bg-red-600 text-white shadow-[2px_2px_0_var(--color-shadow)] transition-all cursor-pointer"
              title="Close Game"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Big Game Screen (30% wider arena, 52:40 aspect ratio, full theme support) */}
        <div
          className="relative rounded-2xl overflow-hidden border-3 sm:border-4 border-[var(--color-border)] bg-[#fdfaf6] dark:bg-[#090a0f] shadow-[6px_6px_0_var(--color-shadow)] flex items-center justify-center mx-auto transition-colors duration-300"
          style={{
            width: "min(100%, min(1000px, calc((100vh - 150px) * 1.3)))",
            aspectRatio: "52 / 40",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />

          {/* Start Game Screen Overlay */}
          {!isStarted && !gameOver && !isPaused && (
            <div className="absolute inset-0 bg-[#fdfaf6]/90 dark:bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <button
                onClick={() => setIsStarted(true)}
                className="flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-[var(--font-heading)] font-black text-lg sm:text-xl rounded-2xl border-3 border-[var(--color-border)] shadow-[4px_4px_0_var(--color-shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <Play size={22} className="fill-black" /> Start Game
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-[#fdfaf6]/95 dark:bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <span className="text-6xl sm:text-7xl mb-3">💥</span>
              <h4 className="text-3xl sm:text-4xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-2">
                Game Over!
              </h4>
              <p className="text-base font-[var(--font-code)] text-[var(--color-text-muted)] mb-6">
                You collected <span className="text-red-500 font-bold text-xl">{score}</span> points.
              </p>
              <button
                onClick={() => {
                  resetGame();
                  setIsStarted(true);
                }}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-[var(--font-heading)] font-black text-base sm:text-lg rounded-2xl border-3 border-[var(--color-border)] shadow-[4px_4px_0_var(--color-shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <RotateCcw size={20} /> Play Again
              </button>
            </div>
          )}

          {/* Paused Screen */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-[#fdfaf6]/90 dark:bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
              <span className="text-5xl sm:text-6xl mb-3">⏸️</span>
              <h4 className="text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-5">
                Game Paused
              </h4>
              <button
                onClick={() => setIsPaused(false)}
                className="flex items-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-[var(--font-heading)] font-bold text-base rounded-2xl border-3 border-[var(--color-border)] shadow-[4px_4px_0_var(--color-shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <Play size={18} /> Resume
              </button>
            </div>
          )}
        </div>

        {/* Bottom Directional & Action Bar */}
        <div
          className="w-full mt-3 flex items-center justify-center"
          style={{ maxWidth: "min(100%, min(1000px, calc((100vh - 150px) * 1.3)))" }}
        >
          {/* On-screen Directional Touch/Mouse Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!isStarted) setIsStarted(true);
                setDir(0, -1);
              }}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
              title="Up"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={() => {
                if (!isStarted) setIsStarted(true);
                setDir(-1, 0);
              }}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
              title="Left"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => {
                if (!isStarted) setIsStarted(true);
                setDir(0, 1);
              }}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
              title="Down"
            >
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => {
                if (!isStarted) setIsStarted(true);
                setDir(1, 0);
              }}
              className="p-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
              title="Right"
            >
              <ArrowRight size={16} />
            </button>
            <button
              onClick={resetGame}
              className="ml-2 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[2px_2px_0_var(--color-shadow)] hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer font-bold text-xs"
              title="Restart"
            >
              <RotateCcw size={14} /> Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
