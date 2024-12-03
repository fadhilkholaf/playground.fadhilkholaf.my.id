import { ScrollControls, Scroll as ScrollPage } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Pages = () => {
  const { height } = useThree((state) => state.viewport);

  return (
    <>
      <mesh position={[0, height * 1, 0]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={"pink"} />
      </mesh>
      <mesh position={[0, -height * 0, 0]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <mesh position={[0, -height * 1, 0]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={"pink"} />
      </mesh>
      <mesh position={[0, -height * 2, 0]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};

const Scroll = () => {
  return (
    <ScrollControls infinite pages={3} damping={0}>
      <ScrollPage>
        <Pages />
      </ScrollPage>
      <mesh position={[0, 0, -3]} receiveShadow castShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial />
      </mesh>
    </ScrollControls>
  );
};

export default Scroll;
