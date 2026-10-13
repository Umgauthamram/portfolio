"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef(null);
    const word1Ref = useRef(null);
    const word2Ref = useRef(null);
    const word1InnerRef = useRef(null);
    const word2InnerRef = useRef(null);

    useEffect(() => {
        if (!word1InnerRef.current || !word2InnerRef.current || !word1Ref.current || !word2Ref.current || !containerRef.current) return;

        // Measure natural content width while parent container has width: 0
        const w1 = word1InnerRef.current.offsetWidth || word1InnerRef.current.scrollWidth;
        const w2 = word2InnerRef.current.offsetWidth || word2InnerRef.current.scrollWidth;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setVisible(false)
            });

            // Set initial state: words translated behind the letters G & R
            gsap.set(word1InnerRef.current, { xPercent: -100 });
            gsap.set(word2InnerRef.current, { xPercent: -100 });
            gsap.set([word1Ref.current, word2Ref.current], { width: 0 });

            // Fast, punchy sequence (~1.5s total)
            tl.to({}, { duration: 0.25 }) // Short pause on "GR"
                .to([word1Ref.current, word2Ref.current], {
                    width: (i) => i === 0 ? w1 : w2,
                    duration: 0.65,
                    ease: "power3.out",
                    onComplete: () => {
                        gsap.set([word1Ref.current, word2Ref.current], { width: "auto" });
                    }
                }, "reveal")
                .to([word1InnerRef.current, word2InnerRef.current], {
                    xPercent: 0,
                    duration: 0.65,
                    ease: "power3.out"
                }, "reveal")
                .to({}, { duration: 0.35 }) // Showcase hold
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.6,
                    ease: "power4.inOut"
                });
        });

        return () => ctx.revert();
    }, []);

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] bg-[var(--color-background)] flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="flex items-center text-5xl md:text-8xl lg:text-9xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] tracking-tighter drop-shadow-lg leading-none relative z-10">

                <div className="flex-shrink-0">G</div>

                <div className="overflow-hidden" style={{ width: 0 }} ref={word1Ref}>
                    <div className="whitespace-pre flex items-center h-full" style={{ width: "max-content" }} ref={word1InnerRef}>
                        autham{" "}
                    </div>
                </div>

                <div className="flex-shrink-0">R</div>

                <div className="overflow-hidden" style={{ width: 0 }} ref={word2Ref}>
                    <div className="whitespace-pre flex items-center h-full" style={{ width: "max-content" }} ref={word2InnerRef}>
                        am<span className="text-[var(--color-primary)]">.</span>
                    </div>
                </div>

            </div>

            {/* Subtle Futuristic Grid Background pattern for the splash */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-difference"
                style={{
                    backgroundImage: "radial-gradient(var(--color-text-primary) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
        </div>
    );
}
