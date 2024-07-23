import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Component to handle the circle with texture
const TexturedCircle = ({ onClick }) => {
  const texture = useTexture('/Images/1299888.png');

  return (
    <mesh
      position={[0, 1, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={onClick}
    >
      <circleGeometry args={[10, 100]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

// Component to handle the rotating Icosahedron
const RotatingIcosahedron = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Apply random rotation on each frame
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

// Component to handle camera movement
const CameraController = ({ targetPosition }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(...targetPosition), 0.1);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Name = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 20, 0]);
  const soundRef = useRef();

  // Handle click on the circle
  const handleClick = () => {
    if (soundRef.current) {
      soundRef.current.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    } else {
      console.error('Sound reference is null or undefined.');
    }
    setCameraPosition([0, -20, 0]); // Move the camera
  };

  return (
    <>
      <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 20, 0], fov: 62 }}>
        <ambientLight color={0xff0000} intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 20]} shadow={true} />

        {/* Icosahedron with random rotation */}
        <RotatingIcosahedron />

        {/* Mesh with cylinder geometry */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[10, 8, 1, 50]} />
          <meshNormalMaterial />
        </mesh>

        {/* Use the TexturedCircle component */}
        <TexturedCircle onClick={handleClick} />

        {/* Camera controller */}
        <CameraController targetPosition={cameraPosition} />
        
      </Canvas>

      {/* Audio element to play the sound */}
      <audio ref={soundRef} src="./themesong.mp3" preload="auto" />
    </>
  );
};

export default Name;
