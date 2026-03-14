"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function DeveloperCharacter({ className }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Character is now static as requested
    }, []);

    return (
        <div ref={containerRef} className={`relative ${className} group`}>
            {/* The Illustration Container */}
            <div className="relative z-10 w-full h-full max-w-lg mx-auto bg-[var(--color-surface)] border-4 border-[var(--color-border)] rounded-[2rem] shadow-[8px_8px_0_var(--color-shadow)] overflow-hidden transition-transform duration-500 hover:-translate-y-2">
                <img
                    src="/loader-illustration.png"
                    alt="Developer Avatar"
                    className="w-full h-full object-contain filter dark:invert"
                    style={{ padding: "2rem" }}
                />
            </div>
        </div>
    );
}
