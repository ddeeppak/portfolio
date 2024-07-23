import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const TexturedMesh = () => {
  const texture = useTexture('/Images/1299888.png'); // Load texture here
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[10, 8, 1, 50]} />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[10, 100, 100]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};

const Name = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 20, 0], fov: 62 }}>
      <ambientLight color={0xff0000} intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 20]} shadow={true} />
      <TexturedMesh />
      <OrbitControls />
    </Canvas>
  );
};

export default Name;
