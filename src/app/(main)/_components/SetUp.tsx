import { Environment, Reflector, Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import SetUpModel from "./SetUpModel";

const SetUp = () => {
  useFrame(({ camera }) => {
    camera.lookAt(new THREE.Vector3(0, 0.5, 0.5));
  });

  return (
    <>
      <Reflector
        blur={[512, 512]}
        mixBlur={0.1}
        mixStrength={0.25}
        resolution={1024}
        args={[5000, 5000]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        mirror={0.5}
        position={[0, -0.43, 0]}
      />
      <SetUpModel />
      <Sky sunPosition={[0, 1, 0]} />
      <Environment preset="sunset" />
    </>
  );
};

export default SetUp;
