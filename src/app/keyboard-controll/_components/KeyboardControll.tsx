"use client";

import { useEffect, useRef, useState } from "react";

import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Html } from "@react-three/drei";

const KeyboardControll = () => {
  const box = useRef<RapierRigidBody>(null);
  const boxMesh = useRef<Mesh>(null);

  const [keyDown, setKeyDown] = useState<{
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    space: boolean;
    keys: string[];
  }>({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    keys: [],
  });

  useFrame(({ camera, pointer }) => {
    if (!box.current || !(boxMesh.current && boxMesh.current.parent)) {
      return;
    }

    const boxMeshPosition = boxMesh.current.parent.position;

    boxMesh.current.lookAt(
      new Vector3(
        boxMeshPosition.x + -pointer.x,
        boxMeshPosition.y + -pointer.y,
        boxMeshPosition.z + 1,
      ),
    );

    camera.lookAt(
      new Vector3(boxMeshPosition.x, boxMeshPosition.y, boxMeshPosition.z),
    );

    if (keyDown.w) {
      box.current.applyImpulse({ x: 0, y: 0, z: -0.1 }, true);
    }
    if (keyDown.a) {
      box.current.applyImpulse({ x: -0.1, y: 0, z: 0 }, true);
    }
    if (keyDown.s) {
      box.current.applyImpulse({ x: 0, y: 0, z: 0.1 }, true);
    }
    if (keyDown.d) {
      box.current.applyImpulse({ x: 0.1, y: 0, z: 0 }, true);
    }
    if (keyDown.space) {
      box.current.applyImpulse({ x: 0, y: 0.1, z: 0 }, true);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyDown((prev) => {
        return {
          ...prev,
          keys: [...prev.keys, event.key],
        };
      });
      switch (event.key) {
        case "w":
          setKeyDown((prev) => {
            return { ...prev, w: true };
          });
          break;
        case "a":
          setKeyDown((prev) => {
            return { ...prev, a: true };
          });
          break;
        case "s":
          setKeyDown((prev) => {
            return { ...prev, s: true };
          });
          break;
        case "d":
          setKeyDown((prev) => {
            return { ...prev, d: true };
          });
          break;
        case " ":
          setKeyDown((prev) => {
            return { ...prev, space: true };
          });
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
          setKeyDown((prev) => {
            return { ...prev, w: false };
          });
          break;
        case "a":
          setKeyDown((prev) => {
            return { ...prev, a: false };
          });
          break;
        case "s":
          setKeyDown((prev) => {
            return { ...prev, s: false };
          });
          break;
        case "d":
          setKeyDown((prev) => {
            return { ...prev, d: false };
          });
          break;
        case " ":
          setKeyDown((prev) => {
            return { ...prev, space: false };
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <group position={[0, 5, 0]}>
        <Html center>
          <div>
            <p>W A S D Space</p>
            <p className="text-nowrap">
              Controll with keyboard:{" "}
              {keyDown.keys &&
                keyDown.keys
                  .slice(-10)
                  .map((key, index) => <span key={index}>{key}</span>)}
            </p>
            <ul className="flex gap-2">
              {keyDown.w && <li>W</li>}
              {keyDown.a && <li>A</li>}
              {keyDown.s && <li>S</li>}
              {keyDown.d && <li>D</li>}
              {keyDown.space && <li>Space</li>}
            </ul>
          </div>
        </Html>
      </group>
      <RigidBody
        colliders={false}
        position={[0, 2, 0]}
        ref={box}
        restitution={0.5}
        friction={0}
        density={0.05}
      >
        <CuboidCollider args={[1, 1.3, 1]} />
        <mesh ref={boxMesh} castShadow receiveShadow>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
        <mesh position={[0, -1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.5, 2, 4, 4, 4]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        position={[0, -2, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        friction={0}
      >
        <mesh castShadow receiveShadow>
          <planeGeometry args={[128, 128, 128, 128]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </>
  );
};

export default KeyboardControll;
