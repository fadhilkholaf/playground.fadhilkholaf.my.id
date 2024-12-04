import { CameraShake, Environment, Reflector, Sky } from "@react-three/drei";

import SetUpModel from "./SetUpModel";

const SetUp = () => {
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
        position={[0, -0.93, 0]}
      />
      <SetUpModel />
      <Sky sunPosition={[0, 1, 0]} />
      <Environment preset="sunset" />
      <CameraShake
        maxYaw={0.1}
        maxPitch={0.1}
        maxRoll={0.1}
        yawFrequency={0.1}
        pitchFrequency={0.1}
        rollFrequency={0.1}
        intensity={0.5}
        decay={false}
        decayRate={0.65}
      />
    </>
  );
};

export default SetUp;
