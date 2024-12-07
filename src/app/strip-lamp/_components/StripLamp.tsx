import { RapierRigidBody, RigidBody, useRopeJoint } from "@react-three/rapier";
import { useRef } from "react";

const Lamps = () => {
  const fixed1 = useRef<RapierRigidBody>(null!);
  const fixed2 = useRef<RapierRigidBody>(null!);
  const lamp1 = useRef<RapierRigidBody>(null!);
  const lamp2 = useRef<RapierRigidBody>(null!);
  const lamp3 = useRef<RapierRigidBody>(null!);
  const lamp4 = useRef<RapierRigidBody>(null!);

  useRopeJoint(fixed1, lamp1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(lamp1, lamp2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(lamp2, lamp3, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(lamp3, lamp4, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(lamp4, fixed2, [[0, 0, 0], [0, 0, 0], 1]);

  return (
    <>
      <RigidBody type="fixed" ref={fixed1} position={[-2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color={"black"} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={lamp1}
        position={[0, 2, -1]}
        linearDamping={1.5}
        angularDamping={5}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial emissive={"green"} emissiveIntensity={10} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={lamp2}
        position={[0, 2, 1]}
        linearDamping={1.5}
        angularDamping={5}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial emissive={"yellow"} emissiveIntensity={10} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={lamp3}
        position={[0, 2, 1]}
        linearDamping={1.5}
        angularDamping={5}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial emissive={"blue"} emissiveIntensity={10} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={lamp4}
        position={[0, 2, 1]}
        linearDamping={1.5}
        angularDamping={5}
      >
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial emissive={"red"} emissiveIntensity={10} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" ref={fixed2} position={[2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color={"black"} />
        </mesh>
      </RigidBody>
    </>
  );
};

const StripLamp = () => {
  return (
    <>
      <group position={[-6, 0, 0]}>
        <Lamps />
      </group>
      <group position={[-2, 0, 0]}>
        <Lamps />
      </group>
      <group position={[2, 0, 0]}>
        <Lamps />
      </group>
      <group position={[6, 0, 0]}>
        <Lamps />
      </group>
    </>
  );
};

export default StripLamp;
