import { DeliverySvg, TableSelectSvg } from "@/components/icons";
import styled from "@emotion/styled";
import { Button, Card, Divider, Flex, Form, Input, Segmented, Tabs, Typography } from "antd";
import { rgba } from "emotion-rgba";
import { AlbumIcon, MapPinIcon, PackageCheckIcon } from "lucide-react";
import React from "react";

type TPanelOrderProps = {};

const PanelOrder = ({}: TPanelOrderProps) => {
  const [form] = Form.useForm();
  return (
    <StyledWrapper>
      <Form form={form} layout="vertical" size="middle">
        <StyledTabs
          tabBarGutter={0}
          tabBarStyle={{ marginBottom: 6 }}
          indicator={{ size: 0 }}
          // onTabClick={(k) => setSelectedTabPromo(k)}
          items={[
            {
              key: "giao-hang",
              label: (
                <Flex align="center" gap={4}>
                  <DeliverySvg style={{ width: 26, strokeWidth: 2 }} />
                  Giao hàng
                </Flex>
              ),
              children: (
                <Flex vertical>
                  <Card size="small">
                    <Typography.Title level={5} style={{ margin: "0 0 12px" }}>
                      Địa chỉ nhận hàng:
                    </Typography.Title>
                    <Button
                      type="text"
                      className="btn"
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        padding: "0 6px 0 4px",
                        marginBottom: 8,
                      }}
                      icon={<MapPinIcon size={16} />}
                    >
                      Sử dụng vị trí hiện tại của bạn
                    </Button>

                    <Form.Item label="Địa chỉ chi tiết">
                      <Input.TextArea />
                    </Form.Item>

                    <Divider plain></Divider>
                  </Card>
                </Flex>
              ),
            },
            {
              key: "dat-den-lay",
              label: (
                <Flex align="center" gap={4}>
                  <PackageCheckIcon size={22} strokeWidth={1.2} />
                  Đặt đến lấy
                </Flex>
              ),
            },
          ]}
        />
      </Form>
      {/* <TableSelectSvg style={{ width: 100, color: "#AD172B" }} /> */}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 6px;
`;

const StyledTabs = styled(Tabs)`
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
    height: 32px;
    border-radius: 100rem;
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    font-size: 13px;
    &:not(:first-of-type) {
      margin-left: -1px;
      z-index: 0;
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
    --bg-color: ${({ theme }) => rgba(theme.colorPrimary, 0.2)};
    --border-color: ${({ theme }) => rgba(theme.colorPrimary, 0.2)};
  }
`;

export default PanelOrder;
