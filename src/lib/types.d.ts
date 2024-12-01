import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Object3DNode } from "@react-three/fiber";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
      unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      ABLY_API_KEY: string;
      DATABASE_URL: string;
    }
  }
}

export interface MeshLineObject extends THREE.Mesh {
  geometry: MeshLineGeometry;
  material: MeshLineMaterial;
}

export interface Menu {
  name: string;
  url: string;
}
