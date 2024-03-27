import { TScene } from "@/common/data";
import { THREE } from "@/common/three";
import { useTexture } from "@react-three/drei";
import { useId } from "react";

type TPanoSceneProps = {
  currentScene: TScene;
  setCurrentScene?: (s: TScene) => void;
  onHoverHotspot?: () => void;
};

const PanoScene = ({ currentScene, setCurrentScene }: TPanoSceneProps) => {
  const uid = useId();
  const texture = useTexture(currentScene.src);
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
