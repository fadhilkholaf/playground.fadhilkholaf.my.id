import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { RapierRigidBody, RigidBody, useRopeJoint } from "@react-three/rapier";
import * as THREE from "three";

const FloatingBalls = () => {
  const lerpedLookAtX = useRef(0);
  const lerpedLookAtY = useRef(0);
  const boxRef1 = useRef<RapierRigidBody>(null);
  const boxRef2 = useRef<RapierRigidBody>(null);
  const boxRef3 = useRef<RapierRigidBody>(null);

  useRopeJoint(boxRef1, boxRef2, [[0, -0.5, 0], [0, 0.5, 0], 0.5]);
  useRopeJoint(boxRef2, boxRef3, [[0, -0.5, 0], [0, 0.5, 0], 0.5]);

  useFrame(({ camera, pointer }) => {
    gsap.to(lerpedLookAtX, {
      current: pointer.x / 2,
      duration: 5,
      ease: "expo.out",
    });
    gsap.to(lerpedLookAtY, {
      current: pointer.y / 2,
      duration: 5,
      ease: "expo.out",
    });
    camera.lookAt(
      new THREE.Vector3(lerpedLookAtX.current, lerpedLookAtY.current, 0),
    );

    if (boxRef1.current && boxRef2.current && boxRef3.current) {
      const boxPosition = boxRef1.current.translation();

      boxRef1.current.setTranslation(
        { x: boxPosition.x, y: boxPosition.y, z: 0 },
        false,
      );

      boxRef1.current.applyImpulse(
        new THREE.Vector3()
          .copy(boxRef1.current.translation())
          .negate()
          .add({ x: 0, y: 0, z: 0 })
          .multiplyScalar(0.2),
        false,
      );
    }
  });

  return (
    <group
      position={[
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100),
      ]}
    >
      <RigidBody ref={boxRef1} linearDamping={1.5} angularDamping={1.5}>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
      <RigidBody ref={boxRef2} linearDamping={1.5} angularDamping={1.5}>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
      <RigidBody ref={boxRef3} linearDamping={1.5} angularDamping={1.5}>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default FloatingBalls;
