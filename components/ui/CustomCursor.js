"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const followerRef = useRef(null);

    useEffect(() => {
        // Only activate custom cursor on desktop devices with a mouse/trackpad
        if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        const follower = followerRef.current;
        if (!follower) return;

        gsap.set(follower, { xPercent: -50, yPercent: -50 });
        document.body.style.cursor = "none";

        // High-performance quickTo setters avoid creating new tweens on every mousemove event
        const setX = gsap.quickTo(follower, "x", { duration: 0.12, ease: "power2" });
        const setY = gsap.quickTo(follower, "y", { duration: 0.12, ease: "power2" });

        const moveCursor = (e) => {
            setX(e.clientX);
            setY(e.clientY);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest("a, button, [role='button'], input, textarea, select");
            if (isClickable) {
                follower.classList.add("cursor-hover");
            } else {
                follower.classList.remove("cursor-hover");
            }
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={followerRef}
            className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] transition-transform transition-colors duration-150 border-4 border-[var(--color-border)] bg-[var(--color-secondary)] shadow-[2px_2px_0_var(--color-shadow)] will-change-transform [&.cursor-hover]:scale-[2.2] [&.cursor-hover]:bg-[var(--color-primary)] [&.cursor-hover]:opacity-80"
        />
    );
}
