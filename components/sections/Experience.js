"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience({ workExperience }) {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray(".exp-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "back.out(1)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                }
            );
        });
    }, []);

    return (
        <section id="experience" className="py-24 max-w-7xl mx-auto px-6 relative z-10 overflow-hidden">
            <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black mb-20 text-center tracking-tight">
                OUR WORK: <br className="md:hidden" />
                <span className="text-[var(--color-primary)]">EXPERIENCE</span>
            </h2>

            <div ref={containerRef} className="relative max-w-4xl mx-auto">
                {/* Very thick center line for Neo-Brutalism */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-[var(--color-border)] md:-translate-x-1/2 shadow-[2px_0_0_var(--color-shadow)]"></div>

                <div className="space-y-16">
                    {workExperience.map((exp, idx) => (
                        <div key={idx} className={`exp-card relative flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
                            {/* Massive Timeline Orb */}
                            <div className="absolute left-[-10px] md:left-1/2 w-8 h-8 rounded-full bg-[var(--color-secondary)] border-4 border-[var(--color-border)] md:-translate-x-1/2 flex items-center justify-center shadow-[4px_4px_0_var(--color-shadow)] z-10 hover:scale-125 transition-transform"></div>

                            {/* Content Box */}
                            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                <div className="neo-card p-8 group w-full">
                                    <div className="neo-badge bg-[var(--color-background)] mb-4">{exp.period}</div>
                                    <h3 className="text-2xl lg:text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                        {exp.role}
                                    </h3>
                                    <div className="text-[var(--color-text-muted)] text-base font-bold mb-6 tracking-wide">
                                        {exp.company} • {exp.location}
                                    </div>
                                    <ul className={`space-y-3 text-[var(--color-text-primary)] font-medium leading-relaxed ${idx % 2 === 0 ? 'md:text-right list-none pl-0' : 'list-none pl-0'}`}>
                                        {exp.points.map((pt, i) => (
                                            <li key={i} className="relative pl-6 md:pl-0">
                                                <span className={`absolute left-0 top-2 w-2 h-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-accent)] shadow-[1px_1px_0_var(--color-shadow)] ${idx % 2 === 0 ? 'md:right-0 md:left-auto' : ''}`}></span>
                                                {idx % 2 === 0 ? <span className="md:pr-8 block">{pt}</span> : pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
