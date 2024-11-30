"use client";

import { Effects, Sparkles, Stars } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";

import Badge from "./Badge";

extend({ UnrealBloomPass });

const BadgeScene = () => {
  return (
    <Canvas shadows camera={{ fov: 45, position: [0, 0, 8] }}>
      <Stars fade />
      <Sparkles count={200} scale={[20, 20, 10]} size={1.5} speed={2} />
      <directionalLight position={[2, 8, 8]} castShadow />
      <Physics debug gravity={[0, -45, 0]}>
        <Badge />
      </Physics>
      <Effects>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects>
    </Canvas>
  );
};

export default BadgeScene;
