import { SCENES } from "@/common/data";
import { NImage } from "@/components/Image";
import styled from "@emotion/styled";
import { Tabs, Typography } from "antd";
import React from "react";

type TPanelScenesProps = {};

const PanelScenes = ({}: TPanelScenesProps) => {
  return (
    <StyledSceneTabs
      tabBarGutter={0}
      tabBarStyle={{ margin: 0 }}
      items={SCENES.map((item, index) => ({
        key: String(item.id),
        label: (
          <>
            <NImage src={item.src} alt="" fill quality={1}></NImage>
            <div className="actions-b">
              <Typography.Text strong className="title" style={{ color: "#fff" }}>
                {item.label}
              </Typography.Text>
            </div>
          </>
        ),
      }))}
    />
  );
};

const StyledSceneTabs = styled(Tabs)`
  & .ant-tabs-tab {
    position: relative;
    height: 100px;
    width: fit-content;
    min-width: 200px;
    flex-shrink: 0;
    border: 1px solid transparent;
    z-index: 0;
    &:not(:first-of-type) {
      margin-left: -1px;
      z-index: 0;
    }
    & .actions-b {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 8px 4px 8px;
      height: fit-content;
      min-height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 90%);
      & > * {
        white-space: normal;
      }
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
  }
  & .ant-tabs-nav-operations {
    display: none !important;
  }
`;

export default PanelScenes;
