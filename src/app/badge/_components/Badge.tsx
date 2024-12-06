/* eslint-disable */

"use client";

import { RefObject, useRef, useState } from "react";

import gsap from "gsap";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Text } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import {
  RigidBody,
  RapierRigidBody,
  useRopeJoint,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import * as THREE from "three";

import { MeshLineObject } from "@/lib/types";

extend({ MeshLineGeometry, MeshLineMaterial });

const Badge = () => {
  const rotatingBox = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const band = useRef<MeshLineObject>(null);
  const lerpedX = useRef(0);
  const lerpedLookAtX = useRef(0);
  const lerpedLookAtY = useRef(0);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  useRopeJoint(
    fixed as RefObject<RapierRigidBody>,
    j1 as RefObject<RapierRigidBody>,
    [[0, -0.5, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j1 as RefObject<RapierRigidBody>,
    j2 as RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j2 as RefObject<RapierRigidBody>,
    card as RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 1.5, 0], 0.1],
  );

  useFrame(({ pointer, camera }) => {
    gsap.to(lerpedLookAtX, {
      current: pointer.x,
      duration: 5,
      ease: "expo.out",
    });
    gsap.to(lerpedLookAtY, {
      current: pointer.y,
      duration: 5,
      ease: "expo.out",
    });
    camera.lookAt(
      new THREE.Vector3(lerpedLookAtX.current, lerpedLookAtY.current, 0),
    );

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      card.current &&
      band.current &&
      rotatingBox.current
    ) {
      rotatingBox.current.rotation.x += 0.01;

      curve.points[0].copy(j2.current.translation());
      curve.points[1].copy(j1.current.translation());
      curve.points[2].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      const cardRotation = card.current.rotation();
      gsap.to(lerpedX, { current: pointer.x });
      card.current.setRotation(
        {
          w: 1,
          x: cardRotation.x,
          y: cardRotation.y /*+ lerpedX.current / 100*/,
          z: cardRotation.z,
        },
        true,
      );

      if (dragged) {
        vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
        dir.copy(vec).sub(camera.position).normalize();
        vec.add(dir.multiplyScalar(camera.position.length()));
        card.current.setNextKinematicTranslation({
          x: vec.x - dragged.x,
          y: vec.y - dragged.y,
          z: vec.z - dragged.z,
        });
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true,
      );
    }
  });

  return (
    <>
      <group position={[0, -2.5, 0]}>
        <RigidBody
          type="fixed"
          position={[0, 5, 0]}
          ref={fixed}
          angularDamping={2}
          linearDamping={2}
        >
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </RigidBody>
        <RigidBody ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[-5, 5, 0]}
          angularDamping={2}
          linearDamping={2}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1, 1.5, 0.01]} />
          <mesh
            castShadow
            receiveShadow
            onPointerUp={() => drag(false)}
            onPointerDown={(e) =>
              drag(
                card.current
                  ? new THREE.Vector3()
                      .copy(e.point)
                      .sub(vec.copy(card.current.translation()))
                  : false,
              )
            }
          >
            <planeGeometry args={[2, 3]} />
            <meshStandardMaterial
              transparent
              opacity={0.5}
              roughness={0.5}
              side={THREE.DoubleSide}
            />
            <Text
              position={[-0.9, -1, 0.01]}
              fontSize={0.2}
              color="white"
              anchorX="left"
              anchorY="middle"
              maxWidth={1.8}
            >
              {"Muhammad\nFadhil\nKholaf"}
            </Text>
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial color="cyan" lineWidth={0.25} />
      </mesh>
      <mesh ref={rotatingBox} castShadow receiveShadow position={[1, 1, 3]}>
        <boxGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Badge;
