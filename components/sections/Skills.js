"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ERC_DESCRIPTIONS = {
    "ERC-20": "Fungible Tokens",
    "ERC-721": "NFTs",
    "ERC-1155": "Multi-Token Standard",
    "ERC-4337": "Account Abstraction",
    "ERC-2771": "Meta Transactions / Trusted Forwarder",
    "ERC-1967": "Proxy Storage Standard",
    "ERC-2612": "Permit / Gasless Approvals",
};

export default function Skills({ skills }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(".skill-category",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden z-10 w-full min-h-screen flex items-center bg-[var(--color-surface)]">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
                <h2 className="text-5xl md:text-7xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] leading-[1.1] mb-20 text-center">
                    My <span className="text-[var(--color-secondary)]">Arsenal</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((category, idx) => {
                        const isWeb3 = category.category === "Web3 & Blockchain";
                        const coreItems = isWeb3 ? category.items.filter(item => !item.startsWith("ERC-")) : category.items;
                        const ercItems = isWeb3 ? category.items.filter(item => item.startsWith("ERC-")) : [];

                        return (
                            <div key={idx} className="skill-category neo-card p-6 md:p-8 bg-[var(--color-background)] hover:-translate-y-2 hover:translate-x-1 cursor-crosshair flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-[var(--font-heading)] font-black mb-6 flex items-center gap-3">
                                        <span className="w-4 h-4 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-primary)] shadow-[2px_2px_0_var(--color-shadow)]"></span>
                                        {category.category}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-2.5">
                                        {coreItems.map(item => (
                                            <span
                                                key={item}
                                                className="px-3 py-1.5 text-xs sm:text-sm font-[var(--font-code)] font-bold bg-[var(--color-surface)] text-[var(--color-text-primary)] border-2 border-[var(--color-border)] rounded-lg shadow-[2px_2px_0_var(--color-shadow)] hover:bg-[var(--color-accent)] hover:text-white transition-colors cursor-default"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {isWeb3 && ercItems.length > 0 && (
                                    <div className="mt-5 pt-3.5 border-t border-[var(--color-border)]/40">
                                        <div className="text-[11px] font-[var(--font-code)] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] border border-[var(--color-border)]"></span>
                                            ERC Standards
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ercItems.map(item => (
                                                <span
                                                    key={item}
                                                    title={ERC_DESCRIPTIONS[item] || item}
                                                    className="px-2.5 py-1 text-xs font-[var(--font-code)] font-bold bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-md shadow-[1.5px_1.5px_0_var(--color-shadow)] hover:bg-[var(--color-secondary)] hover:text-black transition-colors cursor-help"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
