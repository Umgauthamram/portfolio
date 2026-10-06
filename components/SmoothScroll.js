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
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on("scroll", ScrollTrigger.update);
        lenis.scrollTo(0, { immediate: true });

        let rfId;
        function raf(time) {
            lenis.raf(time);
            rfId = requestAnimationFrame(raf);
        }

        rfId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rfId);
            lenis.destroy();
            window.history.scrollRestoration = "auto";
        };
    }, []);

    return null;
}
