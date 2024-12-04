"use client";

import { useEffect, useState } from "react";

import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import SetUp from "./SetUp";

const SetUpScene = () => {
  const [mobile, setMobile] = useState<boolean>(false);

  const isMobile = () => {
    setMobile(innerWidth < 768);
    console.log(innerWidth);
  };

  useEffect(() => {
    isMobile();

    window.addEventListener("resize", isMobile);

    return () => {
      window.removeEventListener("resize", isMobile);
    };
  });

  return (
    <Canvas
      shadows
      dpr={[0, mobile ? 0.75 : 1]}
      camera={{ position: [0, 1.5, mobile ? 5 : 3], fov: mobile ? 75 : 60 }}
    >
      <OrbitControls
        dampingFactor={0.1}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={-Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      />
      <SetUp />
      {!mobile && (
        <Sparkles count={100} scale={[5, 5, 5]} size={2} speed={0.5} />
      )}
    </Canvas>
  );
};

export default SetUpScene;
