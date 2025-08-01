import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

export default function Phone3D() {
  const phoneRef = useRef();

  useFrame(() => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y += 0.01;
      phoneRef.current.rotation.x += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />

      {/* Phone Body */}
      <mesh ref={phoneRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 3, 0.25]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Call Icon - Circle Button */}
      <mesh position={[0, -0.9, 0.13]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} />
      </mesh>

      {/* Phone Emoji or Icon Text */}
      <Text
        position={[0, -0.9, 0.14]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        📞
      </Text>

      <OrbitControls enableZoom={false} />
    </>
  );
}
