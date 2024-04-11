import styled from "@emotion/styled";
import { Case, Switch } from "@uiw/react-only-when/switch";
import { Button, Flex, Popover, PopoverProps, Tabs, Typography } from "antd";
import React from "react";
import { create } from "zustand";
import ControlLight from "./ControlLight";
import ControlAirCond from "./ControlAirCond";
import ControlCurtain from "./ControlCurtain";
import { If } from "@uiw/react-only-when";
import { CloseOutlined } from "@ant-design/icons";
import useSceneState01 from "@/common/useSceneState";
import { BtnControl } from "./BtnControl";
import { AirVentIcon, Settings2Icon } from "lucide-react";
import { CurtainSvg, Light01Svg } from "@/components/icons";
import { rgba } from "emotion-rgba";

type TState = {
  open?: boolean;
  currentTab: string;
  setCurrentTab: (s: string) => void;
  setIsOpen: (s: boolean) => void;
};

export const useControlState = create<TState>()((set) => ({
  open: false,
  currentTab: "DEN",
  setCurrentTab: (s) => set({ currentTab: s }),
  setIsOpen: (s) => set({ open: !!s }),
}));

type TControlPopoverProps = Pick<PopoverProps, "children"> & {};
const ControlPopover = ({ children }: TControlPopoverProps) => {
  const { autoRotate, setAutoRotate } = useSceneState01((s) => s);
  const { open, setIsOpen, currentTab, setCurrentTab } = useControlState((s) => s);
  return (
    <Popover
      open={open}
      afterOpenChange={(o) => {
        if (!!o) {
          setAutoRotate(false);
        }
      }}
      destroyTooltipOnHide
      placement="topLeft"
      trigger={["click"]}
      arrow={{ pointAtCenter: true }}
      overlayInnerStyle={{ padding: "8px 8px 8px" }}
      mouseEnterDelay={0.01}
      mouseLeaveDelay={0.01}
      content={
        <StyledWrapper vertical>
          <Flex className="" justify="space-between" style={{ margin: "0 0 8px" }}>
            <Typography.Title level={3} style={{ margin: 0, fontSize: 16 }}>
              Bộ điều khiển
            </Typography.Title>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </Flex>
          <If condition={currentTab === "DEN"}>
            <ControlLight />
          </If>
          <If condition={currentTab === "DIEU-HOA"}>
            <ControlAirCond />
          </If>
          <If condition={currentTab === "REM"}>
            <ControlCurtain />
          </If>
        </StyledWrapper>
      }
    >
      {children}
    </Popover>
  );
};
const StyledWrapper = styled(Flex)``;

export const ControlActions = () => {
  const { currentTab, setIsOpen, setCurrentTab } = useControlState((s) => s);
  const handleOpenControl = (t = "DEN") => {
    setIsOpen(true);
    setCurrentTab(t);
  };
  return (
    <>
      <Flex align="center">
        <Flex align="center" style={{ margin: "0 4px 0 0" }}>
          <ControlPopover>
            <BtnControl className="btn btn-00" icon={<Settings2Icon size={18} />}></BtnControl>
          </ControlPopover>
        </Flex>
        <StyledActions align="center" gap={2}>
          <BtnControl
            className={`btn btn-01 ${currentTab === "DEN" ? " btn-active" : ""}`}
            icon={<Light01Svg fill="currentColor" style={{ width: 20, margin: "0 0 -2px" }} />}
            onClick={() => handleOpenControl("DEN")}
          >
            Độ sáng
          </BtnControl>
          <BtnControl
            className={`btn btn-01 ${currentTab === "DIEU-HOA" ? " btn-active" : ""}`}
            icon={<AirVentIcon strokeWidth={1.2} color="currentColor" size={18} />}
            onClick={() => handleOpenControl("DIEU-HOA")}
          >
            Điều hòa
          </BtnControl>
          <BtnControl
            className={`btn btn-01 ${currentTab === "REM" ? " btn-active" : ""}`}
            icon={<CurtainSvg fill="currentColor" style={{ width: 16 }} />}
            onClick={() => handleOpenControl("REM")}
          >
            Rèm cửa
          </BtnControl>
        </StyledActions>
      </Flex>
    </>
  );
};
const StyledActions = styled(Flex)`
  & .btn {
    border-radius: 100rem;
    height: 30px;
  }
  & .btn-00 {
    background-color: rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.generatedColors[7]};
    backdrop-filter: blur(2px);
  }
  & .btn-01 {
    padding: 0 8px;
    color: ${({ theme }) => theme.generatedColors[7]};
    backdrop-filter: blur(2px);
    &:hover {
      border: 1px solid ${({ theme }) => rgba(theme.generatedColors[2], 0.2)};
    }
    &.btn-active {
      color: ${({ theme }) => theme.generatedColors[7]} !important;
      border: 1px solid ${({ theme }) => rgba(theme.generatedColors[3], 0.2)} !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
`;

export default ControlPopover;
