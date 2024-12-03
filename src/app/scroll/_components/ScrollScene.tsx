"use client";

import { Effects } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";

import Scroll from "./Scroll";

extend({ UnrealBloomPass });

const ScrollScene = () => {
  return (
    <Canvas
      shadows
      camera={{ fov: 45, position: [-3, 0, 3] }}
      dpr={[0, 0.5]}
      frameloop="demand"
    >
      <Scroll />
      <ambientLight intensity={0.01} />
      <pointLight
        castShadow
        position={[0, 0, 3]}
        intensity={5}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <Effects>
        <unrealBloomPass args={[undefined, 1, 1, 0.1]} />
      </Effects>
    </Canvas>
  );
};

export default ScrollScene;
