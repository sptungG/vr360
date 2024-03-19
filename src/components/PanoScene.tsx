import { TScene, getSceneById } from "@/common/data";
import { THREE } from "@/common/three";
import { useTexture } from "@react-three/drei";
import { useId, useState } from "react";
import TComponents from "./templated/component-types";
import Html from "@/common/Html";

type TPanoSceneProps = { currentScene: TScene; setCurrentScene?: (s: TScene) => void };

const PanoScene = ({ currentScene, setCurrentScene }: TPanoSceneProps) => {
  const uid = useId();
  const texture = useTexture(currentScene.src);

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {currentScene?.routes?.length &&
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

      {currentScene?.hotspots?.length &&
        currentScene?.hotspots.map((item, index) => (
          <mesh
            key={uid + "hotspots" + String(item) + index}
            position={item?.position}
            scale={item?.scale}
            rotation={item?.rotation}
          >
            <Html center transform>
              {TComponents[item.componentName](item.componentProps)}
            </Html>
          </mesh>
        ))}
    </group>
  );
};

export default PanoScene;
