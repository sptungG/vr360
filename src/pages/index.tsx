import { TScene, getSceneById } from "@/common/data";
import { styled } from "@/common/emotion-styled";
import { THREE } from "@/common/three";
import PanoScene from "@/components/PanoScene";
import { Html, OrbitControls, Preload, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Button, Typography } from "antd";

import { Inter } from "next/font/google";
import { Suspense, useId, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// grodno_belarus_august_2019_full_spherical_seamless_hdri_360_panorama
// -449.48254610572707,-98.44897692177705,44.16108242002103 chuyển hướng sang bên 02
// -323.6924966880152,-241.0618357718875,-361.5822282043567 gian bánh
// 460.54321996649105,-47.38893685199908,-213.0998346416406 gian cà phê
// -186.15853895596263,214.50868520069602,-375.49284673357704 đèn treo 1
// 106.62070236246053,147.4413229210112,506.8694848369913 đèn cột
// -265.69781078188987,215.5866686549642,348.7051752475347 đèn chùm
// 535.5591149674218,38.130939248021946,17.735467604367287 tranh treo tường
// -508.59230855480064,202.7369429709517,-38.327022205039675 cảm biến cháy
// -508.59230855480064,237.75766607679736,344.0607854064161 thông gió

// 447.98136357465734,-7.342314498985516,237.5816833533934 chuyển hướng sang bên 01

function Page() {
  const initialScene = getSceneById(1)!;

  const uid = useId();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState<any>();
  const [currentScene, setCurrentScene] = useState<TScene>(initialScene);

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

      <Canvas style={{ zIndex: 0 }} frameloop="demand">
        <OrbitControls
          key={String(currentScene.src) + String(currentScene?.controlProps)}
          enableZoom
          enablePan={false}
          enableDamping
          rotateSpeed={-0.5}
          makeDefault
          // autoRotate={!isEditing}
          maxDistance={499}
          minDistance={100}
          zoomToCursor={false}
          {...(currentScene?.controlProps || {})}
        />

        <Suspense fallback={null}>
          <Preload all />
          <group>
            <PanoScene currentScene={currentScene} setCurrentScene={setCurrentScene} />

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
              console.log((o?.target as any)?.object);
              setPosition(!!selectedPosition ? Object.values(selectedPosition) : undefined);
            }}
            mode="translate"
          />
        )}
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

export default Page;
