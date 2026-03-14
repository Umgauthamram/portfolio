"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tiles } from "../ui/Tiles";

export default function Achievements({ achievements }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(".achievement-card",
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    return (
        <section id="achievements" ref={sectionRef} className="py-32 bg-[var(--color-background)] relative overflow-hidden">
            {/* Background Tiles - Reduced Opacity for subtle visibility */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center">
                <Tiles rows={40} cols={20} tileSize="lg" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black mb-20 text-[var(--color-text-primary)] tracking-tight">
                    Key <span className="text-[var(--color-accent)]">Achievements</span>
                </h2>

                <div className="flex overflow-x-auto pb-12 pt-4 gap-8 snap-x hide-scrollbar scroll-smooth px-8 lg:px-0">
                    {achievements.map((ach, idx) => {
                        const bgColors = ["bg-[#A270FF]", "bg-[#FF9B54]", "bg-[#FF7D81]"];
                        const bgColor = bgColors[idx % bgColors.length];
                        return ach.url ? (
                            <a
                                key={ach.id}
                                href={ach.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`achievement-card flex-none w-[360px] md:w-[420px] h-[320px] ${bgColor} border-4 border-[var(--color-border)] shadow-[12px_12px_0_var(--color-shadow)] p-10 rounded-[2rem] snap-center transition-transform duration-300 flex flex-col items-start justify-center text-left group cursor-pointer`}
                            >
                                <div className="flex justify-between w-full">
                                    <div className="text-6xl mb-6 bg-white/20 p-4 rounded-2xl border-4 border-black/10 group-hover:scale-110 transition-transform">{ach.icon}</div>
                                    <div className="text-black group-hover:text-black/70 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-[var(--font-heading)] font-black text-black mb-4 leading-tight">{ach.title}</h3>
                                <p className="font-[var(--font-code)] font-bold text-shadow-sm text-black/90 text-sm leading-relaxed">{ach.description}</p>
                            </a>
                        ) : (
                            <div
                                key={ach.id}
                                className={`achievement-card flex-none w-[360px] md:w-[420px] h-[320px] ${bgColor} border-4 border-[var(--color-border)] shadow-[12px_12px_0_var(--color-shadow)] p-10 rounded-[2rem] snap-center transition-transform duration-300 flex flex-col items-start justify-center text-left group`}
                            >
                                <div className="text-6xl mb-6 bg-white/20 p-4 rounded-2xl border-4 border-black/10 group-hover:scale-110 transition-transform">{ach.icon}</div>
                                <h3 className="text-2xl lg:text-3xl font-[var(--font-heading)] font-black text-black mb-4 leading-tight">{ach.title}</h3>
                                <p className="font-[var(--font-code)] font-bold text-black/90 text-sm leading-relaxed">{ach.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
