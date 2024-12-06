import { useTrailTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import { useRef } from "react";

extend({ ShaderMaterial });

const TrailShaderMaterial = {
  uniforms: {
    uTrailTexture: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0) * 0.1;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTrailTexture;
    uniform float uTime;

    void main() {
      vec4 trail = texture2D(uTrailTexture, vUv);

      vec3 idleColor = vec3(0.5, 0.8, 1.0); 
      vec3 hoverColor = vec3(0.0, 0.6, 1.5); 
      vec3 color = mix(idleColor, hoverColor, trail.r);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const Trail = () => {
  const materialRef = useRef<ShaderMaterial>(null);
  const [texture, onMove] = useTrailTexture({
    intensity: 0.5,
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTrailTexture.value = texture;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh onPointerMove={onMove}>
      <planeGeometry args={[innerWidth / 150, innerHeight / 150, 256, 256]} />
      <shaderMaterial ref={materialRef} args={[TrailShaderMaterial]} />
    </mesh>
  );
};

export default Trail;
