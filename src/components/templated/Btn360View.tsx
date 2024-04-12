import { Button } from "antd-mobile";
import React from "react";
import { Round360Svg } from "../icons";
import useSceneState from "@/common/useSceneState";
import styled from "@emotion/styled";
import { AnimatePulse2 } from "@/common/emotion-keyframes";

type TBtn360ViewProps = {};

const Btn360View = ({}: TBtn360ViewProps) => {
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
    <StyledWrapper
      className="btn-360"
      fill="none"
      color="default"
      disabled={isViewing}
      style={{ height: "fit-content", color: "#fff" }}
      onClick={() => setIsViewing(true)}
    >
      <Round360Svg
        className="ld ld-clock infinite"
        style={{ width: 52, zIndex: -1, marginBottom: 2 }}
      />
      <span className="" style={{ padding: "0 8px", fontSize: 12 }}>
        Nhấn để xem thêm
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    background-color: transparent;
    backdrop-filter: blur(4px);
    border-radius: 100rem;
  }
  &:hover {
    & > * {
      animation: none;
      opacity: 1 !important;
    }
  }
`;

export default Btn360View;
