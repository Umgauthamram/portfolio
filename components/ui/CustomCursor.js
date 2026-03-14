"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const follower = followerRef.current;
        if (!follower) return;

        // Apply initial centering and ensure basic display
        gsap.set(follower, { xPercent: -50, yPercent: -50 });
        document.body.style.cursor = 'none';

        const moveCursor = (e) => {
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName?.toLowerCase() === 'a' || e.target.tagName?.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            ref={followerRef}
            className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] transition-colors duration-200 border-4 border-[var(--color-border)] ${isHovering ? 'scale-[2.5] bg-[var(--color-primary)] shadow-[4px_4px_0_var(--color-shadow)]' : 'scale-100 bg-[var(--color-secondary)] shadow-[2px_2px_0_var(--color-shadow)]'}`}
            style={{ opacity: isHovering ? 0.8 : 1 }}
        />
    );
}
