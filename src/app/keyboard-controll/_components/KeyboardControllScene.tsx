"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import KeyboardControll from "./KeyboardControll";

const KeyboardControllScene = () => {
  return (
    <Canvas shadows camera={{ fov: 45, position: [0, 25, 50] }}>
      <OrbitControls enableRotate={false} enablePan={false} />
      <directionalLight castShadow position={[0, 1, 10]} />
      <Physics debug>
        <KeyboardControll />
      </Physics>
    </Canvas>
  );
};

export default KeyboardControllScene;
