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
        // Calculate the exact width of the incoming words to animate the containers
        const w1 = word1InnerRef.current.scrollWidth;
        const w2 = word2InnerRef.current.scrollWidth;

        const tl = gsap.timeline({
            onComplete: () => setVisible(false)
        });

        // Initialize: Hide the inner words by setting container width to 0 and translating words left
        gsap.set(word1Ref.current, { width: 0 });
        gsap.set(word2Ref.current, { width: 0 });
        gsap.set(word1InnerRef.current, { x: -w1 });
        gsap.set(word2InnerRef.current, { x: -w2 });

        // The Sequence
        tl.to({}, { duration: 0.8 }) // Hold initial "GR"
            .to([word1Ref.current, word2Ref.current], {
                width: (i) => i === 0 ? w1 : w2,
                duration: 1.4,
                ease: "expo.out"
            }, "reveal")
            .to([word1InnerRef.current, word2InnerRef.current], {
                x: 0,
                duration: 1.4,
                ease: "expo.out"
            }, "reveal")
            .to({}, { duration: 1 }) // Hold the full "Gautham Ram."
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "expo.inOut"
            });

        return () => tl.kill();
    }, []);

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] bg-[var(--color-background)] flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="flex items-center text-5xl md:text-8xl lg:text-9xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] tracking-tighter drop-shadow-lg leading-none relative z-10">

                <div className="flex-shrink-0">G</div>

                <div className="overflow-hidden" ref={word1Ref}>
                    <div className="whitespace-pre flex items-center h-full" ref={word1InnerRef}>
                        autham{" "}
                    </div>
                </div>

                <div className="flex-shrink-0">R</div>

                <div className="overflow-hidden" ref={word2Ref}>
                    <div className="whitespace-pre flex items-center h-full" ref={word2InnerRef}>
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
