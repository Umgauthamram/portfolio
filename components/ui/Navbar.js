"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -20% 0px",
                threshold: [0.1, 0.3, 0.5]
            }
        );

        navLinks.forEach((link) => {
            const el = document.getElementById(link.href.substring(1));
            if (el) observer.observe(el);
        });

        const heroEl = document.getElementById("hero");
        if (heroEl) observer.observe(heroEl);

        const contactEl = document.getElementById("contact");
        if (contactEl) observer.observe(contactEl);

        return () => observer.disconnect();
    }, []);

    const scrollTo = (href) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const toggleTheme = (event) => {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const x = event ? event.clientX : window.innerWidth / 2;
        const y = event ? event.clientY : window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--color-surface)] border-b-4 border-[var(--color-border)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] tracking-tighter cursor-pointer" onClick={() => scrollTo("#hero")}>
                    Gautham Ram<span className="text-[var(--color-primary)]">.</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <button
                                key={link.name}
                                onClick={() => scrollTo(link.href)}
                                className={`font-bold transition-all duration-300 relative ${isActive ? 'text-[var(--color-primary)] scale-110 drop-shadow-md' : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:scale-105'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                            </button>
                        );
                    })}

                    <button
                        onClick={() => scrollTo("#contact")}
                        className={`neo-btn ml-4 text-sm transition-all duration-500 ${activeSection === 'contact' ? 'bg-gradient-to-r from-[#FF7D81] to-[#A270FF] border-white text-white scale-110 shadow-[0_0_20px_rgba(162,112,255,0.4)]' : ''}`}
                    >
                        Contact Me
                    </button>

                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 ml-2 border-2 border-[var(--color-border)] rounded-full hover:bg-[var(--color-background)] transition-colors text-[var(--color-text-primary)]"
                            aria-label="Toggle Theme"
                        >
                            {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 border-2 border-[var(--color-border)] rounded-full text-[var(--color-text-primary)]"
                        >
                            {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    <button
                        className="text-[var(--color-text-primary)] p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-[80px] left-0 w-full bg-[var(--color-surface)] border-b-4 border-[var(--color-border)] flex flex-col px-6 py-6 space-y-4 shadow-xl">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <button
                                key={link.name}
                                onClick={() => scrollTo(link.href)}
                                className={`text-left py-2 text-xl font-bold transition-all duration-300 flex items-center gap-3 ${isActive ? 'text-[var(--color-primary)] ml-2' : 'text-[var(--color-text-primary)]'}`}
                            >
                                {isActive && <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>}
                                {link.name}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => scrollTo("#contact")}
                        className={`neo-btn w-full py-4 mt-4 text-lg transition-all duration-500 ${activeSection === 'contact' ? 'bg-gradient-to-r from-[#FF7D81] to-[#A270FF] border-white text-white' : ''}`}
                    >
                        Contact Me
                    </button>
                </div>
            )}
        </nav>
    );
}
