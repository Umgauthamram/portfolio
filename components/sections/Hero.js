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

                <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 p-8 md:p-16 lg:p-24">

                    {/* Left Content */}
                    <div className="flex-1 flex flex-col items-start gap-8 w-full max-w-2xl">
                        <div className="neo-badge text-white bg-[var(--color-border)] border-white/20 shadow-none">
                            {personalInfo.tagline}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[var(--font-heading)] font-black text-white leading-[1.05] drop-shadow-lg">
                            The hype <br /> is <span className="text-[#FFFBED]">real.</span><br />
                        </h1>

                        <div className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white/90 drop-shadow-md h-20">
                            I am a{" "}
                            <TypeAnimation
                                sequence={[
                                    "Full-Stack Dev.", 1000,
                                    "Blockchain Eng.", 1000,
                                    "Web3 Builder.", 1000,
                                    "AI Integrator.", 1000
                                ]}
                                wrapper="span"
                                speed={50}
                                className="text-[#121212] bg-[#FFFBED] px-2"
                                repeat={Infinity}
                            />
                        </div>

                        <p className="text-lg md:text-xl text-white font-medium max-w-xl leading-relaxed drop-shadow-sm">
                            {personalInfo.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 w-full">
                            <a href="#projects" className="neo-btn bg-[#121212] text-white border-[#121212] hover:bg-white hover:text-[#121212] text-lg px-8 py-4 w-full md:w-auto">
                                View Projects
                            </a>
                            <a href="/resume.pdf" className="neo-btn-outline bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 w-full md:w-auto">
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Right Character */}
                    <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-xl relative">
                        <div className="relative w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                            <DeveloperCharacter className="w-full h-auto" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
