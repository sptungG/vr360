import useSceneState, { LIST_SCENE_00, LIST_SCENE_01 } from "@/common/useSceneState";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { If } from "@uiw/react-only-when";
import { Button, CapsuleTabs, Form, PopupProps } from "antd-mobile";
import { rgba } from "emotion-rgba";
import { Rotate3DIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import Flex from "../Flex";
import PopupBottom from "../PopupBottom";
import Tooltip from "../Tooltip";
import { useControlState } from "./controls/ControlPopover";
import PanelScenes from "./tabs/PanelScenes";

type TControlBar01Props = PopupProps & { extraTitle?: React.ReactNode };

const ControlBar01 = ({ children, extraTitle, ...props }: TControlBar01Props) => {
  const uid = useId();
  const [form] = Form.useForm();
  const {
    query: { id },
    pathname,
  } = useRouter();
  const roomName = pathname.split("/")?.[1];
  const { colorPrimary, generatedColors } = useTheme();

  const { autoRotate, isViewing, setAutoRotate } = useSceneState((s) => s);
  const { currentTab, setIsOpen, setCurrentTab } = useControlState((s) => s);

  const [selectedTab, setSelectedTab] = useState<string>(roomName);

  const handleOpenControl = (t = "DEN") => {
    setIsOpen(true);
    setCurrentTab(t);
  };

  return (
    <StyledWrapper id={uid + "WRAPPER"}>
      <StyledTitle className="left" align="end" gap={20} style={{ bottom: 152 }}>
        {extraTitle}
      </StyledTitle>
      <StyledPopup
        visible
        width={720}
        getContainer={() => document?.getElementById(uid + "WRAPPER") || document.body}
      >
        <Flex align="center" justify="space-between" className="header-wrapper">
          <StyledTabsNav01
            activeKey={String(selectedTab)}
            onChange={(key) => {
              setSelectedTab(key);
            }}
          >
            {[
              {
                key: "livingroom",
                label: (
                  <>
                    <span>Phòng khách</span>
                    <span>{LIST_SCENE_00.length}</span>
                  </>
                ),
              },
              {
                key: "master-bedroom",
                label: (
                  <>
                    <span>Phòng ngủ Master</span>
                    <span>{LIST_SCENE_01.length}</span>
                  </>
                ),
              },
            ].map((item, index) => (
              <CapsuleTabs.Tab key={item.key} title={item.label} />
            ))}
          </StyledTabsNav01>

          <Flex align="center" style={{ margin: "0 0 0" }}>
            <Tooltip content="Tự động xoay">
              <Button
                color="primary"
                fill="none"
                size="small"
                style={{ color: autoRotate ? colorPrimary : generatedColors[2] }}
                onClick={() => setAutoRotate(!autoRotate)}
                className="btn-autoRotate"
              >
                <Rotate3DIcon size={21} />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
        <If condition={selectedTab === "livingroom"}>
          <PanelScenes items={LIST_SCENE_00} parentName="livingroom" />
        </If>
        <If condition={selectedTab === "master-bedroom"}>
          <PanelScenes items={LIST_SCENE_01} parentName="master-bedroom" />
        </If>
      </StyledPopup>
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
    padding: 0 4px;
    color: #fff;
    @media screen and (min-width: 768px) {
      padding: 0 8px;
    }
  }
  &.right {
    right: 0;
    padding-right: 6px;
  }
`;

const StyledTabsNav01 = styled(CapsuleTabs)`
  padding: 0;
  & > .adm-capsule-tabs-header {
    border-bottom: none;
    padding: 6px;
  }
  & .adm-capsule-tabs-tab-wrapper {
    padding: 0;
    margin-right: 6px;
  }
  & .adm-capsule-tabs-tab {
    --bg-color: rgba(255, 255, 255, 0.1);
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    & span:nth-of-type(1) {
      font-weight: 500;
    }
    & span:nth-of-type(2) {
      font-weight: 600;
    }
  }
  & .adm-capsule-tabs-tab.adm-capsule-tabs-tab-active {
    --bg-color: ${({ theme }) => rgba(theme.generatedColors[4], 0.2)};
    --border-color: ${({ theme }) => rgba(theme.generatedColors[4], 0.2)};
  }
`;

const StyledPopup = styled(PopupBottom)`
  & .adm-popup-body {
    border-radius: 0 0;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(2px);
    left: 50%;
    transform: translateX(-50%) !important;

    & .header-wrapper {
      border-bottom: solid 1px rgba(0, 0, 0, 0.05);
      & .btn-autoRotate {
        padding: 0 8px;
        & > span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    @media screen and (min-width: 768px) {
      border-radius: 16px 16px 0 0;
    }
  }
`;

export default ControlBar01;
