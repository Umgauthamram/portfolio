"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

function Card({ project, index, activeIndex, onClick }) {
    const groupRef = useRef();

    // Calculate relative position to active index
    const getTargetProps = () => {
        const diff = index - activeIndex;
        const isSelected = diff === 0;

        // Scale, Position X, Position Z, Rotation Y
        const x = diff * 2.8;
        const z = isSelected ? 1 : Math.max(-5, -Math.abs(diff) * 1.5);
        const scale = isSelected ? 1.2 : 0.9;

        return { x, z, scale, isSelected };
    };

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const { x, z, scale } = getTargetProps();

        // Smooth interpolation (Lerp)
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.1);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z, 0.1);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.1));
    });

    // Assign neon gradients based on index
    const gradients = [
        "from-purple-500 to-indigo-500",
        "from-pink-500 to-rose-500",
        "from-orange-500 to-amber-500",
        "from-teal-500 to-emerald-500",
        "from-blue-500 to-cyan-500",
    ];

    const bgClass = `bg-gradient-to-br ${gradients[index % gradients.length]}`;

    return (
        <group ref={groupRef}>
            {/* Invisible plane for proper raycasting clicks */}
            <mesh onClick={onClick} position={[0, 0, 0]}>
                <planeGeometry args={[2.2, 3.4]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* HTML Overlay as a frame */}
            <Html
                transform
                occlude="blending"
                position={[0, 0, 0.01]}
                distanceFactor={6}
                className="pointer-events-none"
            >
                <div
                    className={`w-[240px] h-[360px] rounded-3xl p-6 flex flex-col justify-end shadow-[8px_8px_0_var(--color-shadow)] border-[3px] border-[var(--color-border)] ${bgClass}`}
                    style={{ transition: "filter 0.3s", filter: getTargetProps().isSelected ? "brightness(1.1)" : "brightness(0.7) blur(1px)" }}
                >
                    <h3 className="text-3xl font-[var(--font-heading)] font-black text-white mb-2 leading-tight drop-shadow-md">
                        {project.name.split("–")[0]}
                    </h3>
                    <p className="text-white/90 font-[var(--font-code)] text-xs mb-4 font-bold tracking-widest uppercase drop-shadow">
                        {project.filter} CREATOR
                    </p>
                    <div className="flex gap-2 flex-wrap mt-auto">
                        {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] font-bold bg-white/30 backdrop-blur-md px-2 py-1 rounded-full text-white">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Html>
        </group>
    );
}

export default function ProjectsCarousel({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const next = () => setActiveIndex((i) => Math.min(projects.length - 1, i + 1));

    return (
        <div className="w-full relative">
            {/* UI Controls Overlay */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 lg:px-12 z-20 pointer-events-none">
                <button onClick={prev} className="neo-btn w-16 h-16 rounded-full text-2xl pb-1 pointer-events-auto" disabled={activeIndex === 0}>
                    &larr;
                </button>
                <button onClick={next} className="neo-btn w-16 h-16 rounded-full text-2xl pb-1 pointer-events-auto" disabled={activeIndex === projects.length - 1}>
                    &rarr;
                </button>
            </div>

            <div className="h-[650px] w-full cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={1} />
                    {projects.map((proj, idx) => (
                        <Card
                            key={proj.id}
                            project={proj}
                            index={idx}
                            activeIndex={activeIndex}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}
                </Canvas>
            </div>

            {/* Detailed Info Below Active Item */}
            <div className="max-w-2xl mx-auto text-center mt-4">
                <h3 className="text-3xl font-[var(--font-heading)] font-black text-[var(--color-text-primary)] mb-4">
                    {projects[activeIndex].name}
                </h3>
                <p className="text-[var(--color-text-muted)] font-bold mb-6 text-lg">
                    {projects[activeIndex].description}
                </p>
                <div className="flex justify-center gap-4">
                    {projects[activeIndex].github && (
                        <a href={projects[activeIndex].github} target="_blank" rel="noreferrer" className="neo-btn-outline px-6">
                            View on GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
