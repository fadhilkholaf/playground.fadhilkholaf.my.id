/* eslint-disable */

"use client";

import { useEffect, useState } from "react";

import { Effects, OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { UnrealBloomPass } from "three-stdlib";

import Pointer from "@/app/floating/_components/Pointer";
import StripLamp from "./StripLamp";

extend({ UnrealBloomPass });

const StripLampScene = () => {
  const [mobile, setMobile] = useState<boolean>(false);

  const isMobile = () => {
    setMobile(innerWidth < 768);
  };

  useEffect(() => {
    isMobile();

    window.addEventListener("resize", isMobile);

    return () => {
      window.removeEventListener("resize", isMobile);
    };
  });

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <OrbitControls />
      <ambientLight />
      <Physics debug gravity={[0, -20, 0]}>
        <StripLamp />
        <Pointer />
      </Physics>
      <Effects>
        {/* @ts-ignore */}
        <unrealBloomPass radius={0.75} luminanceThreshold={0.8} intensity={5} />
      </Effects>
    </Canvas>
  );
};

export default StripLampScene;
