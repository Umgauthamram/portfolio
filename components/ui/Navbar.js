"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Work", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Milestones", href: "#achievements" },
    ];

    const scrollTo = (href) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--color-surface)] border-b-4 border-[var(--color-border)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] tracking-tighter cursor-pointer" onClick={() => scrollTo("#hero")}>
                    GR<span className="text-[var(--color-primary)]">.</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6 font-bold">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollTo(link.href)}
                            className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors relative group font-bold"
                        >
                            {link.name}
                        </button>
                    ))}

                    <button
                        onClick={() => scrollTo("#contact")}
                        className="neo-btn ml-4 text-sm"
                    >
                        Hire Me
                    </button>

                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 ml-2 border-2 border-[var(--color-border)] rounded-full hover:bg-[var(--color-background)] transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 border-2 border-[var(--color-border)] rounded-full"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollTo(link.href)}
                            className="text-left py-2 text-xl font-bold text-[var(--color-text-primary)]"
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo("#contact")}
                        className="neo-btn w-full py-4 mt-4 text-lg"
                    >
                        Hire Me
                    </button>
                </div>
            )}
        </nav>
    );
}
