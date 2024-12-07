/* eslint-disable */

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
      camera={{ fov: 60, position: [-5, 0, 5] }}
      dpr={[0.5, 1]}
      frameloop="demand"
    >
      <Scroll />
      <ambientLight intensity={0.01} />
      <pointLight
        castShadow
        position={[0, 0, 3]}
        intensity={1}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      <Effects>
        {/* @ts-ignore */}
        <unrealBloomPass radius={0.75} luminanceThreshold={0.8} intensity={5} />
      </Effects>
    </Canvas>
  );
};

export default ScrollScene;
