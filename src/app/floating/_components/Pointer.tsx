import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const Pointer = () => {
  const pointerRef = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (pointerRef.current) {
      pointerRef.current.setNextKinematicTranslation(
        new THREE.Vector3().set(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0,
        ),
      );
    }
  });

  return (
    <RigidBody type="kinematicPosition" ref={pointerRef} colliders={false}>
      <BallCollider args={[0.5]} />
    </RigidBody>
  );
};

export default Pointer;
