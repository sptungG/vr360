import { TScene, getSceneById } from "@/common/data";
import styled from "@emotion/styled";
import { THREE } from "@/common/three";
import PanoScene from "@/components/PanoScene";
import { Rotate3DSvg } from "@/components/templated/icons";
import { OrbitControls, Preload, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Button, Divider, Flex, Form, Switch, Tooltip, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import * as TComponents from "@/components/templated";

import { Inter } from "next/font/google";
import { Suspense, useId, useState } from "react";
import Html from "@/common/Html";
import ControlBar from "@/components/templated/ControlBar01";

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
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState<any>();
  const [currentScene, setCurrentScene] = useState<TScene>(initialScene);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);

  return (
    <StyledWrapper className={`${inter.className}`}>
      <div className="actions-bc" style={{ zIndex: 20 }}>
        <ControlBar />
      </div>

      <div className="actions-br" style={{ zIndex: 20 }}>
        <Flex
          vertical
          className="form-wrapper"
          style={
            isEditing ? { background: "#fff", borderRadius: 8, padding: 12 } : { borderRadius: 8 }
          }
        >
          {isEditing && (
            <Form
              form={form}
              onFinish={(formValues) => {
                setCurrentScene((prev) => ({ ...prev, controlProps: formValues }));
                setIsEditing(false);
                setIsAutoRotate(true);
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                Cài đặt Scene {currentScene.id}
              </Typography.Title>

              <Form.Item name="autoRotate" label="Tự động xoay">
                <Switch />
              </Form.Item>

              <Flex gap={12} justify="flex-end" align="center">
                <Button
                  htmlType="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAutoRotate(true);
                  }}
                >
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  Lưu cài đặt
                </Button>
              </Flex>
            </Form>
          )}

          {!isEditing && (
            <Flex align="center">
              <Tooltip title="Tự động xoay">
                <Button
                  icon={<Rotate3DSvg />}
                  type={isAutoRotate ? "primary" : "default"}
                  onClick={() => setIsAutoRotate((prev) => !prev)}
                ></Button>
              </Tooltip>
              <Divider type="vertical" />
              <Button
                size="large"
                onClick={() => {
                  setIsAutoRotate(false);
                  setIsEditing(true);
                }}
                icon={<EditOutlined />}
              >
                Scene {currentScene.id}
              </Button>
            </Flex>
          )}
        </Flex>
      </div>

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
          autoRotate={isAutoRotate}
          // autoRotate={!isEditing || currentScene?.controlProps?.autoRotate}
        />

        <Suspense fallback={null}>
          <Preload all />
          <group>
            <PanoScene currentScene={currentScene} setCurrentScene={setCurrentScene} />
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
                        setIsAutoRotate(true);
                      },
                      onMouseOver: () => setIsAutoRotate(false),
                      onMouseOut: () => setIsAutoRotate(true),
                    })}
                  </Html>
                </mesh>
              ))}

            {/* {currentScene?.routes?.length &&
              currentScene?.routes.map((item, index) => (
                <TransformControls
                  key={uid + "routes" + index}
                  position={item?.position}
                  scale={item?.scale}
                  rotation={[-90, 100, 180]}
                  mode="rotate"
                  onChange={(e) => {
                    console.log((e?.target as any)?.object);
                  }}
                >
                  <mesh>
                    <Html center transform>
                      {TComponents[item.componentName]({
                        ...item.componentProps,
                        onClick: (toSceneId) => {
                          setCurrentScene(getSceneById(toSceneId)!);
                        },
                      })}
                    </Html>
                  </mesh>
                </TransformControls>
              ))} */}

            {!!currentScene?.hotspots?.length &&
              currentScene?.hotspots.map((item, index) => (
                <mesh
                  key={uid + "hotspots" + String(item) + index}
                  position={item?.position}
                  scale={item?.scale}
                  rotation={item?.rotation}
                >
                  <Html center transform>
                    {TComponents[item.componentName]({
                      ...item.componentProps,
                      onOpenChange: (o) => setIsAutoRotate(!o),
                    })}
                  </Html>
                </mesh>
              ))}

            {/* {!!currentScene?.hotspots?.length &&
              currentScene?.hotspots.map((item, index) => (
                <TransformControls
                  key={uid + "hotspotshotspots" + index}
                  position={item?.position}
                  scale={item?.scale}
                  mode="rotate"
                  onChange={(e) => {
                    console.log((e?.target as any)?.object);
                  }}
                >
                  <mesh>
                    <Html center transform>
                      {TComponents[item.componentName]({
                        ...item.componentProps,
                        onOpenChange: (o) => setIsAutoRotate(!o),
                      })}
                    </Html>
                  </mesh>
                </TransformControls>
              ))} */}

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

    & > .form-wrapper {
    }
  }
  & > .actions-bc {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default Page;
