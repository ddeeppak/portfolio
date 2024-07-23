import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Background = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
      <Scene />
    </Canvas>
  );
}

const Scene = () => {
  const groupRef = useRef();

  // Generate random positions and sizes for 200 spheres
  const spheres = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 10; i++) {
      temp.push({
        position: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
        size:  Math.floor(Math.random() * 5) + 1,
        speed: [Math.random() * 0.01, Math.random() * 0.01, Math.random() * 0.01],
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust the speed as needed
      groupRef.current.rotation.x += 0.005;
    }
  });

  return (
    <>
      <ambientLight color={0xff0000} intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 20]} castShadow />
      <group ref={groupRef}>
        {spheres.map((sphere, index) => (
          <MovingSphere key={index} {...sphere} />
        ))}
      </group>

      <OrbitControls />
    </>
  );
}

const MovingSphere = ({ position, size, speed }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.position.x += speed[0];
    ref.current.position.y += speed[1];
    ref.current.position.z += speed[2];

    // Bounce back when reaching the boundaries
    if (ref.current.position.x > 10 || ref.current.position.x < -10) speed[0] = -speed[0];
    if (ref.current.position.y > 10 || ref.current.position.y < -10) speed[1] = -speed[1];
    if (ref.current.position.z > 10 || ref.current.position.z < -10) speed[2] = -speed[2];
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default Background;
