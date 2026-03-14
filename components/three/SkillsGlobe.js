"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

function GlobeText({ skills }) {
    const groupRef = useRef();

    const items = useMemo(() => {
        const list = skills.flatMap(s => s.items);
        const radius = 6;
        return list.map((text, i) => {
            // distribute evenly on a sphere using Fibonacci spiral
            const phi = Math.acos(1 - 2 * (i + 0.5) / list.length);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            return { text, position: [x, y, z] };
        });
    }, [skills]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {items.map((item, i) => (
                <Text
                    key={i}
                    position={item.position}
                    color={i % 2 === 0 ? "#6C63FF" : "#00F5D4"}
                    fontSize={0.4}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="#0A0A0F"
                    fillOpacity={0.6}
                >
                    {item.text}
                </Text>
            ))}
        </group>
    );
}

export default function SkillsGlobe({ skills }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute right-[-20%] top-[-10%] w-[800px] h-[800px] pointer-events-none z-0 opacity-40 mix-blend-screen hidden lg:block">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <GlobeText skills={skills} />
            </Canvas>
        </div>
    );
}
