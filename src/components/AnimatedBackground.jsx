import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursorNormalized } from '../hooks/useCursorPosition';
import * as THREE from 'three';

function ParticleField({ mousePosition }) {
    const mesh = useRef();
    const particlesCount = 1200;

    const particles = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 55;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 55;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

            // Deep space colors: electric blue, violet, and cyan
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i * 3] = 0;
                colors[i * 3 + 1] = 0.83; // Electric Blue
                colors[i * 3 + 2] = 1;
            } else if (colorChoice < 0.66) {
                colors[i * 3] = 0.55;
                colors[i * 3 + 1] = 0.36; // Violet
                colors[i * 3 + 2] = 0.96;
            } else {
                colors[i * 3] = 0.08; // Teal/Cyan
                colors[i * 3 + 1] = 0.72;
                colors[i * 3 + 2] = 0.65;
            }
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.0002;
            mesh.current.rotation.x = mousePosition.y * 0.05;
            mesh.current.rotation.z = mousePosition.x * 0.05;
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
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingShape({ position, rotation, color, scale, speed, geometryType }) {
    const mesh = useRef();

    // Create geometry based on type
    const geometry = useMemo(() => {
        switch (geometryType) {
            case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
            case 'octahedron': return new THREE.OctahedronGeometry(1, 0);
            case 'torus': return new THREE.TorusGeometry(1, 0.4, 16, 50);
            default: return new THREE.IcosahedronGeometry(1, 0);
        }
    }, [geometryType]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x += speed * 0.5;
            mesh.current.rotation.y += speed;
            // Simple floating effect
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
        }
    });

    return (
        <mesh ref={mesh} position={position} rotation={rotation} scale={scale} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.15}
                wireframe
            />
        </mesh>
    );
}

const AnimatedBackground = () => {
    const mousePosition = useCursorNormalized();

    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: true }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

                <ParticleField mousePosition={mousePosition} />

                {/* Simplified Floating Shapes using standard meshes */}
                <FloatingShape
                    position={[-4, 2, -5]}
                    rotation={[0, 0, 0]}
                    geometryType="icosahedron"
                    color="#00d4ff"
                    scale={1.5}
                    speed={0.005}
                />
                <FloatingShape
                    position={[5, -3, -8]}
                    rotation={[0, 0, 0]}
                    geometryType="torus"
                    color="#8b5cf6"
                    scale={1.2}
                    speed={0.004}
                />
                <FloatingShape
                    position={[-3, -4, -2]}
                    rotation={[0, 0, 0]}
                    geometryType="octahedron"
                    color="#ec4899"
                    scale={0.8}
                    speed={0.006}
                />
            </Canvas>
        </div>
    );
};

export default AnimatedBackground;
