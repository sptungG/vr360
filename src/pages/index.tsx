import { TScene, getSceneById } from "@/common/data";
import PanoScene from "@/components/PanoScene";
import * as TComponents from "@/components/templated";
import styled from "@emotion/styled";
import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Html from "@/common/Html";
import useSceneState from "@/common/useSceneState";
import Tooltip from "@/components/Tooltip";
import BtnHotspot from "@/components/templated/BtnHotspot";
import ControlBar01 from "@/components/templated/ControlBar01";
import { BookOpenTextIcon, CoffeeIcon, LayoutGridIcon } from "lucide-react";
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
// 339.50274781179354,0,-379.31028912809654 menu

// 447.98136357465734,-7.342314498985516,237.5816833533934 chuyển hướng sang bên 01

function Page() {
  const initialScene = getSceneById(1)!;

  const uid = useId();
  const [currentScene, setCurrentScene] = useState<TScene>(initialScene);
  const { autoRotate, isViewing, setIsViewing, setAutoRotate } = useSceneState((s) => s);
  const onTooltipOpen = (o?: boolean) => {
    if (!!o) setAutoRotate(false);
    else {
      setTimeout(() => {
        setAutoRotate(true);
      }, 1000);
    }
  };

  return (
    <StyledWrapper style={{ width: "100%", maxWidth: "732px" }} className={`${inter.className}`}>
      <div className="actions-bc" style={{ zIndex: 20 }}>
        <ControlBar01 />
      </div>

      <div className="actions-br" style={{ zIndex: 20 }}></div>
      {/* 
      <Flex
        align="center"
        justify="space-between"
        className="actions-360"
        style={{ zIndex: 20, padding: "0 12px" }}
      >
        {isViewing || <Btn360View />}
      </Flex> */}

      <Canvas
        style={{ zIndex: 0 }}
        // camera={{ lookAt: [447.98136357465734, -7.342314498985516, 237.5816833533934] }}
        frameloop="demand"
      >
        <OrbitControls
          key={String(currentScene.src) + String(currentScene?.controlProps)}
          enableZoom
          enablePan={false}
          enableDamping
          rotateSpeed={-0.5}
          makeDefault
          maxDistance={499}
          minDistance={100}
          zoomToCursor={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          // autoRotate={!isEditing || currentScene?.controlProps?.autoRotate}
        />

        {/* <GizmoHelper alignment="bottom-left" margin={[33, 33]}>
          <GizmoViewport labelColor="white" scale={24} />
        </GizmoHelper> */}

        <Suspense fallback={null}>
          <Preload all />
          <group>
            <PanoScene currentScene={currentScene} setCurrentScene={setCurrentScene} />

            {/* <mesh
              position={[-323.6924966880152, 90.0618357718875, -361.5822282043567]}
              scale={[30, 30, 30]}
              rotation={[0, 0.14382110375680413, 0.05]}
            >
              <Html center transform>

              </Html>
            </mesh> */}

            {currentScene.id === 1 && (
              <>
                <mesh
                  position={[339.6924966880152, 90.0618357718875, 361.5822282043567]}
                  scale={[34, 34, 34]}
                  rotation={[0, 0.14382110375680413, 0]}
                >
                  <Html center transform>
                    <Tooltip title={"Gian Coffee"} onOpenChange={onTooltipOpen}>
                      <BtnHotspot icon={<CoffeeIcon size={16} />} />
                    </Tooltip>
                  </Html>
                </mesh>

                <mesh position={[160, 120, 450]} scale={[30, 30, 30]} rotation={[0, 0.1, 0]}>
                  <Html center transform>
                    <Tooltip title={"MENU chính"} onOpenChange={onTooltipOpen}>
                      <BtnHotspot icon={<BookOpenTextIcon size={16} />} />
                    </Tooltip>
                  </Html>
                </mesh>

                <mesh position={[-388, 84, 320]} scale={[30, 30, 30]} rotation={[0, -0.5, 0]}>
                  <Html center transform>
                    <Tooltip title={"Gian Coffee"} onOpenChange={onTooltipOpen}>
                      <BtnHotspot icon={<CoffeeIcon size={16} />} />
                    </Tooltip>
                  </Html>
                </mesh>

                <mesh position={[85, -10, 500]} scale={[50, 50, 50]} rotation={[0, 0.04, 0]}>
                  <Html center transform>
                    <Tooltip title={"Danh mục chính"} onOpenChange={onTooltipOpen}>
                      <BtnHotspot icon={<LayoutGridIcon fill="currentColor" size={16} />} />
                    </Tooltip>
                  </Html>
                </mesh>
              </>
            )}

            {!!currentScene?.routes?.length &&
              currentScene?.routes.map((item, index) => (
                <mesh
                  key={uid + "routes" + String(item) + index}
                  position={item?.position}
                  scale={item?.scale}
                  rotation={item?.rotation}
                >
                  <Html center transform>
                    {TComponents[item.componentName]({
                      ...item.componentProps,
                      onClick: (toSceneId) => {
                        setCurrentScene?.(getSceneById(toSceneId)!);
                      },
                    })}
                  </Html>
                </mesh>
              ))}
          </group>
        </Suspense>
      </Canvas>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.main`
  position: relative;
  height: 100dvh;
  margin-left: auto;
  margin-right: auto;

  & > .actions-br {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 16px;
    /* color: ${({ theme }) => theme.colorPrimary}; */

    & > .form-wrapper {
    }
  }
  & > .actions-360 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > .actions-bc {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
`;

export default Page;
