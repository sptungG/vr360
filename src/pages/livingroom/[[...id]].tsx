import useSceneState, { LIST_SCENE_00 } from "@/common/useSceneState";
import PanoLayout from "@/components/PanoLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useId } from "react";
import { ControlActions, useControlState } from "@/components/templated/controls/ControlPopover";
import Html from "@/common/Html";
import { StyledMarker01, StyledVideo01 } from "@/components/Items";
import { RouteArrow01 } from "@/components/templated";
import { BtnHotpotAirCond } from "@/components/templated/controls/ControlAirCond";
import { BtnHotspot } from "@/components/templated/controls/BtnControl";
import Tooltip from "@/components/Tooltip";
import { CurtainSvg, MarkerSvg } from "@/components/icons";
import Image from "next/image";
import { Flex } from "antd";
import SpotLight from "@/components/SpotLight";
import { If } from "@uiw/react-only-when";
import {
  BtnHotpotLightTop,
  useControlStateLight,
} from "@/components/templated/controls/ControlLight";
import { RouteMarker01 } from "@/components/templated/RouteArrow";
import { TransformControls } from "@react-three/drei";

const ControlBar01 = dynamic(() => import("@/components/templated/ControlBar01"), { ssr: false });

function Page() {
  const uid = useId();
  const {
    query: { id },
  } = useRouter();
  const IDS = id || ["0"];
  const src =
    IDS.length > 1 ? LIST_SCENE_00[+IDS[0]]?.hotpots?.[+IDS[1]].src : LIST_SCENE_00[+IDS[0]].src;

  const { autoRotate, setAutoRotate } = useSceneState((s) => s);
  const { open, setIsOpen, setCurrentTab } = useControlState((s) => s);
  const { config: configLight } = useControlStateLight((s) => s);

  const onTooltipOpen = (o?: boolean) => {
    if (!!autoRotate && !!o) {
      setAutoRotate(false);
      setTimeout(() => {
        setAutoRotate(true);
      }, 1500);
    }
  };

  const handleOpenControl = (t = "DEN") => {
    setIsOpen(true);
    setCurrentTab(t);
  };

  if (!src) return <div></div>;
  return (
    <PanoLayout
      src={src}
      actions01={
        <ControlBar01 extraTitle={IDS.length === 1 && IDS[0] === "0" && <ControlActions />} />
      }
      autoRotate={autoRotate}
    >
      <If condition={IDS.length === 1 && IDS[0] === "0"}>
        {/* LIGHTS */}

        <SpotLight
          position={[450, 230, 30]}
          scale={[40, 40, 40]}
          rotation={[0, -Math.PI / 2, 0]}
          showHelper
          color={configLight!.color}
          hidden={!configLight?.open}
          key={String(configLight)}
          opacity={0.6}
        >
          <BtnHotpotLightTop
            onTooltipOpen={onTooltipOpen}
            onClick={() => handleOpenControl("DEN")}
          />
        </SpotLight>

        {/* HOTPOT */}

        <mesh position={[-200, -140, -460]} scale={[44, 44, 44]} rotation={[0, Math.PI * 0.2, 0]}>
          <Html center transform>
            <RouteMarker01 href={"/livingroom/0/0"} imageUrl={LIST_SCENE_00[0].hotpots![0].src} />
          </Html>
        </mesh>

        <mesh position={[200, -50, -490]} scale={[28, 28, 28]} rotation={[0, -Math.PI * 0.2, 0]}>
          <Html center transform>
            <RouteMarker01 href={"/livingroom/0/1"} imageUrl={LIST_SCENE_00[0].hotpots![1].src} />
          </Html>
        </mesh>

        <mesh position={[-100, 100, 450]} scale={[50, 50, 50]} rotation={[0, 0, 0]}>
          <Html center transform>
            <Tooltip title={"Rèm cửa"} onOpenChange={onTooltipOpen}>
              <BtnHotspot
                onClick={() => handleOpenControl("REM")}
                icon={<CurtainSvg fill="currentColor" style={{ width: 16 }} />}
              />
            </Tooltip>
          </Html>
        </mesh>

        <mesh position={[420, 270, -140]} scale={[50, 50, 50]} rotation={[0, -Math.PI / 2, 0]}>
          <Html center transform>
            <BtnHotpotAirCond
              onClick={() => handleOpenControl("DIEU-HOA")}
              onTooltipOpen={onTooltipOpen}
            />
          </Html>
        </mesh>

        <mesh position={[-490, -10, 90]} scale={[33, 33, 33]} rotation={[-0, Math.PI * 0.5, 0]}>
          <Html center transform>
            <StyledVideo01 style={{ height: 280 }}>
              <video
                src={"https://yoolife.vn/v1/header-banner-1.mp4"}
                autoPlay
                preload="metadata"
                disablePictureInPicture
                muted
                loop
                controlsList="nodownload noremoteplayback noplaybackrate foobar"
              ></video>
            </StyledVideo01>
          </Html>
        </mesh>

        {/* ROUTES */}

        <mesh position={[-80, -130, -440]} scale={[40, 40, 40]} rotation={[0, 0, -0.1]}>
          <Html center transform>
            <RouteArrow01 href={"/livingroom/1"} />
          </Html>
        </mesh>

        {/* <mesh position={[-20, -160, 480]} scale={[50, 50, 50]} rotation={[0.18, 0, -0.1]}>
          <Html center transform>
            <RouteArrow01 href={"/master-bedroom/2"} />
          </Html>
        </mesh> */}
      </If>

      <If condition={IDS.length === 1 && IDS[0] === "1"}>
        <mesh position={[-480, 100, 0]} scale={[44, 44, 44]} rotation={[0, Math.PI * 0.5, 0]}>
          <Html center transform>
            <RouteMarker01 href={"/livingroom/1/0"} imageUrl={LIST_SCENE_00[1].hotpots![0].src} />
          </Html>
        </mesh>

        <mesh position={[-60, -300, -400]} scale={[100, 100, 100]} rotation={[1.5, -0.4, 2.2]}>
          <Html center transform>
            <RouteArrow01 href={"/livingroom/2"} />
          </Html>
        </mesh>

        <mesh position={[200, -340, 300]} scale={[100, 100, 100]} rotation={[-0.16, 0.32, 0]}>
          <Html center transform>
            <RouteArrow01 href={"/livingroom/0"} />
          </Html>
        </mesh>
      </If>
    </PanoLayout>
  );
}

export default Page;
