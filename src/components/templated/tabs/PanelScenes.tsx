import Flex from "@/components/Flex";
import { NImage } from "@/components/Image";
import { StatusProcessing } from "@/components/Items";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Tabs } from "antd-mobile";
import Link from "next/link";
import { useRouter } from "next/router";

type TPanelScenesProps = { items: any[]; parentName: string };

const PanelScenes = ({ items = [], parentName }: TPanelScenesProps) => {
  const {
    query: { id },
    pathname,
  } = useRouter();
  const IDS = id || ["0"];

  const { generatedColors } = useTheme();

  return (
    <StyledSceneTabs activeKey={IDS[0]} activeLineMode="full">
      {items.map((item, index) => (
        <Tabs.Tab
          key={item.id}
          title={
            <Link href={`/${parentName}/${item.id}`}>
              <Flex vertical>
                <NImage src={item.src} alt="" fill quality={1}></NImage>
                <div className="actions-b">
                  <span className="title" style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                    {item.label}
                  </span>
                </div>

                <div className="actions-tr">
                  <Flex gap={6} align="center">
                    <StatusProcessing />
                    <span style={{ color: generatedColors[4], fontSize: 12 }}>Đang xem</span>
                  </Flex>
                </div>
              </Flex>
            </Link>
          }
        />
      ))}
    </StyledSceneTabs>
  );
};

const StyledSceneTabs = styled(Tabs)`
  & .adm-tabs-tab-line {
    z-index: 10;
    height: 3px;
  }
  & .adm-tabs-tab-wrapper {
    padding: 0;
  }
  & .adm-tabs-tab {
    position: relative;
    height: 110px;
    width: fit-content;
    width: 100%;
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
      padding: 0 8px 6px 8px;
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
    & .actions-tr {
      position: absolute;
      top: 0;
      right: 0;
      padding: 6px 4px 0 0;
      display: none;
    }
  }
  & .adm-tabs-tab.adm-tabs-tab-active {
    & .actions-tr {
      display: flex;
    }
  }
  & .ant-tabs-nav-operations {
    display: none !important;
  }
`;

export default PanelScenes;
