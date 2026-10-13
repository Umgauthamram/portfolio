"use client";

import { useState } from "react";
import Link from "next/link";
import Exploded from "@/components/ui/hairline-exploded";
import SnakeGame from "@/components/ui/SnakeGame";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export default function NotFound() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient radial circles */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* 404 Big Heading */}
        <h1 className="text-7xl md:text-9xl font-[var(--font-heading)] font-black tracking-tighter text-[var(--color-text-primary)] mb-1 drop-shadow-md">
          4<span className="text-[var(--color-primary)]">0</span>4
        </h1>

        <p className="text-sm sm:text-base font-[var(--font-body)] text-[var(--color-text-muted)] max-w-sm ">
          The coordinate you are looking for has exploded into fragmented layers.
        </p>

        {/* Interactive Exploded Isometric Icon & Play Button */}
        <button
          type="button"
          onClick={() => setIsGameOpen(true)}
          className="group relative flex flex-col items-center cursor-pointer focus:outline-none my-1"
          title="Click to play the game"
        >
          {/* Constrained container that clips the empty SVG projection overhead and centers the phone layers */}
          <div className="w-[300px] sm:w-[360px] md:w-[800px] h-[190px] sm:h-[220px] md:h-[440px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Exploded
              className="w-full -mt-8 sm:-mt-40"
              intensity={0.65}
              style={
                {
                  "--hairline-plate": "var(--color-background)",
                  "--hairline-hi": "var(--color-text-primary)",
                  "--hairline-edge": "var(--color-primary)",
                  "--hairline-mid": "var(--color-text-muted)",
                  "--hairline-lo": "var(--color-border)",
                  "--hairline-stroke": "1.2",
                } as React.CSSProperties
              }
            />
          </div>

          {/* Clean Neo-brutalist Play Badge */}
          <span className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0_var(--color-shadow)] font-[var(--font-heading)] font-bold text-xs sm:text-sm tracking-wide group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
            <Gamepad2 size={16} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
            Click to play the game
          </span>
        </button>

        {/* Navigation Button */}
        <div className="mt-5 flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-primary)] text-white font-[var(--font-heading)] font-bold text-xs sm:text-sm shadow-[3px_3px_0_var(--color-shadow)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Snake Mini-game Modal */}
      <SnakeGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </main>
  );
}
