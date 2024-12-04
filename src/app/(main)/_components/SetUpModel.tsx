import * as THREE from "three";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    table: THREE.Mesh;
    keyboard: THREE.Mesh;
    mouse: THREE.Mesh;
    cup: THREE.Mesh;
    chair: THREE.Mesh;
    ["mini-flower"]: THREE.Mesh;
    laptop: THREE.Mesh;
    ["flower-one"]: THREE.Mesh;
    monitor: THREE.Mesh;
    ["flower-two"]: THREE.Mesh;
  };
  materials: {
    lambert3: THREE.MeshStandardMaterial;
  };
};

export default function SetUpModel() {
  const { nodes, materials } = useGLTF(
    "/models/setup-compressed.glb",
  ) as GLTFResult;
  return (
    <group position={[0, -1, -0.5]} dispose={null}>
      <group position={[0.15, 0, 0]}>
        <mesh
          name="table"
          castShadow
          receiveShadow
          geometry={nodes.table.geometry}
          material={materials.lambert3}
          position={[-0.156, 0.565, -0.322]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.054}
        />
        <Float floatingRange={[0.1, 0.1]}>
          <mesh
            name="keyboard"
            castShadow
            receiveShadow
            geometry={nodes.keyboard.geometry}
            material={materials.lambert3}
            position={[0.125, 1.1, -0.043]}
            rotation={[Math.PI / 1.5, 0, 0]}
            scale={0.25}
          />
        </Float>
        <mesh
          name="mouse"
          castShadow
          receiveShadow
          geometry={nodes.mouse.geometry}
          material={materials.lambert3}
          position={[0.61, 1.108, -0.041]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.079}
        />
        <mesh
          name="cup"
          castShadow
          receiveShadow
          geometry={nodes.cup.geometry}
          material={materials.lambert3}
          position={[-0.957, 1.169, -0.011]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.09}
        />
        <mesh
          name="chair"
          castShadow
          receiveShadow
          geometry={nodes.chair.geometry}
          material={materials.lambert3}
          position={[-0.25, 0.582, 1]}
          rotation={[Math.PI / 2, 0, Math.PI / 1.5]}
          scale={0.533}
        />
        <mesh
          name="mini-flower"
          castShadow
          receiveShadow
          geometry={nodes["mini-flower"].geometry}
          material={materials.lambert3}
          position={[0.755, 1.266, -0.746]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.189}
        />
        <Float floatingRange={[0.1, 0.1]}>
          <mesh
            name="laptop"
            castShadow
            receiveShadow
            geometry={nodes.laptop.geometry}
            material={materials.lambert3}
            position={[-1, 1.5, -0.539]}
            rotation={[Math.PI / 1.5, 0, -0.372]}
            scale={0.325}
          />
        </Float>
        <mesh
          name="monitor"
          castShadow
          receiveShadow
          geometry={nodes.monitor.geometry}
          material={materials.lambert3}
          position={[0.155, 1.423, -0.471]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.38}
        />
      </group>
      <Float floatingRange={[0.1, 0.1]}>
        <mesh
          name="flower-one"
          castShadow
          receiveShadow
          geometry={nodes["flower-one"].geometry}
          material={materials.lambert3}
          position={[-1.823, 0.6, 0.727]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.461}
        />
      </Float>
      <Float floatingRange={[0.1, 0.1]}>
        <mesh
          name="flower-two"
          castShadow
          receiveShadow
          geometry={nodes["flower-two"].geometry}
          material={materials.lambert3}
          position={[1.318, 0.6, 1.293]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.461}
        />
      </Float>
    </group>
  );
}

useGLTF.preload("/models/setup-compressed.glb");
