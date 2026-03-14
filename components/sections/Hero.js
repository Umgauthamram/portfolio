"use client";

import { TypeAnimation } from "react-type-animation";
import DeveloperCharacter from "../svg/DeveloperCharacter";
import ParticleNetwork from "../three/ParticleNetwork";

export default function Hero({ personalInfo }) {
    return (
        <section id="hero" className="w-full pt-28 pb-32 px-6">
            <div className="max-w-[1400px] mx-auto min-h-[85vh] relative rounded-[2.5rem] md:rounded-[4rem] border-4 border-[var(--color-border)] shadow-[12px_12px_0px_var(--color-shadow)] overflow-hidden flex items-center bg-gradient-to-br from-[#A270FF] via-[#FF7D81] to-[#FFB37A] dark:from-[#7c3aed] dark:via-[#db2777] dark:to-[#ea580c] transition-colors duration-500">

                {/* Absolute Background Elements */}
                <ParticleNetwork />

                <div className="relative z-10 w-full flex flex-col items-start gap-12 p-8 md:p-16 lg:p-24">

                    {/* Top Section: Catchy Headers */}
                    <div className="w-full flex flex-col md:flex-row items-end justify-between gap-8">
                        <div className="flex flex-col items-start gap-6">
                            <div className="neo-badge text-white bg-[var(--color-border)] border-white/20 shadow-none">
                                {personalInfo.tagline}
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-[var(--font-heading)] font-black text-white leading-[1] drop-shadow-lg uppercase tracking-tighter">
                                The hype <br className="hidden md:block" />
                                is <span className="text-[#FFFBED]">real.</span>
                            </h1>
                        </div>

                        <div className="text-2xl md:text-3xl lg:text-4xl font-[var(--font-heading)] font-bold text-white drop-shadow-md md:text-right pb-2">
                            I am a{" "}
                            <TypeAnimation
                                sequence={[
                                    "Full-Stack Dev.", 1000,
                                    "Blockchain Engineer.", 1000,
                                    "Web3 Builder.", 1000,
                                    "AI Integrator.", 1000
                                ]}
                                wrapper="span"
                                speed={50}
                                className="text-[var(--color-text-primary)] bg-[var(--color-surface)] px-2"
                                repeat={Infinity}
                            />
                        </div>
                    </div>

                    {/* Bottom Section: Bio and Character */}
                    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                        {/* Bio side */}
                        <div className="flex-1 w-full max-w-2xl">
                            <div className="bg-[var(--color-surface)]/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-xl dark:bg-black/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-[2px] w-8 bg-[var(--color-primary)]"></div>
                                    <span className="text-sm font-black uppercase text-white/80 tracking-[0.3em] font-[var(--font-code)]">
                                        Who am I?
                                    </span>
                                </div>
                                <p className="text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-sm opacity-95">
                                    {personalInfo.bio}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-10">
                                    <a href="#projects" className="neo-btn bg-[var(--color-text-primary)] text-[var(--color-background)] border-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white text-lg px-8 py-4">
                                        View Projects
                                    </a>
                                    <a href="/Gautham Ram U M.pdf" download="Gautham Ram U M Resume" className="neo-btn-outline bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                                        Resume
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Character side */}
                        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg">
                            <div className="relative w-full h-full filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]">
                                <DeveloperCharacter className="w-full h-auto scale-110 lg:scale-125" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
