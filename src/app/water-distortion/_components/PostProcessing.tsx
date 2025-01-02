import { useRef } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
            precision mediump float;

            varying vec2 vUv;

            void main() {
                vUv = vec2(uv.x, 1.0 - uv.y);

                gl_Position = vec4(position, 1.0);
            }
        `;

const fragmentShader = `
            precision mediump float;

            varying vec2 vUv;
            uniform sampler2D u_image_texture;
            uniform float u_time;
            uniform float u_ratio;
            uniform float u_img_ratio;
            uniform float u_blueish;
            uniform float u_scale;
            uniform float u_illumination;
            uniform float u_surface_distortion;
            uniform float u_water_distortion;

                #define TWO_PI 6.28318530718
                #define PI 3.14159265358979323846

            vec3 mod289(vec3 x) {
                return x - floor(x * (1. / 289.)) * 289.;
            }
            vec2 mod289(vec2 x) {
                return x - floor(x * (1. / 289.)) * 289.;
            }
            vec3 permute(vec3 x) {
                return mod289(((x * 34.) + 1.) * x);
            }
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
                vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
                m = m * m;
                m = m * m;
                vec3 x = 2. * fract(p * C.www) - 1.;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
                vec3 g;
                g.x = a0.x * x0.x + h.x * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130. * dot(m, g);
            }

            mat2 rotate2D(float r) {
                return mat2(cos(r), sin(r), -sin(r), cos(r));
            }

            float surface_noise(vec2 uv, float t, float scale) {
                vec2 n = vec2(.1);
                vec2 N = vec2(.1);
                mat2 m = rotate2D(.5);
                for(int j = 0; j < 10; j++) {
                    uv *= m;
                    n *= m;
                    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
                    n += sin(q);
                    N += cos(q) / scale;
                    scale *= 1.2;
                }
                return (N.x + N.y + .1);
            }

            void main() {
                vec2 uv = vUv;
                uv.y = 1. - uv.y;
                uv.x *= u_ratio;

                float t = .002 * u_time;
                vec3 color = vec3(0.);
                float opacity = 0.;

                float outer_noise = snoise((.3 + .1 * sin(t)) * uv + vec2(0., .2 * t));
                vec2 surface_noise_uv = 2. * uv + (outer_noise * .2);

                float surface_noise = surface_noise(surface_noise_uv, t, u_scale);
                surface_noise *= pow(uv.y, .3);
                surface_noise = pow(surface_noise, 2.);

                vec2 img_uv = vUv;
                img_uv -= .5;
                if(u_ratio > u_img_ratio) {
                    img_uv.x = img_uv.x * u_ratio / u_img_ratio;
                } else {
                    img_uv.y = img_uv.y * u_img_ratio / u_ratio;
                }
                float scale_factor = .95;
                img_uv *= scale_factor;
                img_uv += .5;
                img_uv.y = 1. - img_uv.y;

                img_uv += (u_water_distortion * outer_noise);
                img_uv += (u_surface_distortion * surface_noise);

                vec4 img = texture2D(u_image_texture, img_uv);
                img *= (1. + u_illumination * surface_noise);

                color += img.rgb;
                color += u_illumination * vec3(1. - u_blueish, 1., 1.) * surface_noise;
                opacity += img.a;

                float edge_width = .02;
                float edge_alpha = smoothstep(0., edge_width, img_uv.x) * smoothstep(1., 1. - edge_width, img_uv.x);
                edge_alpha *= smoothstep(0., edge_width, img_uv.y) * smoothstep(1., 1. - edge_width, img_uv.y);
                color *= edge_alpha;
                opacity *= edge_alpha;

                gl_FragColor = vec4(color, opacity);
            }
        `;

const PostProcessing = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { gl, scene, camera, size } = useThree();

  const renderTarget = useRef(
    new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    }),
  );

  useFrame(() => {
    materialRef.current.uniforms.u_time.value = performance.now() * (3 / 4);
    materialRef.current.uniforms.u_image_texture.value =
      renderTarget.current.texture;
    materialRef.current.uniforms.u_ratio.value = size.width / size.height;
    materialRef.current.uniforms.u_img_ratio.value = size.width / size.height;

    gl.setRenderTarget(renderTarget.current);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_image_texture: { value: null },
          u_time: { value: 0 },
          u_ratio: { value: 1 },
          u_img_ratio: { value: 1 },
          u_blueish: { value: 1 },
          u_scale: { value: 16 },
          u_illumination: { value: 0.1 },
          u_surface_distortion: { value: 0.04 },
          u_water_distortion: { value: 0 },
        }}
      />
    </mesh>
  );
};

export default PostProcessing;
