"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        <section id="achievements" ref={sectionRef} className="py-32 bg-[var(--color-background)]">
            <div className="max-w-[1400px] mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black mb-20 text-[var(--color-text-primary)] tracking-tight">
                    Case <span className="text-[var(--color-accent)]">Studies</span>
                </h2>

                <div className="flex overflow-x-auto pb-12 pt-4 gap-8 snap-x hide-scrollbar scroll-smooth px-8 lg:px-0">
                    {achievements.map((ach, idx) => {
                        const bgColors = ["bg-[#A270FF]", "bg-[#FF9B54]", "bg-[#FF7D81]"];
                        const bgColor = bgColors[idx % bgColors.length];
                        return (
                            <div
                                key={ach.id}
                                className={`achievement-card flex-none w-[360px] md:w-[420px] h-[320px] ${bgColor} border-4 border-[var(--color-border)] shadow-[12px_12px_0_var(--color-shadow)] p-10 rounded-[2rem] snap-center hover:-translate-y-4 hover:-translate-x-2 transition-transform duration-300 flex flex-col items-start justify-center text-left group`}
                            >
                                <div className="text-6xl mb-6 bg-white/20 p-4 rounded-2xl border-4 border-black/10 group-hover:scale-110 transition-transform">{ach.icon}</div>
                                <h3 className="text-2xl lg:text-3xl font-[var(--font-heading)] font-black text-black mb-4 leading-tight">{ach.title}</h3>
                                <p className="font-[var(--font-code)] font-bold text-black/80 text-sm leading-relaxed">{ach.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
