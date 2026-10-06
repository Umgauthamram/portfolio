"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.5,
            infinite: false,
        });

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Drive Lenis through GSAP ticker for frame-perfect animation sync
        const tickerCallback = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        lenis.scrollTo(0, { immediate: true });

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            window.history.scrollRestoration = "auto";
        };
    }, []);

    return null;
}
