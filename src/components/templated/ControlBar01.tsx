import useSceneState, { LIST_SCENE_00, LIST_SCENE_01 } from "@/common/useSceneState";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Badge, Button, ButtonProps, DrawerProps, Flex, Form, Tabs, theme } from "antd";
import { rgba } from "emotion-rgba";
import { AirVentIcon, Rotate3DIcon, Settings2Icon } from "lucide-react";
import { useId, useState } from "react";
import DrawerBottom from "../DrawerBottom";
import Tooltip from "../Tooltip";
import PanelScenes from "./tabs/PanelScenes";
import { CurtainSvg, Light01Svg } from "../icons";
import ControlPopover, { useControlState } from "./controls/ControlPopover";
import { BtnControl } from "./controls/BtnControl";
import { useRouter } from "next/router";
import { If } from "@uiw/react-only-when";

type TControlBar01Props = DrawerProps & { extraTitle?: React.ReactNode };

const ControlBar01 = ({ children, extraTitle, ...props }: TControlBar01Props) => {
  const uid = useId();
  const [form] = Form.useForm();
  const {
    token: { colorBgBase, colorTextLabel, colorPrimary, colorTextTertiary },
  } = theme.useToken();
  const {
    query: { id },
    pathname,
  } = useRouter();
  const roomName = pathname.split("/")?.[1];

  const { autoRotate, isViewing, setAutoRotate } = useSceneState((s) => s);
  const { currentTab, setIsOpen, setCurrentTab } = useControlState((s) => s);

  const [selectedTab, setSelectedTab] = useState<string>(roomName);

  const handleOpenControl = (t = "DEN") => {
    setIsOpen(true);
    setCurrentTab(t);
  };

  return (
    <StyledWrapper id={uid + "WRAPPER"}>
      <StyledTitle className="left" align="end" gap={20} style={{ bottom: 148 }}>
        {extraTitle}
      </StyledTitle>
      <StyleDrawer
        open
        width={720}
        styles={{
          mask: { display: "none" },
          body: { padding: "1px 1px 0", minHeight: 100 },
          content: {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(1px)",
          },
        }}
        getContainer={() => document?.getElementById(uid + "WRAPPER") || document.body}
        title={
          <StyledTabsNav01
            style={{ padding: "6px 0" }}
            tabBarStyle={{
              marginBottom: -1,
              color: colorTextLabel,
            }}
            indicator={{ size: 0 }}
            tabBarGutter={0}
            tabBarExtraContent={
              <Flex align="center" style={{ margin: "auto 0 0 0" }} gap={10}>
                <Tooltip title="Tự động xoay">
                  <Button
                    type="text"
                    size="small"
                    icon={<Rotate3DIcon size={21} />}
                    style={{ color: autoRotate ? colorPrimary : colorBgBase }}
                    onClick={() => setAutoRotate(!autoRotate)}
                  ></Button>
                </Tooltip>
              </Flex>
            }
            items={[
              {
                key: "livingroom",
                label: (
                  <>
                    Phòng khách
                    <Badge count={LIST_SCENE_00.length} overflowCount={99} />
                  </>
                ),
              },
              {
                key: "master-bedroom",
                label: (
                  <>
                    Phòng ngủ Master
                    <Badge count={LIST_SCENE_01.length} overflowCount={99} />
                  </>
                ),
              },
            ]}
            activeKey={String(selectedTab)}
            onTabClick={(key) => {
              setSelectedTab(key);
            }}
          />
        }
      >
        <If condition={selectedTab === "livingroom"}>
          <PanelScenes items={LIST_SCENE_00} parentName="livingroom" />
        </If>
        <If condition={selectedTab === "master-bedroom"}>
          <PanelScenes items={LIST_SCENE_01} parentName="master-bedroom" />
        </If>
      </StyleDrawer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 720px;
  z-index: 10000;
`;

const StyledTitle = styled(Flex)`
  position: absolute;
  bottom: 140px;
  width: 100%;
  &.left {
    left: 0;
    padding: 0 12px;
    color: #fff;
  }
  &.right {
    right: 0;
    padding-right: 6px;
  }
`;

const StyledTabsNav01 = styled(Tabs)`
  & .ant-tabs-nav::before {
    border: none;
  }
  & .ant-tabs-tab {
    --bg-color: rgba(255, 255, 255, 0);
    --border-color: rgba(255, 255, 255, 0);
    position: relative;
    width: fit-content;
    flex-shrink: 0;
    z-index: 0;
    padding: 0 12px;
    height: 28px;
    border-radius: 100rem;
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    font-size: 13px;
    color: ${({ theme }) => theme.generatedColors[6]};
    & .ant-tabs-tab-btn {
      font-weight: 500;
    }
    &:not(:first-of-type) {
      margin-left: -1px;
      z-index: 0;
    }
    & .ant-badge {
      margin: -2px 0 0 4px;
      color: inherit;
      .ant-badge-count {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
        min-width: 10px;
        font-size: 12px;
        color: inherit;
      }
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
    & .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.generatedColors[6]} !important;
    }
    --bg-color: ${({ theme }) => rgba(theme.generatedColors[4], 0.2)};
    --border-color: ${({ theme }) => rgba(theme.generatedColors[4], 0.2)};
  }
`;

type TButtonBadgeProps = ButtonProps & { count?: number };
const ButtonBadge = ({ count = 0, children, icon, ...props }: TButtonBadgeProps) => {
  return (
    <StyleButton01 {...props}>
      {icon}
      <Badge
        size="small"
        overflowCount={999}
        count={count}
        styles={{ root: { paddingRight: count > 99 ? 0 : 4 } }}
      />
    </StyleButton01>
  );
};
const StyleButton01 = styled(Button)`
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  padding: 0;
  & .ant-btn-icon {
    margin-inline-end: 2px !important;
  }
  & .ant-badge .ant-badge-count {
    box-shadow: none;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
`;

const StyleDrawer = styled(DrawerBottom)`
  & .ant-drawer-content-wrapper {
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    box-shadow: none;
    @media screen and (max-width: 767.98px) {
      padding: 0 6px;
    }
  }
  & .ant-drawer-content {
    border-radius: 16px 16px 0 0;
    overflow: visible !important;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
  }
  & .ant-drawer-header {
    padding: 0 6px;
    position: relative;
    & .ant-drawer-close {
      display: none;
    }
  }
  & .ant-drawer-footer {
    padding: 0 6px 2px;
    position: relative;
  }
`;

export default ControlBar01;
