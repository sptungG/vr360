import { THREE } from "@/common/three";
import { useTexture } from "@react-three/drei";
import { useId } from "react";

type TPanoSceneProps = {
  src: string;
};

const PanoScene = ({ src }: TPanoSceneProps) => {
  const uid = useId();
  const texture = useTexture(src);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default PanoScene;
