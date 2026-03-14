"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const pointsRef = useRef();
    const linesRef = useRef();

    const PARTICLE_COUNT = 150;

    const { posArray, velArray } = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const vel = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

            vel[i * 3] = (Math.random() - 0.5) * 0.02;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
        return { posArray: pos, velArray: vel };
    }, []);

    const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] += velArray[i * 3];
            positions[i * 3 + 1] += velArray[i * 3 + 1];
            positions[i * 3 + 2] += velArray[i * 3 + 2];

            // Bounce
            if (Math.abs(positions[i * 3]) > 10) velArray[i * 3] *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 10) velArray[i * 3 + 1] *= -1;
            if (Math.abs(positions[i * 3 + 2] + 5) > 5) velArray[i * 3 + 2] *= -1;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Calculate lines
        const linePositions = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 4) { // Connection radius
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        // Slow pulse
        const time = Date.now() * 0.001;
        pointsRef.current.material.size = 0.08 + Math.sin(time * 2) * 0.03;
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={posArray} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.08} color="#00F5D4" transparent opacity={0.6} />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#6C63FF" transparent opacity={0.10} />
            </lineSegments>
        </>
    );
}

export default function ParticleNetwork() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <Particles />
            </Canvas>
        </div>
    );
}
