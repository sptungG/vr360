import Html from "@/common/Html";
import { THREE } from "@/common/three";
import {
  SpotLight as R3SpotLight,
  TransformControls,
  useDepthBuffer,
  useHelper,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useId, useRef, useState } from "react";
import { SpotLightHelper } from "three";
import Tooltip from "./Tooltip";
import BtnHotspot from "./templated/BtnHotspot";

type TSpotLightProps = Pick<JSX.IntrinsicElements["mesh"], "position" | "scale" | "rotation"> & {
  color?: string | number;
  showHelper?: boolean;
  children?: React.ReactNode;
  hidden?: boolean;
};

const SpotLight = ({
  position,
  rotation,
  scale,
  color = "#ffe58f",
  showHelper = false,
  children,
  hidden,
}: TSpotLightProps) => {
  const uid = useId();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [target] = useState(() => new THREE.Object3D());
  const lightRef = useRef<any>(null);
  useHelper(!!hidden ? null : showHelper && lightRef, SpotLightHelper, "#ffe58f");

  return (
    <group position={position}>
      <mesh rotation={rotation} scale={scale}>
        <Html center transform>
          {children}
        </Html>
      </mesh>
      <mesh>
        {/* <Sphere args={[10, 64, 64]}>
        <icosahedronGeometry args={[10, 15]} attach="geometry" />
        <meshStandardMaterial attach="material" roughness={0} color={color} />
      </Sphere> */}
        {/* <Bloom mipmapBlur luminanceThreshold={1} intensity={2} />
      <sphereGeometry args={[15, 32, 16]} />
      <meshStandardMaterial
        attach="material"
        toneMapped={false}
        roughness={0}
        color={color}
        emissive={color}
        emissiveIntensity={2}
      /> */}

        <R3SpotLight
          // depthBuffer={depthBuffer}
          ref={lightRef}
          castShadow
          penumbra={0.2}
          radiusTop={0.4}
          radiusBottom={500}
          angle={0.8}
          distance={500}
          attenuation={600}
          anglePower={2}
          intensity={1}
          color={color}
          target={target}
          opacity={hidden ? 0 : 1}
        />
        <primitive object={target} position={[0, -10, 0]} />
      </mesh>
    </group>
  );
};

export default SpotLight;
