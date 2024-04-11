import { MeshReflectorMaterial } from "@react-three/drei";

export function Floor(props: any) {
  return (
    <mesh receiveShadow position={[0, -150, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2000, 2000]} />
      <MeshReflectorMaterial
        mirror={0}
        color="#878790"
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
}
