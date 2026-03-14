"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact({ personalInfo }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%"
                }
            }
        );
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-32 bg-[var(--color-surface)] border-t-[6px] border-[var(--color-border)]">
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="neo-card p-10 md:p-16 lg:p-24 bg-gradient-to-br from-[#FFB37A] via-[#FF7D81] to-[#A270FF] dark:from-[#f97316] dark:via-[#ec4899] dark:to-[#8b5cf6]">
                    <div className="flex flex-col lg:flex-row gap-20">

                        {/* Left Header */}
                        <div className="flex-1 w-full text-left">
                            <h2 className="text-6xl lg:text-8xl font-[var(--font-heading)] font-black mb-8 text-black leading-[1.05]">
                                Ready to <br /> scale up.
                            </h2>
                            <p className="text-black/80 font-bold mb-12 leading-relaxed text-xl md:text-2xl max-w-xl pr-10">
                                Open for opportunities, freelance projects, or just a chat about decentralized systems and beautiful UI.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <InfoCard icon="📧" text="Email Me" href={`mailto:${personalInfo.email}`} />
                                <InfoCard icon="📱" text="Call Me" href={`tel:${personalInfo.phone}`} />
                                <InfoCard icon="🔗" text="LinkedIn" href={personalInfo.linkedin} />
                                <InfoCard icon="🐙" text="GitHub" href={personalInfo.github} />
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="flex-1 w-full">
                            <form className="neo-card p-10 bg-white grid gap-8 h-full" onSubmit={(e) => e.preventDefault()}>
                                <h3 className="text-3xl font-[var(--font-heading)] font-black text-black">Say Hello</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-black uppercase tracking-widest">Name</label>
                                    <input type="text" className="w-full bg-[#f4f4f5] border-4 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:ring-4 focus:ring-[#7c3aed]" placeholder="John Doe" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-black uppercase tracking-widest">Email</label>
                                    <input type="email" className="w-full bg-[#f4f4f5] border-4 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:ring-4 focus:ring-[#7c3aed]" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <label className="text-sm font-[var(--font-code)] font-bold text-black uppercase tracking-widest">Message</label>
                                    <textarea rows="4" className="w-full h-full bg-[#f4f4f5] border-4 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:ring-4 focus:ring-[#7c3aed] resize-none" placeholder="Let's build something..."></textarea>
                                </div>

                                <button className="neo-btn bg-black text-white hover:bg-black w-full text-xl py-5 hover:-translate-y-2 shadow-[8px_8px_0_#A270FF] hover:shadow-[10px_10px_0_#FF7D81]">
                                    Hit me up
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

function InfoCard({ icon, text, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[var(--color-surface)] border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all group font-bold font-[var(--font-code)] text-black"
        >
            <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
            <span>{text}</span>
        </a>
    );
}
