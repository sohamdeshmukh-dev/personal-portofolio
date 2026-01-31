import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Chess Knight 3D Model Component
const KnightModel = () => {
    const gltf = useGLTF('/models/knight.glb');
    const groupRef = useRef();
    const modelRef = useRef();

    useEffect(() => {
        if (modelRef.current) {
            // Clone the scene to avoid modifying the cached version
            const clonedScene = gltf.scene.clone(true);

            const box = new THREE.Box3().setFromObject(clonedScene);
            const center = box.getCenter(new THREE.Vector3());

            // Center the geometry
            clonedScene.position.set(-center.x, -center.y, -center.z);

            // Apply realistic white material
            clonedScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xf5f5f5,  // Off-white
                        metalness: 0.2,
                        roughness: 0.6
                    });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Clear and add the cloned scene
            while (modelRef.current.children.length) {
                modelRef.current.remove(modelRef.current.children[0]);
            }
            modelRef.current.add(clonedScene);
        }
    }, [gltf]);

    // Auto-rotation
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3; // Slow rotation
        }
    });

    return (
        <group ref={groupRef} scale={4} position={[0, 0, 0]}>
            <group ref={modelRef} />
        </group>
    );
};

// Loading fallback
const Loader = () => (
    <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666666" opacity={0.3} transparent />
    </mesh>
);

// Main ChessKnight3D Component
const ChessKnight3D = () => {
    const containerRef = useRef();
    const controlsRef = useRef();
    const [isVisible, setIsVisible] = useState(true);
    const [isTabVisible, setIsTabVisible] = useState(true);

    // IntersectionObserver for viewport visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Page Visibility API for tab switching
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabVisible(!document.hidden);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Double-click to reset camera position
    useEffect(() => {
        const handleDoubleClick = () => {
            if (controlsRef.current) {
                // Reset camera to default position
                controlsRef.current.reset();
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('dblclick', handleDoubleClick);
        }

        return () => {
            if (container) {
                container.removeEventListener('dblclick', handleDoubleClick);
            }
        };
    }, []);

    const shouldRender = isVisible && isTabVisible;

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <Canvas
                camera={{ position: [5, 3.5, 5], fov: 45 }}
                style={{ background: 'transparent' }}
            >
                {/* Lighting setup */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                <pointLight position={[0, 10, 0]} intensity={0.8} />

                {/* Model with Suspense */}
                {shouldRender && (
                    <Suspense fallback={<Loader />}>
                        <KnightModel />
                    </Suspense>
                )}

                {/* OrbitControls for user interaction */}
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={false}
                    autoRotate={false}
                    autoRotateSpeed={0}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>
        </div>
    );
};

// Preload the GLB model
useGLTF.preload('/models/knight.glb');

export default ChessKnight3D;
