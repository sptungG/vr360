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

export default ControlPopover;
