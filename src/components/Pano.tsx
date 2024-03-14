import { THREE } from "@/common/three";
import { useTexture } from "@react-three/drei";

type TPanoProps = { imageUrl?: string };

const Pano = ({ imageUrl = "/pano1.jpg" }: TPanoProps) => {
  const props = useTexture({
    map: imageUrl,
  });

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial {...props} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Pano;
