import { styled } from "@/common/emotion-styled";
import { THREE } from "@/common/three";
import Pano from "@/components/Pano";
import { Html, OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Button, Typography } from "antd";
import { Inter } from "next/font/google";
import { Suspense, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState<any>();
  return (
    <StyledWrapper className={`${inter.className}`}>
      <div className="actions-br" style={{ zIndex: 20 }}>
        <Button
          type="primary"
          danger={isEditing}
          size="large"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
        </Button>
      </div>

      <Canvas>
        <Suspense fallback={null}>
          <group>
            <Pano imageUrl="/store-pano-1.jpg" />
            {/* ground plane */}
            {isEditing && (
              <mesh position={[0, 0, 0]} rotation={[Math.PI / -2, 0, 0]}>
                <planeGeometry args={[2000, 2000, 40, 40]} />
                <meshBasicMaterial wireframe color="white" side={THREE.DoubleSide} />
              </mesh>
            )}
            {position && (
              <mesh position={position}>
                <Html center>
                  <Typography.Text copyable style={{ fontSize: 16, whiteSpace: "nowrap" }}>
                    {String(position)}
                  </Typography.Text>
                </Html>
              </mesh>
            )}
          </group>
        </Suspense>

        {isEditing && <axesHelper args={[1000]} position={[0, 0, 0]} />}

        {isEditing && (
          <TransformControls
            onChange={(o) => {
              const selectedPosition = (o?.target as any)?.object?.position;
              setPosition(!!selectedPosition ? Object.values(selectedPosition) : undefined);
            }}
            mode="translate"
          />
        )}

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom
          enablePan={false}
          enableDamping
          rotateSpeed={-0.5}
          makeDefault
          autoRotate={!isEditing}
          maxDistance={400}
          minDistance={100}
        />
      </Canvas>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.main`
  position: relative;
  width: 100dvw;
  height: 100dvh;

  & > .actions-br {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 16px;
    /* color: ${({ theme }) => theme.colorPrimary}; */
  }
`;
