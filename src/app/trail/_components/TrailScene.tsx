"use client";

import { Canvas } from "@react-three/fiber";

import Trail from "./Trail";

const TrailScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <Trail />
    </Canvas>
  );
};

export default TrailScene;
