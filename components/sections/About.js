"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";

export default function About({ personalInfo }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(".stat-c",
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 95%",
                }
            }
        );

        gsap.fromTo(".about-title",
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".about-title",
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section id="about" ref={sectionRef} className="pb-24 max-w-[1400px] mx-auto px-6 relative z-10 -mt-24 lg:-mt-40">

            {/* Stat Cards Row Overlapping Hero */}
            <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-32 z-20 relative">
                <StatCard count="5+" label="Production Projects" icon="🚀" />
                <StatCard count="3+" label="Hackathons Participated" icon="🏆" />
                <StatCard count="10+" label="Events Participated" icon="🎫" />
            </div>

            <div className="about-title text-center max-w-5xl mx-auto mb-24 cursor-default">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] leading-[1.1] mb-8">
                    You don't need more developers. <br /> You need the <span className="text-[var(--color-primary)]">right one.</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed">
                    Bridging the gap between beautiful Web2 interfaces and trustless Web3 ecosystems with production-grade architectures.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-6xl mx-auto">
                {/* Terminal Card */}
                <div className="w-full relative group">
                    <div className="neo-card overflow-hidden w-full relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                        {/* Terminal Header */}
                        <div className="flex items-center px-4 py-3 bg-[var(--color-border)] text-white border-b-4 border-[var(--color-border)]">
                            <div className="flex gap-2">
                                <div className="w-4 h-4 rounded-full bg-[var(--color-accent)] border border-black/20 text-xs flex items-center justify-center font-bold">×</div>
                                <div className="w-4 h-4 rounded-full bg-[#F5A623] border border-black/20 text-xs flex items-center justify-center font-bold">-</div>
                                <div className="w-4 h-4 rounded-full bg-[var(--color-secondary)] border border-black/20 text-xs flex items-center justify-center font-bold">+</div>
                            </div>
                            <div className="mx-auto font-[var(--font-code)] font-bold text-sm tracking-widest text-[#FFF5F0]">gautham@ram: ~</div>
                        </div>
                        {/* Terminal Body */}
                        <div className="p-8 lg:p-12 font-[var(--font-code)] text-sm md:text-base lg:text-lg text-[var(--color-text-primary)] space-y-1 bg-[var(--color-background)]">
                            <div className="text-[var(--color-primary)] font-bold mb-6 text-xl">$: cat resume.txt</div>
                            <TypeAnimation
                                sequence={[
                                    `> NAME        : ${personalInfo.name}\n\n> ROLE        : ${personalInfo.role}\n\n> LOCATION    : ${personalInfo.location}\n\n> UNIVERSITY  : ${personalInfo.university}\n\n> CURRENTLY   : ${personalInfo.currently}\n\n> INTERESTS   : ${personalInfo.interests}`,
                                    1000
                                ]}
                                wrapper="pre"
                                speed={70}
                                className="whitespace-pre-wrap font-[var(--font-code)] font-bold leading-relaxed block overflow-x-auto text-lg md:text-xl lg:text-2xl min-h-[400px]"
                                cursor={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ count, label, icon }) {
    return (
        <div className="stat-c neo-card p-8 lg:p-10 flex flex-col justify-between hover:scale-105 bg-[var(--color-surface)] z-20 cursor-crosshair h-[250px]">
            <div className="text-4xl lg:text-5xl">{icon}</div>
            <div>
                <div className="text-5xl lg:text-6xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-4">{count}</div>
                <div className="text-sm font-[var(--font-heading)] text-[var(--color-text-muted)] font-bold uppercase tracking-widest leading-tight w-2/3">{label}</div>
            </div>
        </div>
    );
}
