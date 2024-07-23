import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TexturedMesh = ({ onClick }) => {
  const texture = useTexture('/Images/1299888.png'); // Load texture here
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[10, 8, 1, 50]} />
        <meshNormalMaterial />
      </mesh>
      <mesh
        position={[0, 0.51, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
      >
        <circleGeometry args={[10, 100]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};

const RotatingIcosahedron = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += Math.random() * 0.02;
      meshRef.current.rotation.y += Math.random() * 0.02;
      meshRef.current.rotation.z += Math.random() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -10, 0]}>
      <icosahedronGeometry args={[3, 0]} />
      <meshNormalMaterial />
    </mesh>
  );
};

const Name = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 20, 0]);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: cameraPosition, fov: 62 }}
    >
      <ambientLight color={0xff0000} intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 20]} shadow={true} />
      <RotatingIcosahedron />
      <TexturedMesh onClick={() => setCameraPosition([0, -20, 0])} />
      // <OrbitControls />
    </Canvas>
  );
};

export default Name;
