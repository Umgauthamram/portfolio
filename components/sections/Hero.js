"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { TypeAnimation } from "react-type-animation";
import { GLSLHills } from "../ui/glsl-hills";

export default function Hero({ personalInfo }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = !mounted || resolvedTheme === "dark";
    const hillColor = isDark ? "#a78bfa" : "#7c3aed";

    const bgClass = isDark
        ? "bg-gradient-to-br from-[#120826] via-[#09090b] to-[#0a0514]"
        : "bg-gradient-to-br from-[#f3efff] via-[#fff0f3] to-[#fff6ee]";

    const textClass = isDark ? "text-white" : "text-[#121212]";
    const accentTextClass = isDark ? "text-[#FFFBED]" : "text-[var(--color-primary)]";
    const badgeBorderClass = isDark ? "border-white/20 text-white bg-white/10" : "border-black/20 text-[#121212] bg-black/5";
    const cardClass = isDark
        ? "bg-black/30 border-white/10 text-white/95"
        : "bg-white/60 border-black/10 text-[#27272a]";

    return (
        <section id="hero" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 py-32 px-6 ${bgClass}`}>
            {/* Absolute Background Elements */}
            <GLSLHills color={hillColor} />

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8 w-full mt-10">
                
                {/* Top Section: Catchy Headers */}
                <div className={`neo-badge shadow-none ${badgeBorderClass}`}>
                    {personalInfo.tagline}
                </div>

                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-[var(--font-heading)] font-black leading-[1.1] uppercase tracking-tighter ${textClass}`}>
                    The hype <br className="md:hidden" /> is <span className={accentTextClass}>real.</span>
                </h1>

                <div className={`text-2xl md:text-4xl font-[var(--font-heading)] font-bold ${textClass}`}>
                    I am a{" "}
                    <TypeAnimation
                        sequence={[
                            "Web dev & Andriod APP dev Dev.", 1000,
                            "Blockchain Engineer.", 1000,
                            "Web3 Builder.", 1000,
                            "AI Integrator.", 1000
                        ]}
                        wrapper="span"
                        speed={50}
                        className="text-[var(--color-text-primary)] bg-[var(--color-surface)] px-2 rounded"
                        repeat={Infinity}
                    />
                </div>

                {/* Bio card */}
                <div className={`backdrop-blur-md rounded-3xl p-8 md:p-10 border-2 shadow-2xl transition-all duration-300 w-full ${cardClass}`}>
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <div className="h-[2px] w-8 bg-[var(--color-primary)]"></div>
                        <span className={`text-sm font-black uppercase tracking-[0.3em] font-[var(--font-code)] ${isDark ? "text-white/80" : "text-black/70"}`}>
                            Who am I?
                        </span>
                        <div className="h-[2px] w-8 bg-[var(--color-primary)]"></div>
                    </div>
                    <p className="text-lg md:text-xl font-medium leading-relaxed">
                        {personalInfo.bio}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <a href="#projects" className="neo-btn bg-[var(--color-text-primary)] text-[var(--color-background)] border-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white text-lg px-8 py-4">
                            View Projects
                        </a>
                        <a href="/GauthamRam.pdf" download="GauthamRam_Resume.pdf" className="neo-btn-outline bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
