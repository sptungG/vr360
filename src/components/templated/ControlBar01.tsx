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

type TControlBar01Props = DrawerProps & {};

const ControlBar01 = ({ children, ...props }: TControlBar01Props) => {
  const uid = useId();
  const [form] = Form.useForm();
  const {
    token: { colorBgBase, colorTextLabel, colorPrimary, colorTextTertiary },
  } = theme.useToken();
  const { generatedColors } = useTheme();

  const { autoRotate, isViewing, setAutoRotate } = useSceneState((s) => s);
  const { currentTab, setIsOpen, setCurrentTab } = useControlState((s) => s);

  const [selectedTab, setSelectedTab] = useState<string>("master-bedroom");

  const handleOpenControl = (t = "DEN") => {
    setIsOpen(true);
    setCurrentTab(t);
  };

  return (
    <StyledWrapper id={uid + "WRAPPER"}>
      <StyledTitle className="left" align="end" gap={20} style={{ bottom: 148 }}>
        <Flex align="center">
          <Flex align="center" style={{ margin: "0 4px 0 0" }}>
            <ControlPopover>
              <BtnControl className="btn btn-00" icon={<Settings2Icon size={18} />}></BtnControl>
            </ControlPopover>
          </Flex>
          <Flex align="center" gap={2}>
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
          </Flex>
        </Flex>
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
        {selectedTab === "livingroom" && (
          <PanelScenes items={LIST_SCENE_00} parentName="livingroom" />
        )}
        {selectedTab === "master-bedroom" && (
          <PanelScenes items={LIST_SCENE_01} parentName="master-bedroom" />
        )}
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
