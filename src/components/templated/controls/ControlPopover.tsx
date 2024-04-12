import styled from "@emotion/styled";
import { Case, Switch } from "@uiw/react-only-when/switch";
import { Button, CapsuleTabs, Popover, PopoverProps, Tabs } from "antd-mobile";
import React from "react";
import { create } from "zustand";
import ControlLight from "./ControlLight";
import ControlAirCond from "./ControlAirCond";
import ControlCurtain from "./ControlCurtain";
import { If } from "@uiw/react-only-when";
import { CloseOutline } from "antd-mobile-icons";
import useSceneState01 from "@/common/useSceneState";
import { BtnControl } from "./BtnControl";
import { AirVentIcon, Settings2Icon } from "lucide-react";
import { CurtainSvg, Light01Svg } from "@/components/icons";
import { rgba } from "emotion-rgba";
import Flex from "@/components/Flex";

type TState = {
  open?: boolean;
  currentTab?: string;
  setCurrentTab: (s?: string) => void;
  setIsOpen: (s: boolean) => void;
};

export const useControlState = create<TState>()((set) => ({
  open: false,
  currentTab: undefined,
  setCurrentTab: (s) => set({ currentTab: s }),
  setIsOpen: (s) => set({ open: !!s }),
}));

type TControlPopoverProps = Pick<PopoverProps, "children"> & {};
const ControlPopover = ({ children }: TControlPopoverProps) => {
  const { autoRotate, setAutoRotate } = useSceneState01((s) => s);
  const { open, setIsOpen, currentTab, setCurrentTab } = useControlState((s) => s);
  return (
    <Popover
      visible={open}
      placement="topLeft"
      content={
        <StyledWrapper vertical>
          <Flex className="" justify="space-between" style={{ margin: "0 0 0" }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>Bộ điều khiển</h3>
            <Button
              fill="none"
              size="small"
              style={{ padding: 0 }}
              onClick={() => {
                setIsOpen(false);
                setCurrentTab(undefined);
              }}
            >
              <CloseOutline />
            </Button>
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
    <StyledActions align="center">
      <Flex align="center" style={{ margin: "0 4px 0 0" }}>
        <ControlPopover>
          <Button fill="none" shape="rounded" type="button" className="btn btn-00">
            <Settings2Icon size={16} />
          </Button>
        </ControlPopover>
      </Flex>
      <CapsuleTabs
        activeKey={currentTab || null}
        onChange={(k) => {
          handleOpenControl(k);
        }}
        defaultActiveKey={null}
      >
        {[
          {
            value: "DEN",
            icon: (
              <Light01Svg
                fill="currentColor"
                style={{ width: 20, height: 20, margin: "0 0 -2px" }}
              />
            ),
            label: "Độ sáng",
          },
          {
            value: "DIEU-HOA",
            icon: <AirVentIcon strokeWidth={1.2} color="currentColor" size={18} />,
            label: "Điều hòa",
          },
          {
            value: "REM",
            icon: <CurtainSvg fill="currentColor" style={{ width: 16, height: 16 }} />,
            label: "Rèm cửa",
          },
        ].map((item, index) => (
          <CapsuleTabs.Tab
            key={item.value}
            destroyOnClose
            title={
              <Flex gap={8} align="center">
                {item.icon}
                <span>{item.label}</span>
              </Flex>
            }
          />
        ))}
      </CapsuleTabs>
    </StyledActions>
  );
};
const StyledActions = styled(Flex)`
  & .btn {
    border-radius: 100rem;
    height: 30px;
    border: 1px solid transparent;
  }
  & .btn-00 {
    background-color: rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.generatedColors[7]};
    backdrop-filter: blur(2px);
    width: 30px;
    padding: 0;
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  & .adm-capsule-tabs-header {
    padding: 6px 6px 6px 0;
    border-bottom: none;
  }
  & .adm-capsule-tabs-tab-wrapper {
    padding: 0;
    margin-right: 6px;
  }
  & .adm-capsule-tabs-tab {
    --adm-color-fill-content: transparent;
    --adm-font-size-7: 13px;
    color: ${({ theme }) => theme.generatedColors[7]};
    backdrop-filter: blur(2px);
    border: 1px solid transparent;
    border-radius: 100rem;
    padding: 0px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    &:hover {
      border-color: ${({ theme }) => rgba(theme.generatedColors[2], 0.2)};
    }
    &.adm-capsule-tabs-tab-active {
      color: ${({ theme }) => theme.generatedColors[7]} !important;
      border-color: ${({ theme }) => rgba(theme.generatedColors[3], 0.2)} !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
  }
`;

export default ControlPopover;
