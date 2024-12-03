"use client";

import { Sparkles, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import FloatingBalls from "./FloatingBalls";
import Pointer from "./Pointer";

const FloatingScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <Physics debug gravity={[0, 0, 0]}>
        <Pointer />
        {[
          ...Array(10)
            .keys()
            .map((_, index) => <FloatingBalls key={index} />),
        ]}
      </Physics>
      <Stars fade />
      <Sparkles count={200} scale={[20, 20, 10]} size={3} speed={2} />
    </Canvas>
  );
};

export default FloatingScene;
