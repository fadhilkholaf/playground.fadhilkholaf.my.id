/* eslint-disable */

"use client";

import { Effects, Sparkles, Stars } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { UnrealBloomPass } from "three-stdlib";

import Badge from "./Badge";

extend({ UnrealBloomPass });

const BadgeScene = () => {
  return (
    <Canvas
      shadows
      camera={{ fov: 45, position: [0, 0, 8] }}
      dpr={[0, 1]}
      frameloop="demand"
    >
      <Physics debug gravity={[0, -45, 0]}>
        <Badge />
      </Physics>
      <directionalLight position={[2, 8, 8]} castShadow />
      <Stars fade />
      <Sparkles count={200} scale={[20, 20, 10]} size={1.5} speed={2} />
      <Effects>
        {/* @ts-ignore */}
        <unrealBloomPass args={[undefined, 1.5, 1, 0]} />
      </Effects>
    </Canvas>
  );
};

export default BadgeScene;
