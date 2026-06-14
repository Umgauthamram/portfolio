"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MountainVistaParallax from "../ui/mountain-vista-bg";

export default function Achievements({ achievements }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(".achievement-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
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

    // Sort so hackathons are first, then other achievements
    const sortedAchievements = [
        ...achievements.filter(
            ach => ach.title.toLowerCase().includes("hackathon") || 
                   ach.description.toLowerCase().includes("hackathon")
        ),
        ...achievements.filter(
            ach => !ach.title.toLowerCase().includes("hackathon") && 
                   !ach.description.toLowerCase().includes("hackathon")
        )
    ];

    const bgColors = ["bg-[#A270FF]", "bg-[#FF9B54]", "bg-[#FF7D81]"];

    const renderCard = (ach, idx) => {
        const bgColor = bgColors[idx % bgColors.length];
        return ach.url ? (
            <a
                key={ach.id}
                href={ach.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`achievement-card w-full max-w-[380px] h-[300px] ${bgColor} border-4 border-[var(--color-border)] shadow-[8px_8px_0_var(--color-shadow)] p-8 rounded-[2rem] transition-all duration-300 flex flex-col items-start justify-center text-left group cursor-pointer hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--color-shadow)]`}
            >
                <div className="flex justify-between w-full">
                    <div className="text-5xl mb-4 bg-white/20 p-3 rounded-2xl border-4 border-black/10 group-hover:scale-110 transition-transform">{ach.icon}</div>
                    <div className="text-black group-hover:text-black/70 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                    </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-[var(--font-heading)] font-black text-black mb-3 leading-tight">{ach.title}</h3>
                <p className="font-[var(--font-code)] font-bold text-black/90 text-xs leading-relaxed">{ach.description}</p>
            </a>
        ) : (
            <div
                key={ach.id}
                className={`achievement-card w-full max-w-[380px] h-[300px] ${bgColor} border-4 border-[var(--color-border)] shadow-[8px_8px_0_var(--color-shadow)] p-8 rounded-[2rem] transition-all duration-300 flex flex-col items-start justify-center text-left group hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--color-shadow)]`}
            >
                <div className="text-5xl mb-4 bg-white/20 p-3 rounded-2xl border-4 border-black/10 group-hover:scale-110 transition-transform">{ach.icon}</div>
                <h3 className="text-xl lg:text-2xl font-[var(--font-heading)] font-black text-black mb-3 leading-tight">{ach.title}</h3>
                <p className="font-[var(--font-code)] font-bold text-black/90 text-xs leading-relaxed">{ach.description}</p>
            </div>
        );
    };

    return (
        <section id="achievements" ref={sectionRef} className="py-32 bg-gradient-to-b from-[#09090b] via-[#121214] to-[#09090b] relative overflow-hidden border-t-4 border-b-4 border-[var(--color-border)]">
            {/* Parallax Background */}
            <MountainVistaParallax />

            <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black mb-16 text-white tracking-tight drop-shadow-md">
                    Key <span className="text-[var(--accent)]">Achievements</span>
                </h2>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto justify-center justify-items-center">
                    {sortedAchievements.map((ach, idx) => renderCard(ach, idx))}
                </div>
            </div>
        </section>
    );
}
