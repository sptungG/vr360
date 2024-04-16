import styled from "@emotion/styled";

import Html from "@/common/Html";
import useSceneState, { LIST_SCENE_01 } from "@/common/useSceneState";
import PanoLayout from "@/components/PanoLayout";
import SpotLight from "@/components/SpotLight";
import Tooltip from "@/components/Tooltip";
import { CurtainSvg, Light01Svg, MarkerSvg } from "@/components/icons";
import Avatar from "@/components/templated/Avatar";
import { RouteArrow01 } from "@/components/templated/RouteArrow";
import { If } from "@uiw/react-only-when";
import { Flex } from "antd";
import { AirVentIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId } from "react";
import { BtnHotspot } from "@/components/templated/controls/BtnControl";
import { ControlActions, useControlState } from "@/components/templated/controls/ControlPopover";
import {
  BtnHotpotLightTop,
  useControlStateLight,
} from "@/components/templated/controls/ControlLight";
import { BtnHotpotAirCond } from "@/components/templated/controls/ControlAirCond";
import Image from "next/image";
import { TransformControls } from "@react-three/drei";
import { StyledMarker01, StyledVideo01 } from "@/components/Items";

const ControlBar01 = dynamic(() => import("@/components/templated/ControlBar01"), { ssr: false });

function Page() {
  const uid = useId();
  const {
    query: { id },
  } = useRouter();
  const IDS = id || ["0"];
  const src =
    IDS.length > 1 ? LIST_SCENE_01[+IDS[0]]?.hotpots?.[+IDS[1]].src : LIST_SCENE_01[+IDS[0]].src;

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
          position={[257, 290, 320]}
          scale={[40, 40, 40]}
          rotation={[2, 0, -2.8]}
          showHelper
          color={configLight!.color}
          hidden={!configLight?.open}
          key={String(configLight)}
        >
          <BtnHotpotLightTop
            onTooltipOpen={onTooltipOpen}
            onClick={() => handleOpenControl("DEN")}
          />
        </SpotLight>

        {/* HOTPOT */}

        <mesh position={[300, -140, -360]} scale={[44, 44, 44]} rotation={[0, 2.2, 0]}>
          <Html center transform>
            <StyledMarker01 href={"/master-bedroom/0/0"}>
              <Flex vertical>
                <Image
                  className="thumbnail"
                  src={LIST_SCENE_01[0].hotpots![0].src}
                  alt=""
                  width={100}
                  height={100}
                  quality={10}
                ></Image>
                <MarkerSvg style={{ width: 125 }} />
              </Flex>
            </StyledMarker01>
          </Html>
        </mesh>

        <mesh position={[85, 150, -500]} scale={[50, 50, 50]} rotation={[0, 0, -0.1]}>
          <Html center transform>
            <Tooltip title={"Rèm cửa"} onOpenChange={onTooltipOpen}>
              <BtnHotspot
                onClick={() => handleOpenControl("REM")}
                icon={<CurtainSvg fill="currentColor" style={{ width: 16 }} />}
              />
            </Tooltip>
          </Html>
        </mesh>

        <mesh position={[440, 188, -160]} scale={[40, 40, 40]} rotation={[0, -Math.PI / 2, 0]}>
          <Html center transform>
            <BtnHotpotAirCond
              onClick={() => handleOpenControl("DIEU-HOA")}
              onTooltipOpen={onTooltipOpen}
            />
          </Html>
        </mesh>

        <mesh position={[-280, 110, 390]} scale={[33, 33, 33]} rotation={[-0, Math.PI * 0.8, 0]}>
          <Html center transform>
            <StyledVideo01 style={{ height: 220 }}>
              <video
                src={"https://yoolife.vn/v1/header-banner-1.mp4"}
                autoPlay
                preload="metadata"
                disablePictureInPicture
                muted
                loop
                playsInline
                controlsList="nodownload noremoteplayback noplaybackrate foobar"
              ></video>
            </StyledVideo01>
          </Html>
        </mesh>

        {/* ROUTES */}

        <mesh position={[460, -120, -230]} scale={[60, 60, 60]} rotation={[1.25, 0.11, -0.8]}>
          <Html center transform>
            <RouteArrow01 href={"/master-bedroom/1"} />
          </Html>
        </mesh>

        <mesh position={[-20, -160, 480]} scale={[50, 50, 50]} rotation={[0.18, 0, -0.1]}>
          <Html center transform>
            <RouteArrow01 href={"/master-bedroom/2"} />
          </Html>
        </mesh>
      </If>
    </PanoLayout>
  );
}

export default Page;
