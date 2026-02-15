import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Individual skill label that orbits on its ring - always upright using HTML
function OrbitingSkillLabel({ skill, radius, initialAngle, orbitSpeed, color }) {
    const labelRef = useRef();
    const angleRef = useRef(initialAngle);

    useFrame((state, delta) => {
        // Update angle for orbital motion along the ring
        angleRef.current += orbitSpeed * delta;

        if (labelRef.current) {
            // Calculate position on the ring
            const x = Math.cos(angleRef.current) * radius;
            const z = Math.sin(angleRef.current) * radius;
            labelRef.current.position.set(x, 0, z);
        }
    });

    return (
        <group
            ref={labelRef}
            position={[Math.cos(initialAngle) * radius, 0, Math.sin(initialAngle) * radius]}
        >
            {/* HTML overlay for always-upright, readable text */}
            <Html
                center
                distanceFactor={8}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div
                    className="skill-orbital-label"
                    style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                >
                    {skill}
                </div>
            </Html>
        </group>
    );
}

// A single elliptical orbital ring with its skills
function EllipticalRing({ skills, radiusX, radiusZ, color, tiltX, tiltY, tiltZ, orbitSpeed, ringIndex }) {
    const ringRef = useRef();

    // Create an ellipse curve for the ring path
    const ringGeometry = useMemo(() => {
        const curve = new THREE.EllipseCurve(
            0, 0,           // center
            radiusX, radiusZ, // xRadius, yRadius
            0, 2 * Math.PI,  // start, end angle
            false,           // clockwise
            0                // rotation
        );
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(
            points.map(p => new THREE.Vector3(p.x, 0, p.y))
        );
        return geometry;
    }, [radiusX, radiusZ]);

    return (
        <group rotation={[tiltX, tiltY, tiltZ]}>
            {/* Thin elegant ring line */}
            <line ref={ringRef} geometry={ringGeometry}>
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={0.4}
                    linewidth={1}
                />
            </line>

            {/* Skill labels orbiting on this elliptical ring */}
            {skills.map((skill, index) => {
                const initialAngle = (index / skills.length) * Math.PI * 2;
                // Alternate direction for visual interest
                const direction = ringIndex % 2 === 0 ? 1 : -1;
                // Use average radius for orbit calculation
                const avgRadius = (radiusX + radiusZ) / 2;

                return (
                    <OrbitingSkillLabel
                        key={skill}
                        skill={skill}
                        radius={avgRadius}
                        initialAngle={initialAngle}
                        orbitSpeed={orbitSpeed * direction}
                        color={color}
                    />
                );
            })}
        </group>
    );
}

// Saturn-like orbital cluster with central sphere and elliptical rings
function SaturnCluster({ skills, color, rotationSpeed = 15 }) {
    const sphereRef = useRef();

    // Distribute skills across 2 rings (like the reference image)
    const ringsConfig = useMemo(() => {
        const skillCount = skills.length;
        const mid = Math.ceil(skillCount / 2);

        return [
            {
                // Outer horizontal-ish ring
                skills: skills.slice(0, mid),
                radiusX: 3.2,
                radiusZ: 2.8,
                tiltX: Math.PI / 2.2,  // Nearly horizontal
                tiltY: 0,
                tiltZ: 0,
                orbitSpeed: 0.25
            },
            {
                // Vertical-ish ring
                skills: skills.slice(mid),
                radiusX: 2.8,
                radiusZ: 2.4,
                tiltX: Math.PI / 6,    // More vertical
                tiltY: Math.PI / 8,
                tiltZ: Math.PI / 12,
                orbitSpeed: 0.2
            }
        ];
    }, [skills]);

    // Subtle breathing animation on the central sphere
    useFrame((state) => {
        if (sphereRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
            sphereRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group>
            {/* Central solid sphere (like the reference) */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[0.8, 64, 64]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Subtle outer glow */}
            <mesh>
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Elliptical orbital rings */}
            {ringsConfig.map((ring, index) => (
                <EllipticalRing
                    key={index}
                    skills={ring.skills}
                    radiusX={ring.radiusX}
                    radiusZ={ring.radiusZ}
                    color={index === 0 ? color : '#888888'} // Main ring colored, second gray
                    tiltX={ring.tiltX}
                    tiltY={ring.tiltY}
                    tiltZ={ring.tiltZ}
                    orbitSpeed={ring.orbitSpeed}
                    ringIndex={index}
                />
            ))}
        </group>
    );
}

// Main component wrapper
const OrbitalSkillsCluster = ({ skills, category, color = '#4a90d9', rotationSpeed = 15 }) => {
    // Defensive check for skills
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
        console.warn(`No skills provided for category: ${category}`);
        return (
            <div className="relative flex flex-col items-center min-h-[500px]">
                <h4 className="text-xl md:text-2xl font-semibold mb-8 text-center" style={{ color }}>
                    {category}
                </h4>
                <p className="text-gray-500">No skills available</p>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col items-center min-h-[500px] py-4 overflow-visible">
            {/* Category Label */}
            <h4 className="text-xl md:text-2xl font-semibold mb-4 text-center" style={{ color }}>
                {category}
            </h4>

            {/* 3D Canvas */}
            <div
                className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-visible"
                style={{
                    minWidth: 'min(100vw, 700px)',
                    margin: '30px auto 0'
                }}
            >
                <Canvas
                    camera={{ position: [0, 2, 8], fov: 40 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{
                        background: 'transparent',
                        overflow: 'visible'
                    }}
                >
                    {/* Soft lighting */}
                    <ambientLight intensity={0.6} />
                    <pointLight position={[5, 5, 5]} intensity={0.3} />

                    {/* Saturn-like orbital cluster */}
                    <SaturnCluster
                        skills={skills}
                        color={color}
                        rotationSpeed={rotationSpeed}
                    />
                </Canvas>
            </div>
        </div>
    );
};

export default OrbitalSkillsCluster;
