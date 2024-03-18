import { styled } from "@/common/emotion-styled";
import { THREE } from "@/common/three";
import Pano from "@/components/Pano";
import {
  Float,
  GizmoHelper,
  GizmoViewport,
  Html,
  OrbitControls,
  Scroll,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Avatar, Badge, Button, Flex, List, Popover, Tag, Typography, theme } from "antd";
import { Inter } from "next/font/google";
import { Suspense, createElement, useId, useState } from "react";
import { useTheme } from "@emotion/react";
import { LikeOutlined, MessageOutlined, StarOutlined, InfoCircleFilled } from "@ant-design/icons";

const inter = Inter({ subsets: ["latin"] });

// grodno_belarus_august_2019_full_spherical_seamless_hdri_360_panorama
// -449.48254610572707,-98.44897692177705,44.16108242002103 chuyển hướng sang bên cạnh
// -323.6924966880152,-241.0618357718875,-361.5822282043567 gian bánh
// 460.54321996649105,-47.38893685199908,-213.0998346416406 gian cà phê
// -186.15853895596263,214.50868520069602,-375.49284673357704 đèn treo 1
// 106.62070236246053,147.4413229210112,506.8694848369913 đèn cột
// -265.69781078188987,215.5866686549642,348.7051752475347 đèn chùm
// 535.5591149674218,38.130939248021946,17.735467604367287 tranh treo tường
// -508.59230855480064,202.7369429709517,-38.327022205039675 cảm biến cháy
// -508.59230855480064,237.75766607679736,344.0607854064161 thông gió

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Flex align="center">
    {createElement(icon)}
    {text}
  </Flex>
);

export default function Home() {
  const uid = useId();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState<any>();
  // const { token: {bg} } = theme.useToken();
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

      <Canvas style={{ zIndex: 0 }}>
        <Suspense fallback={null}>
          <group>
            <Pano imageUrl="/grodno_belarus_august_2019_full_spherical_seamless_hdri_360_panorama.jpg" />
            {/* <Pano imageUrl="/store-pano-1.jpg" /> */}
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
        <mesh
          position={[-499.48254610572707, -98.44897692177705, 20.16108242002103]}
          scale={[33, 33, 33]}
          rotation={[0.1, 1.6, -0.05]}
        >
          <Html center transform>
            <Flex vertical align="center" gap={4}>
              <Tag bordered={false} color="blue">
                Phòng ăn lớn
              </Tag>
              <picture>
                <img src="/arrow3.png" alt="" width={90} />
              </picture>
            </Flex>
          </Html>
        </mesh>

        <mesh
          position={[-323.6924966880152, 90.0618357718875, -361.5822282043567]}
          scale={[30, 30, 30]}
          rotation={[0, 0.14382110375680413, 0.05]}
        >
          <Html center transform>
            <Popover
              placement="top"
              arrow={{ pointAtCenter: true }}
              content={
                <List
                  itemLayout="vertical"
                  style={{ maxHeight: 400, maxWidth: 800, overflowX: "hidden" }}
                  size="large"
                  pagination={false}
                  dataSource={Array.from({ length: 3 }).map((_, i) => ({
                    href: "https://ant.design",
                    title: `ant design part ${i}`,
                    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
                    description:
                      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
                  }))}
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                      extra={
                        <img
                          width={160}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} />
                      {item.description}
                    </List.Item>
                  )}
                />
              }
            >
              <Button size="large" style={{ height: "fit-content", padding: '6px 6px 2px' }}>
                <Avatar.Group>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Avatar
                      key={uid + "Avatar" + i}
                      style={{ backgroundColor: "#f56a00" }}
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                    />
                  ))}
                </Avatar.Group>
              </Button>
            </Popover>
          </Html>
        </mesh>

        {/* <TransformControls
          mode="rotate"
          onChange={(e) => {
            console.log((e?.target as any)?.object);
          }}
        >
          <mesh position={position}>
            <Html center transform occlude="blending" style={{ userSelect: "none" }}>
              <Flex vertical>
                <iframe
                  title="embed"
                  width={700}
                  height={500}
                  src="https://threejs.org/"
                  frameBorder={0}
                />
                <Typography.Text copyable style={{ fontSize: 16, whiteSpace: "nowrap" }}>
                  {String(position)}
                </Typography.Text>
              </Flex>
            </Html>
          </mesh>
        </TransformControls> */}

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

        <OrbitControls
          target={[0, 0, 0]}
          enableZoom
          enablePan={false}
          enableDamping
          rotateSpeed={-0.5}
          makeDefault
          // autoRotate={!isEditing}
          maxDistance={499}
          minDistance={100}
        />

        <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport labelColor="white" />
        </GizmoHelper>
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
