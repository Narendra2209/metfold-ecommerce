
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const MetalSheet = ({ position, rotation, scale, color = "#8B92A8" }) => {
    const meshRef = useRef();

    // Random subtle movement
    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.1;
            meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                <boxGeometry args={[1, 1, 0.05]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.2}
                // specific envMapIntensity removed to avoid crash if no env map
                />
            </mesh>
        </Float>
    );
};

const Hero3D = () => {
    // Generate random positions for background sheets
    const sheets = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10 - 5
            ],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ],
            scale: [
                2 + Math.random() * 2,
                2 + Math.random() * 2,
                1
            ],
            color: Math.random() > 0.8 ? "#C41E3A" : "#334155" // Occasional accent color
        }));
    }, []);

    return (
        <div className="hero-3d-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4A7BA7" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#C41E3A" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {sheets.map((sheet, i) => (
                    <MetalSheet
                        key={i}
                        position={sheet.position}
                        rotation={sheet.rotation}
                        scale={sheet.scale}
                        color={sheet.color}
                    />
                ))}

                {/* Environment removed to prevent network suspense issues */}
                {/* <Environment preset="city" /> */}
                <fog attach="fog" args={['#1B3A5C', 10, 25]} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
