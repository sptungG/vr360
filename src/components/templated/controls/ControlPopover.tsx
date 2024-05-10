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
  currentTab?: string;
  setCurrentTab: (s?: string) => void;
  setIsOpen: (s: boolean) => void;
};

export const useControlState = create<TState>()((set) => ({
  open: false,
  currentTab: "",
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
        } else {
          setCurrentTab("");
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
    <StyledActions align="center">
      <Flex align="center" style={{ margin: "0 4px 0 0" }}>
        <ControlPopover>
          <BtnControl className="btn btn-00" icon={<Settings2Icon size={18} />}></BtnControl>
        </ControlPopover>
      </Flex>
      <Tabs
        indicator={{ size: 0 }}
        tabBarStyle={{ margin: 0 }}
        tabBarGutter={4}
        activeKey={currentTab}
        defaultActiveKey={""}
        onTabClick={(k) => {
          handleOpenControl(k);
        }}
        items={[
          {
            key: "DIEU-HOA",
            icon: <AirVentIcon strokeWidth={1.2} color="currentColor" size={18} />,
            label: "Điều hòa",
          },
        ]}
      />
    </StyledActions>
  );
};
const StyledActions = styled(Flex)`
  max-width: 100dvw;
  & .btn {
    border-radius: 100rem;
    height: 30px;
  }
  & .btn-00 {
    background-color: rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.generatedColors[7]};
    backdrop-filter: blur(2px);
  }
  & .ant-tabs {
    flex: 1 1 auto;
    min-width: 0px;
    & .ant-tabs-nav::before {
      display: none;
    }
    & .ant-tabs-tab {
      padding: 0;
      & .ant-tabs-tab-btn {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        color: ${({ theme }) => theme.generatedColors[7]};
        backdrop-filter: blur(2px);
        border-radius: 100rem;
        gap: 4px;
        border: 1px solid transparent;
      }
      & .ant-tabs-tab-icon {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
    & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.generatedColors[7]} !important;
      border-color: ${({ theme }) => rgba(theme.generatedColors[3], 0.2)} !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    & .ant-tabs-nav-operations {
      display: none !important;
    }
  }
`;

export default ControlPopover;
