"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundPaths } from '../ui/BackgroundPaths';

export default function Experience({ workExperience }) {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray(".exp-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                }
            );
        });

        gsap.fromTo(".anim-container",
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1)",
                scrollTrigger: {
                    trigger: ".anim-container",
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section id="experience" className="py-24 max-w-[1400px] mx-auto px-6 relative z-10 overflow-hidden">
            {/* Background Animation covering the whole section */}
            <div className="absolute inset-0 z-0 opacity-50">
                <BackgroundPaths />
            </div>

            <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black mb-16 md:mb-24 text-center tracking-tight">
                    MY WORK: <br className="md:hidden" />
                    <span className="text-[var(--color-primary)]">EXPERIENCE</span>
                </h2>

                <div ref={containerRef} className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                    {/* Centered Experience Cards */}
                    <div className="w-full space-y-8">
                        {workExperience.map((exp, idx) => (
                            <div key={idx} className="exp-card w-full">
                                <div className="bg-[var(--color-background)]/80 backdrop-blur-md border-4 border-[var(--color-border)] rounded-2xl shadow-[8px_8px_0_var(--color-shadow)] p-8 md:p-10 group hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300 relative overflow-hidden">

                                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-500"></div>

                                    <div className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white font-[var(--font-code)] font-bold text-sm border-2 border-[var(--color-border)] rounded-lg shadow-[2px_2px_0_var(--color-shadow)] mb-6 transform -rotate-2">
                                        {exp.period}
                                    </div>

                                    <h3 className="text-3xl lg:text-4xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                                        {exp.role}
                                    </h3>

                                    <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-lg font-bold mb-8">
                                        <span className="text-[var(--color-secondary)]">@</span> {exp.company}
                                        <span className="hidden w-1.5 h-1.5 rounded-full bg-[var(--color-border)] md:block"></span>
                                        <span className="hidden md:block">{exp.location}</span>
                                    </div>

                                    <ul className="space-y-4 text-[var(--color-text-primary)] font-medium leading-relaxed font-[var(--font-inter)]">
                                        {exp.points.map((pt, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-accent)] transform rotate-45"></span>
                                                <span className="text-[1.05rem] opacity-90">{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
