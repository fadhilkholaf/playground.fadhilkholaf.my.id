"use client";

import { Suspense } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import LoadingPage from "@/app/loading";
import WaterDistortion from "./WaterDistortion";
import dynamic from "next/dynamic";

const PostProcessing = dynamic(() => import("./PostProcessing"), {
  ssr: false,
});

const WaterDistortionScene = () => {
  return (
    <Canvas>
      <color attach="background" args={["pink"]} />
      <OrbitControls enablePan={false} />
      <Suspense fallback={<LoadingPage />}>
        <WaterDistortion />
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
};

export default WaterDistortionScene;
