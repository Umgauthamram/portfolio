"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }) {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

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

        // Animate cards staggering in
        const cards = gsap.utils.toArray('.project-card');
        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

    }, []);

    // Helper for tag colors (exact hex codes for inline styles)
    const getTagColor = (tag) => {
        const colors = [
            "#ef4444", // red
            "#f97316", // orange
            "#8b5cf6", // purple
            "#10b981", // emerald
            "#3b82f6", // blue
            "#ec4899", // pink
        ];
        // simple hash to pick consistent color
        let hash = 0;
        for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <section id="projects" ref={sectionRef} className="py-24 max-w-[1400px] mx-auto px-6 relative z-10 w-full overflow-hidden">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-[var(--font-heading)] font-black mb-16 text-center leading-tight">
                Things I've <span className="text-[var(--color-primary)] block md:inline">Built.</span>
            </h2>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card flex flex-col justify-between h-full bg-[var(--color-surface)] border-4 border-[var(--color-border)] rounded-2xl p-6 shadow-[8px_8px_0_var(--color-shadow)] hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--color-shadow)] transition-all duration-300"
                    >
                        <div>
                            {/* Header Section */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-[var(--color-primary)] font-[var(--font-code)] text-sm font-bold uppercase tracking-widest bg-[var(--color-primary)]/10 px-3 py-1 rounded w-fit border border-[var(--color-primary)]">
                                    {project.filter}
                                </div>
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-secondary)] transition-colors">
                                            <Github size={24} />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors">
                                            <ExternalLink size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-3 leading-tight">
                                {project.name}
                            </h3>
                            <p className="text-[var(--color-text-muted)] font-medium mb-6 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack Tags (Always forced to bottom securely via flex) */}
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t-2 border-[var(--color-border)] border-dashed">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-xs font-[var(--font-code)] font-bold text-white px-2 py-1 rounded shadow-[2px_2px_0_var(--color-border)] border-2 border-[var(--color-border)]"
                                    style={{ backgroundColor: getTagColor(tag) }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
