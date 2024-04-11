import { SCENES } from "@/common/data";
import { NImage } from "@/components/Image";
import styled from "@emotion/styled";
import { Flex, Tabs, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type TPanelScenesProps = { items: any[]; parentName: string };

const PanelScenes = ({ items = [], parentName }: TPanelScenesProps) => {
  const {
    query: { id },
    pathname,
  } = useRouter();
  const IDS = id || ["0"];

  return (
    <StyledSceneTabs
      activeKey={IDS[0]}
      tabBarGutter={0}
      tabBarStyle={{ margin: 0 }}
      items={items.map((item, index) => ({
        key: String(item.id),
        label: (
          <Link href={`/${parentName}/${item.id}`}>
            <Flex vertical>
              <NImage src={item.src} alt="" fill quality={1}></NImage>
              <div className="actions-b">
                <Typography.Text strong className="title" style={{ color: "#fff" }}>
                  {item.label}
                </Typography.Text>
              </div>
            </Flex>
          </Link>
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
