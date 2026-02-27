import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import SunCalc from 'suncalc';
import { useEffect } from 'react';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MoonSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const moonPhase = SunCalc.getMoonIllumination(new Date()).phase;
  const rotation = moonPhase * Math.PI * 2;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, rotation, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#e0e0e0"
        roughness={0.9}
        metalness={0.1}
        emissive="#4a4a4a"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const CameraControls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return null;
};

export const Moon3D = () => {
  return (
    <div className="w-full h-[400px] lg:h-[600px] lg:w-[600px] mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={['#1a0a2e']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <MoonSphere />
        <CameraControls />
      </Canvas>
    </div>
  );
};
