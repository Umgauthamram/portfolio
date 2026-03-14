"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsCarousel from "../three/ProjectsCarousel";

export default function Projects({ projects }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 max-w-[1400px] mx-auto px-6 relative z-10 w-full overflow-hidden">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-heading)] font-black mb-16 text-center leading-tight">
                Things I've <span className="text-[var(--color-primary)] block md:inline">Built.</span>
            </h2>

            {/* Embedded 3D Carousel Component */}
            <ProjectsCarousel projects={projects} />
        </section>
    );
}
