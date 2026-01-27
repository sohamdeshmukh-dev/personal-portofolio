import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursorNormalized } from '../hooks/useCursorPosition';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

function ParticleField({ mousePosition, isDark }) {
    const mesh = useRef();
    const particlesCount = 1500;

    const particles = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 2] = (Math.random() - 0.5) * 60;
            positions[i * 2 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 2 + 2] = (Math.random() - 0.5) * 30;

            // Varied particle sizes
            sizes[i] = Math.random() * 0.15 + 0.05;

            // Theme-aware colors
            const colorChoice = Math.random();
            if (isDark) {
                if (colorChoice < 0.33) {
                    colors[i * 3] = 0;
                    colors[i * 3 + 1] = 0.83;
                    colors[i * 3 + 2] = 1;
                } else if (colorChoice < 0.66) {
                    colors[i * 3] = 0.55;
                    colors[i * 3 + 1] = 0.36;
                    colors[i * 3 + 2] = 0.96;
                } else {
                    colors[i * 3] = 0.08;
                    colors[i * 3 + 1] = 0.72;
                    colors[i * 3 + 2] = 0.65;
                }
            } else {
                // Light mode: much darker particles for visibility
                if (colorChoice < 0.33) {
                    colors[i * 3] = 0.05;
                    colors[i * 3 + 1] = 0.25;
                    colors[i * 3 + 2] = 0.5;
                } else if (colorChoice < 0.66) {
                    colors[i * 3] = 0.25;
                    colors[i * 3 + 1] = 0.1;
                    colors[i * 3 + 2] = 0.45;
                } else {
                    colors[i * 3] = 0.05;
                    colors[i * 3 + 1] = 0.35;
                    colors[i * 3 + 2] = 0.35;
                }
            }
        }

        return { positions, colors, sizes };
    }, [isDark]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.0003;
            mesh.current.rotation.x = mousePosition.y * 0.08;
            mesh.current.rotation.z = mousePosition.x * 0.08;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesCount}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particlesCount}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={isDark ? 0.9 : 0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingShape({ position, rotation, color, scale, speed, geometryType, mousePosition, isDark }) {
    const mesh = useRef();

    const geometry = useMemo(() => {
        switch (geometryType) {
            case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
            case 'octahedron': return new THREE.OctahedronGeometry(1, 0);
            case 'dodecahedron': return new THREE.DodecahedronGeometry(1, 0);
            case 'tetrahedron': return new THREE.TetrahedronGeometry(1, 0);
            case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 50);
            case 'sphere': return new THREE.SphereGeometry(1, 32, 32);
            case 'cone': return new THREE.ConeGeometry(1, 2, 32);
            default: return new THREE.IcosahedronGeometry(1, 0);
        }
    }, [geometryType]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x += speed * 0.5;
            mesh.current.rotation.y += speed;

            // Enhanced parallax effect
            mesh.current.position.x = position[0] + mousePosition.x * 2;
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.8 + mousePosition.y * 2;
            mesh.current.position.z = position[2] + mousePosition.x * 0.5;
        }
    });

    return (
        <mesh ref={mesh} rotation={rotation} scale={scale} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={isDark ? 0.3 : 0.15}
                wireframe
                emissive={color}
                emissiveIntensity={isDark ? 0.4 : 0.1}
            />
        </mesh>
    );
}

const AnimatedBackground = () => {
    const mousePosition = useCursorNormalized();
    const { isDark, getThemeColors } = useTheme();
    const themeColors = getThemeColors();

    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: true }}>
                {/* Theme-aware canvas background */}
                <color attach="background" args={[themeColors.canvasBackground]} />

                {/* Fog for depth */}
                <fog attach="fog" args={[themeColors.fogColor, 10, 35]} />

                {/* Enhanced lighting */}
                <ambientLight intensity={themeColors.ambientLight} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
                <pointLight position={[0, 15, 5]} intensity={0.6} color="#14b8a6" />
                <pointLight position={[15, -5, -5]} intensity={0.5} color="#ec4899" />

                <ParticleField mousePosition={mousePosition} isDark={isDark} />

                {/* Layer 1: Foreground shapes */}
                <FloatingShape
                    position={[-4, 2, -2]}
                    rotation={[0, 0, 0]}
                    geometryType="icosahedron"
                    color="#00d4ff"
                    scale={1.8}
                    speed={0.005}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[5, -2, -3]}
                    rotation={[0, 0, 0]}
                    geometryType="dodecahedron"
                    color="#8b5cf6"
                    scale={1.5}
                    speed={0.004}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />

                {/* Layer 2: Mid-ground shapes */}
                <FloatingShape
                    position={[-3, -4, -6]}
                    rotation={[0, 0, 0]}
                    geometryType="torus"
                    color="#14b8a6"
                    scale={1.4}
                    speed={0.006}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[4, 3, -7]}
                    rotation={[0, 0, 0]}
                    geometryType="sphere"
                    color="#ec4899"
                    scale={1.2}
                    speed={0.003}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[-5, 0, -8]}
                    rotation={[0, 0, 0]}
                    geometryType="octahedron"
                    color="#00d4ff"
                    scale={1.0}
                    speed={0.007}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />

                {/* Layer 3: Background shapes */}
                <FloatingShape
                    position={[2, -5, -12]}
                    rotation={[0, 0, 0]}
                    geometryType="tetrahedron"
                    color="#8b5cf6"
                    scale={2.0}
                    speed={0.002}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[-2, 4, -14]}
                    rotation={[0, 0, 0]}
                    geometryType="cone"
                    color="#14b8a6"
                    scale={1.6}
                    speed={0.004}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[6, 1, -15]}
                    rotation={[0, 0, 0]}
                    geometryType="dodecahedron"
                    color="#ec4899"
                    scale={1.3}
                    speed={0.005}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />

                {/* Additional shapes for more dynamic background */}
                <FloatingShape
                    position={[-6, -3, -10]}
                    rotation={[0, 0, 0]}
                    geometryType="torus"
                    color="#00d4ff"
                    scale={1.1}
                    speed={0.006}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[3, 5, -9]}
                    rotation={[0, 0, 0]}
                    geometryType="sphere"
                    color="#14b8a6"
                    scale={0.9}
                    speed={0.004}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[-4, -6, -13]}
                    rotation={[0, 0, 0]}
                    geometryType="cone"
                    color="#8b5cf6"
                    scale={1.4}
                    speed={0.003}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[7, -4, -11]}
                    rotation={[0, 0, 0]}
                    geometryType="octahedron"
                    color="#ec4899"
                    scale={1.2}
                    speed={0.007}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
                <FloatingShape
                    position={[-7, 6, -16]}
                    rotation={[0, 0, 0]}
                    geometryType="tetrahedron"
                    color="#00d4ff"
                    scale={1.7}
                    speed={0.002}
                    mousePosition={mousePosition}
                    isDark={isDark}
                />
            </Canvas>
        </div>
    );
};

export default AnimatedBackground;
